import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  buttonStyle?: 'soft' | 'strict' | 'premium';
  onClick?: () => void;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  buttonStyle = 'premium',
  onClick,
  id
}) => {
  const getRadiusClass = () => {
    if (buttonStyle === 'strict') return 'rounded-none';
    if (buttonStyle === 'soft') return 'rounded-3xl';
    return 'rounded-xl'; // premium
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white border border-stone-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden ${getRadiusClass()} ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
export default Card;
