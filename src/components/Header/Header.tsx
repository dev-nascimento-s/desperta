import React from 'react';

interface HeaderProps {
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <header>
      <button onClick={toggleTheme}>Trocar Tema</button>
    </header>
  );
};

