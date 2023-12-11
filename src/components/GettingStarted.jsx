import { Logo2 } from '@/components/logo2';

const styles = {
    mainContainer: {
        fontFamily: '"Segoe UI", Arial, sans-serif',
        color: '#333',
        padding: '30px',
        maxWidth: '800px',
        margin: 'auto',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
        borderRadius: '10px'
    },
    header: {
        color: '#5283A3',
        marginBottom: '20px'
    },
    paragraph: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#4A4A4A',
        textAlign: 'justify'
    },
    list: {
        textAlign: 'left',
        paddingLeft: '20px'
    },
    link: {
        color: '#5283A3',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#5283A3',
        color: 'white',
        marginTop: '10px',
        marginRight: '10px',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    listItem: {
        marginBottom: '5px'
    }
};

// Adding hover effect for buttons
const hoverStyle = {
    ...styles.button,
    backgroundColor: '#6ba4d1'
};

function GettingStarted ({ isScreenSmall, toggle, setShowHelpPage, showHelpPage }) {
    return (
        <div style={styles.mainContainer}>
            <Logo2 />

            <h1 style={styles.header}>Getting Started</h1>
            <div style={styles.paragraph}>
                <p className='dark:text-white'>
                    Hello, I am <a href="#" style={styles.link}>IntelSurv</a>, your AI assistant for disease surveillance data collection...
                </p>

                <p className='dark:text-white'>You can ask me 3 kinds of questions:</p>
                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>Case definitions of diseases</strong></li>
                    <li style={styles.listItem}><strong>Form fields</strong></li>
                    <li style={styles.listItem}><strong>General surveillance</strong></li>
                </ul>

                <p className='dark:text-white'>By default, I am listening to case definitions. But you can select the database you want when asking a question.</p>

                <p className='dark:text-white'>To get started, {isScreenSmall ? 'click the "Open Questionnaire Fields" button below to display available fields.' : 'select a form field from the list to your left.'} To filter and search for your preferred field, simply input your search query. The fields are numbered in the order they appear on the form.</p>
                <button
                    style={styles.button}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = styles.button.backgroundColor}
                    onClick={() => setShowHelpPage(true)}
                >
                    Go to Help Page
                </button>

                {isScreenSmall && (
                    <button
                        style={styles.button}
                        onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                        onMouseLeave={e => e.target.style.backgroundColor = styles.button.backgroundColor}
                        onClick={() => toggle()}
                    >
                        View and Select Fields
                    </button>
                )}
            </div>
        </div>
    );
}

export default GettingStarted;
