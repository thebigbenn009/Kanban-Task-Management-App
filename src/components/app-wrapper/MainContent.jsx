import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import BoardContainer from "../board-components/BoardContainer";

const MainContent = () => {
  const mainRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      // Your scroll event logic here
      console.log("Scrolled:", mainRef.current.scrollTop);
    };

    // Attach the event listener to the main section element
    mainRef.current.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      mainRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section ref={mainRef} className="main-section">
      <Navbar />
      <BoardContainer />
    </section>
  );
};

export default MainContent;
