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
      className="rounded-lg border border-border bg-surface p-2.5 transition-colors hover:border-primary hover:bg-primary-soft"
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
      className="relative flex h-10 w-16 shrink-0 items-center rounded-full border border-border bg-surface p-1 transition-colors hover:border-primary/50"
    >
      <span
        className={`absolute top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-all duration-300 ${
          isDark ? "left-1 translate-x-[1.75rem]" : "left-1 translate-x-0"
        }`}
        aria-hidden
      >
        {isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
      </span>
      <span className="sr-only">{isDark ? "Koyu mod" : "Açık mod"}</span>
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

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12 max-w-2xl sm:mb-16">
      <p className="section-label mb-4">{label}</p>
      <h2 className="section-title">{title}</h2>
    </div>
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
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
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
    <div className="spacious-page min-h-screen text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-page/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
          <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
            Süleyman Gülter
          </a>
          <div className="hidden items-center gap-10 lg:flex">
            <ul className="flex gap-8">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm font-medium text-muted transition-colors hover:text-primary"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <ThemeToggle isDark={isDark} toggle={() => setIsDark((p) => !p)} />
              <LanguageSwitcher lang={lang} setLanguage={setLanguage} />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle isDark={isDark} toggle={() => setIsDark((p) => !p)} />
            <LanguageSwitcher lang={lang} setLanguage={setLanguage} />
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted hover:border-primary hover:text-primary"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-page px-6 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block min-h-[48px] rounded-lg px-4 py-3 text-sm font-medium text-muted hover:bg-primary-soft hover:text-primary"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main>
        {/* Hero — one composition, generous air */}
        <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-24 pt-28 sm:px-8 lg:px-10 lg:pb-32 lg:pt-32">
          <p className="section-label mb-6">{t.hero.hello}</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Süleyman Gülter
          </h1>
          <p className="mt-4 font-display text-2xl font-medium text-primary sm:text-3xl md:text-4xl">
            {roleLabel}
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {t.hero.tagline}
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#projeler" className="spacious-btn-primary w-full sm:w-auto">
              {t.hero.viewProjects}
            </a>
            <a href="#iletisim" className="spacious-btn-outline w-full sm:w-auto">
              {t.hero.getInTouch}
            </a>
          </div>
        </section>

        <section id="hakkimda" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10">
            <SectionHeader
              label={lang === "tr" ? "01 — Profil" : "01 — Profile"}
              title={t.about.title}
            />
            <p className="max-w-3xl text-lg leading-[1.8] text-muted sm:text-xl">
              {t.about.text}
            </p>
          </div>
        </section>

        <section id="egitim" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10">
            <SectionHeader
              label={lang === "tr" ? "02 — Eğitim" : "02 — Education"}
              title={t.education.title}
            />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {t.education.items.map((edu) => (
                <li key={edu.school} className="space-y-3">
                  <h3 className="font-display text-xl font-semibold">{edu.school}</h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-primary">
                    {edu.years}
                  </p>
                  {edu.program && <p className="text-muted">{edu.program}</p>}
                  {edu.gpa && (
                    <p className="text-sm text-muted">
                      {t.education.gpa}:{" "}
                      <span className="font-semibold text-foreground">{edu.gpa}</span>
                    </p>
                  )}
                  {edu.extra && <p className="text-sm text-muted">{edu.extra}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="deneyim" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10">
            <SectionHeader
              label={lang === "tr" ? "03 — Kariyer" : "03 — Career"}
              title={t.experience.title}
            />
            <ul className="mx-auto max-w-3xl space-y-16">
              {t.experience.items.map((exp) => (
                <li key={exp.title + exp.period} className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold">{exp.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-base font-medium text-muted">{exp.org}</p>
                  <p className="max-w-2xl text-base leading-relaxed text-muted">
                    {exp.description}
                  </p>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      {t.experience.projectLink} →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="beceriler" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10">
            <SectionHeader
              label={lang === "tr" ? "04 — Yetkinlik" : "04 — Skills"}
              title={t.skills.title}
            />
            <div className="grid gap-12 sm:grid-cols-2 lg:gap-16">
              {t.skills.categories.map((category) => (
                <div key={category.name}>
                  <h3 className="section-label mb-5">{category.name}</h3>
                  <ul className="flex flex-wrap gap-3">
                    {category.items.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-lg border border-border px-4 py-2 text-sm text-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projeler" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10">
            <SectionHeader
              label={lang === "tr" ? "05 — Projeler" : "05 — Projects"}
              title={t.projects.title}
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {t.projects.items.map((project) => {
                const href = project.github ?? null;
                const Wrapper = href ? "a" : "article";
                return (
                  <Wrapper
                    key={project.title}
                    {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
                    className={`spacious-card flex flex-col ${href ? "hover:border-primary" : ""}`}
                  >
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    <p className="mb-6 mt-4 flex-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-primary-soft px-2.5 py-1 font-mono text-xs text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {href && (
                      <span className="text-sm font-semibold text-primary">
                        {t.projects.viewOnGitHub} →
                      </span>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>

        <section id="iletisim" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10">
            <SectionHeader
              label={lang === "tr" ? "06 — İletişim" : "06 — Contact"}
              title={t.contact.title}
            />
            <p className="mb-12 max-w-xl text-lg text-muted">{t.contact.subtitle}</p>
            <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
              <a
                href="mailto:suleymangulter2@gmail.com"
                className="flex min-h-[48px] items-center gap-3 text-primary hover:underline"
              >
                <MailIcon className="h-5 w-5 shrink-0" />
                <span className="break-all text-sm">suleymangulter2@gmail.com</span>
              </a>
              <a
                href="https://github.com/suleymanngulter/"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[48px] items-center gap-3 text-muted transition-colors hover:text-primary"
              >
                <GitHubIcon className="h-5 w-5 shrink-0 text-primary" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/suleymanngulter/"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[48px] items-center gap-3 text-muted transition-colors hover:text-primary"
              >
                <LinkedInIcon className="h-5 w-5 shrink-0 text-primary" />
                LinkedIn
              </a>
            </div>
            <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted">
              {t.contact.location}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted">
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
