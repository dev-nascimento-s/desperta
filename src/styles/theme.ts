// src/styles/theme.ts
export interface Theme {
  background: string;
  text: string;
  primary: string;
  cardBackground: string;
  border: string;
}

export const lightTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#ff0000',
  cardBackground: '#f9f9f9',
  border: '#dddddd',
};

export const darkTheme: Theme = {
  background: '#121212',
  text: '#f5f5f5',
  primary: '#00ffff',
  cardBackground: '#1e1e1e',
  border: '#333333',
};
