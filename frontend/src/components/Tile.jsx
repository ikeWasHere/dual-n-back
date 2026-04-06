const Tile = ({ active }) => {
  return (
    <div
      className={`w-40 h-40 rounded-xl transition-colors duration-150 ${
        active ? "bg-blue-500" : "bg-base-200"
      }`}
    />
  );
};

export default Tile;
