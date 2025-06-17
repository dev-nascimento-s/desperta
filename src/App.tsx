import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tarefas from './pages/Tarefas';
import Metas from './pages/Metas';
import Habitos from './pages/Habitos';
import Lembretes from './pages/Lembretes';

export function App() {
  const [temaAtual, setTemaAtual] = useState<'light' | 'dark'>('light');

  return (
    <ThemeProvider theme={temaAtual === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header toggleTheme={() => setTemaAtual(prev => (prev === 'light' ? 'dark' : 'light'))} />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '2rem' }}>
            <Routes>
              <Route path="/tarefas" element={<Tarefas />} />
              <Route path="/metas" element={<Metas />} />
              <Route path="/habitos" element={<Habitos />} />
              <Route path="/lembretes" element={<Lembretes />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}


