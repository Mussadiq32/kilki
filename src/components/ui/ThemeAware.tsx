import React from 'react';
import { useTheme, useThemeStyles } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeAwareProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'container' | 'card' | 'input' | 'button' | 'text' | 'border';
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export const ThemeAware: React.FC<ThemeAwareProps> = ({
  children,
  className = '',
  variant = 'container',
  as: Component = 'div',
  style = {},
  ...props
}) => {
  const { isDark } = useTheme();
  const { themeClasses, cssVars } = useThemeStyles();

  const variantClasses = {
    container: themeClasses.container,
    card: themeClasses.card,
    input: themeClasses.input,
    button: themeClasses.button,
    text: isDark ? 'text-white' : 'text-gray-900',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
  };

  const combinedStyle = {
    ...cssVars,
    ...style,
  };

  return (
    <Component
      className={cn(variantClasses[variant], className)}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

// Theme-aware text component
export const ThemeText: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
  as?: keyof JSX.IntrinsicElements;
}> = ({ children, className = '', variant = 'primary', as: Component = 'span', ...props }) => {
  const { isDark } = useTheme();

  const variantClasses = {
    primary: isDark ? 'text-white' : 'text-gray-900',
    secondary: isDark ? 'text-gray-300' : 'text-gray-700',
    tertiary: isDark ? 'text-gray-400' : 'text-gray-600',
    muted: isDark ? 'text-gray-500' : 'text-gray-500',
  };

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
};

// Theme-aware background component
export const ThemeBackground: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'gradient';
}> = ({ children, className = '', variant = 'primary', ...props }) => {
  const { isDark } = useTheme();

  const variantClasses = {
    primary: isDark ? 'bg-gray-900' : 'bg-white',
    secondary: isDark ? 'bg-gray-800' : 'bg-gray-50',
    tertiary: isDark ? 'bg-gray-700' : 'bg-gray-100',
    gradient: isDark 
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
      : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50',
  };

  return (
    <div className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};

// Theme-aware border component
export const ThemeBorder: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'strong';
}> = ({ children, className = '', variant = 'default', ...props }) => {
  const { isDark } = useTheme();

  const variantClasses = {
    default: isDark ? 'border-gray-700' : 'border-gray-200',
    subtle: isDark ? 'border-gray-800' : 'border-gray-100',
    strong: isDark ? 'border-gray-600' : 'border-gray-300',
  };

  return (
    <div className={cn('border', variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};

// Theme-aware shadow component
export const ThemeShadow: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ children, className = '', variant = 'md', ...props }) => {
  const { isDark } = useTheme();

  const variantClasses = {
    sm: isDark ? 'shadow-gray-900/20' : 'shadow-sm',
    md: isDark ? 'shadow-gray-900/30' : 'shadow-md',
    lg: isDark ? 'shadow-gray-900/40' : 'shadow-lg',
    xl: isDark ? 'shadow-gray-900/50' : 'shadow-xl',
  };

  return (
    <div className={cn('shadow', variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};

// Theme-aware hover component
export const ThemeHover: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'subtle' | 'medium' | 'strong';
}> = ({ children, className = '', variant = 'medium', ...props }) => {
  const { isDark } = useTheme();

  const variantClasses = {
    subtle: isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    medium: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    strong: isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200',
  };

  return (
    <div className={cn('transition-colors duration-200', variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};

// Theme-aware focus component
export const ThemeFocus: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'ring' | 'outline' | 'background';
}> = ({ children, className = '', variant = 'ring', ...props }) => {
  const { isDark } = useTheme();

  const variantClasses = {
    ring: isDark 
      ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800' 
      : 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    outline: isDark 
      ? 'focus:outline-none focus:border-blue-500' 
      : 'focus:outline-none focus:border-blue-500',
    background: isDark 
      ? 'focus:bg-gray-700' 
      : 'focus:bg-gray-100',
  };

  return (
    <div className={cn('focus:outline-none', variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};

// Theme-aware transition component
export const ThemeTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
  properties?: string[];
}> = ({ children, className = '', properties = ['all'], ...props }) => {
  const transitionClasses = properties.map(prop => `transition-${prop}`).join(' ');
  
  return (
    <div className={cn('duration-200 ease-in-out', transitionClasses, className)} {...props}>
      {children}
    </div>
  );
};

export default ThemeAware; 