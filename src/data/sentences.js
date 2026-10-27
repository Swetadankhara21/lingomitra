// Sentence game: correct English sentence + Gujarati meaning. Words are shuffled in the game.
import harder from './sentences2.js';

const S = (en, gu, level) => ({ en, gu, level });

export const sentences = [
  S('I go to school every day.', 'હું દરરોજ શાળાએ જાઉં છું.', 'beginner'),
  S('She is my best friend.', 'તે મારી સૌથી સારી મિત્ર છે.', 'beginner'),
  S('We play cricket in the evening.', 'અમે સાંજે ક્રિકેટ રમીએ છીએ.', 'beginner'),
  S('My mother cooks tasty food.', 'મારી માતા સ્વાદિષ્ટ ખોરાક બનાવે છે.', 'beginner'),
  S('The sun rises in the east.', 'સૂરજ પૂર્વમાં ઊગે છે.', 'beginner'),
  S('Please open the window.', 'કૃપા કરીને બારી ખોલો.', 'beginner'),
  S('I like to read books.', 'મને પુસ્તકો વાંચવા ગમે છે.', 'beginner'),
  S('He drinks milk every morning.', 'તે દરરોજ સવારે દૂધ પીએ છે.', 'beginner'),
  S('Where do you live?', 'તમે ક્યાં રહો છો?', 'beginner'),
  S('This is a big house.', 'આ એક મોટું ઘર છે.', 'beginner'),
  S('I did not know the answer.', 'મને જવાબ ખબર ન હતી.', 'intermediate'),
  S('He is taller than his brother.', 'તે તેના ભાઈ કરતાં ઊંચો છે.', 'intermediate'),
  S('How long have you lived here?', 'તમે અહીં કેટલા સમયથી રહો છો?', 'intermediate'),
  S('Could you help me with this work?', 'શું તમે આ કામમાં મારી મદદ કરી શકો?', 'intermediate'),
  S('The train was late because of the rain.', 'વરસાદને કારણે ટ્રેન મોડી હતી.', 'intermediate'),
  ...harder.map(([en, gu, level]) => S(en, gu, level)),
];
