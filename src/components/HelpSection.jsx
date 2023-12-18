// components/HelpSection.js
import React from 'react';
import { useRef,useState,useEffect } from 'react'


function HelpSection () {

    const [isScreenSmall, setIsScreenSmall] = useState(null); 

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

  const headerStyle = {
    backgroundColor: '#5283A3',
    color: 'white',
    padding: '10px 20px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    fontSize: '24px',
    textAlign: 'center',
  };

  const sectionStyle = {
    padding: '20px',
    borderBottom: '1px solid #ddd',
    backgroundColor: 'transparent',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    color: '#5283A3',
    marginBottom: '10px',
  };

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


  return (
    <div style={containerStyle}>
         {isScreenSmall && (
    <a href="/" style={{ marginBottom: '30px', color: '#007bff', textDecoration: 'none', fontSize: '18px', display: 'block', textAlign: 'center', fontWeight: 'bold' }}>
      ← Go to Homepage
    </a>
  )}
      <div style={headerStyle}>Help & Support</div>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>FAQs</h2>
        <ul>
    <li><b>Where do the fields displayed in the left menu come from?</b><br/>The left menu contains the fields (also referred to as elements of the Case Base Surveillance and Reporting Form (CBSR) used as part of Integrated Disease Surveillance and Reporting Systems (IDSR) in Malawi. The fields are shown with the same name and in the order in which they appear on the form.</li>
    <li><b>What happens when I select a field?</b><br/>When you click on a field, you are directed to a page that contains a description of the field and its options (if any are available). You can select predefined questions about the field or ask your own.</li>
    <li><b>How do I ask a question?</b><br/>You can ask a question from the page showing details for the field you selected, using the chat window.</li>
    <li><b>How are the questions answered?</b><br/>The questions are sent to a large language model (in this case, GPT-4) which has been trained to answer questions regarding the CBSR and IDSR processes in Malawi.</li>
    <li><b>Is there a history of the questions I ask?</b><br/>Yes, below the chat window there is a section showing a history of all the questions you asked and the answers that were given. Note that if you refresh the cache of your browser, you will lose these questions.</li>
    <li><b>Can I access IntelSurv offline?</b><br/>Yes. You can read about how to install the offline app below.   </li>
<br/>
    <div style={{paddingLeft:'7%'}}><b>Install the online app on a PC</b><br/>

In a normal browser like Chrome and Firefox, when you load the page you will see a small icon in the url window. By clicking on it you can install the app.
<br/>
<img src="./install-1.png" width={'100%'} height={'60%'} />
<b>Note. This icon does not display on Safari browsers.</b>

<br/><br/>
<b>Install the online app on a mobile phone</b><br/>
On a mobile phone, open the link <b>https://intelsurv.vercel.app</b> in a browser, then choose the icon that looks like three dots stacked up - this will open a menu showing an Install App option. See the succession of images below.
<img src="./install-2.png" width={'100%'} height={'60%'} />

</div>
<br/>

</ul>

      </section>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Getting Started</h2>
        To learn how to get started, please watch the video below.<br/><br/>
        <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/NQxyN7ZGMLw" // Replace [VIDEO_ID] with the actual YouTube video ID
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      </section>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Troubleshooting</h2>
        <p>Try to refresh the page. Take a screenshot or take notes about what went wrong.

Send an email to <b>kuyeserai@gmail.com</b></p>
      </section>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Contact</h2>
        <p>Send an email to <b>kuyeserai@gmail.com</b></p>
      </section>
    </div>
  );
};

export default HelpSection;