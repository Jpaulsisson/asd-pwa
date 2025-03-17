import { Outlet } from 'react-router-dom';
import styles from './App.module.css'
import { useTheme } from './contexts/Themecontext';
import { useEffect, useState } from 'react';
import SideNav from './components/SideNav/SideNav';
import MenuIcon from './components/MenuIcon/MenuIcon';


function App() {
  const { theme } = useTheme();


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const [isOpen, setIsOpen] = useState(false);

  function toggleSideNav() {
    setIsOpen((prev) => !prev);
  }

  // function testMessage() {
  //   const id = Date.now().toString();

  //   if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
  //     // Send the attachment to the service worker
  //     navigator.serviceWorker.controller.postMessage({
  //       type: 'CACHE_ATTACHMENT',
  //       payload: { id: id, mobile: isMobile, os: osName },
  //     });
  //   } else {
  //     // Upload directly if no service worker
  //     console.log(`ID uploaded directly: ${id}`);
  //   }
  //   return;
  // }

  return (
    <main>
      <header>
        <button className={styles.menuButton} onClick={toggleSideNav}>
          <MenuIcon size={32} />
        </button>
        <SideNav isOpen={isOpen} onClose={toggleSideNav} />
      </header>
      <main>
        <Outlet />
        <button>Sign in</button>
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </main>


  )
}

export default App;

