//styles
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>content</div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
