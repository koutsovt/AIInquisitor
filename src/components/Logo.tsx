import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <span className="text-current text-[40px] font-normal tracking-[0.01em] leading-none">j</span>
        <span className="text-current text-[40px] font-normal tracking-[0.01em] leading-none">a</span>
        <span className="text-current text-[40px] font-normal tracking-[0.01em] leading-none">r</span>
        <span className="text-current text-[40px] font-normal tracking-[0.01em] leading-none">d</span>
        <div className="relative w-6 h-6 rounded-full bg-current ml-[1px]">
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-current"></div>
        </div>
        <span className="text-current text-[40px] font-normal tracking-[0.01em] leading-none">n</span>
      </div>
    </div>
  );
};

export default Logo;