import Link from "next/link";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.title}>Page not found</h2>
      <p style={styles.text}>
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link href="/" style={styles.button}>
        Back to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    color: "#ffffff",
    textAlign: "center",
    padding: "20px",
  },
  code: {
    fontSize: "96px",
    color: "#e10600", // PITSTOP red
    margin: 0,
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#cccccc",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#e10600",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
  },
};
