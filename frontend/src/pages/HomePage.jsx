import { useRef, useState, useCallback } from "react";
import { EarIcon, EyeIcon } from "lucide-react";

import Navbar from "../components/Navbar";
import Tile from "../components/Tile";
import Settings from "../components/Settings";
import Results from "../components/Results";
import { mainLoop, scoreRound } from "../nBack";

const HomePage = () => {
  const tileIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [activeTileId, setActiveTileId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [turnIndex, setTurnIndex] = useState(-1);
  const [pressedThisTurn, setPressedThisTurn] = useState({ position: false, audio: false });
  const [feedback, setFeedback] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [gameSettings, setGameSettings] = useState({ nBack: 1 });

  const stopRequestedRef = useRef(false);
  const historyRef = useRef([]);
  const responsesRef = useRef([]);

  const advanceTurn = useCallback((i) => {
    setTurnIndex(i);
    setPressedThisTurn({ position: false, audio: false });
    setFeedback(null);
  }, []);

  const handleResponse = useCallback(
    (type) => {
      if (turnIndex < 0) return;
      const entry = responsesRef.current[turnIndex];
      if (!entry) return;
      entry[type] = !entry[type];
      setPressedThisTurn((prev) => ({ ...prev, [type]: entry[type] }));
    },
    [turnIndex],
  );

  const startGame = async () => {
    stopRequestedRef.current = false;
    setIsPlaying(true);
    setTurnIndex(-1);
    setFeedback(null);
    setGameResult(null);

    const completed = await mainLoop({
      nBack: gameSettings.nBack,
      setActiveTileId,
      setIsPlaying,
      setTurnIndex: advanceTurn,
      setFeedback,
      stopRequestedRef,
      historyRef,
      responsesRef,
    });

    if (completed) {
      const result = scoreRound(historyRef.current, responsesRef.current, gameSettings.nBack);
      setGameResult(result);
    }
  };

  const stopGame = () => {
    stopRequestedRef.current = true;
    setActiveTileId(null);
    setFeedback(null);
    setIsPlaying(false);
  };

  const btnStyle = (type) => {
    if (feedback && pressedThisTurn[type]) {
      return feedback[type] ? "bg-green-500 text-white" : "bg-red-500 text-white";
    }
    return "bg-slate-600";
  };

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center h-[calc(100vh-4rem)] overflow-hidden">
        <div className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-3 gap-7">
            {tileIds.map((tileId) => (
              <Tile key={tileId} active={tileId === activeTileId} />
            ))}
          </div>

          {isPlaying && (
            <>
              <div className="flex items-center gap-10">
                <button
                  className={`btn btn-ghost w-40 rounded-md transition-colors duration-300 ${btnStyle("position")}`}
                  onClick={() => handleResponse("position")}
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  className={`btn btn-ghost w-40 rounded-md transition-colors duration-300 ${btnStyle("audio")}`}
                  onClick={() => handleResponse("audio")}
                >
                  <EarIcon className="w-4 h-4" />
                </button>
              </div>
              <button className="btn btn-ghost bg-red-500 w-24 rounded-md" onClick={stopGame}>
                Stop
              </button>
            </>
          )}

          {!isPlaying && gameResult && <Results gameResult={gameResult} startGame={startGame} />}

          {!isPlaying && !gameResult && (
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
        </div>
      </main>
    </>
  );
};

export default HomePage;
