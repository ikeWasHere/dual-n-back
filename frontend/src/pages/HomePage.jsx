import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Tile from "../components/Tile";
import Settings from "../components/Settings";
import { genRandomTileId } from "../nBack";

// TODO:
// - Add 6-7 voiced letters in sync with shown tiles, store that set
// - Compare player choice based on n level and keep score
// - Add stop button mid round

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HomePage = () => {
  const [tiles, setTiles] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
    { id: 7, active: false },
    { id: 8, active: false },
    { id: 9, active: false },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    nBack: 1,
  });

  const handleTileClick = (id) => {
    setTiles(tiles.map((tile) => ({ ...tile, active: tile.id === id })));
  };

  const startGame = async (gameSettings) => {
    const roundLength = 20;

    setIsPlaying(true);
    toast.success("Game starting");

    for (let i = 0; i < roundLength; i++) {
      const randomTileId = genRandomTileId();

      setTiles((prev) =>
        prev.map((tile) => ({
          ...tile,
          active: tile.id === randomTileId,
        })),
      );

      console.log(i, randomTileId);

      await wait(1000);

      setTiles((prev) =>
        prev.map((tile) => ({
          ...tile,
          active: false,
        })),
      );

      await wait(2000);
    }

    setIsPlaying(false);
  };

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center h-[calc(100vh-4rem)] overflow-hidden">
        <div className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-3 gap-7">
            {tiles.map((tile) => (
              <Tile
                key={tile.id}
                active={tile.active}
                onClick={() => handleTileClick(tile.id)}
              ></Tile>
            ))}
          </div>

          {!isPlaying && (
            <div className="flex items-center">
              <Settings onSave={setGameSettings} />
              <button
                className="btn btn-ghost bg-green-500 w-24 rounded-md ml-4"
                onClick={() => startGame(gameSettings)}
              >
                Play
              </button>
            </div>
          )}

          {isPlaying && <h1>Playing </h1>}
        </div>
      </main>
    </>
  );
};

export default HomePage;
