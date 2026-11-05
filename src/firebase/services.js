import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { db, storage, auth, isFirebaseConfigured } from './config';
import {
  HOMEPAGE_DEFAULT_SEED,
  NEWS_DEFAULT_SEED,
  EVENTS_DEFAULT_SEED,
  GALLERY_DEFAULT_SEED
} from './schema';

export { isFirebaseConfigured };

// Storage keys for offline resilience & instant UI loading
const STORAGE_KEYS = {
  user: 'shreeabhaydas_admin_user',
  homepage: 'shreeabhaydas_cms_homepage',
  news: 'shreeabhaydas_cms_news',
  events: 'shreeabhaydas_cms_events',
  gallery: 'shreeabhaydas_cms_gallery',
  activity: 'shreeabhaydas_cms_activity'
};

const MASTER_CREDENTIALS = {
  usernames: ['admin2233', 'admin2233@shreeabhaydas.com', 'admin@shreeabhaydas.com'],
  password: 'admin@2233',
  user: {
    uid: 'master_admin_2233',
    username: 'admin2233',
    email: 'admin2233@shreeabhaydas.com',
    displayName: 'Pujya Shree Abhaydas Ji SuperAdmin',
    role: 'administrator'
  }
};

/**
 * LocalStorage Helpers
 */
export function getLocalItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading localStorage for key ${key}:`, err);
  }
  return fallback;
}

export function setLocalItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving to localStorage for key ${key}:`, err);
  }
}

/**
 * Activity Logging
 */
export function getRecentActivity() {
  const list = getLocalItem(STORAGE_KEYS.activity, null);
  if (list && Array.isArray(list)) return list;

  const initialActivities = [
    {
      id: 'act-1',
      title: 'Portal Initialized',
      details: 'CMS and Firebase schema loaded successfully',
      type: 'system',
      timestamp: new Date().toISOString()
    },
    {
      id: 'act-2',
      title: 'Katha Schedule Updated',
      details: '7-Day Shrimad Bhagwat Katha in Takhatgarh synchronized',
      type: 'events',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
    },
    {
      id: 'act-3',
      title: 'Darshan Photos Synced',
      details: 'Morning Aarti & Gaushala photos published to gallery',
      type: 'gallery',
      timestamp: new Date(Date.now() - 3600000 * 8).toISOString()
    }
  ];
  setLocalItem(STORAGE_KEYS.activity, initialActivities);
  return initialActivities;
}

export function logActivity(title, details, type = 'cms') {
  const current = getRecentActivity();
  const newActivity = {
    id: `act_${Date.now()}`,
    title,
    details,
    type,
    timestamp: new Date().toISOString()
  };
  const updated = [newActivity, ...current].slice(0, 30);
  setLocalItem(STORAGE_KEYS.activity, updated);
  return updated;
}

/**
 * Helper to convert objects with numeric keys back to arrays
 */
export function normalizeArrayIfNumericKeys(val) {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    const keys = Object.keys(val);
    if (keys.length > 0 && keys.every((k) => !isNaN(Number(k)))) {
      return keys.sort((a, b) => Number(a) - Number(b)).map((k) => val[k]);
    }
  }
  return val;
}

/**
 * Deep merge helper to ensure defaults are preserved when remote or cached docs have partial fields
 */
export function deepMerge(target, source) {
  const normSource = normalizeArrayIfNumericKeys(source);
  const normTarget = normalizeArrayIfNumericKeys(target);

  if (!normSource || typeof normSource !== 'object') return normTarget;
  if (!normTarget || typeof normTarget !== 'object') return normSource;

  const result = Array.isArray(normTarget) ? [...normTarget] : { ...normTarget };

  for (const key of Object.keys(normSource)) {
    let srcVal = normalizeArrayIfNumericKeys(normSource[key]);
    const tgtVal = result[key];

    if (Array.isArray(srcVal)) {
      result[key] = srcVal;
    } else if (srcVal && typeof srcVal === 'object') {
      result[key] = deepMerge(tgtVal || {}, srcVal);
    } else if (srcVal !== undefined) {
      result[key] = srcVal;
    }
  }

  return normalizeArrayIfNumericKeys(result);
}

// Helper to keep root hero and hero.slides[0] perfectly synchronized
function syncHeroFields(heroObj) {
  if (!heroObj || typeof heroObj !== 'object') return heroObj;
  const hero = { ...heroObj };
  
  if (hero.slides && typeof hero.slides === 'object' && !Array.isArray(hero.slides)) {
    hero.slides = Object.values(hero.slides);
  }
  if (!Array.isArray(hero.slides)) {
    hero.slides = [];
  }
  if (!hero.slides[0]) {
    hero.slides[0] = {};
  }

  const s0 = hero.slides[0];

  // If slide 0 has fields, sync upward to hero
  hero.badge = s0.badge || hero.badge;
  hero.title = s0.title || hero.title;
  hero.description = s0.description || hero.description;
  hero.imageUrl = s0.imageUrl || hero.imageUrl;
  hero.image1 = s0.image1 || hero.image1;
  hero.image2 = s0.image2 || hero.image2;
  hero.image3 = s0.image3 || hero.image3;
  hero.buttonText = s0.buttonText || hero.buttonText;
  hero.buttonSubtext = s0.buttonSubtext || hero.buttonSubtext;

  // Also sync downward to s0
  s0.badge = hero.badge || s0.badge;
  s0.title = hero.title || s0.title;
  s0.description = hero.description || s0.description;
  s0.imageUrl = hero.imageUrl || s0.imageUrl;
  s0.image1 = hero.image1 || s0.image1;
  s0.image2 = hero.image2 || s0.image2;
  s0.image3 = hero.image3 || s0.image3;
  s0.buttonText = hero.buttonText || s0.buttonText;
  s0.buttonSubtext = hero.buttonSubtext || s0.buttonSubtext;

  return hero;
}

// ----------------------------------------------------------------------
// 1. HOMEPAGE CMS (Document: cms/homepage)
// ----------------------------------------------------------------------

export function subscribeHomepageDoc(onData, onError) {
  const cached = getLocalItem(STORAGE_KEYS.homepage, null);
  const initial = deepMerge(HOMEPAGE_DEFAULT_SEED, cached || {});
  if (initial.hero) initial.hero = syncHeroFields(initial.hero);
  onData(initial, false); // Emit initial cached data immediately

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'cms', 'homepage');
      const unsubscribe = onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists()) {
            const rawData = snap.data();
            const merged = deepMerge(HOMEPAGE_DEFAULT_SEED, rawData);
            if (merged.hero) merged.hero = syncHeroFields(merged.hero);
            setLocalItem(STORAGE_KEYS.homepage, merged);
            onData(merged, true);
          } else {
            // Document doesn't exist yet in Firestore, seed it
            const cleanSeed = JSON.parse(JSON.stringify(HOMEPAGE_DEFAULT_SEED));
            setDoc(docRef, cleanSeed, { merge: true }).catch(console.error);
            onData(initial, true);
          }
        },
        (err) => {
          console.warn('Firestore real-time homepage listener error:', err);
          if (onError) onError(err);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('Error setting up homepage snapshot listener:', err);
    }
  }

  return () => {};
}

export async function saveHomepageDoc(data) {
  const merged = deepMerge(HOMEPAGE_DEFAULT_SEED, data || {});
  if (merged.hero) merged.hero = syncHeroFields(merged.hero);

  const payload = {
    ...merged,
    updatedAt: new Date().toISOString()
  };

  // Immediate local update
  setLocalItem(STORAGE_KEYS.homepage, payload);
  logActivity('Homepage CMS Updated', 'Modified sections written to live sync storage', 'homepage');

  // Push to Firestore if available
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'cms', 'homepage');
      const cleanPayload = JSON.parse(JSON.stringify(payload));
      await setDoc(docRef, cleanPayload, { merge: true });
      console.info('✓ Successfully published homepage data to Firestore cms/homepage');
    } catch (err) {
      console.error('Firestore save failed for cms/homepage:', err);
    }
  }

  return payload;
}

export async function resetHomepageToDefaults() {
  const payload = {
    ...HOMEPAGE_DEFAULT_SEED,
    updatedAt: new Date().toISOString()
  };
  setLocalItem(STORAGE_KEYS.homepage, payload);
  logActivity('Homepage Reset', 'Restored default 9-section template configuration', 'homepage');

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'cms', 'homepage');
      await setDoc(docRef, payload);
    } catch (err) {
      console.error('Firestore reset failed:', err);
    }
  }

  return payload;
}

// ----------------------------------------------------------------------
// 2. GENERIC COLLECTION SUBSCRIPTION & CRUD (news, events, gallery)
// ----------------------------------------------------------------------

function getCollectionDefaultSeed(colName) {
  if (colName === 'news') return NEWS_DEFAULT_SEED;
  if (colName === 'events') return EVENTS_DEFAULT_SEED;
  if (colName === 'gallery') return GALLERY_DEFAULT_SEED;
  return [];
}

export function subscribeCollection(colName, onData, onError) {
  const storageKey = STORAGE_KEYS[colName] || `shreeabhaydas_cms_${colName}`;
  const seed = getCollectionDefaultSeed(colName);
  const initial = getLocalItem(storageKey, seed);
  onData(initial, false);

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, colName);
      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const items = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data()
            }));
            setLocalItem(storageKey, items);
            onData(items, true);
          } else {
            // First time seeding if empty in cloud
            seed.forEach((item) => {
              const { id, ...rest } = item;
              setDoc(doc(db, colName, id), rest).catch(console.error);
            });
            onData(initial, true);
          }
        },
        (err) => {
          console.warn(`Firestore listener error on ${colName}:`, err);
          if (onError) onError(err);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn(`Failed to attach listener for ${colName}:`, err);
    }
  }

  return () => {};
}

export async function addCollectionItem(colName, itemData) {
  const storageKey = STORAGE_KEYS[colName] || `shreeabhaydas_cms_${colName}`;
  const current = getLocalItem(storageKey, getCollectionDefaultSeed(colName));

  const newItem = {
    ...itemData,
    id: itemData.id || `${colName}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: itemData.createdAt || new Date().toISOString()
  };

  const updated = [newItem, ...current];
  setLocalItem(storageKey, updated);
  logActivity(`New ${colName} Created`, newItem.title || newItem.name || 'Item added', colName);

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, colName, newItem.id);
      await setDoc(docRef, newItem);
    } catch (err) {
      console.error(`Firestore add failed on ${colName}:`, err);
    }
  }

  return newItem;
}

export async function updateCollectionItem(colName, itemId, itemData) {
  const storageKey = STORAGE_KEYS[colName] || `shreeabhaydas_cms_${colName}`;
  const current = getLocalItem(storageKey, getCollectionDefaultSeed(colName));

  const updated = current.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        ...itemData,
        updatedAt: new Date().toISOString()
      };
    }
    return item;
  });

  setLocalItem(storageKey, updated);
  logActivity(`Updated ${colName}`, itemData.title || `Item ${itemId} updated`, colName);

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, colName, itemId);
      await updateDoc(docRef, { ...itemData, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.error(`Firestore update failed on ${colName}/${itemId}:`, err);
    }
  }

  return updated.find((i) => i.id === itemId);
}

export async function deleteCollectionItem(colName, itemId, itemUrl = null) {
  const storageKey = STORAGE_KEYS[colName] || `shreeabhaydas_cms_${colName}`;
  const current = getLocalItem(storageKey, getCollectionDefaultSeed(colName));
  const target = current.find((i) =>
    (itemId && (i.id === itemId || String(i.id) === String(itemId))) ||
    (itemUrl && i.url === itemUrl)
  );

  const updated = current.filter((item) => {
    if (itemId && (item.id === itemId || String(item.id) === String(itemId))) return false;
    if (itemUrl && item.url === itemUrl) return false;
    return true;
  });

  setLocalItem(storageKey, updated);
  logActivity(`Deleted from ${colName}`, target?.title || `Item ${itemId || ''} deleted`, colName);

  const targetDocId = itemId || target?.id;
  if (isFirebaseConfigured && db && targetDocId) {
    try {
      const docRef = doc(db, colName, String(targetDocId));
      // Guard with timeout so slow network or offline queue doesn't hang UI
      await Promise.race([
        deleteDoc(docRef),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore operation timed out')), 2500))
      ]);
    } catch (err) {
      console.warn(`Firestore delete on ${colName}/${targetDocId}:`, err?.message || err);
    }
  }

  return true;
}

// ----------------------------------------------------------------------
// 3. STORAGE UPLOADER (Images, gallery bucket, previews)
// ----------------------------------------------------------------------

// Helper to compress and convert image file to optimized Base64 data URL
function compressAndReadImage(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(file.type || 'image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(event.target.result);
    };
    reader.onerror = (err) => reject(err);
  });
}

// Track whether Firebase Storage has hit CORS blocks on this origin to prevent repeated 2-minute hangs
let isStorageCorsBlocked = false;

export async function uploadImageToStorage(file, folderPath = 'gallery', onProgress) {
  if (!file) return '';

  // 1. In Local Development (Vite dev server on localhost), save directly to project assets.
  // This completely eliminates cross-origin CORS errors to Firebase Storage on localhost!
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    try {
      if (onProgress) onProgress(25);
      const dataUrl = await compressAndReadImage(file, 1400, 0.8);
      if (onProgress) onProgress(65);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, dataUrl })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          if (onProgress) onProgress(100);
          console.info('✓ Saved image to local project uploads:', json.url);
          return json.url;
        }
      }
    } catch (err) {
      console.warn('Local dev upload middleware unavailable, falling back:', err);
    }
  }

  // 2. Production or Cloud Storage path
  return new Promise((resolve) => {
    let isDone = false;

    const fallbackToLocal = () => {
      if (isDone) return;
      isDone = true;
      if (onProgress) onProgress(60);
      compressAndReadImage(file, 1200, 0.75)
        .then((dataUrl) => {
          if (onProgress) onProgress(100);
          resolve(dataUrl);
        })
        .catch(() => {
          const reader = new FileReader();
          reader.onload = () => {
            if (onProgress) onProgress(100);
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
    };

    // If storage is not configured, fall back immediately
    if (!isFirebaseConfigured || !storage) {
      fallbackToLocal();
      return;
    }

    try {
      const cleanName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      // Route all image uploads under the permitted 'gallery' folder with sub-context prefix
      const targetFolder = 'gallery';
      const filePrefix = folderPath && folderPath !== 'gallery' ? `${folderPath}_` : '';
      const storageRef = ref(storage, `${targetFolder}/${filePrefix}${cleanName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // SAFETY TIMEOUT: If Firebase Storage preflight hangs due to CORS,
      // cancel uploadTask immediately and fall back to local!
      const timer = setTimeout(() => {
        if (!isDone) {
          try {
            uploadTask.cancel();
          } catch (e) {}
          fallbackToLocal();
        }
      }, 3000);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (isDone) return;
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (onProgress) onProgress(progress);
        },
        () => {
          clearTimeout(timer);
          fallbackToLocal();
        },
        async () => {
          clearTimeout(timer);
          if (isDone) return;
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            isDone = true;
            if (onProgress) onProgress(100);
            resolve(downloadUrl);
          } catch (err) {
            fallbackToLocal();
          }
        }
      );
    } catch (err) {
      fallbackToLocal();
    }
  });
}

// ----------------------------------------------------------------------
// 4. AUTHENTICATION SERVICE & MASTER CREDENTIAL VERIFICATION
// ----------------------------------------------------------------------

export async function authenticateMasterAdmin(usernameOrEmail, password) {
  const cleanInput = (usernameOrEmail || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // 1. Try Firebase Auth first if configured
  if (isFirebaseConfigured && auth) {
    try {
      const emailToUse = cleanInput.includes('@')
        ? cleanInput
        : `${cleanInput}@shreeabhaydas.com`;
      const res = await signInWithEmailAndPassword(auth, emailToUse, cleanPass);
      const user = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || 'Shree Abhaydas Ji Admin',
        role: 'administrator'
      };
      setLocalItem(STORAGE_KEYS.user, user);
      logActivity('Admin Logged In', `Authenticated via Firebase Auth (${user.email})`, 'auth');
      return user;
    } catch (firebaseErr) {
      console.warn('Firebase signInWithEmailAndPassword error, checking master fallback:', firebaseErr.message);
    }
  }

  // 2. Master Admin Verification Fallback
  // Username: admin2233 or admin2233@shreeabhaydas.com
  // Password: admin@2233
  // Role: administrator
  const isUserMatch = MASTER_CREDENTIALS.usernames.some((u) => u.toLowerCase() === cleanInput);
  const isPassMatch = cleanPass === MASTER_CREDENTIALS.password;

  if (isUserMatch && isPassMatch) {
    const user = { ...MASTER_CREDENTIALS.user };
    setLocalItem(STORAGE_KEYS.user, user);
    logActivity('Admin Logged In', 'Master Admin credentials verified successfully', 'auth');
    return user;
  }

  throw new Error('Invalid credentials. Master admin login: admin2233 / admin@2233');
}

export function getAdminSession() {
  return getLocalItem(STORAGE_KEYS.user, null);
}

export async function logoutAdmin() {
  setLocalItem(STORAGE_KEYS.user, null);
  logActivity('Admin Logged Out', 'Admin session terminated', 'auth');
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Firebase signOut error:', e);
    }
  }
}
