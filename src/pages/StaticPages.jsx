import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { useSeo } from '../lib/seo.js';
import { OWNER } from '../lib/owner.js';
import { PageHeader } from '../components/ui.jsx';

const UPDATED = '27 October 2026';

function Prose({ children }) {
  return <div className="card mx-auto mt-8 max-w-3xl p-6 leading-relaxed text-ink sm:p-10 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2:first-child]:mt-0 [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:font-bold [&_a]:text-teal [&_a]:underline [&_a]:decoration-mint [&_a]:underline-offset-4">{children}</div>;
}

const LinkedIn = () => (
  <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer">
    {OWNER.name} on LinkedIn
  </a>
);

export function About() {
  const { t } = useI18n();
  useSeo('About LingoMitra', `About LingoMitra, free English learning games for Gujarati and Indian learners, created by ${OWNER.name}.`);
  return (
    <>
      <PageHeader emoji="🤝" title={t('nav_about')} desc={t('footerTag')} />
      <div className="container-page">
        <Prose>
          <h2>What is LingoMitra?</h2>
          <p>
            <strong>LingoMitra</strong> (“Lingo” = language, “Mitra” = friend) is a free website of English learning games. It helps Gujarati, Hindi and other Indian
            learners – and learners from Germany and Poland – practise English a few minutes every day through word games, quizzes, grammar challenges, spelling,
            listening, typing, songs and short stories.
          </p>
          <p>Everything works in your browser. There is no login, no subscription and no paid feature. Your progress is saved only on your own device.</p>
          <h2>Who made it?</h2>
          <p>
            LingoMitra was created by <strong>{OWNER.name}</strong>, a developer from Gujarat who wanted English practice to feel like playing a game rather than
            studying from a textbook. Connect with her: <LinkedIn />.
          </p>
          <h2>What you can do here</h2>
          <ul>
            <li>Learn words with meanings in Gujarati, Hindi, German and Polish in a dictionary of up to 50,000 words.</li>
            <li>Translate Gujarati sentences into English and get an explanation for every answer.</li>
            <li>Practise tenses, articles, prepositions and sentence building at three levels.</li>
            <li>Train your ears, spelling and typing speed, and finish the daily challenge for bonus points.</li>
          </ul>
          <p>
            <Link to="/games">{t('exploreGames')} →</Link>
          </p>
        </Prose>
      </div>
    </>
  );
}

export function Contact() {
  const { t } = useI18n();
  useSeo('Contact', 'Contact the LingoMitra team with feedback, suggestions or corrections.');
  return (
    <>
      <PageHeader emoji="✉️" title={t('nav_contact')} desc="Feedback, ideas and corrections are always welcome." />
      <div className="container-page">
        <Prose>
          <h2>Get in touch</h2>
          <p>
            The best way to reach the creator of LingoMitra, {OWNER.name}, is through LinkedIn. Send a message with your feedback, a game idea or a mistake you
            found in a question or word meaning.
          </p>
          <p className="!mt-6">
            <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary !text-white !no-underline">
              💼 Message on LinkedIn
            </a>
          </p>
          <h2>Reporting a wrong meaning</h2>
          <p>
            Dictionary meanings come from Wiktionary (see <Link to="/credits">Credits</Link>). If a meaning looks wrong, tell us the English word and the language,
            and we will fix it in the next update.
          </p>
        </Prose>
      </div>
    </>
  );
}

export function Privacy() {
  const { t } = useI18n();
  useSeo('Privacy Policy', 'LingoMitra privacy policy: no account, no personal data collected; progress is stored only in your browser.');
  return (
    <>
      <PageHeader emoji="🔒" title={t('nav_privacy')} desc={`Last updated: ${UPDATED}`} />
      <div className="container-page">
        <Prose>
          <h2>Summary</h2>
          <p>LingoMitra does not ask for your name, email or phone number and has no user accounts. We do not sell or share personal data.</p>
          <h2>What is stored on your device</h2>
          <p>
            Your scores, points, streak, chosen level, learned words and language choice are saved in your browser’s local storage so you can continue later. This
            data never leaves your device and is not sent to us. You can delete it any time with “{t('reset')}” on the{' '}
            <Link to="/progress">{t('nav_progress')}</Link> page or by clearing your browser data.
          </p>
          <h2>Listening features</h2>
          <p>“Listen” buttons use your browser’s built-in text-to-speech. Depending on your device, the browser or operating system may process this text.</p>
          <h2>Hosting and fonts</h2>
          <p>
            The website is hosted on Vercel, which keeps standard server logs (such as IP address and browser type) for security and performance. Fonts are
            loaded from Google Fonts, which may receive your IP address when the page loads.
          </p>
          <h2>Advertising</h2>
          <p>
            If advertising is added in the future (for example Google AdSense), third-party vendors including Google may use cookies to show ads based on your
            visits to this and other websites. You will be able to opt out of personalised advertising in Google’s Ads Settings. This policy will be updated
            before any such change.
          </p>
          <h2>Children</h2>
          <p>LingoMitra is suitable for learners of all ages and does not knowingly collect personal information from anyone, including children.</p>
          <h2>Contact</h2>
          <p>
            Questions about this policy: <LinkedIn />.
          </p>
        </Prose>
      </div>
    </>
  );
}

export function Terms() {
  const { t } = useI18n();
  useSeo('Terms of Use', 'Terms of use for LingoMitra free English learning games.');
  return (
    <>
      <PageHeader emoji="📜" title={t('nav_terms')} desc={`Last updated: ${UPDATED}`} />
      <div className="container-page">
        <Prose>
          <h2>Using LingoMitra</h2>
          <p>LingoMitra is free to use for personal learning and in classrooms. Please use it respectfully and do not try to disrupt the website.</p>
          <h2>Content and copying</h2>
          <p>
            The games, questions, songs, stories, design and code of LingoMitra are © {new Date().getFullYear()} {OWNER.name}. You may not copy, mirror or
            republish the website or its content – including with website-copying tools such as HTTrack – without written permission. Dictionary entries are
            based on Wiktionary and remain under their own licence (see <Link to="/credits">Credits</Link>).
          </p>
          <h2>No guarantee</h2>
          <p>
            We work hard to keep answers and meanings correct, but mistakes are possible. The website is provided “as is”, without any warranty, and is not a
            substitute for formal teaching or certified exams.
          </p>
          <h2>Changes</h2>
          <p>We may update these terms and the website at any time. Continuing to use the website means you accept the current terms.</p>
          <h2>Contact</h2>
          <p>
            <LinkedIn />
          </p>
        </Prose>
      </div>
    </>
  );
}

export function Credits() {
  const { t } = useI18n();
  useSeo('Credits & Licences', 'Credits and licences for the data used on LingoMitra, including Wiktionary dictionary data.');
  return (
    <>
      <PageHeader emoji="🙏" title={t('nav_credits')} desc="Open data that makes LingoMitra possible." />
      <div className="container-page">
        <Prose>
          <h2>Dictionary data</h2>
          <p>
            Dictionary words, definitions, pronunciations and Gujarati, Hindi, German and Polish translations are taken from{' '}
            <a href="https://en.wiktionary.org/" target="_blank" rel="noopener noreferrer">Wiktionary</a>, extracted by{' '}
            <a href="https://kaikki.org/" target="_blank" rel="noopener noreferrer">kaikki.org (wiktextract)</a>. Wiktionary content is available under the{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-ShareAlike 4.0</a>{' '}
            licence. The dictionary data on this site was shortened and reformatted and is shared under the same licence.
          </p>
          <h2>Word frequency</h2>
          <p>
            Words are ordered by how common they are using the{' '}
            <a href="https://github.com/hermitdave/FrequencyWords" target="_blank" rel="noopener noreferrer">FrequencyWords</a> list by Hermit Dave (CC BY-SA 4.0),
            based on OpenSubtitles.
          </p>
          <h2>Original content</h2>
          <p>
            All games, quiz questions, songs, stories, tips and the website design were written for LingoMitra by {OWNER.name}.
          </p>
          <h2>Fonts</h2>
          <p>Plus Jakarta Sans, Noto Sans Gujarati and Noto Sans Devanagari, from Google Fonts (SIL Open Font License).</p>
        </Prose>
      </div>
    </>
  );
}

export function NotFound() {
  const { t } = useI18n();
  useSeo('Page not found', 'This page does not exist. Play free English learning games on LingoMitra.');
  return (
    <div className="container-page py-24 text-center">
      <p className="text-7xl" aria-hidden="true">🧭</p>
      <h1 className="mt-4 text-3xl font-extrabold text-ink">404</h1>
      <p className="mt-2 text-ink-soft">{t('noResults')}</p>
      <Link to="/" className="btn-primary mt-6">
        {t('nav_home')}
      </Link>
    </div>
  );
}
