const PwaInstallPrompt = ({ onInstall, onCancel }) => {
    const [hover, setHover] = useState(false);

    // Define the keyframes animation
    const fadeInSlideDown = {
        '0%': {
            opacity: 0,
            transform: 'translateY(-20px)'
        },
        '100%': {
            opacity: 1,
            transform: 'translateY(0)'
        }
    };

    const styles = {
        promptOverlay: {
            paddingTop: '20px',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            zIndex: 1000,
            animation: `fadeInSlideDown 1s ease forwards` // Apply the animation
        },
        promptContent: {
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#5283A3',
            borderRadius: '5px',
            textAlign: 'center',
            color: 'white',
        },
        button: {
            margin: '10px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: hover ? '#e3f2fd' : '#fff',
            color: '#5283A3',
            transition: 'background-color 0.3s ease'
        }
    };

    return (
        <div  className="fadeIn" style={styles.promptOverlay}>
            <div style={styles.promptContent}>
                <h2 style={{color:'white'}}>IntelSurv App</h2>
                <p>Do you want to install our Progressive Web App?</p>
                <div>
                    <button style={styles.button} onClick={onInstall}>Install</button>
                    <button style={styles.button} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

  
export {PwaInstallPrompt}