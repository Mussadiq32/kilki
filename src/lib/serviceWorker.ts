// Service Worker Registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update prompt
              showUpdatePrompt(registration);
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
};

// Show update prompt
const showUpdatePrompt = (registration: ServiceWorkerRegistration) => {
  // You can implement a custom update prompt here
  if (confirm('New version available! Reload to update?')) {
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
};

// Unregister service worker
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
  }
};

// Check for updates
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
  }
};

// Background sync
export const requestBackgroundSync = async (tag: string) => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    const registration = await navigator.serviceWorker.ready;
    // Type assertion for background sync
    (registration as any).sync?.register(tag);
  }
};

// Push notifications
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

// Subscribe to push notifications
export const subscribeToPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY,
      });
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  }
};

// Cache management
export const clearCaches = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    );
  }
};

// Get cache info
export const getCacheInfo = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const cacheInfo = await Promise.all(
      cacheNames.map(async (cacheName) => {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        return {
          name: cacheName,
          size: keys.length,
        };
      })
    );
    return cacheInfo;
  }
  return [];
};

// Preload critical resources
export const preloadCriticalResources = async () => {
  const criticalResources = [
    '/',
    '/static/js/main.js',
    '/static/css/main.css',
  ];

  if ('caches' in window) {
    const cache = await caches.open('critical-resources');
    await cache.addAll(criticalResources);
  }
};

// Performance monitoring
export const monitorPerformance = () => {
  if ('performance' in window) {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // You can integrate web-vitals library here
      console.log('Web Vitals monitoring available');
    }

    // Monitor service worker performance
    navigator.serviceWorker?.addEventListener('message', (event) => {
      if (event.data.type === 'PERFORMANCE_METRIC') {
        console.log('SW Performance:', event.data.metric);
      }
    });
  }
}; 