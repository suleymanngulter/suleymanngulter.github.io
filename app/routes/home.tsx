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
    { title: "Süleyman Gülter | Software Engineer" },
    {
      name: "description",
      content:
        "Süleyman Gülter - Software Engineer. Projelerim, deneyimlerim ve iletişim bilgilerim.",
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
      className="spacious-btn-outline min-h-[44px] px-3 py-2"
    >
      <span className="text-[1.25rem] leading-none" role="img" aria-hidden>
        {flag}
      </span>
    </button>
  );
}

function ThemeToggle({ isLight, toggle }: { isLight: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      title={isLight ? "Koyu moda geç" : "Açık moda geç"}
      aria-label={isLight ? "Koyu moda geç" : "Açık moda geç"}
      aria-pressed={isLight}
      className={`spacious-theme-toggle${isLight ? " is-light" : ""}`}
    >
      <span className="spacious-theme-thumb" aria-hidden>
        {isLight ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      </span>
      <span className="sr-only">{isLight ? "Açık mod" : "Koyu mod"}</span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SectionIntro({
  eyebrow,
  title,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-16 md:mb-20 lg:mb-24 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}>
      <p className="spacious-eyebrow mb-4">{eyebrow}</p>
      <h2 className="spacious-heading-lg">{title}</h2>
    </div>
  );
}

function readStoredTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark") {
    localStorage.setItem(THEME_STORAGE_KEY, "demo");
  }
  return stored === "light";
}

function applyTheme(isLight: boolean) {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.toggle("light", isLight);
  localStorage.setItem(THEME_STORAGE_KEY, isLight ? "light" : "demo");
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lang, setLang] = useState<Locale>("tr");
  const [isLight, setIsLight] = useState(readStoredTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    applyTheme(isLight);
  }, [isLight]);

  useEffect(() => {
    const fromUrl = searchParams.get("lang");
    if (fromUrl === "en" || fromUrl === "tr") {
      setLang(fromUrl);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCALE_STORAGE_KEY, fromUrl);
      }
    } else if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      const next = (stored === "en" || stored === "tr" ? stored : getLocaleFromBrowser()) as Locale;
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
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLang);
      window.history.replaceState(null, "", url.toString());
    }
  }

  const t = translations[lang];
  const roleLabel = lang === "tr" ? "Yazılım Mühendisi" : "Software Engineer";

  return (
    <div className="spacious-shell spacious-hero-glow min-h-screen">
      <header className="spacious-header fixed top-0 left-0 right-0 z-50">
        <nav className="spacious-container flex items-center justify-between py-6 md:py-8">
          <a href="#" className="spacious-logo">
            <span className="spacious-logo-mark" aria-hidden>+</span>
            Süleyman Gülter
          </a>
          <div className="hidden items-center gap-10 lg:flex">
            <ul className="flex gap-8">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a href={href} className="spacious-nav-link">
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <ThemeToggle isLight={isLight} toggle={() => setIsLight((p) => !p)} />
              <LanguageSwitcher lang={lang} setLanguage={setLanguage} />
              <a href="#iletisim" className="spacious-btn-primary">
                {t.hero.getInTouch}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle isLight={isLight} toggle={() => setIsLight((p) => !p)} />
            <LanguageSwitcher lang={lang} setLanguage={setLanguage} />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              className="spacious-btn-outline min-h-[44px] min-w-[44px] px-3"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="spacious-divider border-t spacious-shell px-8 py-6 lg:hidden">
            <ul className="flex flex-col gap-2">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block min-h-[48px] rounded-lg px-4 py-3 spacious-nav-link"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#iletisim" onClick={() => setMenuOpen(false)} className="spacious-btn-primary w-full">
                  {t.hero.getInTouch}
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main>
        <section className="spacious-section spacious-container flex min-h-screen flex-col items-center justify-center pt-28 text-center md:pt-32">
          <p className="spacious-eyebrow mb-6">{t.hero.hello}</p>
          <h1 className="spacious-heading-xl max-w-4xl">Süleyman Gülter</h1>
          <p className="spacious-role mt-6">{roleLabel}</p>
          <p className="spacious-body-lg mx-auto mt-8 max-w-2xl">{t.hero.tagline}</p>
          <div className="mt-12 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center">
            <a href="#projeler" className="spacious-btn-primary w-full sm:w-auto">
              {t.hero.viewProjects}
            </a>
            <a href="#iletisim" className="spacious-btn-outline w-full sm:w-auto">
              {t.hero.getInTouch}
            </a>
          </div>
        </section>

        <section id="hakkimda" className="spacious-section spacious-container">
          <SectionIntro eyebrow={lang === "tr" ? "Profil" : "Profile"} title={t.about.title} />
          <p className="spacious-body-lg mx-auto max-w-3xl text-center">{t.about.text}</p>
        </section>

        <section id="egitim" className="spacious-section spacious-container">
          <SectionIntro eyebrow={lang === "tr" ? "Eğitim" : "Education"} title={t.education.title} />
          <ul className="spacious-grid md:grid-cols-2 lg:grid-cols-3">
            {t.education.items.map((edu) => (
              <li key={edu.school} className="spacious-card">
                <h3 className="spacious-heading-md">{edu.school}</h3>
                <p className="spacious-eyebrow mt-4">{edu.years}</p>
                {edu.program && <p className="spacious-body mt-4">{edu.program}</p>}
                {edu.gpa && (
                  <p className="spacious-body mt-3">
                    {t.education.gpa}: <strong>{edu.gpa}</strong>
                  </p>
                )}
                {edu.extra && <p className="spacious-body mt-2 text-sm">{edu.extra}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section id="deneyim" className="spacious-section spacious-container">
          <SectionIntro eyebrow={lang === "tr" ? "Kariyer" : "Career"} title={t.experience.title} />
          <ul className="spacious-grid mx-auto max-w-4xl">
            {t.experience.items.map((exp) => (
              <li key={exp.title + exp.period} className="spacious-card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="spacious-heading-md">{exp.title}</h3>
                  <span className="spacious-tag-accent">{exp.period}</span>
                </div>
                <p className="spacious-text-primary mt-4 text-base font-normal">{exp.org}</p>
                <p className="spacious-body mt-6 max-w-3xl">{exp.description}</p>
                {exp.link && (
                  <a href={exp.link} target="_blank" rel="noreferrer" className="spacious-link mt-6 inline-block">
                    {t.experience.projectLink} →
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="beceriler" className="spacious-section spacious-container">
          <SectionIntro eyebrow={lang === "tr" ? "Yetkinlik" : "Skills"} title={t.skills.title} />
          <div className="spacious-grid md:grid-cols-2">
            {t.skills.categories.map((category) => (
              <div key={category.name}>
                <h3 className="spacious-eyebrow mb-6">{category.name}</h3>
                <ul className="flex flex-wrap gap-3 md:gap-4">
                  {category.items.map((skill) => (
                    <li key={skill} className="spacious-tag">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projeler" className="spacious-section spacious-container">
          <SectionIntro eyebrow={lang === "tr" ? "Projeler" : "Projects"} title={t.projects.title} />
          <div className="spacious-grid md:grid-cols-2 lg:grid-cols-3">
            {t.projects.items.map((project) => {
              const href = project.github ?? null;
              const Wrapper = href ? "a" : "article";
              return (
                <Wrapper
                  key={project.title}
                  {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
                  className={`spacious-card flex flex-col ${href ? "transition-shadow hover:shadow-sm" : ""}`}
                >
                  <h3 className="spacious-heading-md">{project.title}</h3>
                  <p className="spacious-body mt-6 flex-1">{project.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="spacious-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {href && <span className="spacious-link mt-8 inline-block">{t.projects.viewOnGitHub} →</span>}
                </Wrapper>
              );
            })}
          </div>
        </section>

        <section id="iletisim" className="spacious-section spacious-container">
          <SectionIntro eyebrow={lang === "tr" ? "İletişim" : "Contact"} title={t.contact.title} />
          <p className="spacious-body-lg mx-auto mb-16 max-w-xl text-center md:mb-20">{t.contact.subtitle}</p>
          <div className="spacious-card mx-auto max-w-3xl">
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              <a href="mailto:suleymangulter2@gmail.com" className="spacious-contact-row spacious-text-primary">
                <MailIcon className="h-5 w-5 shrink-0" />
                <span className="break-all text-sm">suleymangulter2@gmail.com</span>
              </a>
              <a href="https://github.com/suleymanngulter/" target="_blank" rel="noreferrer" className="spacious-contact-row">
                <GitHubIcon className="spacious-icon-primary h-5 w-5 shrink-0" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/suleymanngulter/" target="_blank" rel="noreferrer" className="spacious-contact-row">
                <LinkedInIcon className="spacious-icon-primary h-5 w-5 shrink-0" />
                LinkedIn
              </a>
            </div>
            <p className="spacious-eyebrow mt-12 text-center">{t.contact.location}</p>
          </div>
        </section>
      </main>

      <footer className="spacious-container spacious-caption py-12 text-center md:py-16">
        © {new Date().getFullYear()} Süleyman Gülter. {t.footer.rights}
      </footer>
    </div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
