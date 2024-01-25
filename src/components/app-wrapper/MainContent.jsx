import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import BoardContainer from "../board-components/BoardContainer";

const MainContent = () => {
  const mainRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const getScroll = () => {
      console.log("scrollY: ", mainRef.current.scrollTop);
      setScrollPosition(mainRef.current.scrollTop);
    };

    mainRef.current.addEventListener("scroll", getScroll);

    return () => {
      mainRef.current.removeEventListener("scroll", getScroll);
    };
  }, []);
  return (
    <section className="main-section" ref={mainRef}>
      <Navbar scrollPosition={scrollPosition} />
      <BoardContainer />
    </section>
  );
};

export default MainContent;
