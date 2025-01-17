import styles from "./styles/login.module.css";

export default function Home() {
  return (
    <>
      <form className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
