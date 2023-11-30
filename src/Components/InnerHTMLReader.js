import React from "react";
import "./InnerHTMLReader.css";

function InnerHTMLReader(props) {
    return (
        <div className="html" dangerouslySetInnerHTML={{__html: props.value}} />  
    );
}

export default InnerHTMLReader;