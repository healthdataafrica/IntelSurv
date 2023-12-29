import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import store from "../stores/store";
import { fetchFormElements } from "../helpers/fetchFormElements";
import { ChatBubbleIcon} from './icons/ChatBubbleIcon'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '@/helpers/loader';
import useWindowSize from '@/helpers/handleResize'
import { SearchInput } from './SearchInput'




function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}






function TopLevelNavItem({ href, children }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({ href, tag, isAnchorLink = false, setActiveLink, children, setSelectedFormField, link, closeNav, isMobile }) {
  const handleClick = (e) => {
    
    e.preventDefault();
    setActiveLink(href);
    setSelectedFormField(link);
    console.log('Selected Form', link);
   
    closeNav();
    
  };


  return (
    <a
      href={href}
      onClick={handleClick}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </a>
  );
}

function VisibleSectionHighlight({ group, pathname }) {
  let itemHeight = remToPx(2);
  let height = "35px";

  // This determines the position of the link in the list
  let top = group.links.findIndex((link) => link.href === pathname) * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  );
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className, setActiveLink, activeLink, setSelectedFormField, closeNav }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()


  let isActiveGroup = group.links.findIndex((link) => link.href === activeLink) !== -1;

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={activeLink} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={activeLink} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink  closeNav={closeNav} isMobile={isInsideMobileNavigation}
                href={link.href}
                setActiveLink={setActiveLink}
                setSelectedFormField={setSelectedFormField}
                link={link}

              >
                {link.href} - {link.title}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function Navigation(props) {
  const { mainStore } = store;
  const { originalData, filteredData,setOriginalData, setFilteredData,currentActiveField, setCurrentActiveField, questionnaireElements, setQuestionnaireElements, setSelectedFormField, selectedFormField, currentSession, setCurrentSession, chatLogs, setChatLogs} = mainStore();
    let { isOpen, toggle, close } = useMobileNavigationStore();
    const isScreenSmall = useWindowSize();
 


  return (
    <>


{ isScreenSmall ? <a href="#" onClick={() => close()}  style={{marginBottom:'15px', color: '#5283A3'}}>Close Window </a>:null}
       

      <nav {...props}>
        <SearchInput original={originalData} data={filteredData} onDataFilter={setFilteredData} />
        <ul role="list">
          {originalData.length != 0 ? filteredData.map((group, groupIndex) => (
            <NavigationGroup setActiveLink={setCurrentActiveField} activeLink={currentActiveField} closeNav={close}
              setSelectedFormField={setSelectedFormField}
              key={group.title}
              group={group}
              className={groupIndex === 0 && 'md:mt-0'}
            />
          )) : <Loader />}
           </ul>
      </nav>
    </>
  )
}


