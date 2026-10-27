// { q, options, answer (index), explanation, topic, level }
const Q = (q, options, answer, explanation, topic, level) => ({ q, options, answer, explanation, topic, level });
const ARTICLES = ['a', 'an', 'the', 'no article'];

export const grammar = [
  // Tenses
  Q('She ___ to school every day.', ['go', 'goes', 'going', 'gone'], 1, 'Simple present with he / she / it adds -s or -es: "goes".', 'Tenses', 'beginner'),
  Q('I ___ my homework yesterday.', ['do', 'did', 'done', 'doing'], 1, '"Yesterday" is finished past time, so use simple past: "did".', 'Tenses', 'beginner'),
  Q('They ___ football now.', ['play', 'plays', 'are playing', 'played'], 2, '"Now" shows an action happening at this moment: present continuous "are playing".', 'Tenses', 'beginner'),
  Q('We ___ to Goa next month.', ['went', 'will go', 'go', 'gone'], 1, '"Next month" is future time: "will go".', 'Tenses', 'beginner'),
  Q('He ___ tea every morning.', ['drink', 'drinks', 'drinking', 'drank'], 1, 'A daily habit with "he" takes simple present with -s: "drinks".', 'Tenses', 'beginner'),
  Q('I ___ here since 2020.', ['live', 'am living', 'have lived', 'lived'], 2, '"Since" + a starting point, action still true now: present perfect "have lived".', 'Tenses', 'intermediate'),
  Q('When I reached the station, the train ___.', ['left', 'had left', 'has left', 'leaves'], 1, 'The train left before I reached: the earlier past action takes past perfect "had left".', 'Tenses', 'intermediate'),
  Q('She ___ TV when the phone rang.', ['watched', 'was watching', 'watches', 'is watching'], 1, 'An action in progress in the past, interrupted by another: past continuous "was watching".', 'Tenses', 'intermediate'),
  Q('Have you ever ___ to Delhi?', ['go', 'went', 'been', 'going'], 2, 'For life experience we say "have been to" a place.', 'Tenses', 'intermediate'),
  Q('Listen! Someone ___ at the door.', ['knocks', 'is knocking', 'knocked', 'knock'], 1, '"Listen!" means it is happening right now: "is knocking".', 'Tenses', 'intermediate'),
  Q('By next year, he ___ his degree.', ['completes', 'will complete', 'will have completed', 'completed'], 2, '"By + future time" shows something finished before then: future perfect "will have completed".', 'Tenses', 'advanced'),
  Q('If I ___ rich, I would travel the world.', ['am', 'was', 'were', 'be'], 2, 'In an imaginary (second) conditional, use "were" with every subject.', 'Conditionals', 'advanced'),
  Q('If it rains tomorrow, we ___ at home.', ['stay', 'will stay', 'would stay', 'stayed'], 1, 'First conditional: if + present, will + verb.', 'Conditionals', 'intermediate'),
  Q('She has been working here ___ five years.', ['since', 'for', 'from', 'by'], 1, 'Use "for" with a length of time (five years) and "since" with a starting point.', 'Tenses', 'intermediate'),
  Q('I wish I ___ harder for the exam.', ['study', 'studied', 'had studied', 'will study'], 2, 'A regret about the past: wish + past perfect "had studied".', 'Conditionals', 'advanced'),

  // Articles
  Q('I saw ___ elephant at the zoo.', ARTICLES, 1, '"Elephant" starts with a vowel sound, so use "an".', 'Articles', 'beginner'),
  Q('She is ___ honest girl.', ARTICLES, 1, 'The "h" in "honest" is silent, so it starts with a vowel sound: "an".', 'Articles', 'intermediate'),
  Q('He is ___ university student.', ARTICLES, 0, '"University" starts with a "yu" (consonant) sound, so use "a".', 'Articles', 'intermediate'),
  Q('___ sun rises in the east.', ['A', 'An', 'The', 'No article'], 2, 'There is only one sun, so use "the".', 'Articles', 'beginner'),
  Q('My father is ___ engineer.', ARTICLES, 1, '"Engineer" starts with a vowel sound: "an".', 'Articles', 'beginner'),
  Q('I go to ___ bed at 10 pm.', ARTICLES, 3, 'We say "go to bed" without an article when we mean sleeping.', 'Articles', 'intermediate'),
  Q('___ Ganga is a holy river.', ['A', 'An', 'The', 'No article'], 2, 'Names of rivers take "the": the Ganga, the Narmada.', 'Articles', 'advanced'),
  Q('There is ___ cat on the wall.', ARTICLES, 0, 'One cat, mentioned for the first time, consonant sound: "a".', 'Articles', 'beginner'),
  Q('He plays ___ guitar very well.', ARTICLES, 2, 'Musical instruments take "the" after "play".', 'Articles', 'advanced'),
  Q('She is ___ best student in the class.', ARTICLES, 2, 'Superlatives (best, tallest) take "the".', 'Articles', 'intermediate'),

  // Prepositions
  Q('The book is ___ the table.', ['on', 'at', 'of', 'to'], 0, 'Something resting on a surface is "on" it.', 'Prepositions', 'beginner'),
  Q('I was born ___ 2005.', ['on', 'in', 'at', 'by'], 1, 'Use "in" with years and months.', 'Prepositions', 'beginner'),
  Q('The meeting is ___ Monday.', ['in', 'at', 'on', 'by'], 2, 'Use "on" with days and dates.', 'Prepositions', 'beginner'),
  Q("We will meet ___ 6 o'clock.", ['in', 'on', 'at', 'by'], 2, 'Use "at" with an exact time.', 'Prepositions', 'beginner'),
  Q('He is good ___ mathematics.', ['in', 'at', 'on', 'with'], 1, 'The fixed phrase is "good at" something.', 'Prepositions', 'intermediate'),
  Q('She is afraid ___ dogs.', ['from', 'of', 'with', 'by'], 1, 'The fixed phrase is "afraid of".', 'Prepositions', 'intermediate'),
  Q('I have been waiting ___ you for an hour.', ['to', 'for', 'on', 'at'], 1, 'We "wait for" someone.', 'Prepositions', 'intermediate'),
  Q('He jumped ___ the river.', ['in', 'into', 'on', 'at'], 1, 'Movement from outside to inside uses "into".', 'Prepositions', 'intermediate'),
  Q('Divide the sweets ___ the two children.', ['among', 'between', 'in', 'with'], 1, 'Use "between" for two, "among" for more than two.', 'Prepositions', 'intermediate'),
  Q('She insisted ___ paying the bill.', ['to', 'on', 'for', 'at'], 1, 'The fixed phrase is "insist on" + -ing.', 'Prepositions', 'advanced'),
  Q('The thief was caught ___ the police.', ['from', 'by', 'with', 'of'], 1, 'In the passive voice, the doer comes after "by".', 'Prepositions', 'advanced'),
  Q('He has been ill ___ last Monday.', ['for', 'since', 'from', 'by'], 1, '"Last Monday" is a starting point, so use "since".', 'Prepositions', 'advanced'),

  // Sentence formation & agreement
  Q('Choose the correct sentence.', ["She don't like tea.", "She doesn't like tea.", 'She not like tea.', "She doesn't likes tea."], 1, 'With he / she / it use "doesn\'t" + the base verb (like, not likes).', 'Sentence formation', 'beginner'),
  Q('Choose the correct question.', ['Where you live?', 'Where do you live?', 'Where you do live?', 'Where does you live?'], 1, 'Question order: Wh-word + do/does + subject + verb.', 'Sentence formation', 'beginner'),
  Q('There ___ many people in the hall.', ['is', 'are', 'was', 'has'], 1, '"Many people" is plural, so use "are".', 'Agreement', 'beginner'),
  Q('Choose the correct sentence.', ['He can sings well.', 'He can sing well.', 'He cans sing well.', 'He can to sing well.'], 1, 'After a modal verb (can, must, should) use the base verb without "to".', 'Sentence formation', 'intermediate'),
  Q('Neither Ravi nor his friends ___ coming.', ['is', 'are', 'was', 'be'], 1, 'With "neither ... nor" the verb agrees with the nearer subject ("friends" → are).', 'Agreement', 'intermediate'),
  Q('Each of the students ___ a book.', ['have', 'has', 'are having', 'were'], 1, '"Each" is singular, so use "has".', 'Agreement', 'intermediate'),
  Q('Passive of "They built this temple in 1950."', ['This temple built in 1950.', 'This temple was built in 1950.', 'This temple is built in 1950.', 'This temple has built in 1950.'], 1, 'Simple past passive: was / were + past participle.', 'Sentence formation', 'intermediate'),
  Q('She is taller ___ her sister.', ['then', 'than', 'that', 'from'], 1, 'Comparisons use "than" (not "then", which is about time).', 'Sentence formation', 'intermediate'),
  Q('This is the ___ movie I have ever seen.', ['good', 'better', 'best', 'most good'], 2, 'Comparing with everything else → superlative "best".', 'Sentence formation', 'intermediate'),
  Q('The news ___ very good today.', ['are', 'is', 'were', 'have'], 1, '"News" is uncountable and takes a singular verb.', 'Agreement', 'advanced'),
  Q('Indirect speech: He said, "I am tired."', ['He said that he is tired.', 'He said that he was tired.', 'He said that I was tired.', 'He said he tired.'], 1, 'Reported speech moves the tense back (am → was) and changes "I" to "he".', 'Sentence formation', 'advanced'),
  Q('Hardly ___ reached home when it started raining.', ['I had', 'had I', 'I have', 'have I'], 1, 'A negative word like "Hardly" at the start inverts the order: "had I".', 'Sentence formation', 'advanced'),
  Q('You ___ wear a helmet; it is the law.', ['may', 'must', 'might', 'could'], 1, 'A rule or strong obligation uses "must".', 'Sentence formation', 'advanced'),
];
