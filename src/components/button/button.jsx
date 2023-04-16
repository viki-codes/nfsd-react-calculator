import styles from './button.module.css';
import classnames from 'classnames';

const Button = (props) => {
  const {value, operator, span, onClick, disabled} = props;

  const handleClick = () => {
    if(onClick && !disabled){
      onClick(value);
    }
  }

  //classnames devuleve un string que contiene las clases de CSS que cumplan las condiciones que se definen en el objeto que le pasamos
  const buttonClass = classnames({
    [styles.root]: true,
    [styles.operator]: operator,
    [styles['span-2']]: span === 2,
    [styles['span-3']]: span === 3,
    [styles.disabled]: disabled
  });
  
  return (
  <button className={buttonClass} onClick={handleClick}>
    {value}
  </button>
  )
}

export default Button;