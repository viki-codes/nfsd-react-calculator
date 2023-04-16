import {useRef, useEffect} from 'react';
import styles from './display.module.css'

const Display = (props)=> {
  const {num1, num2, operator, onChange, onClickButton, showArrow, showHistory} = props;
  const input = useRef(null);
  
  const isValidKey = (value) => 
  (['1','2','3','4','5','6','7','8','9','0','/','*','-','+','Enter','Backspace'].includes(value));

  const handleKeyPressed = (e)=>{
    if(isValidKey(e.key)){
      let finalValue;
      switch(e.key){
        case '*':
          finalValue='x';
          break;
        case 'Enter':
          finalValue='=';
          break;
        case "Backspace":
          finalValue='DEL';
          break;
        default:
          finalValue = e.key;
          break;
      }
      if(onChange){
        onChange(finalValue);
      }
    }
  }

  const refocus = () => {
    if(input.current !== undefined && input.current !== null){
      input.current.focus();
    }
  }
  const arrow = !showHistory ? '\u2192' : '\u2190';

  return (
    <div className={styles.root}>
      {showArrow && <button className={styles.arrow} onClick={() => onClickButton()}>{arrow}</button>}
      <input ref={input} spellCheck={false} autoFocus onBlur={refocus} className={styles.input} onKeyDown={handleKeyPressed} value={`${num1}${operator}${num2}`}/>
    </div>
    
  )
}

export default Display;