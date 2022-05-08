import HomePage from "./components/HomePage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import JQ from "./components/JQ";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <HomePage /> */}
      <JQ/>
    </DndProvider>
  );
}

export default App;
