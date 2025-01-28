"use client";

import styles from "./styles/login.module.css";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("isLogged") === "true";
      setIsLogged(isLoggedIn);
    }
  }, []);

  const router = useRouter();

  const { login, loading, error } = useAuthentication();

  if (user == "1234") {
    setUser("alisonserafim.tec@gmail.com");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email: user,
      password: password,
    };
    await login(data);
  };

  useEffect(() => {
    if (isLogged) {
      router.push("/dashboard");
    }
  }, [isLogged]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuario"
          required
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="">
          {loading ? "Entrando..." : "Login"}
        </button>
        {error && (
          <p className="absolute py-4 bg-red-500 w-1/3 border-2 border-red-900 text-center rounded-xl text-[#F4F4F5] bottom-20">
            {error}
          </p>
        )}
      </form>
    </>
  );
}
