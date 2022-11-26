import styles from "./Home.module.css";
import { useFirestore } from "./../../hooks/useFirestore";

const TransactionList = ({ transactions }) => {
  const { deleteDocument, response } = useFirestore("transactions");
  console.log(response);
  // const userTransactions = transactions.filter(
  //   (transaction) => user.uid === transaction.uid
  // );
  // console.log(userTransactions);
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>₹{transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
