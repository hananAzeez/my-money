import { useState } from "react";
import { useSignup } from "./../../hooks/useSignup";

//styles
import styles from "./Signup.module.css";

const Signup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`full name: ${displayName}`);
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
    signup(email, password, displayName);
  };
  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>SignUp</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
