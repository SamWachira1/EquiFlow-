// src/components/Transactions.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsThunk } from '../../redux/transactions';
import styles from './Transactions.module.css';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  useEffect(() => {
    dispatch(getTransactionsThunk());
  }, [dispatch]);

  return (
    <div className={styles.transactions}>
      <h2>Recent Transactions</h2>
      <table className={styles.transactionsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th># Shares</th>
            <th>Date</th>
            <th>Price</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.symbol}</td>
              <td>{transaction.shares}</td>
              <td>{new Date(transaction.transaction_date).toLocaleString()}</td>
              <td>{transaction.transaction_price}</td>
              <td>{transaction.transaction_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
