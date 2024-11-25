// Register UV Service Worker
const registerSW = async () => {
  try {
    if (!navigator.serviceWorker) {
      throw new Error('Service workers are not supported');
    }
    
    // Wait for UV to be initialized
    if (!window.Ultraviolet) {
      throw new Error('Ultraviolet not initialized');
    }
    
    const registration = await navigator.serviceWorker.register('/uv/sw.js', {
      scope: __uv$config.prefix,
    });
    
    console.log('Service worker registered:', registration);
  } catch (err) {
    console.error('Failed to register service worker:', err);
  }
};