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



function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
      />
    </svg>
  )
}

function SearchInput({ original, onDataFilter }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '') {
      onDataFilter(original);
    } else {
      // Search the original dataset rather than the most recent filtered data
      let result = original.map(entry => {
        let filteredLinks = entry.links.filter(link =>
          link.title.toLowerCase().includes(search.toLowerCase())
        );

        return {
          title: entry.title,
          links: filteredLinks
        };
      })
        .filter(entry => entry.links.length > 0);

      onDataFilter(result);
    }
  }, [search]);

  return (
    <div className="group relative flex h-10" style={{ marginBottom: '20px', marginTop: '40px', width: '250px' }}>
      <SearchIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
      <input
        className='flex-auto appearance-none bg-transparent pl-10 text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white sm:text-sm border border-zinc-100'
        placeholder='Filter Field Names'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
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




function transformData(data) {

  function convertQuestions(inputs) {
    return inputs.map(input => ({
        href: '#',
        name: 'Derived Question',
        description: input.derivedQuestion,
        icon: ChatBubbleIcon,  // Assuming ChatBubbleIcon is already defined elsewhere in your code
        pattern: {
            y: -6,
            squares: [
                [-1, 2],
                [1, 3],
            ],
        },
        semContext: input.semContext,
        synContext: input.synContext,
        category: input.category,
        extraContentAnswer: input.extraContentAnswer
    }));
}

  const transformedLinks = data.map(item => ({
    title: item.elemName,
    href: item.elemID.toString(),
    elemDescr: item.elemDescr,
    elemOrder: item.elemOrder,
    idsrQPID: item.idsrQPID,
    idsrQListing: item.idsrQListing,
    qOptions: item.qOptions,
    elemQuestion: item.elemQuestion.length !=0? convertQuestions(item.elemQuestion):[],
   

  }));

  return [
    {
      title: 'Form Fields',
      links: transformedLinks
    }]
}



export function Navigation(props) {
  const { mainStore } = store;
  const { currentActiveField, setCurrentActiveField, questionnaireElements, setQuestionnaireElements, setSelectedFormField, selectedFormField } = mainStore();
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  let { isOpen, toggle, close } = useMobileNavigationStore();



  const Loader = () => {
    const containerStyle = {
      height: '10px',
      width: '80px',
      margin: 'auto'
    };

    return (
      <div style={containerStyle}>
        <img src="/loader.gif" height="5px" alt="Loading" />
        <p>Loading...</p>
      </div>
    );
  };


  useEffect(() => {
    const fetchData = async () => {

      if (questionnaireElements == null) {
        try {
          // ... Your async operations, like fetching data, etc.
          let response = await fetchFormElements(1, 5);
          let data = await response;
          console.log('data', data);
          const transformedData = transformData(data);
          console.log('transformed', transformedData);
          setOriginalData(transformedData);
          setFilteredData(transformedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log('Current activeLink state:', currentActiveField);
  }, [currentActiveField]);

  useEffect(() => {
    // console.log('selected Form Field:', selectedFormField); 
  }, [selectedFormField]);

  return (
    <>
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
         { /*<li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
            <Button href="#" variant="filled" className="w-full">
              Sign in
            </Button>
          </li>*/}
        </ul>
      </nav>
    </>
  )
}


