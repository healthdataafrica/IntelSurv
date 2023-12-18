import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { ModeToggle } from '@/components/ModeToggle'
import { MobileSearch, Search } from '@/components/Search'
import store from "../stores/store";
import Cursor from './icons/cursor'


export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  const { mainStore } = store;
  const {setShowHelpPage, showHelpPage,setSelectedFormField} = mainStore();

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  const handleLogoClick = () => {
    console.log("Logo clicked!");

  

  };

  const handleGotoHelpPage = () => {

    setSelectedFormField(null);
    setShowHelpPage(true);  

  };

  function TopLevelNavItem({ children, onClick }) {
    return (
      <div style={{ display: 'inline-block' }}> {/* Changed to inline-block */}
        <a style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} onClick={onClick}>
          
          {children}
          <img src="./question.png" width={18} height={18} style={{ display: 'inline-block',marginLeft: '10px' }} />
        </a>
      </div>
    );
  }
  const PwaInstallPrompt = ({ onInstall, onCancel }) => {
    const styles = {
        promptOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        },
        promptContent: {
            padding: '20px',
            backgroundColor: '#5283A3', // The specified background color
            borderRadius: '10px',
            textAlign: 'center',
            color: 'white',
        },
        button: {
            margin: '10px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#fff',
            color: '#5283A3',
        }
    };

    return (
        <div style={styles.promptOverlay}>
            <div style={styles.promptContent}>
                <h2>Install App</h2>
                <p>Do you want to install our Progressive Web App?</p>
                <div>
                    <button style={styles.button} onClick={onInstall}>Install</button>
                    <button style={styles.button} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
  

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5'
        )}
      />
      <Search />

      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-6" onClick={handleLogoClick}  />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
          {/*<TopLevelNavItem href="#">Contact</TopLevelNavItem>

            <TopLevelNavItem href="#">Documentation</TopLevelNavItem>*/}
            
            {showHelpPage == null &&  <TopLevelNavItem  onClick={handleGotoHelpPage}>Go to Help Page</TopLevelNavItem>}
            {showHelpPage != null && <a href="/" style={{ marginBottom: '0px', color: '#007bff', textDecoration: 'none', fontSize: '15px', display: 'block', textAlign: 'center', fontWeight: 'bold' }}>
      ← Return to Homepage</a>}
          
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
         {/* <MobileSearch />*/}
          <ModeToggle />
        </div>
       {/*} <div className="hidden min-[416px]:contents">
          <Button href="#">Sign in</Button>
        </div> */}
      </div>
    </motion.div>
  )
})
