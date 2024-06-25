import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="home-page">
      <h1>Welcome to Kanban Task Manager!</h1>
      <p>
        Organize, prioritize, and streamline your tasks effortlessly with our
        intuitive Kanban boards.
      </p>

      <Link href="/sign-up">Get Started</Link>
    </section>
  );
};

export default page;
