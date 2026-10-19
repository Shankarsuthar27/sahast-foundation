import fs from 'fs';

async function check() {
  try {
    const res = await fetch('https://sahastfoundation.in/blog/');
    const html = await res.text();
    fs.writeFileSync('scratch/blog_list.html', html);
    console.log('Saved blog_list.html, length:', html.length);
  } catch (e) {
    console.error(e);
  }
}

check();
