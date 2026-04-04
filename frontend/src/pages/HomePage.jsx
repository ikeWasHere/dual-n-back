import { useState } from "react";
import Navbar from "../components/Navbar";
import Tile from "../components/Tile";

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

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-3 gap-7">
          {tiles.map((tile) => (
            <Tile key={tile.id} active={tile.active}>
              {tile.id}
            </Tile>
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
