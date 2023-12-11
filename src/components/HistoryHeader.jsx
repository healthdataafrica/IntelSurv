function HistoryHeader ({ isHistoryExpanded, toggleHistory,toggleExpandAll,expandAll }) {

    return (
        <>
    <button
        onClick={toggleHistory}
        style={{
            backgroundColor: '#5283A3',
            color: 'white',
            marginTop: '10px',
            marginRight: '10px',
            padding: '8px',
            border: '1px solid #5283A3',
            fontSize: '15px',
            cursor: 'pointer',
        }}
    >
        {isHistoryExpanded ? 'Hide History' : 'Show History'}
    </button>

    <button
            type="button"
            style={{
              
            backgroundColor: '#ffffff',
            color: 'grey',
            marginTop: '10px',
            marginRight: '10px',
            padding: '8px',
            border: '1px solid #5283A3',
            fontSize: '15px',
            cursor: 'pointer',
        }}
            onClick={toggleExpandAll}
        >
            {expandAll ? "Collapse All" : "Expand All"}
        </button>


    </>
    
    )
};

export {HistoryHeader}