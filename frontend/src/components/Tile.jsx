const Tile = ({ active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-xs w-40 h-40 rounded-xl cursor-pointer ${
        active ? "bg-blue-500" : "bg-base-200 hover:bg-base-300"
      }`}
    ></button>
  );
};

export default Tile;
