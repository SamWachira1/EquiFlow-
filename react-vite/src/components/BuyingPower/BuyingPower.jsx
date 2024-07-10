// src/components/BuyingPower.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBuyingPower } from '../../redux/session';
import { thunkUpdateBuyingPower } from '../../redux/session';
import { FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import styles from './BuyingPower.module.css';

const BuyingPower = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
  
    const handleDeposit = () => {
      const amount = parseFloat(depositAmount);
      if (!isNaN(amount) && amount > 0) {
        dispatch(thunkUpdateBuyingPower(amount));
        setDepositAmount('');
      }
    };
  
    return (
      user ? (<div className={styles.buyingPower}>
        <div className={styles.header} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className={styles.headerLeft}>
            <span>Buying power</span>
            <FaInfoCircle className={styles.infoIcon} />
          </div>
          <div className={styles.headerRight}>
            <span className={styles.amount}>${user.buying_power.toLocaleString()}</span>
            {isDropdownOpen ? <FaChevronUp className={styles.icon} /> : <FaChevronDown className={styles.icon} />}
          </div>
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <div className={styles.info}>
              <div>Individual cash</div>
              <div>${user.buying_power.toLocaleString()}</div>
            </div>
            <div className={styles.total}>
              <div>Total</div>
              <div>${user.buying_power.toLocaleString()}</div>
            </div>
            <div className={styles.actions}>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Deposit amount"
              />
              <button onClick={handleDeposit}>Deposit funds</button>
            </div>
          </div>
        )}
      </div>) : null 
    );
  };
  

export default BuyingPower;
