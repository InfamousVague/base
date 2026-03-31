import React from 'react';
import { Link } from '@tanstack/react-router';
import { useTheme } from './ThemeProvider';
import { Search } from './Search';

export function TopNav() {
  const { effectiveTheme, toggleTheme, colorMode, toggleColor } = useTheme();

  return (
    <header className="topnav">
      <Link to="/" className="topnav__logo">
        <svg className="topnav__logo-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="3" cy="3" r="1.8"/>
          <circle cx="10" cy="3" r="1.8"/>
          <circle cx="17" cy="3" r="1.8"/>
          <circle cx="3" cy="10" r="1.8"/>
          <circle cx="10" cy="10" r="1.8"/>
          <circle cx="17" cy="10" r="1.8"/>
          <circle cx="3" cy="17" r="1.8"/>
          <circle cx="10" cy="17" r="1.8"/>
          <circle cx="17" cy="17" r="1.8"/>
        </svg>
        Base
      </Link>
      <Search />
      <div className="topnav__spacer" />
      <div className="topnav__actions">
        <button className="topnav__btn" onClick={toggleTheme} title="Toggle theme">
          {effectiveTheme === 'dark' ? (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="3.5"/>
              <line x1="8" y1="1" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="15"/>
              <line x1="1" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="15" y2="8"/>
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13.5 8.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7z"/>
            </svg>
          )}
          <span>{effectiveTheme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
        <button className="topnav__btn" onClick={toggleColor} title="Toggle color mode">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="6"/>
            <circle cx="6" cy="6.5" r="1.5"/>
            <circle cx="10" cy="6.5" r="1.5"/>
            <circle cx="8" cy="10.5" r="1.5"/>
          </svg>
          <span>{colorMode ? 'Mono' : 'Color'}</span>
        </button>
      </div>
    </header>
  );
}
