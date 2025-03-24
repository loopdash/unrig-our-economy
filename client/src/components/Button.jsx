import React from 'react';

function Button({ href, text, color = '#000', bgColor = '#5371FF' }) {
  return (
    <a
      href={href}
      className="inline-block w-[131px] h-[40px] min-w-full text-white text-center leading-[40px] uppercase hover:underline"
      style={{
        backgroundColor: bgColor,
        color: 'white',
        border: `3px solid ${color}`,
        boxShadow: `-4px 4px 0 0 ${bgColor}`,
      }}
    >
      {text}
    </a>
  );
}

export default Button;
