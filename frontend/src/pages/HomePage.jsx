import { useState } from "react";
import Navbar from "../components/Navbar";
import Tile from "../components/Tile";
import Settings from "../components/Settings";

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
          <Settings onSave={setGameSettings} />
        </div>
      </main>
    </>
  );
};

export default HomePage;
