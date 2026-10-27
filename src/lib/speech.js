export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

let voice = null;

function englishVoice() {
  if (voice) return voice;
  const voices = window.speechSynthesis.getVoices();
  voice = voices.find((v) => v.lang === 'en-IN') || voices.find((v) => v.lang === 'en-GB') || voices.find((v) => v.lang?.startsWith('en')) || null;
  return voice;
}

if (canSpeak()) {
  window.speechSynthesis.onvoiceschanged = () => {
    voice = null;
  };
}

/** Speak English text with the browser's own voice. Returns false when not supported. */
export function speak(text, { rate = 0.9 } = {}) {
  if (!canSpeak()) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-IN';
  u.rate = rate;
  const v = englishVoice();
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
  return true;
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
