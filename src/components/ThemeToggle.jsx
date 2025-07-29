import { useState } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;