import { useRef, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Tile from "../components/Tile";
import Settings from "../components/Settings";
import { mainLoop } from "../nBack";

// TODO:
// - Add game playing UI and logic that stores player choice
// - Compare player choice based on n level and keep score

const HomePage = () => {
  const tileIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [activeTileId, setActiveTileId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [turnIndex, setTurnIndex] = useState(-1);
  const [gameSettings, setGameSettings] = useState({
    nBack: 1,
  });
  const stopRequestedRef = useRef(false);
  const historyRef = useRef([]);

  const startGame = async () => {
    stopRequestedRef.current = false;
    setIsPlaying(true);
    setTurnIndex(-1);
    toast.success("Game starting");

    mainLoop({
      setActiveTileId,
      setIsPlaying,
      setTurnIndex,
      stopRequestedRef,
      historyRef,
    });
  };

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center h-[calc(100vh-4rem)] overflow-hidden">
        <div className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-3 gap-7">
            {tileIds.map((tileId) => (
              <Tile key={tileId} active={tileId === activeTileId}></Tile>
            ))}
          </div>

          {!isPlaying && (
            <div className="flex items-center">
              <Settings onSave={setGameSettings} />

              <button
                className="btn btn-ghost bg-green-500 w-24 rounded-md ml-4"
                onClick={startGame}
              >
                Play
              </button>
            </div>
          )}

          {isPlaying && (
            <>
              <div className="flex items-center gap-10">
                <button className="btn btn-ghost bg-slate-600 w-32 rounded-md">Eyes logo</button>
                <button className="btn btn-ghost bg-slate-600 w-32 rounded-md">Audio logo</button>
              </div>
              <button
                className="btn btn-ghost bg-red-500 w-24 rounded-md"
                onClick={() => {
                  stopRequestedRef.current = true;
                  setIsPlaying(false);
                }}
              >
                Stop
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
