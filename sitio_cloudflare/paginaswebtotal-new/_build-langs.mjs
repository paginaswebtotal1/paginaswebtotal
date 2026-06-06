// Build multilingüe Páginas Web Total — genera index.html + /ai/*.json por idioma
// y deja el bloque hreflang recíproco en las 7 versiones.
// Uso: node _build-langs.mjs   (desde la carpeta paginaswebtotal-new)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://paginaswebtotal.com';

// ===== Meta por idioma (orden = orden hreflang) =====
const LANGS = [
  { key:'es', folder:'',   hreflang:'es',      htmlLang:'es',      ogLocale:'es_ES', label:'Spanish'    },
  { key:'en', folder:'en', hreflang:'en',      htmlLang:'en',      ogLocale:'en_US', label:'English'    },
  { key:'fr', folder:'fr', hreflang:'fr',      htmlLang:'fr',      ogLocale:'fr_FR', label:'French'     },
  { key:'ru', folder:'ru', hreflang:'ru',      htmlLang:'ru',      ogLocale:'ru_RU', label:'Russian'    },
  { key:'zh', folder:'zh', hreflang:'zh-Hans', htmlLang:'zh-Hans', ogLocale:'zh_CN', label:'Chinese'    },
  { key:'pt', folder:'pt', hreflang:'pt-BR',   htmlLang:'pt-BR',   ogLocale:'pt_BR', label:'Portuguese' },
  { key:'hi', folder:'hi', hreflang:'hi',      htmlLang:'hi',      ogLocale:'hi_IN', label:'Hindi'      },
];
const urlOf = (folder) => folder ? `${BASE}/${folder}/` : `${BASE}/`;
const KNOWS = ["Technical SEO","Generative Engine Optimization","Answer Engine Optimization","Link Building","Content SEO","Programmatic SEO","Core Web Vitals","Schema.org","E-E-A-T"];

// ===== Diccionarios i18n (7 idiomas) =====
const DICT = {};
DICT.es = {
  __meta:{ title:"Páginas Web Total | Agencia de Marketing Digital & SEO Avanzado", desc:"Agencia especializada en posicionamiento web, SEO técnico, GEO y visibilidad en motores de búsqueda generativa: Google AI Overviews, ChatGPT, Perplexity, Gemini.", ogTitle:"Páginas Web Total | SEO & GEO Agency", ogDesc:"Posicionamos tu negocio en Google, Bing, ChatGPT, Gemini, Perplexity y AI Overviews." },
  __alert:"El chat está cargando. Por favor espera unos segundos y vuelve a intentarlo.",
  float_badge:"💬 Chatea con nosotros",
  nav_services:"Servicios", nav_geo:"GEO", nav_process:"Proceso", nav_skills:"Expertise", nav_contact:"Contacto", nav_cta:"Cotiza Gratis",
  hero_badge:"🚀 Agencia Activa — Posicionamos desde 2012",
  hero_title:`Domina los<br><span class="line-neon">Resultados de Búsqueda.</span>`,
  hero_sub:"Posicionamos tu negocio en Google, Bing, Yahoo y en los nuevos motores de IA: ChatGPT, Gemini, Perplexity y Google AI Overviews.",
  hero_btn1:"Quiero posicionarme", hero_btn2:"Ver servicios",
  stat_projects:"Proyectos SEO", stat_countries:"Países", stat_industries:"Industrias", stat_years:"Años exp.",
  services_label:"Lo que hacemos", services_title:`Servicios de Posicionamiento<br>de Alto Impacto`,
  services_sub:"Cada estrategia está diseñada para generar visibilidad real, tráfico orgánico calificado y citas en motores generativos.",
  svc1_t:"SEO Técnico", svc1_d:"Auditoría profunda, Crawl Budget, Core Web Vitals, datos estructurados Schema.org, arquitectura optimizada.",
  svc2_t:"SEO de Contenidos", svc2_d:"Keyword research, mapeo semántico, clústeres de contenido y optimización E-E-A-T para autoridad real.",
  svc3_t:"GEO — Motor Generativo", svc3_d:"Optimizamos tu contenido para ser citado por ChatGPT, Gemini, AI Overviews y Perplexity. La nueva frontera del SEO.",
  svc4_t:"Link Building", svc4_d:"Construcción de autoridad con backlinks de calidad desde medios especializados y brand mentions.",
  svc5_t:"SEO Programático", svc5_d:"Creación de páginas en escala usando datos estructurados y automatización para dominar nichos.",
  svc6_t:"Analítica & Reportes", svc6_d:"Dashboards en tiempo real con GA4 y Power BI. Medimos visibilidad tradicional y generativa.",
  why_label:"Por qué elegirnos", why_title:`Resultados medibles,<br>no promesas vacías.`,
  why1_t:"Enfoque dual SEO + GEO", why1_d:"Posicionamos en resultados orgánicos clásicos Y en respuestas de IA generativa.",
  why2_t:"35+ industrias ejecutadas", why2_d:"Ecommerce, SaaS, salud, fintech y más. Conocemos los matices por vertical.",
  why3_t:"Data Science aplicado al SEO", why3_d:"Usamos Python, SQL y Power BI para decisiones basadas en evidencia.",
  why4_t:"Transparencia total", why4_d:"Acceso a dashboards, logs y reportes mensuales. Todo medible y explicado.",
  geo_label:"Motores Generativos", geo_title:`El SEO evolucionó.<br>¿Está tu marca en la IA?`,
  geo_sub:"En 2026, el 40% de las búsquedas se resuelven con IA sin clic. Ser citado es la nueva posición #1.",
  eng1_d:"Aparece en las respuestas generativas de Google.",
  eng2_d:"200M+ usuarios semanales. Tu marca debe ser la respuesta citada.",
  eng3_d:"Optimizamos para que Gemini cite tu sitio como fuente de autoridad.",
  eng4_d:"100M+ consultas mensuales. Posicionamos tu contenido para aparecer ahí.",
  res_projects:"Proyectos ejecutados", res_countries:"Países", res_industries:"Industrias", res_years:"Años experiencia",
  process_label:"Metodología", process_title:"Cómo trabajamos",
  process_sub:"Un proceso probado que combina rigor técnico, estrategia de contenido y optimización para IA.",
  step1_t:"Diagnóstico & Benchmarking", step1_d:"Auditoría técnica, análisis de visibilidad y benchmarking de competencia en SEO tradicional y GEO.",
  step2_t:"Estrategia de Keywords & Contenido", step2_d:"Investigación semántica, clasificación por intención y análisis de visibilidad generativa.",
  step3_t:"Implementación Técnica & Contenido", step3_d:"Optimización de metadatos, Schema.org, arquitectura interna y contenido para E-E-A-T e IA.",
  step4_t:"Link Building & Autoridad", step4_d:"Construcción de backlinks de alta autoridad y brand mentions para confianza.",
  step5_t:"Medición, Reporte & Escala", step5_d:"Dashboards en Power BI + GA4. Reportes de posiciones, tráfico, citas en IA y ROI.",
  skills_label:"Tecnologías", skills_title:"Stack Tecnológico",
  skills_sub:"Herramientas líderes combinadas con data science para SEO de alto rendimiento.",
  contact_label:"Hablemos", contact_title:`¿Listo para dominar<br>los buscadores?`,
  contact_sub:"Chatea con nosotros y descubre cómo podemos potenciar tu presencia digital.",
  contact_btn:"💬 Chatear ahora con un experto",
  contact_note:"📱 Respuesta en menos de 5 minutos | Sin compromiso",
  footer_copy:"© 2026 Páginas Web Total. Todos los derechos reservados. | SEO & GEO Agency"
};
DICT.en = {
  __meta:{ title:"Páginas Web Total | Digital Marketing Agency & Advanced SEO", desc:"Agency specialized in web ranking, technical SEO, GEO and visibility in generative search engines: Google AI Overviews, ChatGPT, Perplexity, Gemini.", ogTitle:"Páginas Web Total | SEO & GEO Agency", ogDesc:"We rank your business on Google, Bing, ChatGPT, Gemini, Perplexity and AI Overviews." },
  __alert:"The chat is loading. Please wait a few seconds and try again.",
  float_badge:"💬 Chat with us",
  nav_services:"Services", nav_geo:"GEO", nav_process:"Process", nav_skills:"Expertise", nav_contact:"Contact", nav_cta:"Free Quote",
  hero_badge:"🚀 Active Agency — Ranking Brands Since 2012",
  hero_title:`Dominate the<br><span class="line-neon">Search Results.</span>`,
  hero_sub:"We rank your business on Google, Bing, Yahoo and the new AI engines: ChatGPT, Gemini, Perplexity and Google AI Overviews.",
  hero_btn1:"I want to rank", hero_btn2:"View services",
  stat_projects:"SEO Projects", stat_countries:"Countries", stat_industries:"Industries", stat_years:"Years exp.",
  services_label:"What we do", services_title:`High-Impact<br>Ranking Services`,
  services_sub:"Every strategy is built to generate real visibility, qualified organic traffic and citations in generative engines.",
  svc1_t:"Technical SEO", svc1_d:"Deep audits, crawl budget, Core Web Vitals, Schema.org structured data, optimized architecture.",
  svc2_t:"Content SEO", svc2_d:"Keyword research, semantic mapping, content clusters and E-E-A-T optimization for real authority.",
  svc3_t:"GEO — Generative Engine", svc3_d:"We optimize your content to be cited by ChatGPT, Gemini, AI Overviews and Perplexity. The new SEO frontier.",
  svc4_t:"Link Building", svc4_d:"Authority building with quality backlinks from specialized media and brand mentions.",
  svc5_t:"Programmatic SEO", svc5_d:"Page creation at scale using structured data and automation to dominate niches.",
  svc6_t:"Analytics & Reporting", svc6_d:"Real-time dashboards with GA4 and Power BI. We measure traditional and generative visibility.",
  why_label:"Why choose us", why_title:`Measurable results,<br>not empty promises.`,
  why1_t:"Dual SEO + GEO approach", why1_d:"We rank in classic organic results AND in generative AI answers.",
  why2_t:"35+ industries delivered", why2_d:"Ecommerce, SaaS, healthcare, fintech and more. We know the nuances of each vertical.",
  why3_t:"Data Science applied to SEO", why3_d:"We use Python, SQL and Power BI for evidence-based decisions.",
  why4_t:"Full transparency", why4_d:"Access to dashboards, logs and monthly reports. Everything measurable and explained.",
  geo_label:"Generative Engines", geo_title:`SEO has evolved.<br>Is your brand in AI?`,
  geo_sub:"In 2026, 40% of searches are resolved by AI with no click. Being cited is the new #1 position.",
  eng1_d:"Appear in Google's generative answers.",
  eng2_d:"200M+ weekly users. Your brand must be the cited answer.",
  eng3_d:"We optimize so Gemini cites your site as an authority source.",
  eng4_d:"100M+ monthly queries. We position your content to appear there.",
  res_projects:"Projects delivered", res_countries:"Countries", res_industries:"Industries", res_years:"Years of experience",
  process_label:"Methodology", process_title:"How we work",
  process_sub:"A proven process combining technical rigor, content strategy and AI optimization.",
  step1_t:"Diagnosis & Benchmarking", step1_d:"Technical audit, visibility analysis and competitor benchmarking in traditional SEO and GEO.",
  step2_t:"Keyword & Content Strategy", step2_d:"Semantic research, intent classification and generative visibility analysis.",
  step3_t:"Technical & Content Implementation", step3_d:"Metadata optimization, Schema.org, internal architecture and content for E-E-A-T and AI.",
  step4_t:"Link Building & Authority", step4_d:"High-authority backlink building and brand mentions for trust.",
  step5_t:"Measurement, Reporting & Scale", step5_d:"Power BI + GA4 dashboards. Reports on rankings, traffic, AI citations and ROI.",
  skills_label:"Technologies", skills_title:"Tech Stack",
  skills_sub:"Leading tools combined with data science for high-performance SEO.",
  contact_label:"Let's talk", contact_title:`Ready to dominate<br>the search engines?`,
  contact_sub:"Chat with us and discover how we can boost your digital presence.",
  contact_btn:"💬 Chat now with an expert",
  contact_note:"📱 Reply in under 5 minutes | No commitment",
  footer_copy:"© 2026 Páginas Web Total. All rights reserved. | SEO & GEO Agency"
};
DICT.fr = {
  __meta:{ title:"Páginas Web Total | Agence de Marketing Digital & SEO Avancé", desc:"Agence spécialisée en référencement web, SEO technique, GEO et visibilité dans les moteurs de recherche génératifs : Google AI Overviews, ChatGPT, Perplexity, Gemini.", ogTitle:"Páginas Web Total | Agence SEO & GEO", ogDesc:"Nous positionnons votre entreprise sur Google, Bing, ChatGPT, Gemini, Perplexity et AI Overviews." },
  __alert:"Le chat est en cours de chargement. Veuillez patienter quelques secondes et réessayer.",
  float_badge:"💬 Discutez avec nous",
  nav_services:"Services", nav_geo:"GEO", nav_process:"Processus", nav_skills:"Expertise", nav_contact:"Contact", nav_cta:"Devis Gratuit",
  hero_badge:"🚀 Agence Active — Nous positionnons depuis 2012",
  hero_title:`Dominez les<br><span class="line-neon">Résultats de Recherche.</span>`,
  hero_sub:"Nous positionnons votre entreprise sur Google, Bing, Yahoo et les nouveaux moteurs d'IA : ChatGPT, Gemini, Perplexity et Google AI Overviews.",
  hero_btn1:"Je veux me positionner", hero_btn2:"Voir les services",
  stat_projects:"Projets SEO", stat_countries:"Pays", stat_industries:"Secteurs", stat_years:"Ans d'exp.",
  services_label:"Ce que nous faisons", services_title:`Services de Référencement<br>à Fort Impact`,
  services_sub:"Chaque stratégie est conçue pour générer une visibilité réelle, un trafic organique qualifié et des citations dans les moteurs génératifs.",
  svc1_t:"SEO Technique", svc1_d:"Audit approfondi, Crawl Budget, Core Web Vitals, données structurées Schema.org, architecture optimisée.",
  svc2_t:"SEO de Contenu", svc2_d:"Recherche de mots-clés, cartographie sémantique, clusters de contenu et optimisation E-E-A-T pour une autorité réelle.",
  svc3_t:"GEO — Moteur Génératif", svc3_d:"Nous optimisons votre contenu pour être cité par ChatGPT, Gemini, AI Overviews et Perplexity. La nouvelle frontière du SEO.",
  svc4_t:"Link Building", svc4_d:"Construction d'autorité avec des backlinks de qualité issus de médias spécialisés et de mentions de marque.",
  svc5_t:"SEO Programmatique", svc5_d:"Création de pages à grande échelle grâce aux données structurées et à l'automatisation pour dominer les niches.",
  svc6_t:"Analytique & Rapports", svc6_d:"Tableaux de bord en temps réel avec GA4 et Power BI. Nous mesurons la visibilité traditionnelle et générative.",
  why_label:"Pourquoi nous choisir", why_title:`Des résultats mesurables,<br>pas des promesses vides.`,
  why1_t:"Approche double SEO + GEO", why1_d:"Nous positionnons dans les résultats organiques classiques ET dans les réponses de l'IA générative.",
  why2_t:"35+ secteurs réalisés", why2_d:"E-commerce, SaaS, santé, fintech et plus. Nous connaissons les nuances de chaque secteur.",
  why3_t:"Data Science appliquée au SEO", why3_d:"Nous utilisons Python, SQL et Power BI pour des décisions fondées sur les données.",
  why4_t:"Transparence totale", why4_d:"Accès aux tableaux de bord, logs et rapports mensuels. Tout est mesurable et expliqué.",
  geo_label:"Moteurs Génératifs", geo_title:`Le SEO a évolué.<br>Votre marque est-elle dans l'IA ?`,
  geo_sub:"En 2026, 40 % des recherches sont résolues par l'IA sans clic. Être cité est la nouvelle position n°1.",
  eng1_d:"Apparaissez dans les réponses génératives de Google.",
  eng2_d:"200M+ d'utilisateurs hebdomadaires. Votre marque doit être la réponse citée.",
  eng3_d:"Nous optimisons pour que Gemini cite votre site comme source d'autorité.",
  eng4_d:"100M+ de requêtes mensuelles. Nous positionnons votre contenu pour y apparaître.",
  res_projects:"Projets réalisés", res_countries:"Pays", res_industries:"Secteurs", res_years:"Ans d'expérience",
  process_label:"Méthodologie", process_title:"Comment nous travaillons",
  process_sub:"Un processus éprouvé combinant rigueur technique, stratégie de contenu et optimisation pour l'IA.",
  step1_t:"Diagnostic & Benchmarking", step1_d:"Audit technique, analyse de visibilité et benchmarking concurrentiel en SEO traditionnel et GEO.",
  step2_t:"Stratégie de Mots-clés & Contenu", step2_d:"Recherche sémantique, classification par intention et analyse de visibilité générative.",
  step3_t:"Implémentation Technique & Contenu", step3_d:"Optimisation des métadonnées, Schema.org, architecture interne et contenu pour E-E-A-T et IA.",
  step4_t:"Link Building & Autorité", step4_d:"Construction de backlinks à forte autorité et mentions de marque pour la confiance.",
  step5_t:"Mesure, Rapport & Échelle", step5_d:"Tableaux de bord Power BI + GA4. Rapports sur positions, trafic, citations IA et ROI.",
  skills_label:"Technologies", skills_title:"Stack Technologique",
  skills_sub:"Outils leaders combinés à la data science pour un SEO haute performance.",
  contact_label:"Parlons-en", contact_title:`Prêt à dominer<br>les moteurs de recherche ?`,
  contact_sub:"Discutez avec nous et découvrez comment booster votre présence digitale.",
  contact_btn:"💬 Discuter maintenant avec un expert",
  contact_note:"📱 Réponse en moins de 5 minutes | Sans engagement",
  footer_copy:"© 2026 Páginas Web Total. Tous droits réservés. | Agence SEO & GEO"
};
DICT.ru = {
  __meta:{ title:"Páginas Web Total | Агентство цифрового маркетинга и продвинутого SEO", desc:"Агентство, специализирующееся на веб-продвижении, техническом SEO, GEO и видимости в генеративных поисковых системах: Google AI Overviews, ChatGPT, Perplexity, Gemini.", ogTitle:"Páginas Web Total | Агентство SEO и GEO", ogDesc:"Продвигаем ваш бизнес в Google, Bing, ChatGPT, Gemini, Perplexity и AI Overviews." },
  __alert:"Чат загружается. Пожалуйста, подождите несколько секунд и попробуйте снова.",
  float_badge:"💬 Напишите нам",
  nav_services:"Услуги", nav_geo:"GEO", nav_process:"Процесс", nav_skills:"Экспертиза", nav_contact:"Контакты", nav_cta:"Бесплатная смета",
  hero_badge:"🚀 Активное агентство — продвигаем с 2012 года",
  hero_title:`Доминируйте в<br><span class="line-neon">результатах поиска.</span>`,
  hero_sub:"Продвигаем ваш бизнес в Google, Bing, Yahoo и новых ИИ-системах: ChatGPT, Gemini, Perplexity и Google AI Overviews.",
  hero_btn1:"Хочу продвигаться", hero_btn2:"Смотреть услуги",
  stat_projects:"SEO-проекты", stat_countries:"Стран", stat_industries:"Отраслей", stat_years:"Лет опыта",
  services_label:"Что мы делаем", services_title:`Услуги продвижения<br>высокой эффективности`,
  services_sub:"Каждая стратегия создана для реальной видимости, качественного органического трафика и цитирования в генеративных системах.",
  svc1_t:"Техническое SEO", svc1_d:"Глубокий аудит, Crawl Budget, Core Web Vitals, структурированные данные Schema.org, оптимизированная архитектура.",
  svc2_t:"Контентное SEO", svc2_d:"Исследование ключевых слов, семантическое картирование, контент-кластеры и оптимизация E-E-A-T для реального авторитета.",
  svc3_t:"GEO — Генеративные системы", svc3_d:"Оптимизируем ваш контент для цитирования в ChatGPT, Gemini, AI Overviews и Perplexity. Новый рубеж SEO.",
  svc4_t:"Линкбилдинг", svc4_d:"Наращивание авторитета качественными бэклинками из специализированных СМИ и упоминаниями бренда.",
  svc5_t:"Программное SEO", svc5_d:"Создание страниц в масштабе с помощью структурированных данных и автоматизации для доминирования в нишах.",
  svc6_t:"Аналитика и отчёты", svc6_d:"Дашборды в реальном времени на GA4 и Power BI. Измеряем традиционную и генеративную видимость.",
  why_label:"Почему мы", why_title:`Измеримые результаты,<br>а не пустые обещания.`,
  why1_t:"Двойной подход SEO + GEO", why1_d:"Продвигаем в классической органике И в ответах генеративного ИИ.",
  why2_t:"35+ реализованных отраслей", why2_d:"E-commerce, SaaS, здравоохранение, финтех и другое. Знаем нюансы каждой вертикали.",
  why3_t:"Data Science в SEO", why3_d:"Используем Python, SQL и Power BI для решений на основе данных.",
  why4_t:"Полная прозрачность", why4_d:"Доступ к дашбордам, логам и ежемесячным отчётам. Всё измеримо и объяснено.",
  geo_label:"Генеративные системы", geo_title:`SEO эволюционировало.<br>Есть ли ваш бренд в ИИ?`,
  geo_sub:"В 2026 году 40% запросов решаются ИИ без клика. Быть процитированным — новая позиция №1.",
  eng1_d:"Появляйтесь в генеративных ответах Google.",
  eng2_d:"200 млн+ пользователей еженедельно. Ваш бренд должен быть цитируемым ответом.",
  eng3_d:"Оптимизируем, чтобы Gemini цитировал ваш сайт как авторитетный источник.",
  eng4_d:"100 млн+ запросов ежемесячно. Позиционируем ваш контент для появления там.",
  res_projects:"Реализовано проектов", res_countries:"Стран", res_industries:"Отраслей", res_years:"Лет опыта",
  process_label:"Методология", process_title:"Как мы работаем",
  process_sub:"Проверенный процесс, сочетающий техническую строгость, контент-стратегию и оптимизацию под ИИ.",
  step1_t:"Диагностика и бенчмаркинг", step1_d:"Технический аудит, анализ видимости и бенчмаркинг конкурентов в традиционном SEO и GEO.",
  step2_t:"Стратегия ключевых слов и контента", step2_d:"Семантическое исследование, классификация по интенту и анализ генеративной видимости.",
  step3_t:"Техническая и контентная реализация", step3_d:"Оптимизация метаданных, Schema.org, внутренняя архитектура и контент для E-E-A-T и ИИ.",
  step4_t:"Линкбилдинг и авторитет", step4_d:"Наращивание авторитетных бэклинков и упоминаний бренда для доверия.",
  step5_t:"Измерение, отчётность и масштаб", step5_d:"Дашборды Power BI + GA4. Отчёты по позициям, трафику, цитированиям в ИИ и ROI.",
  skills_label:"Технологии", skills_title:"Технологический стек",
  skills_sub:"Ведущие инструменты в сочетании с data science для высокоэффективного SEO.",
  contact_label:"Поговорим", contact_title:`Готовы доминировать<br>в поисковых системах?`,
  contact_sub:"Напишите нам и узнайте, как усилить ваше цифровое присутствие.",
  contact_btn:"💬 Написать эксперту сейчас",
  contact_note:"📱 Ответ менее чем за 5 минут | Без обязательств",
  footer_copy:"© 2026 Páginas Web Total. Все права защищены. | Агентство SEO и GEO"
};
DICT.zh = {
  __meta:{ title:"Páginas Web Total | 数字营销与高级SEO机构", desc:"专注于网站排名、技术SEO、GEO以及在生成式搜索引擎中可见性的机构：Google AI Overviews、ChatGPT、Perplexity、Gemini。", ogTitle:"Páginas Web Total | SEO与GEO机构", ogDesc:"我们助您的业务在Google、Bing、ChatGPT、Gemini、Perplexity和AI Overviews中获得排名。" },
  __alert:"聊天正在加载，请稍等几秒后重试。",
  float_badge:"💬 与我们聊天",
  nav_services:"服务", nav_geo:"GEO", nav_process:"流程", nav_skills:"专长", nav_contact:"联系", nav_cta:"免费报价",
  hero_badge:"🚀 活跃机构 — 自2012年起助力排名",
  hero_title:`主导<br><span class="line-neon">搜索结果。</span>`,
  hero_sub:"我们助您的业务在Google、Bing、Yahoo以及新型AI引擎中排名：ChatGPT、Gemini、Perplexity和Google AI Overviews。",
  hero_btn1:"我要获得排名", hero_btn2:"查看服务",
  stat_projects:"SEO项目", stat_countries:"国家", stat_industries:"行业", stat_years:"年经验",
  services_label:"我们的工作", services_title:`高影响力的<br>排名服务`,
  services_sub:"每项策略都旨在带来真实可见性、高质量自然流量以及在生成式引擎中的引用。",
  svc1_t:"技术SEO", svc1_d:"深度审计、抓取预算、Core Web Vitals、Schema.org结构化数据、优化架构。",
  svc2_t:"内容SEO", svc2_d:"关键词研究、语义映射、内容集群以及E-E-A-T优化，建立真实权威。",
  svc3_t:"GEO — 生成式引擎", svc3_d:"优化您的内容以被ChatGPT、Gemini、AI Overviews和Perplexity引用。SEO的新前沿。",
  svc4_t:"外链建设", svc4_d:"通过来自专业媒体的优质外链和品牌提及来建立权威。",
  svc5_t:"程序化SEO", svc5_d:"利用结构化数据和自动化大规模创建页面，主导细分市场。",
  svc6_t:"分析与报告", svc6_d:"使用GA4和Power BI的实时仪表板。衡量传统与生成式可见性。",
  why_label:"为何选择我们", why_title:`可衡量的成果，<br>而非空洞承诺。`,
  why1_t:"SEO + GEO双重策略", why1_d:"我们在经典自然结果中排名，也在生成式AI回答中排名。",
  why2_t:"35+已交付行业", why2_d:"电商、SaaS、医疗、金融科技等。我们了解每个垂直领域的细微差别。",
  why3_t:"应用于SEO的数据科学", why3_d:"我们使用Python、SQL和Power BI做出基于证据的决策。",
  why4_t:"完全透明", why4_d:"可访问仪表板、日志和月度报告。一切可衡量、可解释。",
  geo_label:"生成式引擎", geo_title:`SEO已进化。<br>您的品牌在AI中吗？`,
  geo_sub:"2026年，40%的搜索由AI直接解答，无需点击。被引用就是新的第一名。",
  eng1_d:"出现在Google的生成式回答中。",
  eng2_d:"每周2亿+用户。您的品牌必须成为被引用的答案。",
  eng3_d:"我们优化使Gemini将您的网站引用为权威来源。",
  eng4_d:"每月1亿+查询。我们定位您的内容以出现在那里。",
  res_projects:"已交付项目", res_countries:"国家", res_industries:"行业", res_years:"年经验",
  process_label:"方法论", process_title:"我们如何工作",
  process_sub:"经过验证的流程，结合技术严谨性、内容策略和AI优化。",
  step1_t:"诊断与基准分析", step1_d:"技术审计、可见性分析以及传统SEO和GEO的竞争对手基准分析。",
  step2_t:"关键词与内容策略", step2_d:"语义研究、意图分类和生成式可见性分析。",
  step3_t:"技术与内容实施", step3_d:"元数据优化、Schema.org、内部架构以及面向E-E-A-T和AI的内容。",
  step4_t:"外链建设与权威", step4_d:"构建高权威外链和品牌提及以建立信任。",
  step5_t:"衡量、报告与扩展", step5_d:"Power BI + GA4仪表板。关于排名、流量、AI引用和ROI的报告。",
  skills_label:"技术", skills_title:"技术栈",
  skills_sub:"领先工具结合数据科学，实现高性能SEO。",
  contact_label:"联系我们", contact_title:`准备好主导<br>搜索引擎了吗？`,
  contact_sub:"与我们聊天，了解我们如何提升您的数字影响力。",
  contact_btn:"💬 立即与专家聊天",
  contact_note:"📱 5分钟内回复 | 无需承诺",
  footer_copy:"© 2026 Páginas Web Total. 版权所有。| SEO与GEO机构"
};
DICT.pt = {
  __meta:{ title:"Páginas Web Total | Agência de Marketing Digital & SEO Avançado", desc:"Agência especializada em posicionamento web, SEO técnico, GEO e visibilidade em mecanismos de busca generativos: Google AI Overviews, ChatGPT, Perplexity, Gemini.", ogTitle:"Páginas Web Total | Agência SEO & GEO", ogDesc:"Posicionamos o seu negócio no Google, Bing, ChatGPT, Gemini, Perplexity e AI Overviews." },
  __alert:"O chat está carregando. Aguarde alguns segundos e tente novamente.",
  float_badge:"💬 Fale com a gente",
  nav_services:"Serviços", nav_geo:"GEO", nav_process:"Processo", nav_skills:"Expertise", nav_contact:"Contato", nav_cta:"Orçamento Grátis",
  hero_badge:"🚀 Agência Ativa — Posicionamos desde 2012",
  hero_title:`Domine os<br><span class="line-neon">Resultados de Busca.</span>`,
  hero_sub:"Posicionamos o seu negócio no Google, Bing, Yahoo e nos novos mecanismos de IA: ChatGPT, Gemini, Perplexity e Google AI Overviews.",
  hero_btn1:"Quero me posicionar", hero_btn2:"Ver serviços",
  stat_projects:"Projetos SEO", stat_countries:"Países", stat_industries:"Indústrias", stat_years:"Anos exp.",
  services_label:"O que fazemos", services_title:`Serviços de Posicionamento<br>de Alto Impacto`,
  services_sub:"Cada estratégia é desenhada para gerar visibilidade real, tráfego orgânico qualificado e citações em mecanismos generativos.",
  svc1_t:"SEO Técnico", svc1_d:"Auditoria profunda, Crawl Budget, Core Web Vitals, dados estruturados Schema.org, arquitetura otimizada.",
  svc2_t:"SEO de Conteúdo", svc2_d:"Pesquisa de palavras-chave, mapeamento semântico, clusters de conteúdo e otimização E-E-A-T para autoridade real.",
  svc3_t:"GEO — Mecanismo Generativo", svc3_d:"Otimizamos seu conteúdo para ser citado por ChatGPT, Gemini, AI Overviews e Perplexity. A nova fronteira do SEO.",
  svc4_t:"Link Building", svc4_d:"Construção de autoridade com backlinks de qualidade de mídias especializadas e menções à marca.",
  svc5_t:"SEO Programático", svc5_d:"Criação de páginas em escala usando dados estruturados e automação para dominar nichos.",
  svc6_t:"Analytics & Relatórios", svc6_d:"Dashboards em tempo real com GA4 e Power BI. Medimos visibilidade tradicional e generativa.",
  why_label:"Por que nos escolher", why_title:`Resultados mensuráveis,<br>não promessas vazias.`,
  why1_t:"Abordagem dupla SEO + GEO", why1_d:"Posicionamos nos resultados orgânicos clássicos E nas respostas da IA generativa.",
  why2_t:"35+ indústrias executadas", why2_d:"E-commerce, SaaS, saúde, fintech e mais. Conhecemos as nuances de cada vertical.",
  why3_t:"Data Science aplicada ao SEO", why3_d:"Usamos Python, SQL e Power BI para decisões baseadas em evidências.",
  why4_t:"Transparência total", why4_d:"Acesso a dashboards, logs e relatórios mensais. Tudo mensurável e explicado.",
  geo_label:"Mecanismos Generativos", geo_title:`O SEO evoluiu.<br>Sua marca está na IA?`,
  geo_sub:"Em 2026, 40% das buscas são resolvidas pela IA sem clique. Ser citado é a nova posição nº 1.",
  eng1_d:"Apareça nas respostas generativas do Google.",
  eng2_d:"200M+ usuários semanais. Sua marca deve ser a resposta citada.",
  eng3_d:"Otimizamos para que o Gemini cite seu site como fonte de autoridade.",
  eng4_d:"100M+ consultas mensais. Posicionamos seu conteúdo para aparecer ali.",
  res_projects:"Projetos executados", res_countries:"Países", res_industries:"Indústrias", res_years:"Anos de experiência",
  process_label:"Metodologia", process_title:"Como trabalhamos",
  process_sub:"Um processo comprovado que combina rigor técnico, estratégia de conteúdo e otimização para IA.",
  step1_t:"Diagnóstico & Benchmarking", step1_d:"Auditoria técnica, análise de visibilidade e benchmarking da concorrência em SEO tradicional e GEO.",
  step2_t:"Estratégia de Palavras-chave & Conteúdo", step2_d:"Pesquisa semântica, classificação por intenção e análise de visibilidade generativa.",
  step3_t:"Implementação Técnica & Conteúdo", step3_d:"Otimização de metadados, Schema.org, arquitetura interna e conteúdo para E-E-A-T e IA.",
  step4_t:"Link Building & Autoridade", step4_d:"Construção de backlinks de alta autoridade e menções à marca para confiança.",
  step5_t:"Medição, Relatório & Escala", step5_d:"Dashboards no Power BI + GA4. Relatórios de posições, tráfego, citações em IA e ROI.",
  skills_label:"Tecnologias", skills_title:"Stack Tecnológico",
  skills_sub:"Ferramentas líderes combinadas com data science para SEO de alto desempenho.",
  contact_label:"Vamos conversar", contact_title:`Pronto para dominar<br>os buscadores?`,
  contact_sub:"Converse com a gente e descubra como impulsionar sua presença digital.",
  contact_btn:"💬 Conversar agora com um especialista",
  contact_note:"📱 Resposta em menos de 5 minutos | Sem compromisso",
  footer_copy:"© 2026 Páginas Web Total. Todos os direitos reservados. | Agência SEO & GEO"
};
DICT.hi = {
  __meta:{ title:"Páginas Web Total | डिजिटल मार्केटिंग एजेंसी और उन्नत SEO", desc:"वेब रैंकिंग, तकनीकी SEO, GEO और जनरेटिव सर्च इंजनों में दृश्यता में विशेषज्ञ एजेंसी: Google AI Overviews, ChatGPT, Perplexity, Gemini।", ogTitle:"Páginas Web Total | SEO और GEO एजेंसी", ogDesc:"हम आपके व्यवसाय को Google, Bing, ChatGPT, Gemini, Perplexity और AI Overviews में रैंक कराते हैं।" },
  __alert:"चैट लोड हो रहा है। कृपया कुछ सेकंड प्रतीक्षा करें और पुनः प्रयास करें।",
  float_badge:"💬 हमसे चैट करें",
  nav_services:"सेवाएँ", nav_geo:"GEO", nav_process:"प्रक्रिया", nav_skills:"विशेषज्ञता", nav_contact:"संपर्क", nav_cta:"मुफ्त कोटेशन",
  hero_badge:"🚀 सक्रिय एजेंसी — 2012 से रैंकिंग",
  hero_title:`हावी हो जाएँ<br><span class="line-neon">खोज परिणामों पर।</span>`,
  hero_sub:"हम आपके व्यवसाय को Google, Bing, Yahoo और नए AI इंजनों में रैंक कराते हैं: ChatGPT, Gemini, Perplexity और Google AI Overviews।",
  hero_btn1:"मुझे रैंक करना है", hero_btn2:"सेवाएँ देखें",
  stat_projects:"SEO परियोजनाएँ", stat_countries:"देश", stat_industries:"उद्योग", stat_years:"वर्ष अनुभव",
  services_label:"हम क्या करते हैं", services_title:`उच्च-प्रभाव वाली<br>रैंकिंग सेवाएँ`,
  services_sub:"हर रणनीति वास्तविक दृश्यता, योग्य ऑर्गेनिक ट्रैफ़िक और जनरेटिव इंजनों में उद्धरण उत्पन्न करने के लिए बनाई गई है।",
  svc1_t:"तकनीकी SEO", svc1_d:"गहन ऑडिट, क्रॉल बजट, Core Web Vitals, Schema.org संरचित डेटा, अनुकूलित आर्किटेक्चर।",
  svc2_t:"कंटेंट SEO", svc2_d:"कीवर्ड रिसर्च, सिमेंटिक मैपिंग, कंटेंट क्लस्टर और वास्तविक अधिकार के लिए E-E-A-T अनुकूलन।",
  svc3_t:"GEO — जनरेटिव इंजन", svc3_d:"हम आपके कंटेंट को ChatGPT, Gemini, AI Overviews और Perplexity द्वारा उद्धृत होने के लिए अनुकूलित करते हैं। SEO की नई सीमा।",
  svc4_t:"लिंक बिल्डिंग", svc4_d:"विशेष मीडिया से गुणवत्तापूर्ण बैकलिंक और ब्रांड उल्लेखों के साथ अधिकार निर्माण।",
  svc5_t:"प्रोग्रामेटिक SEO", svc5_d:"निचे पर हावी होने के लिए संरचित डेटा और स्वचालन का उपयोग करके बड़े पैमाने पर पेज निर्माण।",
  svc6_t:"एनालिटिक्स और रिपोर्ट", svc6_d:"GA4 और Power BI के साथ रीयल-टाइम डैशबोर्ड। हम पारंपरिक और जनरेटिव दृश्यता मापते हैं।",
  why_label:"हमें क्यों चुनें", why_title:`मापने योग्य परिणाम,<br>खोखले वादे नहीं।`,
  why1_t:"दोहरा SEO + GEO दृष्टिकोण", why1_d:"हम क्लासिक ऑर्गेनिक परिणामों और जनरेटिव AI उत्तरों दोनों में रैंक करते हैं।",
  why2_t:"35+ उद्योग निष्पादित", why2_d:"ई-कॉमर्स, SaaS, स्वास्थ्य, फिनटेक और अधिक। हम हर वर्टिकल की बारीकियाँ जानते हैं।",
  why3_t:"SEO में डेटा साइंस", why3_d:"हम साक्ष्य-आधारित निर्णयों के लिए Python, SQL और Power BI का उपयोग करते हैं।",
  why4_t:"पूर्ण पारदर्शिता", why4_d:"डैशबोर्ड, लॉग और मासिक रिपोर्ट तक पहुँच। सब कुछ मापने योग्य और समझाया गया।",
  geo_label:"जनरेटिव इंजन", geo_title:`SEO विकसित हुआ।<br>क्या आपका ब्रांड AI में है?`,
  geo_sub:"2026 में, 40% खोजें बिना क्लिक के AI द्वारा हल होती हैं। उद्धृत होना नई #1 स्थिति है।",
  eng1_d:"Google के जनरेटिव उत्तरों में दिखें।",
  eng2_d:"200M+ साप्ताहिक उपयोगकर्ता। आपका ब्रांड उद्धृत उत्तर होना चाहिए।",
  eng3_d:"हम अनुकूलित करते हैं ताकि Gemini आपकी साइट को अधिकार स्रोत के रूप में उद्धृत करे।",
  eng4_d:"100M+ मासिक प्रश्न। हम आपके कंटेंट को वहाँ दिखने के लिए स्थापित करते हैं।",
  res_projects:"निष्पादित परियोजनाएँ", res_countries:"देश", res_industries:"उद्योग", res_years:"वर्षों का अनुभव",
  process_label:"कार्यप्रणाली", process_title:"हम कैसे काम करते हैं",
  process_sub:"एक सिद्ध प्रक्रिया जो तकनीकी कठोरता, कंटेंट रणनीति और AI अनुकूलन को जोड़ती है।",
  step1_t:"निदान और बेंचमार्किंग", step1_d:"पारंपरिक SEO और GEO में तकनीकी ऑडिट, दृश्यता विश्लेषण और प्रतिस्पर्धी बेंचमार्किंग।",
  step2_t:"कीवर्ड और कंटेंट रणनीति", step2_d:"सिमेंटिक रिसर्च, इंटेंट वर्गीकरण और जनरेटिव दृश्यता विश्लेषण।",
  step3_t:"तकनीकी और कंटेंट कार्यान्वयन", step3_d:"मेटाडेटा अनुकूलन, Schema.org, आंतरिक आर्किटेक्चर और E-E-A-T तथा AI के लिए कंटेंट।",
  step4_t:"लिंक बिल्डिंग और अधिकार", step4_d:"विश्वास के लिए उच्च-अधिकार बैकलिंक निर्माण और ब्रांड उल्लेख।",
  step5_t:"मापन, रिपोर्ट और स्केल", step5_d:"Power BI + GA4 डैशबोर्ड। रैंकिंग, ट्रैफ़िक, AI उद्धरण और ROI पर रिपोर्ट।",
  skills_label:"प्रौद्योगिकियाँ", skills_title:"टेक स्टैक",
  skills_sub:"उच्च-प्रदर्शन SEO के लिए डेटा साइंस के साथ अग्रणी उपकरण।",
  contact_label:"बात करें", contact_title:`सर्च इंजनों पर हावी<br>होने के लिए तैयार?`,
  contact_sub:"हमसे चैट करें और जानें कि हम आपकी डिजिटल उपस्थिति कैसे बढ़ा सकते हैं।",
  contact_btn:"💬 अभी विशेषज्ञ से चैट करें",
  contact_note:"📱 5 मिनट से कम में जवाब | कोई प्रतिबद्धता नहीं",
  footer_copy:"© 2026 Páginas Web Total. सर्वाधिकार सुरक्षित। | SEO और GEO एजेंसी"
};

// ===== Datos AEO/Schema: FAQ (7), servicios (7), org =====
const AI = {};
AI.fr = {
  orgDesc:"Agence SEO et GEO avec plus de 14 ans d'expérience. Nous positionnons sur Google, Bing et les moteurs génératifs d'IA : ChatGPT, Gemini, Perplexity et Google AI Overviews.",
  slogan:"Nous positionnons sur Google et dans l'IA. Des résultats mesurables, pas des promesses vides.",
  services:[
    ["SEO Technique","Audit approfondi, Crawl Budget, Core Web Vitals, données structurées Schema.org, architecture optimisée pour les moteurs et l'IA."],
    ["GEO — Generative Engine Optimization","Optimisation de contenu pour être cité par ChatGPT, Gemini, Google AI Overviews et Perplexity. Inclut llms.txt, schema avancé et structure citable."],
    ["AEO — Answer Engine Optimization","Optimisation pour apparaître dans les réponses directes des moteurs de réponse. Structure question-réponse, données FAQPage et autorité thématique."],
    ["SEO de Contenu","Recherche de mots-clés, cartographie sémantique, clusters de contenu et optimisation E-E-A-T pour une autorité thématique réelle."],
    ["Link Building","Construction d'autorité avec des backlinks de qualité issus de médias spécialisés et de mentions de marque organiques."],
    ["SEO Programmatique","Création de pages à grande échelle grâce aux données structurées et à l'automatisation pour dominer les niches de longue traîne."],
    ["Analytique & Rapports","Tableaux de bord en temps réel avec GA4 et Power BI. Mesure de la visibilité traditionnelle et générative avec rapports mensuels."]
  ],
  faq:[
    ["Qu'est-ce que le GEO (Generative Engine Optimization) ?","Le GEO est l'optimisation de votre contenu pour être cité et recommandé par les moteurs d'IA comme ChatGPT, Gemini, Perplexity et Google AI Overviews. C'est l'évolution du SEO pour l'ère de la recherche générative, où 40 % des requêtes sont résolues par l'IA sans clic."],
    ["Quelle est la différence entre le SEO et le GEO ?","Le SEO optimise pour apparaître dans les résultats de recherche traditionnels. Le GEO optimise pour que votre contenu soit cité directement dans les réponses générées par l'IA. Páginas Web Total travaille les deux en parallèle avec une approche double SEO+GEO."],
    ["Dans quels pays opérez-vous ?","Nous travaillons avec des clients dans plus de 15 pays, principalement en Espagne, au Mexique, en Colombie, en Argentine et aux États-Unis, en menant des stratégies SEO et GEO dans plus de 35 secteurs dont l'e-commerce, le SaaS, la santé et la fintech."],
    ["Combien de temps faut-il pour voir des résultats SEO ?","Les premiers résultats techniques sont observés en 4 à 8 semaines. Des améliorations significatives du référencement organique surviennent entre 3 et 6 mois. Pour le GEO, les citations dans les moteurs d'IA peuvent commencer en 6 à 12 semaines après une implémentation correcte."],
    ["Qu'est-ce que l'AEO (Answer Engine Optimization) ?","L'AEO est l'optimisation pour apparaître dans les réponses directes des moteurs de réponse comme les extraits optimisés de Google, ChatGPT et Perplexity. Cela implique de structurer le contenu au format question-réponse avec des données structurées, un langage clair et une autorité thématique démontrable."],
    ["Proposez-vous des audits SEO et GEO gratuits ?","Oui, nous offrons un devis et un diagnostic initial gratuits. Contactez-nous via le chat pour recevoir une évaluation préliminaire de votre situation actuelle en SEO et GEO sans aucun coût, avec une réponse en moins de 5 minutes."],
    ["Comment optimisez-vous pour Google AI Overviews ?","Nous optimisons en implémentant un Schema.org avancé, en structurant le contenu pour répondre directement aux questions, en améliorant les signaux E-E-A-T, en obtenant des citations de sources autorisées et en garantissant que les bots de Google (Googlebot, Google-Extended) puissent explorer et indexer le site sans restriction."]
  ]
};
AI.ru = {
  orgDesc:"Агентство SEO и GEO с опытом более 14 лет. Продвигаем в Google, Bing и генеративных ИИ-системах: ChatGPT, Gemini, Perplexity и Google AI Overviews.",
  slogan:"Продвигаем в Google и в ИИ. Измеримые результаты, а не пустые обещания.",
  services:[
    ["Техническое SEO","Глубокий аудит, Crawl Budget, Core Web Vitals, структурированные данные Schema.org, архитектура, оптимизированная под поисковики и ИИ."],
    ["GEO — Generative Engine Optimization","Оптимизация контента для цитирования в ChatGPT, Gemini, Google AI Overviews и Perplexity. Включает llms.txt, продвинутый schema и цитируемую структуру."],
    ["AEO — Answer Engine Optimization","Оптимизация для появления в прямых ответах поисковых систем. Структура «вопрос-ответ», данные FAQPage и тематический авторитет."],
    ["Контентное SEO","Исследование ключевых слов, семантическое картирование, контент-кластеры и оптимизация E-E-A-T для реального тематического авторитета."],
    ["Линкбилдинг","Наращивание авторитета качественными бэклинками из специализированных СМИ и органичными упоминаниями бренда."],
    ["Программное SEO","Создание страниц в масштабе с помощью структурированных данных и автоматизации для доминирования в низкочастотных нишах."],
    ["Аналитика и отчёты","Дашборды в реальном времени на GA4 и Power BI. Измерение традиционной и генеративной видимости с ежемесячными отчётами."]
  ],
  faq:[
    ["Что такое GEO (Generative Engine Optimization)?","GEO — это оптимизация вашего контента для цитирования и рекомендаций со стороны ИИ-систем, таких как ChatGPT, Gemini, Perplexity и Google AI Overviews. Это эволюция SEO для эпохи генеративного поиска, где 40% запросов решаются ИИ без клика."],
    ["В чём разница между SEO и GEO?","SEO оптимизирует появление в традиционных результатах поиска. GEO оптимизирует контент для прямого цитирования в ответах, сгенерированных ИИ. Páginas Web Total работает с обоими параллельно, применяя двойной подход SEO+GEO."],
    ["В каких странах вы работаете?","Мы работаем с клиентами более чем в 15 странах, главным образом в Испании, Мексике, Колумбии, Аргентине и США, реализуя стратегии SEO и GEO в более чем 35 отраслях, включая e-commerce, SaaS, здравоохранение и финтех."],
    ["Сколько времени нужно, чтобы увидеть результаты SEO?","Первые технические результаты заметны через 4-8 недель. Значительные улучшения органических позиций происходят через 3-6 месяцев. Для GEO цитирования в ИИ-системах могут начаться через 6-12 недель после правильного внедрения."],
    ["Что такое AEO (Answer Engine Optimization)?","AEO — это оптимизация для появления в прямых ответах поисковых систем, таких как избранные сниппеты Google, ChatGPT и Perplexity. Это предполагает структурирование контента в формате «вопрос-ответ» со структурированными данными, ясным языком и доказуемым тематическим авторитетом."],
    ["Предлагаете ли вы бесплатный SEO- и GEO-аудит?","Да, мы предлагаем бесплатную смету и первичную диагностику. Свяжитесь с нами через чат, чтобы получить предварительную оценку текущей ситуации в SEO и GEO бесплатно, с ответом менее чем за 5 минут."],
    ["Как вы оптимизируете под Google AI Overviews?","Мы оптимизируем, внедряя продвинутый Schema.org, структурируя контент для прямых ответов на вопросы, улучшая сигналы E-E-A-T, получая цитирования из авторитетных источников и обеспечивая, чтобы боты Google (Googlebot, Google-Extended) могли сканировать и индексировать сайт без ограничений."]
  ]
};
AI.zh = {
  orgDesc:"拥有14年以上经验的SEO和GEO机构。我们在Google、Bing以及生成式AI引擎中获得排名：ChatGPT、Gemini、Perplexity和Google AI Overviews。",
  slogan:"我们在Google和AI中获得排名。可衡量的成果，而非空洞承诺。",
  services:[
    ["技术SEO","深度审计、抓取预算、Core Web Vitals、Schema.org结构化数据、为搜索引擎和AI优化的架构。"],
    ["GEO — 生成式引擎优化","优化内容以被ChatGPT、Gemini、Google AI Overviews和Perplexity引用。包含llms.txt、高级schema和可引用结构。"],
    ["AEO — 答案引擎优化","优化以出现在答案引擎的直接回答中。问答结构、FAQPage结构化数据和主题权威。"],
    ["内容SEO","关键词研究、语义映射、内容集群以及E-E-A-T优化，建立真实的主题权威。"],
    ["外链建设","通过来自专业媒体的优质外链和自然品牌提及来建立权威。"],
    ["程序化SEO","利用结构化数据和自动化大规模创建页面，主导长尾细分市场。"],
    ["分析与报告","使用GA4和Power BI的实时仪表板。通过月度报告衡量传统与生成式可见性。"]
  ],
  faq:[
    ["什么是GEO（生成式引擎优化）？","GEO是优化您的内容，使其被ChatGPT、Gemini、Perplexity和Google AI Overviews等AI引擎引用和推荐。这是SEO在生成式搜索时代的演进，其中40%的查询由AI无点击解决。"],
    ["SEO和GEO有什么区别？","SEO优化为出现在传统搜索结果中。GEO优化为使您的内容在AI生成的回答中被直接引用。Páginas Web Total以SEO+GEO双重策略并行开展两者。"],
    ["你们在哪些国家运营？","我们与15个以上国家的客户合作，主要在西班牙、墨西哥、哥伦比亚、阿根廷和美国，在包括电商、SaaS、医疗和金融科技在内的35个以上行业执行SEO和GEO策略。"],
    ["SEO需要多长时间才能看到成果？","首批技术成果在4-8周内可见。自然排名的显著提升发生在3-6个月之间。对于GEO，正确实施后AI引擎中的引用可在6-12周内开始。"],
    ["什么是AEO（答案引擎优化）？","AEO是优化以出现在答案引擎的直接回答中，例如Google精选摘要、ChatGPT和Perplexity。这涉及以问答格式构建内容，配以结构化数据、清晰语言和可证明的主题权威。"],
    ["你们提供免费的SEO和GEO审计吗？","是的，我们提供免费报价和初步诊断。通过聊天联系我们，免费获得对您当前SEO和GEO状况的初步评估，5分钟内回复。"],
    ["你们如何为Google AI Overviews优化？","我们通过实施高级Schema.org、构建内容以直接回答问题、增强E-E-A-T信号、获取权威来源的引用，并确保Google的爬虫（Googlebot、Google-Extended）能够无限制地抓取和索引网站来进行优化。"]
  ]
};
AI.pt = {
  orgDesc:"Agência de SEO e GEO com mais de 14 anos de experiência. Posicionamos no Google, Bing e nos mecanismos generativos de IA: ChatGPT, Gemini, Perplexity e Google AI Overviews.",
  slogan:"Posicionamos no Google e na IA. Resultados mensuráveis, não promessas vazias.",
  services:[
    ["SEO Técnico","Auditoria profunda, Crawl Budget, Core Web Vitals, dados estruturados Schema.org, arquitetura otimizada para buscadores e IA."],
    ["GEO — Generative Engine Optimization","Otimização de conteúdo para ser citado por ChatGPT, Gemini, Google AI Overviews e Perplexity. Inclui llms.txt, schema avançado e estrutura citável."],
    ["AEO — Answer Engine Optimization","Otimização para aparecer em respostas diretas de mecanismos de resposta. Estrutura pergunta-resposta, dados FAQPage e autoridade temática."],
    ["SEO de Conteúdo","Pesquisa de palavras-chave, mapeamento semântico, clusters de conteúdo e otimização E-E-A-T para autoridade temática real."],
    ["Link Building","Construção de autoridade com backlinks de qualidade de mídias especializadas e menções orgânicas à marca."],
    ["SEO Programático","Criação de páginas em escala usando dados estruturados e automação para dominar nichos de cauda longa."],
    ["Analytics & Relatórios","Dashboards em tempo real com GA4 e Power BI. Medição de visibilidade tradicional e generativa com relatórios mensais."]
  ],
  faq:[
    ["O que é GEO (Generative Engine Optimization)?","GEO é a otimização do seu conteúdo para ser citado e recomendado por mecanismos de IA como ChatGPT, Gemini, Perplexity e Google AI Overviews. É a evolução do SEO para a era da busca generativa, onde 40% das consultas são resolvidas pela IA sem clique."],
    ["Qual a diferença entre SEO e GEO?","O SEO otimiza para aparecer nos resultados de busca tradicionais. O GEO otimiza para que seu conteúdo seja citado diretamente nas respostas geradas por IA. A Páginas Web Total trabalha ambos em paralelo com uma abordagem dupla SEO+GEO."],
    ["Em quais países vocês operam?","Trabalhamos com clientes em mais de 15 países, principalmente na Espanha, México, Colômbia, Argentina e Estados Unidos, executando estratégias de SEO e GEO em mais de 35 indústrias, incluindo e-commerce, SaaS, saúde e fintech."],
    ["Quanto tempo leva para ver resultados em SEO?","Os primeiros resultados técnicos são observados em 4-8 semanas. Melhorias significativas no posicionamento orgânico ocorrem entre 3-6 meses. Para GEO, as citações em mecanismos de IA podem começar em 6-12 semanas após a implementação correta."],
    ["O que é AEO (Answer Engine Optimization)?","AEO é a otimização para aparecer em respostas diretas de mecanismos de resposta, como os snippets em destaque do Google, ChatGPT e Perplexity. Envolve estruturar o conteúdo em formato pergunta-resposta com dados estruturados, linguagem clara e autoridade temática comprovável."],
    ["Vocês oferecem auditorias de SEO e GEO gratuitas?","Sim, oferecemos um orçamento e diagnóstico inicial gratuito. Entre em contato pelo chat para receber uma avaliação preliminar da sua situação atual em SEO e GEO sem custo, com resposta em menos de 5 minutos."],
    ["Como vocês otimizam para o Google AI Overviews?","Otimizamos implementando Schema.org avançado, estruturando o conteúdo para responder perguntas diretamente, melhorando os sinais E-E-A-T, obtendo citações de fontes autorizadas e garantindo que os bots do Google (Googlebot, Google-Extended) possam rastrear e indexar o site sem restrições."]
  ]
};
AI.hi = {
  orgDesc:"14+ वर्षों के अनुभव वाली SEO और GEO एजेंसी। हम Google, Bing और जनरेटिव AI इंजनों में रैंक कराते हैं: ChatGPT, Gemini, Perplexity और Google AI Overviews।",
  slogan:"हम Google और AI में रैंक कराते हैं। मापने योग्य परिणाम, खोखले वादे नहीं।",
  services:[
    ["तकनीकी SEO","गहन ऑडिट, क्रॉल बजट, Core Web Vitals, Schema.org संरचित डेटा, सर्च इंजन और AI के लिए अनुकूलित आर्किटेक्चर।"],
    ["GEO — जनरेटिव इंजन ऑप्टिमाइज़ेशन","ChatGPT, Gemini, Google AI Overviews और Perplexity द्वारा उद्धृत होने के लिए कंटेंट अनुकूलन। इसमें llms.txt, उन्नत schema और उद्धरण योग्य संरचना शामिल है।"],
    ["AEO — आंसर इंजन ऑप्टिमाइज़ेशन","आंसर इंजनों के प्रत्यक्ष उत्तरों में दिखने के लिए अनुकूलन। प्रश्न-उत्तर संरचना, FAQPage डेटा और विषयगत अधिकार।"],
    ["कंटेंट SEO","कीवर्ड रिसर्च, सिमेंटिक मैपिंग, कंटेंट क्लस्टर और वास्तविक विषयगत अधिकार के लिए E-E-A-T अनुकूलन।"],
    ["लिंक बिल्डिंग","विशेष मीडिया से गुणवत्तापूर्ण बैकलिंक और ऑर्गेनिक ब्रांड उल्लेखों के साथ अधिकार निर्माण।"],
    ["प्रोग्रामेटिक SEO","लॉन्ग-टेल निचे पर हावी होने के लिए संरचित डेटा और स्वचालन का उपयोग करके बड़े पैमाने पर पेज निर्माण।"],
    ["एनालिटिक्स और रिपोर्ट","GA4 और Power BI के साथ रीयल-टाइम डैशबोर्ड। मासिक रिपोर्ट के साथ पारंपरिक और जनरेटिव दृश्यता का मापन।"]
  ],
  faq:[
    ["GEO (जनरेटिव इंजन ऑप्टिमाइज़ेशन) क्या है?","GEO आपके कंटेंट को ChatGPT, Gemini, Perplexity और Google AI Overviews जैसे AI इंजनों द्वारा उद्धृत और अनुशंसित होने के लिए अनुकूलित करना है। यह जनरेटिव सर्च युग के लिए SEO का विकास है, जहाँ 40% प्रश्न बिना क्लिक के AI द्वारा हल होते हैं।"],
    ["SEO और GEO में क्या अंतर है?","SEO पारंपरिक खोज परिणामों में दिखने के लिए अनुकूलन करता है। GEO आपके कंटेंट को AI-जनित उत्तरों में सीधे उद्धृत होने के लिए अनुकूलित करता है। Páginas Web Total दोनों को SEO+GEO दोहरे दृष्टिकोण के साथ समानांतर रूप से काम करती है।"],
    ["आप किन देशों में काम करते हैं?","हम 15+ देशों के ग्राहकों के साथ काम करते हैं, मुख्यतः स्पेन, मैक्सिको, कोलंबिया, अर्जेंटीना और संयुक्त राज्य अमेरिका में, ई-कॉमर्स, SaaS, स्वास्थ्य और फिनटेक सहित 35+ उद्योगों में SEO और GEO रणनीतियाँ निष्पादित करते हुए।"],
    ["SEO में परिणाम देखने में कितना समय लगता है?","पहले तकनीकी परिणाम 4-8 सप्ताह में दिखते हैं। ऑर्गेनिक रैंकिंग में महत्वपूर्ण सुधार 3-6 महीनों के बीच होता है। GEO के लिए, सही कार्यान्वयन के बाद AI इंजनों में उद्धरण 6-12 सप्ताह में शुरू हो सकते हैं।"],
    ["AEO (आंसर इंजन ऑप्टिमाइज़ेशन) क्या है?","AEO आंसर इंजनों जैसे Google फीचर्ड स्निपेट, ChatGPT और Perplexity के प्रत्यक्ष उत्तरों में दिखने के लिए अनुकूलन है। इसमें संरचित डेटा, स्पष्ट भाषा और प्रदर्शनीय विषयगत अधिकार के साथ प्रश्न-उत्तर प्रारूप में कंटेंट संरचित करना शामिल है।"],
    ["क्या आप मुफ्त SEO और GEO ऑडिट प्रदान करते हैं?","हाँ, हम मुफ्त कोटेशन और प्रारंभिक निदान प्रदान करते हैं। अपनी वर्तमान SEO और GEO स्थिति का प्रारंभिक मूल्यांकन बिना किसी लागत के, 5 मिनट से कम में उत्तर के साथ पाने के लिए चैट के माध्यम से हमसे संपर्क करें।"],
    ["आप Google AI Overviews के लिए कैसे अनुकूलित करते हैं?","हम उन्नत Schema.org लागू करके, प्रश्नों का सीधे उत्तर देने के लिए कंटेंट संरचित करके, E-E-A-T संकेतों को बेहतर बनाकर, अधिकृत स्रोतों से उद्धरण प्राप्त करके, और यह सुनिश्चित करके अनुकूलित करते हैं कि Google के बॉट (Googlebot, Google-Extended) बिना किसी प्रतिबंध के साइट को क्रॉल और इंडेक्स कर सकें।"]
  ]
};
// es/en: datos para schema FAQ embebido (5)
AI.es = { orgDesc:"Agencia SEO y GEO con más de 14 años de experiencia. Posicionamos en Google, Bing y motores generativos de IA: ChatGPT, Gemini, Perplexity y Google AI Overviews.",
  faq:[
    ["¿Qué es GEO (Generative Engine Optimization)?","GEO es la optimización de tu contenido para ser citado por motores de IA como ChatGPT, Gemini, Perplexity y Google AI Overviews. En 2026, el 40% de las búsquedas se resuelven con IA sin clic. Ser citado es la nueva posición #1."],
    ["¿Qué diferencia hay entre SEO y GEO?","El SEO optimiza para aparecer en resultados de búsqueda tradicionales. El GEO optimiza para que tu contenido sea citado directamente en respuestas generadas por IA. Páginas Web Total trabaja ambos con un enfoque dual SEO+GEO desde 2012."],
    ["¿Cuánto tiempo lleva ver resultados en SEO?","Los primeros resultados técnicos se observan en 4-8 semanas. Mejoras significativas en posicionamiento orgánico ocurren entre 3-6 meses. Para GEO, las citas en motores de IA pueden comenzar en 6-12 semanas tras la implementación correcta."],
    ["¿En qué países y sectores operan?","Trabajamos con clientes en más de 15 países incluyendo España, México, Colombia, Argentina y Estados Unidos, con experiencia en más de 35 industrias: ecommerce, SaaS, salud, fintech, educación y más."],
    ["¿Ofrecen auditorías SEO y GEO gratuitas?","Sí, ofrecemos un diagnóstico inicial gratuito. Contáctanos por el chat para una evaluación de tu situación actual en SEO y GEO con respuesta en menos de 5 minutos y sin compromiso."]
  ]
};
AI.en = { orgDesc:"SEO and GEO agency with 14+ years of experience. We rank on Google, Bing and AI generative engines: ChatGPT, Gemini, Perplexity and Google AI Overviews.",
  faq:[
    ["What is GEO (Generative Engine Optimization)?","GEO is the optimization of your content to be cited by AI engines like ChatGPT, Gemini, Perplexity and Google AI Overviews. In 2026, 40% of searches are resolved by AI without a click. Being cited is the new number 1 position."],
    ["What is the difference between SEO and GEO?","SEO optimizes for appearing in traditional search results. GEO optimizes for your content to be directly cited in AI-generated answers. Páginas Web Total works both with a dual SEO+GEO approach since 2012."],
    ["How long does it take to see SEO results?","First technical results are observed in 4-8 weeks. Significant improvements in organic rankings occur between 3-6 months. For GEO, citations in AI engines can begin within 6-12 weeks after proper implementation."],
    ["Which countries and sectors do you serve?","We work with clients in more than 15 countries including Spain, Mexico, Colombia, Argentina and the United States, with experience in 35+ industries: ecommerce, SaaS, healthcare, fintech, education and more."],
    ["Do you offer free SEO and GEO audits?","Yes, we offer a free initial diagnosis. Contact us via chat for an assessment of your current SEO and GEO situation with a response in under 5 minutes and no commitment."]
  ]
};

// ===== Generadores =====
const hreflangBlock = (selfUrl) => {
  const links = LANGS.map(l => `<link rel="alternate" hreflang="${l.hreflang}" href="${urlOf(l.folder)}">`).join('\n');
  return `<!-- ===== HREFLANG / IDIOMAS ALTERNATIVOS ===== -->
${links}
<link rel="alternate" hreflang="x-default" href="${BASE}/">
<link rel="canonical" id="canonicalTag" href="${selfUrl}">
<!-- ===== SCHEMA JSON-LD SEO/GEO/AEO ===== -->`;
};

function schemaFor(L){
  const url = urlOf(L.folder);
  const d = DICT[L.key], ai = AI[L.key];
  const others = LANGS.filter(x=>x.key!==L.key).map(x=>urlOf(x.folder));
  const graph = [
    { "@type":"WebSite", "@id":url+"#website", url, name:"Páginas Web Total", description:d.__meta.desc, inLanguage:L.hreflang,
      potentialAction:{ "@type":"SearchAction", target:url+"?s={search_term_string}", "query-input":"required name=search_term_string" } },
    { "@type":"Organization", "@id":url+"#organization", name:"Páginas Web Total", url, description:ai.orgDesc,
      foundingDate:"2012", areaServed:"Worldwide", knowsAbout:KNOWS,
      contactPoint:{ "@type":"ContactPoint", contactType:"sales", availableLanguage:["Spanish","English",L.label], url:url+"#contacto" },
      sameAs:others },
    { "@type":"FAQPage", "@id":url+"#faq",
      mainEntity: ai.faq.slice(0,5).map(([q,a])=>({ "@type":"Question", name:q, acceptedAnswer:{ "@type":"Answer", text:a } })) }
  ];
  return JSON.stringify({ "@context":"https://schema.org", "@graph":graph }, null, 2);
}

function engineScript(){
  // objeto LANGS para el cliente
  const cfg = {};
  LANGS.forEach(l => { cfg[l.key] = { path: l.folder?('/'+l.folder+'/'):'/', hreflang:l.hreflang, langAttr:l.htmlLang, ogLocale:l.ogLocale, canonical:urlOf(l.folder) }; });
  const dictJson = JSON.stringify(DICT, null, 4);
  const cfgJson = JSON.stringify(cfg, null, 4);
  return `<!-- ================== MOTOR MULTILINGÜE (7 idiomas) ================== -->
<script>
(function(){
  const I18N = ${dictJson};
  const CFG = ${cfgJson};
  const KEYS = Object.keys(CFG);
  window.__I18N = I18N; window.__lang = 'es';

  function detectLang(){
    var p = location.pathname.toLowerCase();
    for(var i=0;i<KEYS.length;i++){
      var k = KEYS[i];
      if(k === 'es') continue;
      if(new RegExp('(^|/)'+k+'(/|$)').test(p)) return k;
    }
    var q = new URLSearchParams(location.search).get('lang');
    if(q && CFG[q]) return q;
    try { var s = localStorage.getItem('pwt_lang'); if(s && CFG[s]) return s; } catch(e){}
    return 'es';
  }
  function setAttr(sel, attr, val){ var e = document.querySelector(sel); if(e) e.setAttribute(attr, val); }

  function apply(lang){
    if(!CFG[lang]) lang = 'es';
    var dict = I18N[lang] || I18N.es, cfg = CFG[lang];
    window.__lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n'); if(dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var k = el.getAttribute('data-i18n-html'); if(dict[k] != null) el.innerHTML = dict[k];
    });
    var m = dict.__meta;
    document.documentElement.lang = cfg.langAttr;
    if(m){ document.title = m.title; setAttr('#pageDesc','content',m.desc); setAttr('#ogTitle','content',m.ogTitle); setAttr('#ogDesc','content',m.ogDesc); }
    setAttr('#ogLocale','content',cfg.ogLocale);
    setAttr('#canonicalTag','href',cfg.canonical);
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }
  window.setLang = function(lang, userClick){
    if(!CFG[lang]) lang = 'es';
    apply(lang);
    try { localStorage.setItem('pwt_lang', lang); } catch(e){}
    if(userClick){ try { history.replaceState(null, '', CFG[lang].path + location.hash); } catch(e){} }
  };
  apply(detectLang());
})();
</script>
<!-- ================ FIN MOTOR MULTILINGÜE ================ -->`;
}

function langSwitch(){
  const labels = { es:'ES', en:'EN', fr:'FR', ru:'RU', zh:'中文', pt:'PT', hi:'HI' };
  const btns = LANGS.map(l => `    <button class="lang-btn" data-lang="${l.key}" onclick="setLang('${l.key}', true)">${labels[l.key]}</button>`).join('\n');
  return `<div class="lang-switch" role="group" aria-label="Language selector">\n${btns}\n  </div>`;
}

// ===== Plantilla base (en/index.html) =====
let TPL = readFileSync(join(ROOT,'en','index.html'),'utf8');

function setMetaContent(html, id, val){
  return html.replace(new RegExp(`(<[^>]*id="${id}"[^>]*content=")[^"]*(")`), `$1${val.replace(/\$/g,'$$$$')}$2`);
}

function buildHtml(L){
  const d = DICT[L.key], url = urlOf(L.folder);
  let html = TPL;
  // <html lang>
  html = html.replace(/<html lang="[^"]*" id="htmlRoot">/, `<html lang="${L.htmlLang}" id="htmlRoot">`);
  // <title>
  html = html.replace(/<title id="pageTitle">[\s\S]*?<\/title>/, `<title id="pageTitle">${d.__meta.title}</title>`);
  // metas
  html = setMetaContent(html, 'pageDesc', d.__meta.desc);
  html = setMetaContent(html, 'ogTitle', d.__meta.ogTitle);
  html = setMetaContent(html, 'ogDesc', d.__meta.ogDesc);
  html = setMetaContent(html, 'ogLocale', L.ogLocale);
  // bloque hreflang + schema + fin  (de "<!-- ===== HREFLANG" hasta "<!-- ===== FIN HREFLANG ===== -->")
  const block = hreflangBlock(url) + '\n' + `<script type="application/ld+json">\n${schemaFor(L)}\n</script>` +
    '\n<!-- ===== END SCHEMA JSON-LD ===== -->\n<!-- ===== FIN HREFLANG ===== -->';
  html = html.replace(/<!-- ===== HREFLANG \/ IDIOMAS ALTERNATIVOS ===== -->[\s\S]*?<!-- ===== FIN HREFLANG ===== -->/, block.replace(/\$/g,'$$$$'));
  // selector de idioma
  html = html.replace(/<div class="lang-switch"[\s\S]*?<\/div>/, langSwitch().replace(/\$/g,'$$$$'));
  // motor multilingüe (reemplaza el bloque bilingüe o multilingüe previo)
  html = html.replace(/<!-- ={2,} MOTOR (?:BILINGÜE|MULTILINGÜE)[\s\S]*?FIN MOTOR (?:BILINGÜE|MULTILINGÜE) ={2,} -->/, engineScript().replace(/\$/g,'$$$$'));
  return html;
}

// ===== Generadores AI JSON (solo idiomas nuevos) =====
function aiSummary(L){
  const ai = AI[L.key], url = urlOf(L.folder);
  const others = LANGS.filter(x=>x.key!==L.key).map(x=>urlOf(x.folder));
  return JSON.stringify({
    "@context":"https://schema.org","@type":"Organization", name:"Páginas Web Total", url,
    description:ai.orgDesc, foundingDate:"2012", areaServed:"Worldwide", inLanguage:L.hreflang,
    knowsAbout:KNOWS, slogan:ai.slogan,
    contactPoint:{ "@type":"ContactPoint", contactType:"sales", availableLanguage:["Spanish","English",L.label], url:url+"#contacto" },
    sameAs:others
  }, null, 2);
}
function aiService(L){
  const ai = AI[L.key], url = urlOf(L.folder);
  return JSON.stringify({
    "@context":"https://schema.org","@type":"ProfessionalService", name:"Páginas Web Total", url, inLanguage:L.hreflang,
    description:ai.orgDesc, foundingDate:"2012", areaServed:"Worldwide",
    hasOfferCatalog:{ "@type":"OfferCatalog", name:"Digital Ranking Services",
      itemListElement: ai.services.map(([n,desc])=>({ "@type":"Offer", itemOffered:{ "@type":"Service", name:n, description:desc } })) }
  }, null, 2);
}
function aiFaq(L){
  const ai = AI[L.key], url = urlOf(L.folder);
  return JSON.stringify({
    "@context":"https://schema.org","@type":"FAQPage", inLanguage:L.hreflang, url,
    mainEntity: ai.faq.map(([q,a])=>({ "@type":"Question", name:q, acceptedAnswer:{ "@type":"Answer", text:a } }))
  }, null, 2);
}

// ===== Sitemap con anotaciones hreflang (las 7 homes) =====
function buildSitemap(){
  const alt = LANGS.map(l => `      <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${urlOf(l.folder)}"/>`).join('\n')
    + `\n      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>`;
  const urls = LANGS.map(l =>
    `  <url>\n    <loc>${urlOf(l.folder)}</loc>\n${alt}\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

// ===== Ejecutar =====
const NEW = ['fr','ru','zh','pt','hi'];
// Genera en AMBAS ubicaciones: copia de trabajo (paginaswebtotal-new) y RAIZ del repo (la que se publica)
const REPO_ROOT = join(ROOT, '..', '..');
const BASES = [ROOT, REPO_ROOT];
for(const OUT of BASES){
  for(const L of LANGS){
    const dir = L.folder ? join(OUT, L.folder) : OUT;
    mkdirSync(dir, { recursive:true });
    writeFileSync(join(dir,'index.html'), buildHtml(L), 'utf8');
    if(NEW.includes(L.key)){
      const aidir = join(dir,'ai'); mkdirSync(aidir, { recursive:true });
      writeFileSync(join(aidir,'summary.json'), aiSummary(L), 'utf8');
      writeFileSync(join(aidir,'service.json'), aiService(L), 'utf8');
      writeFileSync(join(aidir,'faq.json'), aiFaq(L), 'utf8');
    }
  }
  writeFileSync(join(OUT,'sitemap.xml'), buildSitemap(), 'utf8');
  console.log('generado en ->', OUT);
}
console.log('OK');
