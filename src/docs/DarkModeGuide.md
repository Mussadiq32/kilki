# Dark Mode Implementation Guide

## Overview

This application features a comprehensive dark mode system with the following capabilities:

- **Three theme modes**: Light, Dark, and System (follows OS preference)
- **Automatic persistence**: Theme preference is saved to localStorage
- **System preference detection**: Automatically follows OS theme changes
- **Smooth transitions**: CSS transitions for theme switching
- **Accessibility support**: Respects `prefers-reduced-motion` settings
- **Analytics integration**: Tracks theme changes (optional)

## Usage

### Basic Theme Hook

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, toggleTheme, isDark, isLight, isSystem } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDark ? 'Yes' : 'No'}</p>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Theme Toggle Component

```tsx
import { ThemeToggle } from '@/contexts/ThemeContext';

function Header() {
  return (
    <header>
      <ThemeToggle 
        size="md"           // 'sm' | 'md' | 'lg'
        showLabel={true}    // Show text label
        className="custom-class"
      />
    </header>
  );
}
```

### Theme-Aware Styling Hook

```tsx
import { useThemeStyles } from '@/contexts/ThemeContext';

function MyComponent() {
  const { isDark, isLight, themeClasses, cssVars } = useThemeStyles();
  
  return (
    <div 
      className={themeClasses.container}
      style={cssVars}
    >
      <div className={themeClasses.card}>
        <input className={themeClasses.input} />
        <button className={themeClasses.button}>
          Submit
        </button>
      </div>
    </div>
  );
}
```

### Theme-Aware Components

```tsx
import { 
  ThemeAware, 
  ThemeText, 
  ThemeBackground, 
  ThemeBorder,
  ThemeShadow,
  ThemeHover,
  ThemeFocus,
  ThemeTransition 
} from '@/components/ui/ThemeAware';

function MyComponent() {
  return (
    <ThemeAware variant="container" className="p-4">
      <ThemeBackground variant="gradient">
        <ThemeBorder variant="default" className="rounded-lg p-6">
          <ThemeShadow variant="lg">
            <ThemeHover variant="medium">
              <ThemeFocus variant="ring">
                <ThemeText variant="primary" as="h1">
                  Welcome to Royal Realty
                </ThemeText>
                <ThemeText variant="secondary">
                  Discover your dream home
                </ThemeText>
              </ThemeFocus>
            </ThemeHover>
          </ThemeShadow>
        </ThemeBorder>
      </ThemeBackground>
    </ThemeAware>
  );
}
```

## CSS Classes

### Built-in Theme Classes

```css
/* Container styles */
.theme-card {
  @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-900/20;
}

.theme-input {
  @apply bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400;
}

.theme-button {
  @apply bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-200;
}

/* Gradient backgrounds */
.theme-gradient {
  @apply bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900;
}

.theme-gradient-reverse {
  @apply bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-blue-50 dark:via-white dark:to-indigo-50;
}
```

### Custom CSS Variables

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #f1f3f4;
  --text-primary: #1a1a1a;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --border-color: #e5e7eb;
  --border-hover: #d1d5db;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #404040;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --text-tertiary: #6b7280;
  --border-color: #404040;
  --border-hover: #525252;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3);
}
```

## Best Practices

### 1. Use Theme-Aware Components

Instead of manually writing dark mode classes, use the provided theme-aware components:

```tsx
// ❌ Don't do this
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>

// ✅ Do this
<ThemeAware variant="container">
  <ThemeText variant="primary">
    Content
  </ThemeText>
</ThemeAware>
```

### 2. Leverage CSS Variables

Use CSS custom properties for consistent theming:

```tsx
const { cssVars } = useThemeStyles();

return (
  <div style={cssVars}>
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      Content
    </div>
  </div>
);
```

### 3. Handle Loading States

Always handle the initial loading state to prevent hydration mismatches:

```tsx
const { theme, isDark } = useTheme();

// The theme context handles this automatically, but you can check:
if (typeof window === 'undefined') {
  return <div>Loading...</div>;
}
```

### 4. Use Semantic Color Names

Instead of specific colors, use semantic names:

```tsx
// ❌ Don't use specific colors
<div className="text-gray-900 dark:text-white">

// ✅ Use semantic names
<ThemeText variant="primary">
```

### 5. Test All Theme Modes

Always test your components in all three theme modes:
- Light mode
- Dark mode  
- System mode (with both light and dark OS settings)

## Advanced Usage

### Custom Theme Events

Listen for theme changes:

```tsx
useEffect(() => {
  const handleThemeChange = (event: CustomEvent) => {
    console.log('Theme changed:', event.detail);
  };

  window.addEventListener('themechange', handleThemeChange);
  return () => window.removeEventListener('themechange', handleThemeChange);
}, []);
```

### Analytics Integration

The theme system automatically tracks theme changes if Google Analytics is available:

```tsx
// This happens automatically in the theme context
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'theme_change', {
    event_category: 'preferences',
    event_label: newTheme,
  });
}
```

### Performance Optimization

The theme system is optimized for performance:

- Uses CSS custom properties for smooth transitions
- Prevents layout shifts during theme changes
- Respects `prefers-reduced-motion` for accessibility
- Efficient re-renders with React.memo when needed

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**: The theme context handles this automatically by providing a default state during SSR.

2. **Flash of Unstyled Content**: The theme is applied immediately on mount to prevent FOUC.

3. **System Theme Not Updating**: Ensure you're using the `system` theme mode and the browser supports `prefers-color-scheme`.

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
REACT_APP_THEME_DEBUG=true
```

This will log theme changes to the console for debugging purposes.

## Migration Guide

### From Old Theme System

If migrating from the old theme system:

1. Replace `useTheme()` calls with the new hook
2. Update theme toggle components to use `<ThemeToggle>`
3. Replace manual dark mode classes with theme-aware components
4. Update CSS to use the new custom properties

### Example Migration

```tsx
// Old way
const { theme, setTheme } = useTheme();
<div className="bg-white dark:bg-gray-800">

// New way
const { theme, setTheme, isDark } = useTheme();
<ThemeAware variant="container">
```

This comprehensive dark mode system provides a robust, accessible, and performant solution for theme management across the entire application. 