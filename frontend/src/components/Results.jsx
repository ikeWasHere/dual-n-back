const ScoreStrip = ({ label, data }) => (
  <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
    <span className="text-sm text-gray-400 whitespace-nowrap">{label}</span>
    <span className="text-2xl font-bold tabular-nums">
      {data.pct !== null ? `${data.pct}%` : "—"}
    </span>
    <span className="text-xs text-gray-500 tabular-nums">
      {data.hits}/{data.matches} caught
    </span>
  </div>
);

const Results = ({ gameResult, startGame }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 bg-base-200 rounded-xl px-6 py-3 max-w-3xl w-full">
      <h2 className="text-lg font-semibold shrink-0">Results</h2>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
        <ScoreStrip label="Position" data={gameResult.position} />
        <ScoreStrip label="Sound" data={gameResult.audio} />
      </div>
      <button
        className="btn btn-ghost bg-green-500 rounded-md px-5 min-h-0 h-10 shrink-0"
        onClick={startGame}
      >
        Play Again
      </button>
    </div>
  );
};

export default Results;
