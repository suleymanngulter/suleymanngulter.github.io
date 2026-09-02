import { educationDates, experienceDates } from "./cv-dates";

export type Locale = "tr" | "en";
export type { DateRange } from "./dates";
export { formatDateRange } from "./dates";

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
        "Software Engineer · Node.js · .NET · Mikroservis · Verimlilik ve sürdürülebilirlik odaklı çözümler üretiyorum.",
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
          dateRange: educationDates.duzce,
          program: "Bilgisayar Mühendisliği",
          gpa: "3.23",
          extra: null as string | null,
        },
        {
          school: "Dumlupınar Üniversitesi",
          dateRange: educationDates.dumlupinar,
          program: "Bilgisayar Mühendisliği İngilizce Hazırlık",
          gpa: "3.01",
          extra: "Pearson B1 İngilizce Sertifikası",
        },
        {
          school: "Karamürsel Anadolu Lisesi",
          dateRange: educationDates.karamursel,
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
          title: "Software Engineer",
          dateRange: experienceDates.yukatech,
          org: "Yukatech Bilişim A.Ş.",
          description:
            "Software Engineer olarak çalıştım. Node.js ile Backend, Clean Architecture ve Mikroservis Mimarisi alanlarında çeşitli projeler geliştirdim.",
          link: null as string | null,
        },
        {
          title: "Entrepreneurship Marathon",
          dateRange: experienceDates.satailite,
          org: "Düzce Teknopark",
          description:
            "SATaiLITE sel riski tespit sistemi fikriyle finalist ekipler arasında yer aldım. Girişimcilik, iş fikri geliştirme, iş modelleri ve hedef kitle belirleme konularında deneyim kazandım.",
          link: "https://github.com/suleymanngulter/SATaiLITE-StartUp",
        },
        {
          title: "GDG On Campus Düzce Üniversitesi Hackathon Koordinatörü",
          dateRange: experienceDates.gdg,
          org: "Düzce Üniversitesi",
          description:
            "Hackathon Koordinatörü olarak mülakat stratejilerini yeniden yapılandırdım; teknik yeterliliğin ötesinde uyum ve öğrenmeye açıklık kapasitesi yüksek bir ekip kurdum. Çözüm odaklı bakış açısı ve açık fikirlilik kültürü oluşturarak krizleri verimli yönetebilen dinamik bir ortam yarattım.",
          link: null as string | null,
        },
        {
          title: "Backend Developer Stajyer",
          dateRange: experienceDates.tersan,
          org: "Tersan Tersanesi",
          description:
            "ERP Programlama alanında çalıştım. .NET Core Web API, Mikroservis Mimarisi ve DevOps süreçleri ile Backend geliştirme deneyimi kazandım.",
          link: null as string | null,
        },
        {
          title: "Entrepreneurship Marathon",
          dateRange: experienceDates.tarlabot,
          org: "Düzce Teknopark",
          description:
            "TarlaBot insansız tarım aracı projesiyle finalist ekipler arasında yer aldım. Fikir geliştirme ve ekip çalışması konularında önemli deneyim kazandım.",
          link: "https://github.com/suleymanngulter/TarlaBotStartUp",
        },
        {
          title: "Mobile Developer Stajyer",
          dateRange: experienceDates.tba,
          org: "TBA Academy",
          description:
            "Flutter ile mobil uygulama geliştirme alanında staj yaptım ve kütüphane otomasyonu uygulaması geliştirdim.",
          link: null as string | null,
        },
      ],
    },
    skills: {
      title: "Beceriler",
      categories: [
        {
          name: "Backend",
          items: [
            ".NET Core",
            "Node.js",
            "Entity Framework",
            "Multitier Architecture",
            "Microservices",
          ],
        },
        {
          name: "Veritabanı",
          items: ["MSSQL", "MySQL", "MongoDB", "PostgreSQL"],
        },
        {
          name: "AI & ML",
          items: ["RAG", "LLM Fine-tuning", "Similarity Metrics"],
        },
        {
          name: "Mobil",
          items: ["Flutter", "React-Native"],
        },
        {
          name: "Soft Skills",
          items: [
            "Management",
            "Organization",
            "Innovative Thinking",
            "Teamwork",
          ],
        },
      ],
    },
    projects: {
      title: "Projeler",
      live: "Canlı",
      viewOnGitHub: "GitHub'da gör",
      items: [
        {
          title: "Employee Performance Evaluation Tracking",
          description:
            "Çalışan performansını kaydetmek isteyen şirketler için geliştirilmiş performans değerlendirme ve takip sistemi.",
          tech: ["Node.js", "Clean Architecture", "Microservices"],
          github: null as string | null,
        },
        {
          title: "Kumsal Restaurant",
          description:
            "Clean Architecture ile geliştirilmiş mikroservis restoran sistemi. TypeScript (Node) servisleri, Go newsletter servisi, RabbitMQ, PostgreSQL, Docker Compose, JWT ve CQRS katalog.",
          tech: ["TypeScript", "Go", "Microservices", "PostgreSQL", "RabbitMQ", "Docker"],
          github: "https://github.com/suleymanngulter/Restoran-Uygulamasi",
        },
        {
          title: "Fitness Automation",
          description:
            ".NET Framework, MSSQL ve Entity Framework ile masaüstü fitness yönetim uygulaması.",
          tech: [".NET", "MSSQL", "Entity Framework"],
          github: "https://github.com/suleymanngulter/fitness-otomasyonu",
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
          github: "https://github.com/suleymanngulter/GelirGiderAnalizi",
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
      title: "Hazır mısınız?",
      subtitle: "Projeleriniz veya işbirliği için benimle iletişime geçebilirsiniz.",
      location: "İstanbul, Kocaeli",
      eyebrow: "İletişim",
      formTitle: "Bir mesaj bırakın",
      formHint: "E-posta veya LinkedIn üzerinden dönüş yapıyorum.",
      send: "E-posta gönder",
      points: [
        "Node.js ve .NET ile backend",
        "Mikroservis ve clean architecture",
        "Hızlı, net iletişim",
      ],
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
    },
    meta: {
      title: "Süleyman Gülter | Software Engineer",
      description:
        "Süleyman Gülter - Software Engineer. Projelerim, deneyimlerim ve iletişim bilgilerim.",
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
        "Software Engineer · Node.js · .NET · Microservices · Building efficient, sustainable solutions.",
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
          dateRange: educationDates.duzce,
          program: "Computer Engineering",
          gpa: "3.23",
          extra: null as string | null,
        },
        {
          school: "Dumlupınar University",
          dateRange: educationDates.dumlupinar,
          program: "Computer Engineering English Preparatory School",
          gpa: "3.01",
          extra: "Pearson B1 English Certificate",
        },
        {
          school: "Karamürsel Anatolian High School",
          dateRange: educationDates.karamursel,
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
          title: "Software Engineer",
          dateRange: experienceDates.yukatech,
          org: "Yukatech Bilişim A.Ş.",
          description:
            "Worked as a Software Engineer. Developed various projects in Backend, Clean Architecture, and Microservice Architecture with Node.js.",
          link: null as string | null,
        },
        {
          title: "Entrepreneurship Marathon",
          dateRange: experienceDates.satailite,
          org: "Düzce Teknopark",
          description:
            "Became one of the finalist teams with the SATaiLITE flood risk detection system idea. Gained experience in entrepreneurship, business idea development, business models, and target audience identification.",
          link: "https://github.com/suleymanngulter/SATaiLITE-StartUp",
        },
        {
          title: "GDG On Campus Düzce University Hackathon Coordinator",
          dateRange: experienceDates.gdg,
          org: "Düzce University",
          description:
            "As Hackathon Coordinator, I restructured interview strategies by forming a team with high adaptability and openness to learning beyond technical competence. Built a solution-oriented perspective and open-minded culture, creating a dynamic atmosphere that efficiently manages crises.",
          link: null as string | null,
        },
        {
          title: "Backend Developer Intern",
          dateRange: experienceDates.tersan,
          org: "Tersan Shipyard",
          description:
            "Worked in ERP Programming. Gained Backend development experience with .NET Core Web API, Microservices Architecture, and DevOps processes.",
          link: null as string | null,
        },
        {
          title: "Entrepreneurship Marathon",
          dateRange: experienceDates.tarlabot,
          org: "Düzce Teknopark",
          description:
            "Ranked among the finalist teams with TarlaBot, an unmanned agricultural vehicle project. Gained significant experience in idea development and teamwork.",
          link: "https://github.com/suleymanngulter/TarlaBotStartUp",
        },
        {
          title: "Mobile Developer Intern",
          dateRange: experienceDates.tba,
          org: "TBA Academy",
          description:
            "Completed an internship in mobile application development with Flutter and developed a library automation application.",
          link: null as string | null,
        },
      ],
    },
    skills: {
      title: "Skills",
      categories: [
        {
          name: "Backend",
          items: [
            ".NET Core",
            "Node.js",
            "Entity Framework",
            "Multitier Architecture",
            "Microservices",
          ],
        },
        {
          name: "Database",
          items: ["MSSQL", "MySQL", "MongoDB", "PostgreSQL"],
        },
        {
          name: "AI & ML",
          items: ["RAG", "LLM Fine-tuning", "Similarity Metrics"],
        },
        {
          name: "Mobile",
          items: ["Flutter", "React-Native"],
        },
        {
          name: "Soft Skills",
          items: [
            "Management",
            "Organization",
            "Innovative Thinking",
            "Teamwork",
          ],
        },
      ],
    },
    projects: {
      title: "Projects",
      live: "Live",
      viewOnGitHub: "View on GitHub",
      items: [
        {
          title: "Employee Performance Evaluation Tracking",
          description:
            "A performance evaluation and tracking system developed for companies that want to record their employees' performance.",
          tech: ["Node.js", "Clean Architecture", "Microservices"],
          github: null as string | null,
        },
        {
          title: "Kumsal Restaurant",
          description:
            "A microservice restaurant system built with Clean Architecture. TypeScript (Node) services, a Go newsletter service, RabbitMQ, PostgreSQL, Docker Compose, JWT, and CQRS catalog.",
          tech: ["TypeScript", "Go", "Microservices", "PostgreSQL", "RabbitMQ", "Docker"],
          github: "https://github.com/suleymanngulter/Restoran-Uygulamasi",
        },
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
      title: "Ready to ship together?",
      subtitle:
        "Feel free to reach out for projects or collaboration opportunities.",
      location: "Istanbul, Kocaeli",
      eyebrow: "Get started",
      formTitle: "Create a conversation",
      formHint: "I reply via email or LinkedIn.",
      send: "Send email",
      points: [
        "Backend with Node.js and .NET",
        "Microservices and clean architecture",
        "Clear, fast communication",
      ],
    },
    footer: {
      rights: "All rights reserved.",
    },
    meta: {
      title: "Süleyman Gülter | Software Engineer",
      description:
        "Süleyman Gülter - Software Engineer. My projects, experience, and contact information.",
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
