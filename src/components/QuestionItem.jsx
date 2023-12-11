function QuestionItem({ data, index, isExpanded, toggleAnswer }) {
    function removeHtmlTags(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/<[^>]*>/g, '');
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }

    return (
        <div style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: '0', fontSize: '17px', fontWeight: '600' }}>
                    Question {index + 1}: {data.question}
                </p>
                <button 
                    onClick={() => toggleAnswer(data.logID)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {isExpanded ? '▲' : '▼'}
                </button>
            </div>
            {isExpanded && (
                <div style={{ marginTop: '10px' }}>
                    <p><strong>Session ID:</strong> {data.session}</p>
                    <p><strong>Time & Date:</strong> {formatTimestamp(data.timestamp)}</p>
                    <p><strong>Field Name:</strong> {data.fieldName}</p>
                    <p><strong>Context:</strong> {data.context}</p>
                    <p><strong>Answer:</strong> {removeHtmlTags(data.answer)}</p>
                </div>
            )}
        </div>
    );
}

export { QuestionItem };
