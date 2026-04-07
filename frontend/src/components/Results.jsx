const ScoreColumn = ({ label, data }) => (
  <div className="text-center">
    <p className="text-3xl font-bold">{data.pct !== null ? `${data.pct}%` : "—"}</p>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-xs text-gray-500 mt-1">
      {data.hits}/{data.matches} caught
    </p>
  </div>
);

const Results = ({ gameResult, startGame }) => {
  return (
    <div className="flex flex-col items-center gap-4 bg-base-200 rounded-xl p-8 min-w-72">
      <h2 className="text-xl font-bold">Results</h2>
      <div className="flex gap-10">
        <ScoreColumn label="Position" data={gameResult.position} />
        <ScoreColumn label="Sound" data={gameResult.audio} />
      </div>

      <button className="btn btn-ghost bg-green-500 w-32 rounded-md mt-2" onClick={startGame}>
        Play Again
      </button>
    </div>
  );
};

export default Results;
