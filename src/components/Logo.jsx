import store from "../stores/store";
import { useRef,useState,useEffect } from 'react'


export function Logo(props) {

  const { mainStore } = store;
  const {setShowHelpPage,setSelectedFormField, selectedFormField ,currentActiveField, setCurrentActiveField,} = mainStore();
  const [isScreenSmall, setIsScreenSmall] = useState(null); 
  
  useEffect(() => {
    function handleResize() {
      // Check if screen size is less than a specific size
      setIsScreenSmall(window.innerWidth < 640);
    }

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Set the initial value
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleLogoClick = () => {
    setShowHelpPage(null);
    setCurrentActiveField(null);
   setSelectedFormField(null);
  };


  return (
   <svg viewBox="0 0 250 24" aria-hidden="true" {...props} onClick={() => handleLogoClick()}>
       { !isScreenSmall?<path
        fill="#5283A3"
        d="M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v13.927a1 1 0 0 0 1.623.782l3.684-2.93a4 4 0 0 1 2.49-.87H11a5 5 0 0 0 5-5V8Z"
      />:null}

      { !isScreenSmall? <svg width="200" height="20" xmlns="http://www.w3.org/2000/svg" >
        <text className="dark:fill-white" x="25" y="20" font-family='Suez One' font-size="25" fill="#3C3B40">IntelSurv</text>
      </svg>:null}
      <svg width="250" height="28" xmlns="http://www.w3.org/2000/svg" >
        <text className="dark:fill-white" x= {isScreenSmall? '5' : "145"} y="20" font-family='Inter' font-size="13" fill="#3C3B40">Version 1.0.0.5 </text>
      </svg>


    </svg>
  )
}

