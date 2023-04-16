import styles from './history.module.css';
import classnames from 'classnames';

const History = (props) => {
  const {history, onClick, slideIn} = props;

  const handleClickItem = (item) => {
    if(onClick){
      onClick(item)
    }
  }

  const historyClass = classnames({
    [styles.root]: true,
    [styles['slide-in']]: slideIn,
    [styles['slide-out']]: !slideIn,
  }); 

  return (
    <div className={styles.wrapper}>
      <div className={historyClass}>
        {history.map(item => (
          <div className={styles.operation} onClick={()=> handleClickItem(item) }>{item.num1} {item.operator} {item.num2}</div>
        ))}
      </div>
    </div>
  )
}

export default History;