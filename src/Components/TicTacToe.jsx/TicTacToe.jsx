import { useRef, useState } from "react";
import circle from "../../assets/circle_12196860.png";
import cross from "../../assets/close_10330077.png";

export default function TicTacToe() {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }

    const newData = [...data];
    const isX = count % 2 === 0;
    newData[num] = isX ? "x" : "o";

    setData(newData);
    setCount(count + 1);

    e.target.innerHTML = `<img src='${isX ? cross : circle}' alt='${
      isX ? "X" : "O"
    }'>`;

    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        won(newData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `<div style="display: flex; align-items: center; justify-content: center;">Congratulations: <img src=${
      winner === "x" ? cross : circle
    } alt=${winner} style="height: 40px; width: 40px; margin-left: 10px;"></div>`;
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "Tic Tac Toe";
    document.querySelectorAll(".boxes").forEach((box) => (box.innerHTML = ""));
  };

  return (
    <div className=" mx-auto p-4">
      <h1
        className="text-4xl md:text-4xl lg:text-6xl font-serif font-bold text-teal-500 mb-4 flex justify-center items-center"
        ref={titleRef}
      >
        Tic Tac Toe
      </h1>
      <div className="board flex flex-col items-center justify-center p-4">
        <div className="row flex">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="boxes h-28 w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 bg-slate-700 cursor-pointer border border-black rounded-lg mx-1 my-1 p-4"
              onClick={(e) => toggle(e, i)}
            ></div>
          ))}
        </div>
        <div className="row flex">
          {[3, 4, 5].map((i) => (
            <div
              key={i}
              className="boxes h-28 w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 bg-slate-700 cursor-pointer border border-black rounded-lg mx-1 my-1 p-4"
              onClick={(e) => toggle(e, i)}
            ></div>
          ))}
        </div>
        <div className="row flex">
          {[6, 7, 8].map((i) => (
            <div
              key={i}
              className="boxes h-28 w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 bg-slate-700 cursor-pointer border border-black rounded-lg mx-1 my-1 p-4"
              onClick={(e) => toggle(e, i)}
            ></div>
          ))}
        </div>
      </div>
      <button
        className="btn reset text-white bg-red-500 hover:bg-red-700 px-4 py-2 mt-4 rounded-lg"
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  );
}
