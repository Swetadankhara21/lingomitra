import beginner from './vocabBeginner.js';
import intermediate from './vocabIntermediate.js';
import advanced from './vocabAdvanced.js';

const toWords = (rows, level) =>
  rows.map(([word, pos, gujarati, pronunciation, example]) => ({ word, pos, gujarati, pronunciation, example, level }));

/** 100 words: { id, word, pos, gujarati, pronunciation, example, level } */
export const vocabulary = [
  ...toWords(beginner, 'beginner'),
  ...toWords(intermediate, 'intermediate'),
  ...toWords(advanced, 'advanced'),
].map((w, i) => ({ ...w, id: i + 1 }));
