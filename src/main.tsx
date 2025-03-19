import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home.tsx';
import Tasks from './pages/Tasks/tasks.tsx';
import { SessionProvider } from './contexts/SessionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Home />} />
              <Route path='/tasks' element={<Tasks />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SessionProvider>
  </StrictMode>,
)
