import fs from 'fs';

const html = fs.readFileSync('scratch/blog_list.html', 'utf8');
const links = html.match(/href="https:\/\/sahastfoundation\.in\/[^"]*"/g) || [];
const uniqueLinks = [...new Set(links)];
console.log('Unique Links in blog list:');
uniqueLinks.forEach(l => console.log(l));
