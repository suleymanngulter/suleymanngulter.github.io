import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import {
  getLocaleFromBrowser,
  LOCALE_STORAGE_KEY,
  translations,
  type Locale,
} from "../i18n/translations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Süleyman Gülter | Backend Developer" },
    {
      name: "description",
      content:
        "Süleyman Gülter - Backend Developer. Projelerim, deneyimlerim ve iletişim bilgilerim.",
    },
  ];
}

const navIds = [
  { href: "#hakkimda", key: "about" as const },
  { href: "#egitim", key: "education" as const },
  { href: "#deneyim", key: "experience" as const },
  { href: "#beceriler", key: "skills" as const },
  { href: "#projeler", key: "projects" as const },
  { href: "#iletisim", key: "contact" as const },
];

const THEME_STORAGE_KEY = "portfolio-theme";

function LanguageSwitcher({
  lang,
  setLanguage,
}: {
  lang: Locale;
  setLanguage: (l: Locale) => void;
}) {
  // Gösterilen bayrak, tıklanınca geçilecek dili temsil eder
  const isEnglish = lang === "en";
  const switchTo = isEnglish ? "tr" : "en";
  const title = isEnglish ? "Türkçe'ye geç" : "Switch to English";
  const flag = isEnglish ? "🇹🇷" : "🇬🇧";

  return (
    <button
      type="button"
      onClick={() => setLanguage(switchTo)}
      title={title}
      aria-label={title}
      className="rounded-lg border border-stone-200 bg-stone-50 p-2 transition-colors hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
    >
      <span className="inline-block text-[1.25rem] leading-none" role="img" aria-hidden>
        {flag}
      </span>
    </button>
  );
}

function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      title={isDark ? "Açık moda geç" : "Koyu moda geç"}
      aria-label={isDark ? "Açık moda geç" : "Koyu moda geç"}
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border border-stone-200 bg-stone-100 p-1 transition-colors hover:border-stone-300 dark:border-stone-600 dark:bg-stone-800 dark:hover:border-stone-500"
    >
      {/* Kaydırılan thumb: açık modda solda (güneş), koyu modda sağda (ay) */}
      <span
        className={`absolute top-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 shadow-sm transition-all duration-300 dark:bg-amber-900/50 ${
          isDark ? "left-1 translate-x-[1.75rem]" : "left-1 translate-x-0"
        }`}
        aria-hidden
      >
        {isDark ? (
          <MoonIcon className="h-4 w-4 text-amber-700 dark:text-amber-300" />
        ) : (
          <SunIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        )}
      </span>
      {/* Arka plandaki ikonlar (görünürlük için) */}
      <span className="sr-only">{isDark ? "Koyu mod" : "Açık mod"}</span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lang, setLang] = useState<Locale>("tr");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getInitialTheme());
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    }
  }, [isDark]);

  useEffect(() => {
    const fromUrl = searchParams.get("lang");
    if (fromUrl === "en" || fromUrl === "tr") {
      setLang(fromUrl);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCALE_STORAGE_KEY, fromUrl);
      }
    } else if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      const next = (stored === "en" || stored === "tr"
        ? stored
        : getLocaleFromBrowser()) as Locale;
      setLang(next);
      setSearchParams({ lang: next }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLanguage(newLang: Locale) {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLang);
      // URL'i replaceState ile güncelle — setSearchParams kullanmıyoruz ki
      // React Router navigasyon tetiklemesin ve sayfa başa atmasın
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLang);
      window.history.replaceState(null, "", url.toString());
    }
  }

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="text-lg font-semibold tracking-tight text-amber-600 dark:text-amber-400"
          >
            Süleyman Gülter
          </a>
          <div className="flex items-center gap-4 sm:gap-6">
            <ul className="flex flex-wrap gap-4 sm:gap-8">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />
              <LanguageSwitcher lang={lang} setLanguage={setLanguage} />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400">
            {t.hero.hello}
          </p>
          <h1 className="mb-4 max-w-2xl text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Süleyman Gülter
          </h1>
          <p className="mb-8 max-w-xl text-center text-lg text-stone-600 dark:text-stone-400">
            {t.hero.tagline}
          </p>
          <div className="flex gap-4">
            <a
              href="#projeler"
              className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
            >
              {t.hero.viewProjects}
            </a>
            <a
              href="#iletisim"
              className="rounded-lg border border-stone-300 px-6 py-3 text-sm font-medium transition-colors hover:border-amber-500 hover:text-amber-600 dark:border-stone-600 dark:hover:border-amber-500 dark:hover:text-amber-400"
            >
              {t.hero.getInTouch}
            </a>
          </div>
        </section>

        {/* About */}
        <section
          id="hakkimda"
          className="border-t border-stone-200 px-6 pt-24 pb-24 dark:border-stone-800"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.about.title}
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-stone-400">
              {t.about.text}
            </p>
          </div>
        </section>

        {/* Education */}
        <section
          id="egitim"
          className="border-t border-stone-200 bg-white px-6 py-24 dark:border-stone-800 dark:bg-stone-900/50"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.education.title}
            </h2>
            <ul className="space-y-8">
              {t.education.items.map((edu) => (
                <li
                  key={edu.school}
                  className="border-l-2 border-amber-500 pl-6"
                >
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {edu.years}
                  </p>
                  {edu.program && (
                    <p className="mt-1 text-stone-600 dark:text-stone-400">
                      {edu.program}
                    </p>
                  )}
                  {edu.gpa && (
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">
                      {t.education.gpa}: {edu.gpa}
                    </p>
                  )}
                  {edu.extra && (
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-500">
                      {edu.extra}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section
          id="deneyim"
          className="border-t border-stone-200 px-6 py-24 dark:border-stone-800"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.experience.title}
            </h2>
            <ul className="space-y-8">
              {t.experience.items.map((exp) => (
                <li
                  key={exp.title + exp.period}
                  className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900/50"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-amber-600 dark:text-amber-400">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-stone-600 dark:text-stone-400">
                    {exp.org}
                  </p>
                  <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {exp.description}
                  </p>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
                    >
                      {t.experience.projectLink} →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section
          id="beceriler"
          className="border-t border-stone-200 bg-white px-6 py-24 dark:border-stone-800 dark:bg-stone-900/50"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.skills.title}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {t.skills.items.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium dark:border-stone-700 dark:bg-stone-800"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projeler"
          className="border-t border-stone-200 px-6 py-24 dark:border-stone-800"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.projects.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.projects.items.map((project) => {
                const href = "github" in project ? project.github : null;
                const Wrapper = href ? "a" : "article";
                const wrapperProps = href
                  ? {
                      href,
                      target: "_blank" as const,
                      rel: "noreferrer",
                      className:
                        "flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md hover:border-amber-400 dark:border-stone-700 dark:bg-stone-900/50 dark:hover:border-amber-500",
                    }
                  : {
                      className:
                        "flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-stone-700 dark:bg-stone-900/50",
                    };
                return (
                  <Wrapper key={project.title} {...wrapperProps}>
                    <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-stone-600 dark:text-stone-400">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tech.map((techItem) => (
                        <span
                          key={techItem}
                          className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                    {href && (
                      <span className="mt-auto text-sm font-medium text-amber-600 dark:text-amber-400">
                        {t.projects.viewOnGitHub} →
                      </span>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="iletisim"
          className="border-t border-stone-200 bg-white px-6 py-24 dark:border-stone-800 dark:bg-stone-900/50"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.contact.title}
            </h2>
            <p className="mb-8 text-stone-600 dark:text-stone-400">
              {t.contact.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a
                href="tel:+905316287072"
                className="flex items-center gap-2 text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
              >
                <PhoneIcon className="h-5 w-5" />
                +90 531 628 70 72
              </a>
              <a
                href="mailto:suleymangulter2@gmail.com"
                className="flex items-center gap-2 text-amber-600 hover:underline dark:text-amber-400"
              >
                <MailIcon className="h-5 w-5" />
                suleymangulter2@gmail.com
              </a>
              <a
                href="https://github.com/suleymanngulter/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
              >
                <GitHubIcon className="h-5 w-5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/suleymanngulter/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
              >
                <LinkedInIcon className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
            <p className="mt-6 text-sm text-stone-500 dark:text-stone-500">
              {t.contact.location}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 px-6 py-8 text-center text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400">
        © {new Date().getFullYear()} Süleyman Gülter. {t.footer.rights}
      </footer>
    </div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
