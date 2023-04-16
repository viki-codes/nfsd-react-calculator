import React,{useState} from 'react';
import styles from './app.module.css';
import Display from './components/display/display';
import Button from './components/button/button';
import History from './components/history/history'


const  App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState('false');

  const isOperator =(buttonValue) => {
    return ["C", "x", "+", "-", "DEL", "/", "="].includes(buttonValue);
  }

  const isInt =(n) => {
    return n % 1 === 0;
 }

  const handleClickHistory = (historyItem) => {
    setNum1(historyItem.num1);
    setNum2(historyItem.num2);
    setOperator(historyItem.operator);
  }

  const handleClickButton = (buttonValue) => {
    if(!isOperator(buttonValue)){
      handleNumericalValue(buttonValue)
    }else{
      handleOperatorValue(buttonValue)
    }
  }

  const reset = () => {
    setNum1('');
    setNum2('');
    setOperator('')
  }

  const solve= () => {
    //guardamos la operación en el historico aunqu esta falle
    setHistory([...history, {num1, num2, operator}]);

    //transformamos los strings en Numbers para poder operar correctamente
    const numerical1 = Number.parseFloat(num1);
    const numerical2 = Number.parseFloat(num2);
    let total = 0;
    switch (operator) {
      case "+":
        total = numerical1 + numerical2;
        break;
      case "-":
        total = numerical1 - numerical2;
        break;
      case "x":
        total = numerical1 * numerical2;
        break;
      case "/":
        total = numerical1 / numerical2;
        break;
      default:
        total = 'ERROR'
    }
    setNum2('');
    setOperator('');
    if(total !== 'ERROR' && !isNaN(total)){
      //si el numero es entero (no tiene decimales) seteamos el numero sin decimales
      //si es decimal, limitamos el numero de decimales a 2
      if(isInt(total)){
        setNum1(""+total);
      }else{
        setNum1("" + total.toFixed(2));
      }
    }else{
      setNum1('ERROR')
    }
    

  }

  const handleDeleteOperator = () => {
    if(num2){
      setNum2(num2.slice(0, -1));
    }else if(operator){
      setOperator("");
    }else if(num1){
      setNum1(num1.slice(0, -1));
    }
  }

  const canSolve = () => {
    return (num1 !== '' && operator !== '' && num2 !== '')
  }

  const handleOperatorValue = (operatorValue) => {
    switch(operatorValue) {
      case "C":
        reset();
        break;
      case "DEL":
        handleDeleteOperator();
        break;
      case "=":
        if(canSolve()){
          solve();
        }
        break;
      default:
        if(canSolve()){
          solve()
        }
        setOperator(operatorValue);
        break;
    }
  }

  const handleNumericalValue = (numValue)=>{
    if(!operator){
      setNum1(num1 + numValue);
    }else{
      setNum2(num2 + numValue);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <Display num1={num1} operator={operator} num2={num2} onChange={handleClickButton} onClickButton={()=>setShowHistory(!showHistory)} showArrow={history.length > 0} showHistory={showHistory} />
        <div className={styles.grid}>
          <Button value="C" operator span={2} onClick={handleClickButton} />
          <Button value="DEL" operator onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="/" operator onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="7" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="8" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="9" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="x" operator onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="4" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="5" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="6" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="-" operator onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="1" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="2" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="3" onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="+" operator onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="0" span={3} onClick={handleClickButton} disabled={num1 === 'ERROR'} />
          <Button value="=" operator onClick={handleClickButton} disabled={num1 === 'ERROR' || !canSolve()} />
        </div>
      </div>
      <History history={history} onClick={handleClickHistory} slideIn={showHistory}/>
    </div>
    
  );
}

export default App;
