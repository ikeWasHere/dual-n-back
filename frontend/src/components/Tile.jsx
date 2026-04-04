const Tile = ({ active, children }) => {
  return (
    <div
      className={`w-20 h-20 rounded flex items-center justify-center ${
        active ? "bg-primary text-primary-content" : "bg-base-200"
      }`}
    >
      {children}
    </div>
  );
};

export default Tile;
