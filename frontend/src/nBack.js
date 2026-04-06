import audioA from "../res/audio/A.wav";
import audioE from "../res/audio/E.wav";
import audioH from "../res/audio/H.wav";
import audioK from "../res/audio/K.wav";
import audioL from "../res/audio/L.wav";
import audioO from "../res/audio/O.wav";

const LETTERS = ["A", "E", "H", "K", "L", "O"];
const AUDIO_MAP = { A: audioA, E: audioE, H: audioH, K: audioK, L: audioL, O: audioO };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const genRandomTileId = () => Math.floor(Math.random() * 9) + 1;

export const genRandomLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];

const playAudio = (letter) => {
  const audio = new Audio(AUDIO_MAP[letter]);
  audio.play();
};

export const isMatch = (history, turnIndex, n, type) => {
  if (turnIndex < n) return false;
  const current = history[turnIndex];
  const previous = history[turnIndex - n];
  if (type === "position") return current.tileId === previous.tileId;
  if (type === "audio") return current.letter === previous.letter;
  return false;
};

export const mainLoop = async ({
  setActiveTileId,
  setIsPlaying,
  setTurnIndex,
  stopRequestedRef,
  historyRef,
}) => {
  const roundLength = 20;
  historyRef.current = [];
  await wait(1000);

  for (let i = 0; i < roundLength; i++) {
    if (stopRequestedRef.current) break;

    const tileId = genRandomTileId();
    const letter = genRandomLetter();
    historyRef.current.push({ tileId, letter });

    setActiveTileId(tileId);
    setTurnIndex(i);
    playAudio(letter);

    await wait(1000);
    if (stopRequestedRef.current) break;

    setActiveTileId(null);
    await wait(2000);
    if (stopRequestedRef.current) break;
  }

  setActiveTileId(null);
  setIsPlaying(false);
};
