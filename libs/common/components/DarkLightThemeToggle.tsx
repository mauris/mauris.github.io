import { MouseEventHandler, useEffect, useState } from 'react';

function initializeDarkModeState() {
  // check for server-side render
  if (typeof window === 'undefined') {
    return false;
  }

  const theme = localStorage.getItem('theme');
  // check user's system preference
  if (theme === 'dark' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    return true;
  }
  document.documentElement.classList.remove('dark');
  return false;
}

export function DarkLightThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(initializeDarkModeState());
  }, []);

  const toggleTheme: MouseEventHandler = (e) => {
    e.preventDefault();
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
    document.documentElement.classList.toggle('dark');
    setDarkMode((cur) => !cur);
  };

  return (
    <a title="Toggle Theme" className="cursor-pointer select-none" onClick={toggleTheme}>
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </a>
  );
}

function MoonIcon() {
  return (
    <svg
      className="text-slate-800 dark:text-white inline"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
    >
      <path d="M 12.910156 23.46875 C 6.582031 23.46875 1.4375 18.324219 1.4375 12 C 1.4375 5.675781 6.585938 0.53125 12.910156 0.53125 C 13.292969 0.53125 13.679688 0.546875 14.0625 0.585938 C 14.398438 0.617188 14.695312 0.828125 14.835938 1.132812 C 14.976562 1.4375 14.949219 1.800781 14.761719 2.082031 C 13.683594 3.664062 13.109375 5.515625 13.109375 7.433594 C 13.109375 12.355469 16.800781 16.445312 21.699219 16.929688 C 22.035156 16.964844 22.332031 17.175781 22.472656 17.480469 C 22.617188 17.785156 22.585938 18.144531 22.398438 18.425781 C 20.25 21.585938 16.707031 23.46875 12.910156 23.46875 Z M 12.324219 2.46875 C 7.332031 2.773438 3.359375 6.933594 3.359375 12 C 3.359375 17.265625 7.644531 21.546875 12.910156 21.546875 C 15.554688 21.546875 18.046875 20.453125 19.835938 18.5625 C 17.671875 18.015625 15.707031 16.835938 14.175781 15.160156 C 12.25 13.039062 11.183594 10.304688 11.183594 7.445312 C 11.1875 5.703125 11.578125 4.011719 12.324219 2.46875 Z M 12.324219 2.46875 " />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="text-slate-800 dark:text-white inline"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
    >
      <path d="M 12 5.105469 C 8.199219 5.105469 5.105469 8.199219 5.105469 12 C 5.105469 15.800781 8.199219 18.894531 12 18.894531 C 15.800781 18.894531 18.894531 15.800781 18.894531 12 C 18.894531 8.199219 15.800781 5.105469 12 5.105469 Z M 12 17.363281 C 9.042969 17.363281 6.636719 14.957031 6.636719 12 C 6.636719 9.042969 9.042969 6.636719 12 6.636719 C 14.957031 6.636719 17.363281 9.042969 17.363281 12 C 17.363281 14.957031 14.957031 17.363281 12 17.363281 Z M 12 17.363281 " />
      <path d="M 12 3.921875 C 12.421875 3.921875 12.765625 3.582031 12.765625 3.15625 L 12.765625 0.765625 C 12.765625 0.34375 12.421875 0 12 0 C 11.578125 0 11.234375 0.34375 11.234375 0.765625 L 11.234375 3.15625 C 11.234375 3.582031 11.578125 3.921875 12 3.921875 Z M 12 3.921875 " />
      <path d="M 12 20.078125 C 11.578125 20.078125 11.234375 20.417969 11.234375 20.84375 L 11.234375 23.234375 C 11.234375 23.65625 11.578125 24 12 24 C 12.421875 24 12.765625 23.65625 12.765625 23.234375 L 12.765625 20.84375 C 12.765625 20.417969 12.421875 20.078125 12 20.078125 Z M 12 20.078125 " />
      <path d="M 5.207031 6.289062 C 5.503906 6.589844 5.988281 6.589844 6.289062 6.289062 C 6.589844 5.988281 6.589844 5.503906 6.289062 5.207031 L 4.597656 3.515625 C 4.300781 3.214844 3.8125 3.214844 3.515625 3.515625 C 3.214844 3.8125 3.214844 4.296875 3.515625 4.597656 Z M 5.207031 6.289062 " />
      <path d="M 18.792969 17.710938 C 18.496094 17.410156 18.011719 17.410156 17.710938 17.710938 C 17.410156 18.011719 17.410156 18.496094 17.710938 18.792969 L 19.402344 20.484375 C 19.699219 20.785156 20.1875 20.785156 20.484375 20.484375 C 20.785156 20.1875 20.785156 19.703125 20.484375 19.402344 Z M 18.792969 17.710938 " />
      <path d="M 3.921875 12 C 3.921875 11.578125 3.582031 11.234375 3.15625 11.234375 L 0.765625 11.234375 C 0.34375 11.234375 0 11.578125 0 12 C 0 12.421875 0.34375 12.765625 0.765625 12.765625 L 3.15625 12.765625 C 3.582031 12.765625 3.921875 12.421875 3.921875 12 Z M 3.921875 12 " />
      <path d="M 23.234375 11.234375 L 20.84375 11.234375 C 20.417969 11.234375 20.078125 11.578125 20.078125 12 C 20.078125 12.421875 20.417969 12.765625 20.84375 12.765625 L 23.234375 12.765625 C 23.65625 12.765625 24 12.421875 24 12 C 24 11.578125 23.65625 11.234375 23.234375 11.234375 Z M 23.234375 11.234375 " />
      <path d="M 5.207031 17.710938 L 3.515625 19.402344 C 3.214844 19.703125 3.214844 20.1875 3.515625 20.484375 C 3.8125 20.785156 4.296875 20.785156 4.597656 20.484375 L 6.289062 18.792969 C 6.589844 18.496094 6.589844 18.011719 6.289062 17.710938 C 5.988281 17.410156 5.503906 17.410156 5.207031 17.710938 Z M 5.207031 17.710938 " />
      <path d="M 18.792969 6.289062 L 20.484375 4.597656 C 20.785156 4.296875 20.785156 3.8125 20.484375 3.515625 C 20.1875 3.214844 19.703125 3.214844 19.402344 3.515625 L 17.710938 5.207031 C 17.410156 5.503906 17.410156 5.988281 17.710938 6.289062 C 18.011719 6.589844 18.496094 6.589844 18.792969 6.289062 Z M 18.792969 6.289062 " />
    </svg>
  );
}
