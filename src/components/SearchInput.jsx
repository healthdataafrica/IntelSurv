import { useRef, useState, useEffect } from 'react'
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
          placeholder='Start typing to search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    );
  }

  export {SearchInput}