import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <h1>Lights Out</h1>
        <div className="App-board">
            <Board nrows={6} ncols={6} chanceLightStartsOn={0.5} />
        </div>
      </div>
  );
}

export default App;
