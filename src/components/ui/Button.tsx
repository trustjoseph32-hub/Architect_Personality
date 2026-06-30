import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  buttonStyle?: 'soft' | 'strict' | 'premium';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  buttonStyle = 'premium',
  className = '',
  ...props
}) => {
  // Determine border radius based on style
  const getRadiusClass = () => {
    if (buttonStyle === 'strict') return 'rounded-none';
    if (buttonStyle === 'soft') return 'rounded-2xl';
    return 'rounded-full'; // premium is fully rounded in Natural Tones theme
  };

  const getVariantClass = () => {
    const radius = getRadiusClass();
    
    if (variant === 'text') {
      return 'text-stone-700 hover:text-amber-800 transition-colors duration-300 font-medium tracking-wide';
    }

    if (buttonStyle === 'premium') {
      if (variant === 'primary') {
        return `btn-premium-filled px-6 py-3 font-medium text-sm tracking-widest uppercase transition-all duration-300 ${radius}`;
      }
      if (variant === 'secondary' || variant === 'outline') {
        return `btn-premium px-6 py-3 font-medium text-sm tracking-widest uppercase transition-all duration-300 ${radius}`;
      }
    }

    // Default fallbacks for soft & strict
    if (variant === 'primary') {
      return `bg-slate-800 text-stone-100 hover:bg-slate-700 px-6 py-3 font-medium transition-all duration-300 ${radius}`;
    }
    if (variant === 'secondary') {
      return `bg-stone-200 text-stone-800 hover:bg-stone-300 px-6 py-3 font-medium transition-all duration-300 ${radius}`;
    }
    // Outline
    return `border border-stone-300 text-stone-800 hover:bg-stone-100 px-6 py-3 font-medium transition-all duration-300 ${radius}`;
  };

  return (
    <button
      className={`inline-flex items-center justify-center cursor-pointer select-none active:scale-95 ${getVariantClass()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
