/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const [tab, setTab] = useState<"masuk" | "daftar">("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setError(null);

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: new URLSearchParams({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Status ${response.status}: ${text}`);
      }

      const result = await response.json();
      if (result?.data?.user_id) {
        router.push(`/${result.data.user_id}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message ?? "Login gagal");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.left}>
          <div className={styles.leftOverlay}>
            <h2 className={styles.brand}>KOMUNITAS MEA</h2>
            <p className={styles.subtitle}>Komunitas Jago Jualan Online</p>
          </div>
        </section>

        <section className={styles.right}>
          <div className={styles.card}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  tab === "masuk" ? styles.active : ""
                }`}
                onClick={() => setTab("masuk")}
              >
                Masuk
              </button>
              <button
                className={`${styles.tab} ${
                  tab === "daftar" ? styles.active : ""
                }`}
                onClick={() => setTab("daftar")}
              >
                Daftar
              </button>
            </div>

            <div className={styles.formWrap}>
              {tab === "masuk" && (
                <form onSubmit={handleLogin} className={styles.form}>
                  <p className={styles.info}>
                    Silahkan masuk ke akun Komunitas Mea kamu!
                  </p>

                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email"
                  />

                  <label className={styles.label}>Kata Sandi</label>
                  <div className={styles.pwdWrap}>
                    <input
                      className={styles.input}
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan Kata Sandi"
                    />
                    <button
                      type="button"
                      className={styles.showBtn}
                      onClick={() => setShowPwd((s) => !s)}
                      aria-label="Tampilkan kata sandi"
                    >
                      {showPwd ? "Hide" : "Show"}
                    </button>
                  </div>

                  <a className={styles.forgot} href="#">
                    Lupa Kata Sandi
                  </a>

                  {error && <div className={styles.error}>{error}</div>}

                  <button
                    className={styles.submit}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Memproses..." : "Masuk"}
                  </button>
                </form>
              )}

              {tab === "daftar" && (
                <div className={styles.centerText}>
                  <p>
                    Form pendaftaran (opsional). Untuk tugas ini, fokus pada
                    Form Login.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
