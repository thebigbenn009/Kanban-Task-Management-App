import Link from "next/link";
import React from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={styles.homepage}>
      <div className={styles.homeContainer}>
        <h1>Kanban Task Manager</h1>
        <p>
          Organize, prioritize, and streamline your tasks effortlessly with our
          intuitive Kanban boards.
        </p>

        <Link href="/tasks">Get Started</Link>
      </div>
    </section>
  );
};

export default HomePage;
