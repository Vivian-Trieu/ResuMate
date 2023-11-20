import { useState } from "react";
import "./Checkbox.css"

const Checkbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const filled = {backgroundColor: '#00a7a6'}
  const unfilled = {backgroundColor: "#e9e9e9"}
  const checkedBoxUnfilled = {border: "0.15em solid #8e8e8e"}
  const checkedBoxFilled = {border: "none"}
  const textFilled = {color: "#ffffff"}
  const textUnfilled = {color: "#8e8e8e"}


  return (
    <div className="checkbox-wrapper" style={isFilled ? filled : unfilled}>
      {/* <div className={isFilled ? "filled" : ""}> */}
        <label>
          <input className={isChecked ? "checked" : ""} type="checkbox" style={isFilled ? checkedBoxFilled : checkedBoxUnfilled} checked={isChecked} onChange={() => {setIsChecked((prev) => !prev); setIsFilled((prev) => !prev)}}/>
          <div className="checkbox-title" style={isFilled ? textFilled : textUnfilled}>{props.label}</div>
        </label>
      {/* </div> */}
    </div>
  );
};
export default Checkbox;