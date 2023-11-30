import React from "react";

function InnerHTMLReader(props) {
    return (
        <div className="html" dangerouslySetInnerHTML={{__html: props.value}} />  
    );
}

export default InnerHTMLReader;