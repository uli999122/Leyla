// Pantalla de carga
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const content = document.querySelector('.content');

  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      content.style.display = 'block';
    }, 800);
  }, 1400);
});

// Cargar último video automáticamente
const channelId = "UC2at4aELEO_fqQ1yU43Ev4Q";

const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

fetch(rssUrl)
  .then(res => res.json())
  .then(data => {
    if (data.items && data.items.length > 0) {
      const latest = data.items[0];
      const videoId = latest.link.split('v=')[1].split('&')[0];

      const container = document.getElementById('latest-video-container');
      container.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" 
                title="${latest.title}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
        <h3>${latest.title}</h3>
      `;
    }
  })
  .catch(() => {
    document.getElementById('latest-video-container').innerHTML = `
      <p style="color:#ff69b4; font-size:1.4rem;">¡Pronto subiremos un nuevo video lleno de rosa! 💖</p>
    `;
  });
