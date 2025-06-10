
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className, 
    icon, 
    iconPosition = 'left',
    ...props 
  }, ref) => {
    const variantClasses = {
      primary: 'bg-gold-500 text-white hover:bg-gold-600 border border-transparent',
      secondary: 'bg-royal-100 text-royal-800 hover:bg-royal-200 border border-transparent',
      outline: 'bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-50',
      ghost: 'bg-transparent text-royal-800 hover:bg-royal-100 border border-transparent',
      link: 'bg-transparent text-gold-600 hover:text-gold-700 underline border-0 p-0'
    };

    const sizeClasses = {
      sm: 'py-1.5 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-2.5 px-5 text-lg'
    };

    const baseClasses = 'font-medium rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center';

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          variant !== 'link' && sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
