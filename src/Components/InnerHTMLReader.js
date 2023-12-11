import React from "react";
import "./InnerHTMLReader.css";

function InnerHTMLReader(props) {
    // Set up mappings of incorrect -> correct symbols
    const symbolCorrections = {
        "\u201D": '"',
        "\u201C": '"', 
        "\u2018": "'",
        "\u2019": "'",
        "\u00B1": "+/-",
        "\u2013": "-",
        "â€™": "'",
        "Â®": "®",
        "â€\"": "—"
      };
  
  // Function to fix symbols 
  function fixSymbols(html) {
    for (let incorrect in symbolCorrections) {
      let correct = symbolCorrections[incorrect];
      html = html.replace(new RegExp(incorrect, 'g'), correct); 
    }
    return html; 
  }
  
  // Usage:
  let html = props.value;
  html = fixSymbols(html);


    return (
        <div className="html" dangerouslySetInnerHTML={{__html: html}} />  
    );
}

export default InnerHTMLReader;