import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  subscribeHomepageDoc,
  saveHomepageDoc,
  resetHomepageToDefaults,
  subscribeCollection,
  addCollectionItem,
  updateCollectionItem,
  deleteCollectionItem,
  getRecentActivity,
  logActivity,
  isFirebaseConfigured
} from '../firebase/services';
import {
  HOMEPAGE_DEFAULT_SEED,
  NEWS_DEFAULT_SEED,
  EVENTS_DEFAULT_SEED,
  GALLERY_DEFAULT_SEED
} from '../firebase/schema';

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [homepageData, setHomepageData] = useState(HOMEPAGE_DEFAULT_SEED);
  const [newsList, setNewsList] = useState(NEWS_DEFAULT_SEED);
  const [eventsList, setEventsList] = useState(EVENTS_DEFAULT_SEED);
  const [galleryList, setGalleryList] = useState(GALLERY_DEFAULT_SEED);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isSyncLive, setIsSyncLive] = useState(isFirebaseConfigured);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date().toISOString());

  // Subscribe to real-time updates on mount
  useEffect(() => {
    // 1. Homepage document listener
    const unsubHome = subscribeHomepageDoc((data, isLive) => {
      if (data) {
        setHomepageData(data);
        if (data.updatedAt) setLastSaved(data.updatedAt);
      }
      setIsSyncLive(isLive);
    });

    // 2. News collection listener
    const unsubNews = subscribeCollection('news', (items, isLive) => {
      if (Array.isArray(items)) setNewsList(items);
      setIsSyncLive(isLive);
    });

    // 3. Events collection listener
    const unsubEvents = subscribeCollection('events', (items, isLive) => {
      if (Array.isArray(items)) setEventsList(items);
      setIsSyncLive(isLive);
    });

    // 4. Gallery collection listener
    const unsubGallery = subscribeCollection('gallery', (items, isLive) => {
      if (Array.isArray(items)) setGalleryList(items);
      setIsSyncLive(isLive);
    });

    // 5. Activity log
    setRecentActivity(getRecentActivity());

    return () => {
      unsubHome();
      unsubNews();
      unsubEvents();
      unsubGallery();
    };
  }, []);

  // Update Activity feed helper
  const refreshActivity = () => {
    setRecentActivity(getRecentActivity());
  };

  // -----------------------------------------------------------
  // HOMEPAGE CMS METHODS
  // -----------------------------------------------------------
  const updateHomepageData = async (newData) => {
    setIsSaving(true);
    try {
      const saved = await saveHomepageDoc(newData);
      setHomepageData(saved);
      setLastSaved(saved.updatedAt);
      refreshActivity();
      return saved;
    } finally {
      setIsSaving(false);
    }
  };

  const updateHomepageSection = async (sectionKey, sectionValue) => {
    const updated = {
      ...homepageData,
      [sectionKey]: sectionValue
    };
    return await updateHomepageData(updated);
  };

  const resetHomepageDefaults = async () => {
    setIsSaving(true);
    try {
      const reset = await resetHomepageToDefaults();
      setHomepageData(reset);
      setLastSaved(reset.updatedAt);
      refreshActivity();
      return reset;
    } finally {
      setIsSaving(false);
    }
  };

  // -----------------------------------------------------------
  // NEWS CMS METHODS
  // -----------------------------------------------------------
  const addNews = async (articleData) => {
    setIsSaving(true);
    try {
      const newItem = await addCollectionItem('news', articleData);
      setNewsList((prev) => [newItem, ...prev]);
      refreshActivity();
      return newItem;
    } finally {
      setIsSaving(false);
    }
  };

  const updateNews = async (id, articleData) => {
    setIsSaving(true);
    try {
      const updatedItem = await updateCollectionItem('news', id, articleData);
      setNewsList((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
      refreshActivity();
      return updatedItem;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNews = async (id) => {
    setIsSaving(true);
    try {
      await deleteCollectionItem('news', id);
      setNewsList((prev) => prev.filter((item) => item.id !== id));
      refreshActivity();
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  const duplicateNews = async (id) => {
    const original = newsList.find((item) => item.id === id);
    if (!original) return null;

    const copy = {
      ...original,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    delete copy.id;
    return await addNews(copy);
  };

  // -----------------------------------------------------------
  // EVENTS CMS METHODS
  // -----------------------------------------------------------
  const addEvent = async (eventData) => {
    setIsSaving(true);
    try {
      const newItem = await addCollectionItem('events', eventData);
      setEventsList((prev) => [newItem, ...prev]);
      refreshActivity();
      return newItem;
    } finally {
      setIsSaving(false);
    }
  };

  const updateEvent = async (id, eventData) => {
    setIsSaving(true);
    try {
      const updatedItem = await updateCollectionItem('events', id, eventData);
      setEventsList((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
      refreshActivity();
      return updatedItem;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEvent = async (id) => {
    setIsSaving(true);
    try {
      await deleteCollectionItem('events', id);
      setEventsList((prev) => prev.filter((item) => item.id !== id));
      refreshActivity();
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  const duplicateEvent = async (id) => {
    const original = eventsList.find((item) => item.id === id);
    if (!original) return null;

    const copy = {
      ...original,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };
    delete copy.id;
    return await addEvent(copy);
  };

  // -----------------------------------------------------------
  // GALLERY CMS METHODS
  // -----------------------------------------------------------
  const addGalleryPhoto = async (photoData) => {
    setIsSaving(true);
    try {
      const newItem = await addCollectionItem('gallery', photoData);
      setGalleryList((prev) => [newItem, ...prev]);
      refreshActivity();
      return newItem;
    } finally {
      setIsSaving(false);
    }
  };

  const bulkAddPhotos = async (photosArray) => {
    setIsSaving(true);
    try {
      const addedItems = [];
      for (const photo of photosArray) {
        const item = await addCollectionItem('gallery', photo);
        addedItems.push(item);
      }
      setGalleryList((prev) => [...addedItems, ...prev]);
      refreshActivity();
      return addedItems;
    } finally {
      setIsSaving(false);
    }
  };

  const updateGalleryPhoto = async (id, photoData) => {
    setIsSaving(true);
    try {
      const updatedItem = await updateCollectionItem('gallery', id, photoData);
      setGalleryList((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)));
      refreshActivity();
      return updatedItem;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteGalleryPhoto = async (id) => {
    setIsSaving(true);
    try {
      await deleteCollectionItem('gallery', id);
      setGalleryList((prev) => prev.filter((item) => item.id !== id));
      refreshActivity();
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleGalleryFeatured = async (id) => {
    const photo = galleryList.find((p) => p.id === id);
    if (!photo) return;
    const newFeatured = !photo.featured;
    return await updateGalleryPhoto(id, { featured: newFeatured });
  };

  const value = {
    homepageData,
    updateHomepageData,
    updateHomepageSection,
    resetHomepageDefaults,
    newsList,
    addNews,
    updateNews,
    deleteNews,
    duplicateNews,
    eventsList,
    addEvent,
    updateEvent,
    deleteEvent,
    duplicateEvent,
    galleryList,
    addGalleryPhoto,
    bulkAddPhotos,
    updateGalleryPhoto,
    deleteGalleryPhoto,
    toggleGalleryFeatured,
    recentActivity,
    refreshActivity,
    isSyncLive,
    isSaving,
    lastSaved
  };

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
