import "./Slider.css"

const Slider = (props) => {

    const MIN = props.MIN;
    const MAX = props.MAX;
    const UNIT = props.UNIT
    const CURRENCY = props.CURRENCY
  
    const getBackgroundSize = () => {
      return { backgroundSize: `${(props.sliderValue * 100) / MAX}% 100%` };
    };
  
    return (
      <div className="slider-container">
        <input 
            className="slider"
            type="range" 
            min={MIN}
            max={MAX}
            onChange={(e) => props.setSliderValue(e.target.value)}  
            style={getBackgroundSize()} value={props.sliderValue} 
        />
        <div className="min-max-value">
            <div className="min-value"> {CURRENCY}{MIN}{UNIT}</div>
            <div className="length-output">
                {CURRENCY}{props.sliderValue}{UNIT}
            </div>
            <div className="max-value">{CURRENCY}{MAX}{UNIT}</div>
        </div>
        
      </div>
    )
  }
  
  export default Slider;