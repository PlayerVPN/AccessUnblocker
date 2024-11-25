// Wait for UV to initialize
window.addEventListener('load', () => {
  const initUV = () => {
    if (!window.Ultraviolet) {
      setTimeout(initUV, 100);
      return;
    }
    registerSW();
  };
  initUV();
});

let isFirstSearch = true;

function showFrame() {
  const frameContainer = document.querySelector('.frame-container');
  const content = document.querySelector('.content');
  
  if (isFirstSearch) {
    content.style.transform = 'translateY(-30vh)';
    content.style.transition = 'transform 0.5s ease';
    frameContainer.style.display = 'block';
    isFirstSearch = false;
  }
}

function handleSearch(url) {
  const iframe = document.getElementById('iframeWindow');
  
  try {
    if (!window.Ultraviolet) {
      throw new Error('Ultraviolet not initialized');
    }
    
    showFrame();
    
    // Show loading animation
    iframe.srcdoc = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #000;
        color: #39ff14;
        font-family: sans-serif;
      ">
        <div style="text-align: center;">
          <div style="font-size: 24px; margin-bottom: 16px;">Loading...</div>
          <div style="width: 50px; height: 50px; border: 3px solid #39ff14; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;

    // Process URL through UV
    const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
    iframe.src = encodedUrl;

  } catch (err) {
    console.error('Search error:', err);
    iframe.srcdoc = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #000;
        color: #ff3939;
        font-family: sans-serif;
      ">
        <div style="text-align: center;">
          <div style="font-size: 24px;">Error Loading Page</div>
          <div style="color: #666; margin-top: 8px;">${err.message}</div>
        </div>
      </div>
    `;
  }
}

// Event Listeners
document.getElementById('urlInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('searchButton').click();
  }
});

document.getElementById('searchButton').onclick = () => {
  const input = document.getElementById('urlInput');
  let url = input.value.trim();

  if (!url) return;

  // Add https:// if no protocol specified
  if (!/^https?:\/\//i.test(url)) {
    // Check if it's a search query
    if (!url.includes('.') || url.includes(' ')) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else {
      url = 'https://' + url;
    }
  }

  handleSearch(url);
};