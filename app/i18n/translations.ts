export type Locale = "tr" | "en";

export const translations = {
  tr: {
    nav: {
      about: "Hakkımda",
      education: "Eğitim",
      experience: "Deneyim",
      skills: "Beceriler",
      projects: "Projeler",
      contact: "İletişim",
    },
    hero: {
      hello: "Merhaba, ben",
      tagline:
        "Backend Developer · .NET · Mikroservis · Verimlilik ve sürdürülebilirlik odaklı çözümler üretiyorum.",
      viewProjects: "Projeleri Gör",
      getInTouch: "İletişime Geç",
    },
    about: {
      title: "Hakkımda",
      text: "İnsan hayatına ve topluma fayda sağlamaktan keyif alıyorum. Günümüz dünyasında bunu yapmanın en etkili yolunun Bilgisayar Mühendisi olarak çalışmak olduğuna inanıyorum. İşimi yaparken hayata en verimli yansımayı hedefliyorum. Her proje analizi ve tasarımında, verimlilik, sürdürülebilirlik ve toplumsal faydayı öncelikli hedeflerim olarak ön planda tutarak, en makul maliyetlerle en iyi sonuçları sunmaya çalışıyorum.",
    },
    education: {
      title: "Eğitim",
      gpa: "GPA",
      items: [
        {
          school: "Düzce Üniversitesi",
          years: "2022-2026",
          program: "Bilgisayar Mühendisliği",
          gpa: "3.19",
          extra: null as string | null,
        },
        {
          school: "Dumlupınar Üniversitesi",
          years: "2021-2022",
          program: "Bilgisayar Mühendisliği İngilizce Hazırlık",
          gpa: "3.01",
          extra: "Pearson B1 İngilizce Sertifikası",
        },
        {
          school: "Karamürsel Anadolu Lisesi",
          years: "2017-2021",
          program: "",
          gpa: "",
          extra: null as string | null,
        },
      ],
    },
    experience: {
      title: "Deneyim",
      projectLink: "Proje linki",
      items: [
        {
          title: "Entrepreneurship Marathon",
          period: "2025",
          org: "Düzce Teknopark",
          description:
            "SATaiLITE sel riski tespit sistemi ile finalist olarak katıldım. Girişimcilik, iş fikri geliştirme, iş modelleri ve hedef kitle belirleme konularında deneyim kazandım.",
          link: "https://github.com/suleymanngulter/SATaiLITE-StartUp",
        },
        {
          title: "GDG On Campus Düzce Üniversitesi Hackathon Koordinatörü",
          period: "2024-2025",
          org: "Düzce Üniversitesi",
          description:
            "Hackathon Koordinatörü olarak, mülakat sürecinde en verimli ekip üyelerinin yalnızca yüksek teknik becerilere sahip olanlar değil, her alanda kendini geliştirmeye açık olanlar olduğunu öğrendim. Ekibimde açık fikirliliği teşvik eden bir ortam oluşturdum ve çözüm odaklı bir bakış açısı kazandırdım.",
          link: null as string | null,
        },
        {
          title: "Backend Developer Stajyer",
          period: "2024",
          org: "Tersan Tersanesi",
          description:
            "ERP Programlama alanında çalıştım. .NET Core Web API, Mikroservis Mimarisi ve DevOps süreçleri ile Backend geliştirme deneyimi kazandım.",
          link: null as string | null,
        },
        {
          title: "Mobile Developer Stajyer",
          period: "2024",
          org: "TBA Academy",
          description: "Flutter kullanarak mobil uygulama geliştirme stajı tamamladım.",
          link: null as string | null,
        },
        {
          title: "Entrepreneurship Marathon",
          period: "2024",
          org: "Düzce Teknopark",
          description:
            "TarlaBot, insansız tarım aracı projesi ile finalist ekipler arasında yer aldım. Fikir geliştirme ve ekip çalışması konularında önemli deneyim kazandım.",
          link: "https://github.com/suleymanngulter/TarlaBotStartUp",
        },
      ],
    },
    skills: {
      title: "Beceriler",
      items: [
        "Organization",
        "Teamwork",
        "Node.js",
        ".NET",
        "Presentation",
        "Innovative Thinking",
        "Flutter",
        "Docker",
        "Excel",
        "Microservices",
        "Java",
        "Entity Framework",
        "Multitier Architecture",
        "Management",
      ],
    },
    projects: {
      title: "Projeler",
      live: "Canlı",
      viewOnGitHub: "GitHub'da gör",
      items: [
        {
          title: "Fitness Automation",
          description:
            ".NET Framework, MSSQL ve Entity Framework ile masaüstü fitness yönetim uygulaması.",
          tech: [".NET", "MSSQL", "Entity Framework"],
          github: "https://github.com/suleymanngulter/fitness-otomasyonu"
        },
        {
          title: "Library Automation",
          description: "Flutter ile geliştirilmiş kütüphane yönetim uygulaması.",
          tech: ["Flutter"],
          github: "https://github.com/suleymanngulter/kutuphane_otomasyonu",
        },
        {
          title: "Income/Expense Analysis App",
          description:
            ".NET Core Web API, Entity Framework, MySQL, REST API ve Authentication ile masaüstü finansal yönetim uygulaması.",
          tech: [".NET Core", "Entity Framework", "MySQL", "REST API"],
          github: "https://github.com/suleymanngulter/GelirGiderAnalizi"
        },
        {
          title: "Assistant API",
          description:
            "Gelen kutunuzdaki okunmamış e-postaları ChatGPT API ile özetleyen yapay zeka asistanı. .NET Core Web API ile geliştirildi.",
          tech: [".NET Core", "ChatGPT API"],
          github: "https://github.com/suleymanngulter/AsistanAPI",
        },
        {
          title: "Library Management System",
          description:
            "React arayüzü, Mikroservis mimarisi ve içerik/profil tabanlı öneriler için Python tabanlı yapay zeka (MongoDB, Authentication).",
          tech: ["React", "Microservices", "Python", "MongoDB"],
          github: "https://github.com/suleymanngulter/LMS",
        },
        {
          title: "Real Estate & Car Rental System Analysis & Design",
          description:
            "Kiralama sistemi için gereksinim, senaryo, teknik ve hukuki fizibilite analizi ve tasarımı.",
          tech: ["Analysis", "Design"],
          github: "https://github.com/suleymanngulter/Emlak_ve_Arac_Kiralama_Sistemi_Analiz_Tasarimi",
        },
        {
          title: "Vehicle Sales & Technical Service Tracking System",
          description:
            "Araç satış ve teknik servis takibi için ekip projesi. .NET Framework masaüstü uygulaması, MSSQL ile veritabanı işlemleri (triggers, stored procedures).",
          tech: [".NET", "MSSQL"],
          github: "https://github.com/AracSatisveTeknikServisTakipSistemi/ProjeVtys",
        },
      ],
    },
    contact: {
      title: "İletişime Geçin",
      subtitle: "Projeleriniz veya işbirliği için benimle iletişime geçebilirsiniz.",
      location: "Yalova, Kocaeli, Bursa",
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
    },
    meta: {
      title: "Süleyman Gülter | Backend Developer",
      description:
        "Süleyman Gülter - Backend Developer. Projelerim, deneyimlerim ve iletişim bilgilerim.",
    },
  },
  en: {
    nav: {
      about: "About",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      hello: "Hi, I'm",
      tagline:
        "Backend Developer · .NET · Microservices · Building solutions focused on efficiency and sustainability.",
      viewProjects: "View Projects",
      getInTouch: "Get in Touch",
    },
    about: {
      title: "About",
      text: "I enjoy providing benefits to human life and society. I believe that in today's world, the most effective way to do this is as a Computer Engineer. While performing my work, I aim for the most efficient reflection on life. In every project analysis and design, I strive to deliver the best results with the most reasonable costs, prioritizing efficiency, sustainability, and social benefit as my primary goals.",
    },
    education: {
      title: "Education",
      gpa: "GPA",
      items: [
        {
          school: "Düzce University",
          years: "2022-2026",
          program: "Computer Engineering",
          gpa: "3.19",
          extra: null as string | null,
        },
        {
          school: "Dumlupınar University",
          years: "2021-2022",
          program: "Computer Engineering English Preparatory School",
          gpa: "3.01",
          extra: "Pearson B1 English Certificate",
        },
        {
          school: "Karamürsel Anatolian High School",
          years: "2017-2021",
          program: "",
          gpa: "",
          extra: null as string | null,
        },
      ],
    },
    experience: {
      title: "Experience",
      projectLink: "Project link",
      items: [
        {
          title: "Entrepreneurship Marathon",
          period: "2025",
          org: "Düzce Teknopark",
          description:
            "Participated as a finalist with the SATaiLITE flood risk detection system. Gained experience in entrepreneurship, business idea development, business models, and target audience identification.",
          link: "https://github.com/suleymanngulter/SATaiLITE-StartUp",
        },
        {
          title: "GDG On Campus Düzce University Hackathon Coordinator",
          period: "2024-2025",
          org: "Düzce University",
          description:
            "During my tenure as Hackathon Coordinator, I learned through the interview process that the most productive team members are those open to self-improvement in all areas, rather than just those with high technical skills. Created an atmosphere within the team that encouraged open-mindedness and taught a solution-oriented perspective.",
          link: null as string | null,
        },
        {
          title: "Backend Developer Intern",
          period: "2024",
          org: "Tersan Shipyard",
          description:
            "Worked in the field of ERP Programming. Gained experience in Backend development with .NET Core Web API, Microservices Architecture, and DevOps processes.",
          link: null as string | null,
        },
        {
          title: "Mobile Developer Intern",
          period: "2024",
          org: "TBA Academy",
          description:
            "Completed an internship in Mobile application development using Flutter.",
          link: null as string | null,
        },
        {
          title: "Entrepreneurship Marathon",
          period: "2024",
          org: "Düzce Teknopark",
          description:
            "Ranked among the finalist teams with TarlaBot, an unmanned agricultural vehicle project. Gained significant experience in idea development and teamwork.",
          link: "https://github.com/suleymanngulter/TarlaBotStartUp",
        },
      ],
    },
    skills: {
      title: "Skills",
      items: [
        "Organization",
        "Teamwork",
        "Node.js",
        ".NET",
        "Presentation",
        "Innovative Thinking",
        "Flutter",
        "Docker",
        "Excel",
        "Microservices",
        "Java",
        "Entity Framework",
        "Multitier Architecture",
        "Management",
      ],
    },
    projects: {
      title: "Projects",
      live: "Live",
      viewOnGitHub: "View on GitHub",
      items: [
        {
          title: "Fitness Automation",
          description:
            "A desktop fitness management application built with .NET Framework, MSSQL, and Entity Framework.",
          tech: [".NET", "MSSQL", "Entity Framework"],
          github: "https://github.com/suleymanngulter/fitness-otomasyonu",
        },
        {
          title: "Library Automation",
          description:
            "A library management application developed with Flutter.",
          tech: ["Flutter"],
          github: "https://github.com/suleymanngulter/kutuphane_otomasyonu",
        },
        {
          title: "Income/Expense Analysis App",
          description:
            "A desktop application for financial management using .NET Core Web API, Entity Framework, MySQL, REST API, and Authentication.",
          tech: [".NET Core", "Entity Framework", "MySQL", "REST API"],
          github: "https://github.com/suleymanngulter/GelirGiderAnalizi",
        },
        {
          title: "Assistant API",
          description:
            "An AI assistant that summarizes unread emails in your inbox using .NET Core Web API and the ChatGPT API.",
          tech: [".NET Core", "ChatGPT API"],
          github: "https://github.com/suleymanngulter/AsistanAPI",
        },
        {
          title: "Library Management System",
          description:
            "A system featuring a React UI, Microservices architecture, and a Python-based AI for content and profile-based recommendations (MongoDB, Authentication).",
          tech: ["React", "Microservices", "Python", "MongoDB"],
          github: "https://github.com/suleymanngulter/LMS",
        },
        {
          title: "Real Estate & Car Rental System Analysis & Design",
          description:
            "Requirements, scenario, technical, and legal feasibility analysis and design for a rental system.",
          tech: ["Analysis", "Design"],
          github: "https://github.com/suleymanngulter/Emlak_ve_Arac_Kiralama_Sistemi_Analiz_Tasarimi",
        },
        {
          title: "Vehicle Sales & Technical Service Tracking System",
          description:
            "A team project for tracking vehicle sales and services. Developed as a .NET Framework desktop application using MSSQL for all database operations (triggers, stored procedures, etc.).",
          tech: [".NET", "MSSQL"],
          github: "https://github.com/AracSatisveTeknikServisTakipSistemi/ProjeVtys",
        },
      ],
    },
    contact: {
      title: "Get in Touch",
      subtitle:
        "Feel free to reach out for projects or collaboration opportunities.",
      location: "Yalova, Kocaeli, Bursa",
    },
    footer: {
      rights: "All rights reserved.",
    },
    meta: {
      title: "Süleyman Gülter | Backend Developer",
      description:
        "Süleyman Gülter - Backend Developer. My projects, experience, and contact information.",
    },
  },
} as const;

export function getLocaleFromBrowser(): Locale {
  if (typeof navigator === "undefined") return "tr";
  const preferred = navigator.language.toLowerCase();
  if (preferred.startsWith("tr")) return "tr";
  return "en";
}

export const LOCALE_STORAGE_KEY = "portfolio-lang";
