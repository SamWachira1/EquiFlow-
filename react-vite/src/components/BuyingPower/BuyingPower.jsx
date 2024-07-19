import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkUpdateBuyingPower } from '../../redux/session';
import { FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import styles from './BuyingPower.module.css';

const BuyingPower = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeposit = () => {
    const amountStr = depositAmount.trim();
    const amount = parseFloat(amountStr);

    if (amountStr === '' || isNaN(amountStr)) {
      setErrorMessage('*Please enter deposit amount');
    } else if (amount <= 0) {
      setErrorMessage('*Please enter a positive deposit amount');
    } else {
      dispatch(thunkUpdateBuyingPower(amount));
      setDepositAmount('');
      setErrorMessage('');
    }
  };

  const formattedBuyingPower = user?.buying_power ? Math.max(0, parseFloat(user.buying_power.toFixed(2))).toLocaleString() : '0.00';

  return (
    user ? (
      <div className={styles.buyingPower}>
        <div className={styles.header} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className={styles.headerLeft}>
            <span>Buying power</span>
            <FaInfoCircle className={styles.infoIcon} />
          </div>
          <div className={styles.headerRight}>
            <span className={styles.amount}>${formattedBuyingPower}</span>
            {isDropdownOpen ? <FaChevronUp className={styles.icon} /> : <FaChevronDown className={styles.icon} />}
          </div>
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <div className={styles.info}>
              <div>Individual cash</div>
              <div>${formattedBuyingPower}</div>
            </div>
            <div className={styles.total}>
              <div>Total</div>
              <div>${formattedBuyingPower}</div>
            </div>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <div className={styles.actions}>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Deposit amount"
                min="0" // Prevent negative values
              />
              <button onClick={handleDeposit}>Deposit funds</button>
            </div>
          </div>
        )}
      </div>
    ) : null
  );
};

export default BuyingPower;
