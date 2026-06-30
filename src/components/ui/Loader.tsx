import React from 'react';

export const Loader: React.FC<{ fullScreen?: boolean; message?: string }> = ({
  fullScreen = false,
  message = 'Загрузка...'
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-stone-200 border-t-amber-800 animate-spin"></div>
      {message && (
        <p className="mt-4 font-mono text-xs tracking-widest text-stone-500 uppercase">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#FAF8F5] z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
export default Loader;
