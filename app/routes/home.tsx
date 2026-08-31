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
      className="rounded-md border border-border bg-surface p-2 transition-colors hover:border-primary hover:bg-primary-soft"
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
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border border-border bg-surface p-1 transition-colors hover:border-primary/50"
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
    <div className="mb-8 sm:mb-10">
      <p className="section-label mb-2">{label}</p>
      <h2 className="section-title">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
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
    <div className="agentic-bg min-h-screen text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/85 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="font-display text-lg font-bold text-primary">
            SG.
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex gap-6">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a href={href} className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted transition-colors hover:text-primary">
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
              className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted hover:border-primary hover:text-primary"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-surface px-4 py-3 lg:hidden">
            <ul className="flex flex-col gap-1">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block min-h-[44px] rounded-md px-3 py-3 font-mono text-xs uppercase tracking-widest text-muted hover:bg-primary-soft hover:text-primary"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero — Agentic split layout */}
        <section className="flex min-h-screen flex-col justify-center pb-20 pt-24 lg:pt-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
                {roleLabel}
              </span>
              <p className="section-label mb-3">{t.hero.hello}</p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Süleyman
                <span className="block text-primary">Gülter</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {t.hero.tagline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#projeler" className="agentic-btn-primary w-full sm:w-auto">
                  {t.hero.viewProjects}
                </a>
                <a href="#iletisim" className="agentic-btn-outline w-full sm:w-auto">
                  {t.hero.getInTouch}
                </a>
              </div>
            </div>
            <div className="agentic-card-accent hidden lg:block">
              <p className="section-label mb-4">{lang === "tr" ? "Odak" : "Focus"}</p>
              <ul className="space-y-4 font-mono text-sm">
                {["Node.js", "Clean Architecture", "Microservices", ".NET Core", "AI / RAG"].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                    <span className="text-primary">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="hakkimda" className="border-t border-border py-16 sm:py-24">
          <SectionHeader label={lang === "tr" ? "01 — Profil" : "01 — Profile"} title={t.about.title} />
          <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg md:text-xl">
            {t.about.text}
          </p>
        </section>

        <section id="egitim" className="border-t border-border py-16 sm:py-24">
          <SectionHeader label={lang === "tr" ? "02 — Eğitim" : "02 — Education"} title={t.education.title} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.education.items.map((edu) => (
              <li key={edu.school} className="agentic-card">
                <h3 className="font-display text-xl font-semibold">{edu.school}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">{edu.years}</p>
                {edu.program && <p className="mt-2 text-sm text-muted">{edu.program}</p>}
                {edu.gpa && (
                  <p className="mt-2 font-mono text-sm text-muted">
                    {t.education.gpa}: <span className="font-semibold text-foreground">{edu.gpa}</span>
                  </p>
                )}
                {edu.extra && <p className="mt-1 text-sm text-muted">{edu.extra}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section id="deneyim" className="border-t border-border py-16 sm:py-24">
          <SectionHeader label={lang === "tr" ? "03 — Kariyer" : "03 — Career"} title={t.experience.title} />
          <ul className="relative space-y-0">
            <div className="absolute bottom-4 left-[7px] top-4 hidden w-0.5 bg-primary/30 sm:block" aria-hidden />
            {t.experience.items.map((exp, i) => (
              <li key={exp.title + exp.period} className="relative pb-8 sm:pl-10 sm:pb-10">
                <span className="absolute left-0 top-2 hidden h-4 w-4 rounded-full border-2 border-primary bg-surface sm:block" aria-hidden />
                <div className={`agentic-card ${i === 0 ? "border-primary/40 bg-primary-soft/30" : ""}`}>
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold">{exp.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-wider text-primary">{exp.period}</span>
                  </div>
                  <p className="mb-2 text-sm font-medium text-muted">{exp.org}</p>
                  <p className="text-sm leading-relaxed text-muted">{exp.description}</p>
                  {exp.link && (
                    <a href={exp.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                      {t.experience.projectLink} →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="beceriler" className="border-t border-border py-16 sm:py-24">
          <SectionHeader label={lang === "tr" ? "04 — Yetkinlik" : "04 — Skills"} title={t.skills.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {t.skills.categories.map((category) => (
              <div key={category.name} className="agentic-card">
                <h3 className="section-label mb-3">{category.name}</h3>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <li key={skill} className="rounded-md bg-secondary px-3 py-1.5 font-mono text-xs text-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projeler" className="border-t border-border py-16 sm:py-24">
          <SectionHeader label={lang === "tr" ? "05 — Projeler" : "05 — Projects"} title={t.projects.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.projects.items.map((project, i) => {
              const href = project.github ?? null;
              const Wrapper = href ? "a" : "article";
              const isFeatured = i === 0;
              return (
                <Wrapper
                  key={project.title}
                  {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
                  className={`agentic-card flex flex-col ${isFeatured ? "sm:col-span-2 lg:col-span-3 border-primary/30 bg-primary-soft/20" : ""} ${href ? "hover:border-primary" : ""}`}
                >
                  {isFeatured && (
                    <span className="section-label mb-2">{lang === "tr" ? "Güncel" : "Latest"}</span>
                  )}
                  <h3 className="font-display text-lg font-semibold sm:text-xl">{project.title}</h3>
                  <p className="mb-4 mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {href && (
                    <span className="text-sm font-semibold text-primary">{t.projects.viewOnGitHub} →</span>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </section>

        <section id="iletisim" className="border-t border-border py-16 sm:py-24">
          <SectionHeader label={lang === "tr" ? "06 — İletişim" : "06 — Contact"} title={t.contact.title} />
          <p className="mb-8 max-w-xl text-muted">{t.contact.subtitle}</p>
          <div className="agentic-card-accent max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="mailto:suleymangulter2@gmail.com" className="flex min-h-[44px] items-center gap-3 text-primary hover:underline">
                <MailIcon className="h-5 w-5 shrink-0" />
                <span className="break-all text-sm">suleymangulter2@gmail.com</span>
              </a>
              <a href="https://github.com/suleymanngulter/" target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center gap-3 text-muted hover:text-primary">
                <GitHubIcon className="h-5 w-5 shrink-0 text-primary" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/suleymanngulter/" target="_blank" rel="noreferrer" className="flex min-h-[44px] items-center gap-3 text-muted hover:text-primary">
                <LinkedInIcon className="h-5 w-5 shrink-0 text-primary" />
                LinkedIn
              </a>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">{t.contact.location}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
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
