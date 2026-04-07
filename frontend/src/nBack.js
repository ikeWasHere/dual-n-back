import audioA from "../res/audio/A.wav";
import audioE from "../res/audio/E.wav";
import audioH from "../res/audio/H.wav";
import audioK from "../res/audio/K.wav";
import audioL from "../res/audio/L.wav";
import audioO from "../res/audio/O.wav";

const LETTERS = ["A", "E", "H", "K", "L", "O"];
const AUDIO_MAP = { A: audioA, E: audioE, H: audioH, K: audioK, L: audioL, O: audioO };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const genRandomTileId = () => Math.floor(Math.random() * 9) + 1;

const genRandomLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];

const playAudio = (letter) => {
  const audio = new Audio(AUDIO_MAP[letter]);
  audio.play();
};

const isMatch = (history, turnIndex, n, type) => {
  if (turnIndex < n) return false;
  const current = history[turnIndex];
  const previous = history[turnIndex - n];
  if (type === "position") return current.tileId === previous.tileId;
  if (type === "audio") return current.letter === previous.letter;
  return false;
};

export const scoreRound = (history, responses, n) => {
  let posHits = 0,
    posMisses = 0,
    posFalseAlarms = 0;
  let audHits = 0,
    audMisses = 0,
    audFalseAlarms = 0;

  for (let i = 0; i < history.length; i++) {
    const posMatch = isMatch(history, i, n, "position");
    const audMatch = isMatch(history, i, n, "audio");
    const playerPos = responses[i]?.position ?? false;
    const playerAud = responses[i]?.audio ?? false;

    if (posMatch && playerPos) posHits++;
    else if (posMatch && !playerPos) posMisses++;
    else if (!posMatch && playerPos) posFalseAlarms++;

    if (audMatch && playerAud) audHits++;
    else if (audMatch && !playerAud) audMisses++;
    else if (!audMatch && playerAud) audFalseAlarms++;
  }

  const totalTurns = history.length;
  if (totalTurns === 0) return null;

  const posMatches = posHits + posMisses;
  const audMatches = audHits + audMisses;

  return {
    position: {
      hits: posHits,
      matches: posMatches,
      falseAlarms: posFalseAlarms,
      pct: posMatches > 0 ? Math.round((posHits / posMatches) * 100) : null,
    },
    audio: {
      hits: audHits,
      matches: audMatches,
      falseAlarms: audFalseAlarms,
      pct: audMatches > 0 ? Math.round((audHits / audMatches) * 100) : null,
    },
    totalTurns,
  };
};

const cleanup = (setActiveTileId, setFeedback) => {
  setActiveTileId(null);
  setFeedback(null);
};

export const mainLoop = async ({
  nBack,
  setActiveTileId,
  setIsPlaying,
  setTurnIndex,
  setFeedback,
  stopRequestedRef,
  historyRef,
  responsesRef,
}) => {
  const roundLength = 20;
  historyRef.current = [];
  responsesRef.current = [];
  await wait(1000);

  for (let i = 0; i < roundLength; i++) {
    if (stopRequestedRef.current) {
      cleanup(setActiveTileId, setFeedback);
      return false;
    }

    const tileId = genRandomTileId();
    const letter = genRandomLetter();
    historyRef.current.push({ tileId, letter });
    responsesRef.current.push({ position: false, audio: false });

    setFeedback(null);
    setActiveTileId(tileId);
    setTurnIndex(i);
    playAudio(letter);

    await wait(1000);
    if (stopRequestedRef.current) {
      cleanup(setActiveTileId, setFeedback);
      return false;
    }

    setActiveTileId(null);
    await wait(1500);
    if (stopRequestedRef.current) {
      cleanup(setActiveTileId, setFeedback);
      return false;
    }

    const posCorrect =
      isMatch(historyRef.current, i, nBack, "position") === responsesRef.current[i].position;
    const audCorrect =
      isMatch(historyRef.current, i, nBack, "audio") === responsesRef.current[i].audio;
    setFeedback({ position: posCorrect, audio: audCorrect });

    await wait(500);
    if (stopRequestedRef.current) {
      cleanup(setActiveTileId, setFeedback);
      return false;
    }
  }

  cleanup(setActiveTileId, setFeedback);
  setIsPlaying(false);
  return true;
};
