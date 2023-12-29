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


  export {Loader}