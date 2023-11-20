import { useState } from "react";
import "./Checkbox.css"

const Checkbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="checkbox-wrapper">
      <label>
        <input className={isChecked ? "checked" : ""} type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)}/>
        <div className="checkbox-title">{props.label}</div>
      </label>
    </div>
  );
};
export default Checkbox;