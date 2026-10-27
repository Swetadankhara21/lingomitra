import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { Loading } from './components/ui.jsx';
import Home from './pages/Home.jsx';

const page = (load) => lazy(load);
const Games = page(() => import('./pages/Games.jsx'));
const Learn = page(() => import('./pages/Learn.jsx'));
const WordGame = page(() => import('./pages/WordGame.jsx'));
const GujaratiQuiz = page(() => import('./pages/GujaratiQuiz.jsx'));
const Grammar = page(() => import('./pages/Grammar.jsx'));
const DailyWord = page(() => import('./pages/DailyWord.jsx'));
const SentenceBuilder = page(() => import('./pages/SentenceBuilder.jsx'));
const Spelling = page(() => import('./pages/Spelling.jsx'));
const Listening = page(() => import('./pages/Listening.jsx'));
const Typing = page(() => import('./pages/Typing.jsx'));
const DailyChallenge = page(() => import('./pages/DailyChallenge.jsx'));
const Dashboard = page(() => import('./pages/Dashboard.jsx'));
const Tips = page(() => import('./pages/Tips.jsx'));
const Dictionary = page(() => import('./pages/Dictionary.jsx'));
const Alphabet = page(() => import('./pages/Alphabet.jsx'));
const Songs = page(() => import('./pages/Songs.jsx'));
const Stories = page(() => import('./pages/Stories.jsx'));
const About = page(() => import('./pages/About.jsx'));
const Contact = page(() => import('./pages/Contact.jsx'));
const Privacy = page(() => import('./pages/Privacy.jsx'));
const Terms = page(() => import('./pages/Terms.jsx'));
const Credits = page(() => import('./pages/Credits.jsx'));
const NotFound = page(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<Games />} />
          <Route path="learn" element={<Learn />} />
          <Route path="word-game" element={<WordGame />} />
          <Route path="gujarati-to-english-quiz" element={<GujaratiQuiz />} />
          <Route path="grammar-game" element={<Grammar />} />
          <Route path="word-of-the-day" element={<DailyWord />} />
          <Route path="sentence-builder-game" element={<SentenceBuilder />} />
          <Route path="spelling-game" element={<Spelling />} />
          <Route path="listening-game" element={<Listening />} />
          <Route path="typing-speed-test" element={<Typing />} />
          <Route path="daily-challenge" element={<DailyChallenge />} />
          <Route path="progress" element={<Dashboard />} />
          <Route path="english-tips" element={<Tips />} />
          <Route path="dictionary" element={<Dictionary />} />
          <Route path="dictionary/:letter" element={<Dictionary />} />
          <Route path="alphabet" element={<Alphabet />} />
          <Route path="songs" element={<Songs />} />
          <Route path="stories" element={<Stories />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="credits" element={<Credits />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
