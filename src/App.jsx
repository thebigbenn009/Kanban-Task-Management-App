import { useState } from "react";
import AppWrapper from "./components/App wrapper/AppWrapper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppWrapper />
    </DndProvider>
  );
}

export default App;
