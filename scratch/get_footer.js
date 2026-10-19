const fs = require('fs');

async function main() {
  const res = await fetch('https://sahastfoundation.in/events/');
  const html = await res.text();
  const start = html.indexOf('<footer');
  if (start !== -1) {
    const footerHtml = html.slice(start, start + 7000);
    fs.writeFileSync('scratch/footer_dump.html', footerHtml);
    console.log('Saved footer_dump.html, length:', footerHtml.length);
  }
}

main().catch(console.error);
