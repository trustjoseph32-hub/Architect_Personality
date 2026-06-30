import React from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  id
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div id={id} className={`flex flex-col mb-12 sm:mb-16 md:mb-20 max-w-3xl ${align === 'center' ? 'mx-auto' : ''} ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-[var(--accent-color)] font-semibold uppercase mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[44px] font-light tracking-tight text-[var(--primary-color)] font-heading leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 sm:mt-5 text-stone-500 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
export default SectionTitle;
