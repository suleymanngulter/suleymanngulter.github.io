import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import {
  getLocaleFromBrowser,
  LOCALE_STORAGE_KEY,
  translations,
  formatDateRange,
  type Locale,
} from "../i18n/translations";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "../site";

export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    { name: "description", content: SITE_DESCRIPTION },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "author", content: SITE_NAME },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/` },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: SITE_TITLE },
    { property: "og:description", content: SITE_DESCRIPTION },
    { property: "og:url", content: `${SITE_URL}/` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "tr_TR" },
    { property: "og:locale:alternate", content: "en_US" },
    { property: "og:image", content: OG_IMAGE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SITE_TITLE },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:image", content: OG_IMAGE },
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

  return (
    <button
      type="button"
      onClick={() => setLanguage(switchTo)}
      title={title}
      aria-label={title}
      className="sp-btn-text"
    >
      {isEnglish ? "TR" : "EN"}
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
      className="sp-btn-icon"
    >
      {isLight ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="sp-check" aria-hidden>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function readStoredTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark") localStorage.setItem(THEME_STORAGE_KEY, "demo");
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
      if (typeof window !== "undefined") localStorage.setItem(LOCALE_STORAGE_KEY, fromUrl);
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

  return (
    <div className="sp-shell">
      <header className="sp-header">
        <nav className="sp-container sp-nav" aria-label="Primary">
          <a href="#" className="sp-logo" aria-label="Süleyman Gülter">
            <img src="/logo-mark.png" alt="" className="sp-logo-mark-img" width={36} height={52} />
            <img
              src="/logo-wordmark.png"
              alt="Süleyman Gülter"
              className="sp-logo-wordmark"
              width={188}
              height={28}
            />
          </a>
          <ul className="sp-nav-links">
            {navIds.map(({ href, key }) => (
              <li key={href}>
                <a href={href} className="sp-nav-link">
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="sp-nav-actions">
            <ThemeToggle isLight={isLight} toggle={() => setIsLight((p) => !p)} />
            <LanguageSwitcher lang={lang} setLanguage={setLanguage} />
            <a href="#iletisim" className="sp-btn sp-btn-primary sp-desktop-cta">
              {t.hero.getInTouch}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              className="sp-btn-icon sp-menu-btn"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="sp-mobile-menu sp-mobile-panel">
            <ul className="flex flex-col gap-1">
              {navIds.map(({ href, key }) => (
                <li key={href}>
                  <a href={href} onClick={() => setMenuOpen(false)} className="block min-h-12 px-2 py-3 sp-nav-link">
                    {t.nav[key]}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a href="#iletisim" onClick={() => setMenuOpen(false)} className="sp-btn sp-btn-primary w-full">
                  {t.hero.getInTouch}
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main>
        <section className="sp-hero sp-container">
          <p className="sp-eyebrow mb-6">{t.hero.hello}</p>
          <h1 className="sp-h1 max-w-5xl">Süleyman Gülter</h1>
          <p className="sp-lead mx-auto mb-10">{t.hero.tagline}</p>
          <div className="sp-cta-row">
            <a href="#projeler" className="sp-btn sp-btn-primary">
              {t.hero.viewProjects} →
            </a>
            <a href="#iletisim" className="sp-btn sp-btn-ghost">
              {t.hero.getInTouch}
            </a>
          </div>
        </section>

        <section id="hakkimda" className="sp-section sp-container">
          <p className="sp-eyebrow mb-4 text-center">{lang === "tr" ? "Profil" : "Profile"}</p>
          <h2 className="sp-h2 mx-auto max-w-3xl text-center">{t.about.title}</h2>
          <p className="sp-lead mx-auto mb-10 text-center md:mb-16 lg:mb-20">{t.about.text}</p>
          <div className="sp-grid md:grid-cols-3">
            <article>
              <span className="sp-icon-ring" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <h3 className="sp-h4">{t.contact.location}</h3>
              <p className="sp-body">
                {lang === "tr"
                  ? "Düzce Üniversitesi Bilgisayar Mühendisliği. GPA 3.23."
                  : "Computer Engineering at Düzce University. GPA 3.23."}
              </p>
            </article>
            <article>
              <span className="sp-icon-ring" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <h3 className="sp-h4">Backend</h3>
              <p className="sp-body">
                {lang === "tr"
                  ? "Node.js, .NET Core, clean architecture ve mikroservis."
                  : "Node.js, .NET Core, clean architecture, and microservices."}
              </p>
            </article>
            <article>
              <span className="sp-icon-ring" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </span>
              <h3 className="sp-h4">{lang === "tr" ? "Odak" : "Focus"}</h3>
              <p className="sp-body">
                {lang === "tr"
                  ? "Verimlilik, sürdürülebilirlik ve toplumsal fayda."
                  : "Efficiency, sustainability, and social benefit."}
              </p>
            </article>
          </div>
        </section>

        <section id="egitim" className="sp-section sp-container">
          <p className="sp-eyebrow mb-4 text-center">{lang === "tr" ? "Eğitim" : "Education"}</p>
          <h2 className="sp-h2 text-center">{t.education.title}</h2>
          <ul className="sp-grid md:grid-cols-3">
            {t.education.items.map((edu) => (
              <li key={edu.school} className="sp-card">
                <h3 className="sp-h4 mb-4">{edu.school}</h3>
                <p className="sp-caption mb-6">{formatDateRange(lang, edu.dateRange)}</p>
                {edu.program && <p className="sp-body mb-4">{edu.program}</p>}
                {edu.gpa && (
                  <p className="sp-body">
                    {t.education.gpa}: {edu.gpa}
                  </p>
                )}
                {edu.extra && <p className="sp-caption mt-4">{edu.extra}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section id="deneyim" className="sp-section sp-container">
          <p className="sp-eyebrow mb-4 text-center">{lang === "tr" ? "Kariyer" : "Career"}</p>
          <h2 className="sp-h2 text-center">{t.experience.title}</h2>
          <ul className="sp-grid md:grid-cols-2 lg:grid-cols-3">
            {t.experience.items.map((exp) => (
              <li key={exp.title + formatDateRange(lang, exp.dateRange)} className="sp-card flex flex-col">
                <p className="sp-quote" aria-hidden>
                  ”
                </p>
                <h3 className="sp-h4">{exp.title}</h3>
                <p className="sp-body flex-1">{exp.description}</p>
                <p className="mt-8 text-sm text-[var(--text)]">
                  {exp.org}
                  <span className="sp-caption"> · {formatDateRange(lang, exp.dateRange)}</span>
                </p>
                {exp.link && (
                  <a href={exp.link} target="_blank" rel="noreferrer" className="sp-link mt-4">
                    {t.experience.projectLink} ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="beceriler" className="sp-section sp-container">
          <p className="sp-eyebrow mb-4 text-center">{lang === "tr" ? "Yetkinlik" : "Skills"}</p>
          <h2 className="sp-h2 text-center">{t.skills.title}</h2>
          <div className="sp-grid md:grid-cols-2">
            {t.skills.categories.map((category) => (
              <div key={category.name} className="sp-card">
                <h3 className="sp-h4">{category.name}</h3>
                <ul className="flex flex-col gap-4">
                  {category.items.map((skill) => (
                    <li key={skill} className="flex items-start gap-3 text-[var(--text)]">
                      <CheckIcon />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projeler" className="sp-section sp-container">
          <p className="sp-eyebrow mb-4 text-center">{lang === "tr" ? "Projeler" : "Projects"}</p>
          <h2 className="sp-h2 text-center">{t.projects.title}</h2>
          <div className="sp-grid md:grid-cols-2 lg:grid-cols-3">
            {t.projects.items.map((project, index) => {
              const href = project.github ?? null;
              const featured = index === 0;
              return (
                <article key={project.title} className="sp-card flex flex-col">
                  {featured && (
                    <span className="sp-badge mb-6">{lang === "tr" ? "Öne çıkan" : "Featured"}</span>
                  )}
                  <h3 className="sp-h4">{project.title}</h3>
                  <p className="sp-body flex-1">{project.description}</p>
                  <ul className="mt-8 flex flex-col gap-3">
                    {project.tech.map((tech) => (
                      <li key={tech} className="flex items-center gap-3 text-sm text-[var(--text)]">
                        <CheckIcon />
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className={`sp-btn mt-8 w-full ${featured ? "sp-btn-primary" : "sp-btn-ghost"}`}>
                      {t.projects.viewOnGitHub} →
                    </a>
                  ) : (
                    <span className={`sp-btn mt-8 w-full ${featured ? "sp-btn-primary" : "sp-btn-ghost"}`}>
                      {featured ? (lang === "tr" ? "Üretimde" : "In production") : t.projects.live}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section id="iletisim" className="sp-section sp-container">
          <div className="grid min-w-0 items-start gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="sp-eyebrow mb-4">{t.contact.eyebrow}</p>
              <h2 className="sp-h2">{t.contact.title}</h2>
              <p className="sp-lead mb-10">{t.contact.subtitle}</p>
              <ul className="flex flex-col gap-4">
                {t.contact.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[var(--text)]">
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sp-card">
              <h3 className="sp-h4">{t.contact.formTitle}</h3>
              <p className="sp-body mb-8">{t.contact.formHint}</p>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="sp-label">{lang === "tr" ? "E-posta" : "Work email"}</span>
                  <a href="mailto:suleymangulter2@gmail.com" className="sp-field break-all">
                    <MailIcon className="h-5 w-5 shrink-0 text-[var(--primary)]" />
                    suleymangulter2@gmail.com
                  </a>
                </div>
                <a href="mailto:suleymangulter2@gmail.com" className="sp-btn sp-btn-primary w-full">
                  {t.contact.send} →
                </a>
                <div className="sp-social-links">
                  <a href="https://github.com/suleymanngulter/" target="_blank" rel="noreferrer" className="sp-social-link">
                    <GitHubIcon className="h-5 w-5" />
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/suleymanngulter/" target="_blank" rel="noreferrer" className="sp-social-link">
                    <LinkedInIcon className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
                <p className="sp-caption">{t.contact.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="sp-container sp-caption py-10 text-center md:py-16">
        © {new Date().getFullYear()} Süleyman Gülter. {t.footer.rights}
      </footer>
    </div>
  );
}
