import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker, monitorPerformance } from './lib/serviceWorker'

// Performance optimization: Use requestIdleCallback for non-critical initialization
const initApp = () => {
  const rootElement = document.getElementById("root")
  
  if (!rootElement) {
    throw new Error("Root element not found")
  }

  const root = createRoot(rootElement)
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// Initialize service worker and performance monitoring
const initializeApp = async () => {
  // Register service worker for PWA functionality
  if (process.env.NODE_ENV === 'production') {
    await registerServiceWorker()
  }
  
  // Initialize performance monitoring
  monitorPerformance()
  
  // Initialize the app
  initApp()
}

// Use requestIdleCallback if available, otherwise fallback to setTimeout
if ('requestIdleCallback' in window) {
  requestIdleCallback(initializeApp)
} else {
  setTimeout(initializeApp, 1)
}
