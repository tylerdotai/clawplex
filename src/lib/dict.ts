/* eslint-disable @typescript-eslint/no-explicit-any */

/* ─── Nav ─────────────────────────────────────────────────────────────── */
export const nav = {
  home: "Home",
  community: "Community",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  language: "Language",
  primaryCta: "Get Tickets",
  links: [
    { href: "/events",    label: "Events",    external: false },
    { href: "/skills",    label: "Skills",    external: false },
    { href: "/projects",  label: "Projects",  external: false },
    { href: "/partner",   label: "Partner",   external: false },
  ],
  communityLinks: [
    { href: "/community",       label: "Directory",  external: false },
    { href: "/community#feed",  label: "Feed",      external: false },
    { href: "/community#posts",  label: "Posts",     external: false },
    { href: "/sponsors",         label: "Sponsors",   external: false },
  ],
} as const;

/* ─── Footer ──────────────────────────────────────────────────────────── */
export const footer = {
  home: "Home",
  eyebrow: "DFW AI Builder Community",
  description:
    "A collective of builders shipping AI-native projects in the Dallas–Fort Worth metroplex. We code, ship, and ship some more.",
  copyright: "All rights reserved",
  privacy: "Privacy",
  terms: "Terms",
  builtOn: "Built with Hermes Agent",
  language: "Language",
  nav: {
    "Platform": [
      { href: "/",          label: "Home",     external: false },
      { href: "/events",    label: "Events",   external: false },
      { href: "/skills",    label: "Skills",   external: false },
      { href: "/projects",  label: "Projects", external: false },
      { href: "/partner",   label: "Partner",  external: false },
    ],
    "Community": [
      { href: "/community",      label: "Directory", external: false },
      { href: "/community#feed", label: "Feed",     external: false },
      { href: "/sponsors",        label: "Sponsors",  external: false },
    ],
    "Legal": [
      { href: "/privacy", label: "Privacy", external: false },
      { href: "/terms",   label: "Terms",   external: false },
    ],
  },
};

/* ─── Home page ───────────────────────────────────────────────────────── */
export const home = {
  countdown: [
    { key: "days",    label: "Days" },
    { key: "hours",   label: "Hours" },
    { key: "minutes", label: "Mins" },
    { key: "seconds", label: "Secs" },
  ],
  hero: {
    eyebrow: "ClawPlex DFW · Irving, TX · Oct 2025",
    titleLine1: "DFW's Premier",
    titleLine2Prefix: "AI",
    titleLine2Accent: "Hackathon",
    body:
      "24 hours. 6 tracks. Unlimited coffee. Build something the world hasn't seen yet — then ship it live on stage.",
    nextLabel: "Next Event",
    nextMeta: "Oct 2025 · Irving, TX",
    rsvp: "Get Tickets",
    discord: "Join Discord",
    imageAlt: "Crowd at a ClawPlex hackathon event",
    caption: "ClawPlex · DFW AI Hackathon",
  },
  what: {
    imageAlt: "Builder working at laptop in a coworking space",
    caption: "ClawPlex community in action",
    facts: [
      { value: "150+", label: "builders" },
      { value: "20+",  label: "projects shipped" },
      { value: "6",    label: "tracks" },
      { value: "24h",  label: "per event" },
    ],
    eyebrow: "What We Do",
    titleLine1: "We build.",
    titleAccent: "Together.",
    paragraphs: [
      "ClawPlex is a DFW-wide collective of developers, designers, and founders who show up, ship projects, and have a real good time doing it.",
      "Our hackathons are high-signal, low-bullshit. No pitch decks, no panels — just a weekend of intense building and an afterparty worth showing up for.",
    ],
    ship: "Ship a project",
    tags: ["AI Agents", "RAG", "Code Gen", "Infrastructure", "Robotics"],
  },
  event: {
    eyebrow: "Next Event",
    title: "ClawPlex Hackathon",
    in: "in",
    locationAccent: "Irving, TX",
    dateMeta: "Oct 2025",
    placeMeta: "Irving Convention Center",
    termsMeta: "21+ only · BYOB policy",
    startsIn: "Starts in",
    rsvp: "Get Tickets",
    discord: "Join Discord",
    imageAlt: "Hackathon venue — Irving Convention Center",
    caption: "Irving Convention Center",
    badgeDay: "13",
    badgeMonthTime: "OCT · TBD",
  },
  ways: {
    eyebrow: "Why Join",
    items: [
      {
        num: "01",
        label: "Build Fast",
        title: "Ship a project in 24 hours",
        desc: "No endless planning. No scope creep. Just you, your team, and a weekend to build something real.",
        cta: "Join a hackathon",
        href: "/events",
      },
      {
        num: "02",
        label: "Find Your People",
        title: "Collaborate with DFW's best builders",
        desc: "Meet founders, engineers, and designers who actually ship. The DFW AI community is small enough to know, big enough to learn from.",
        cta: "Join the directory",
        href: "/community",
      },
      {
        num: "03",
        label: "Level Up",
        title: "Access tools and knowledge for free",
        desc: "From LLM APIs to compute credits to shared learnings — we pool resources so everyone builds faster.",
        cta: "Explore skills",
        href: "/skills",
      },
    ],
  },
  spotlight: {
    eyebrow: "Community Spotlight",
    titlePrefix: "Built by",
    titleAccent: "Members",
    allProjects: "All Projects",
    by: "by",
    visit: "Visit project",
    explore: "Explore projects",
    items: [
      {
        name: "Kilocode",
        builder: "KiloCode",
        description:
          "AI-powered coding agent that understands your repo context and writes production-ready code.",
        tag: "AI Coding",
        href: "https://kilocode.pxf.io/OYnK0N",
        external: true,
      },
      {
        name: "OpenClaw",
        builder: "ClawPlex",
        description:
          "Open-source AI agent framework powering the ClawPlex collective — fork it, build on it, ship it.",
        tag: "Agent OS",
        href: "https://github.com/ClawPlexDFW/openclaw",
        external: true,
      },
    ],
  },
  founders: {
    eyebrow: "The Humans",
    titlePrefix: "Built by",
    ariaLinkedIn: (name: string) => `${name} on LinkedIn`,
    ariaX: (name: string) => `${name} on X`,
    people: [
      {
        name: "Tyler Delano",
        role: "Founder & Lead Builder",
        image: "/tyler-delano.png",
        linkedin: "https://linkedin.com/in/tylerdelano",
        x: "https://x.com/tylerdelano",
      },
      {
        name: "Justine Delano",
        role: "Operations & Partnerships",
        image: "/justine-delano.png",
        linkedin: "https://linkedin.com/in/justinedelano",
        x: "https://x.com/justinedelano",
      },
    ],
  },
  agents: {
    prompt: "Use Hermes Agent",
    promptVerb: "to",
    eyebrow: "Your AI Workforce",
    titlePrefix: "Powered by",
    titleAccent: "Agents",
    promptTextSuffix: "for ClawPlex",
    helper:
      "Hermes Agent orchestrates autonomous sub-agents that research, build, test, and ship — then reports back.",
    copied: "Prompt copied!",
    copyPrompt: "Copy prompt",
    apiSummary: "OpenAI-compatible API · Built-in tool use · Long context",
    apiPre: "curl https://api.clawplex.ai/v1/chat/completions",
    notes: "Rate limits apply. Check docs for details.",
    privacy: "Privacy Policy",
    docs: "View Docs",
  },
  newsletter: {
    success: "You're on the list.",
    fallbackError: "Something went wrong. Try again.",
    eyebrow: "Stay in the Loop",
    titlePrefix: "Get",
    titleAccent: "Updates",
    body: "Drop your email for event drops, project launches, and community news — no spam, unsubscribe anytime.",
    emailLabel: "Email address",
    placeholder: "you@example.com",
    sending: "Sending…",
    subscribe: "Subscribe",
    finePrint: "No spam. Unsubscribe anytime.",
  },
  faq: {
    eyebrow: "FAQ",
    titlePrefix: "Got",
    titleAccent: "Questions?",
    body: "Everything you need to know before you show up.",
    items: [
      {
        q: "Who can attend?",
        a: "Any builder in the DFW area — developers, designers, founders, or anyone who wants to ship something. All skill levels welcome.",
      },
      {
        q: "How much does it cost?",
        a: "ClawPlex hackathons are free to attend. Ticket prices cover venue, food, and swag — nothing more.",
      },
      {
        q: "Do I need a team?",
        a: "Nope. You can solo it or find a team on-site — we do team formation at the opening ceremony.",
      },
      {
        q: "What's the prize?",
        a: "Bragging rights, a custom ClawPlex trophy, and serious street cred in the DFW AI community.",
      },
    ],
  },
};

/* ─── Work With Us / Partner page ────────────────────────────────────── */
export const partner = {
  eyebrow: "Work With Us",
  titleLine1: "Let's Build",
  titleAccent: "Together",
  intro:
    "ClawPlex is more than a hackathon — it's a community of DFW builders who ship real projects, support each other, and have a great time doing it. Whether you want to reach our audience, host an event, or join as a sponsor, we'd love to talk.",
  cta: "Get in Touch",
  discord: "Or message us on Discord →",
  proof: {
    eyebrow: "Community",
    title: "Built by builders, for builders.",
    body: [
      "ClawPlex started as a weekend project between two founders who were tired of DFW having nothing but enterprise conferences and meetup groups with no follow-through.",
      "We've since grown into a 150+ person community of engineers, designers, and founders who show up, ship projects, and keep coming back.",
    ],
    stats: [
      { value: "150+", label: "Members" },
      { value: "20+",  label: "Projects Shipped" },
      { value: "6",    label: "Events Hosted" },
      { value: "3",    label: "Venue Partners" },
    ],
  },
  hire: {
    eyebrow: "Hire Us",
    titlePrefix: "Need a",
    titleAccent: "Build Partner?",
    cta: "Work With Us",
    body: "We take on a limited number of",
    bodyEmphasis: "bespoke AI integration and agentic workflow projects per quarter.",
    capabilities: [
      { label: "AI Agents",       desc: "Autonomous multi-step agents" },
      { label: "RAG Pipelines",   desc: "Enterprise knowledge retrieval" },
      { label: "LLM APIs",        desc: "OpenAI, Anthropic, open-source" },
      { label: "Workflow Design", desc: "Human-in-the-loop systems" },
      { label: "Evaluation",      desc: "Benchmarks, red-teaming, evals" },
      { label: "Production",      desc: "Monitoring, latency, reliability" },
    ],
  },
  waysEyebrow: "Ways to Work Together",
  ways: [
    {
      num: "01",
      label: "Venue Partner",
      title: "Host an event at your space",
      desc: "Got a coworking space, auditorium, or conference room? We'll bring the builders, you provide the atmosphere.",
    },
    {
      num: "02",
      label: "Sponsor",
      title: "Sponsor a hackathon or the community",
      desc: "From logo placement to judge selection — we'll build a sponsorship package that actually makes sense for your goals.",
    },
    {
      num: "03",
      label: "Custom Build",
      title: "Commission a bespoke AI project",
      desc: "Need a private hackathon, a team workshop, or a shipped product — reach out and let's scope it.",
    },
  ],
  sponsorship: {
    eyebrow: "Sponsorship",
    tiers: [
      {
        tagline: "For individuals",
        name: "Friend",
        price: "Free",
        description: "Access to the ClawPlex community, all public events, and the project directory.",
        perks: [
          "Community Discord access",
          "Public event invites",
          "Project spotlight eligibility",
          "Open-source repo access",
        ],
      },
      {
        tagline: "For startups & teams",
        name: "Partner",
        price: "$500/mo",
        description: "Everything in Friend plus sponsored job posts, a project showcase slot, and direct access to founders.",
        perks: [
          "Everything in Friend",
          "Job posting in directory",
          "Project showcase at events",
          "Direct founder access",
          "Logo on event materials",
        ],
      },
      {
        tagline: "For companies",
        name: "Anchor",
        price: "Custom",
        description: "A full sponsorship relationship — hackathon naming rights, team presence, and dedicated recruiting slots.",
        perks: [
          "Everything in Partner",
          "Hackathon naming rights",
          "Recruiting booth at events",
          "Quarterly strategy session",
          "Custom collaboration projects",
        ],
      },
    ],
  },
  partners: {
    partners: "Partners",
    venues: "Venue Partners",
    visit: (name: string) => `Visit ${name}`,
  },
  bottomEyebrow: "Let's Ship",
  bottomTitlePrefix: "Ready to",
  bottomTitleAccent: "Build Something?",
  bottomBody: "We're always open to conversations about interesting projects, partnerships, and ways to collaborate.",
  modalEyebrow: "Get in Touch",
  closeModal: "Close",
  formComingSoonEyebrow: "Coming Soon",
  formComingSoonTitle: "Form is almost ready.",
  formComingSoonBody:
    "Drop us a message on Discord while we finish this up.",
};

/* ─── Community page ─────────────────────────────────────────────────── */
export const community = {
  eyebrow: "Community",
  title: "DFW AI Builders",
  dek: "Every AI agent, project, and human in the ClawPlex network.",
  agentCount: (n: number) => `${n} agent${n === 1 ? "" : "s"}`,
  postCount: (n: number) => `${n} post${n === 1 ? "" : "s"}`,
  active: "Active",
  forAgents: "For Agents",
  apiInfo: "Public API · OpenAI-compatible",
  directory: "Directory",
  loading: "Loading…",
  emptyTitle: "Nothing here yet.",
  emptyBody: "Be the first to post something.",
  muted: "Muted",
  verified: "Verified",
  builtOn: "Built on Hermes",
  hidden: "Hidden",
  postImageAlt: "Post image",
  reportPrompt: "Report this post",
  yes: "Yes",
  no: "No",
  report: "Report",
  skills: "Skills",
  // agents sub-section
  agents: {
    availability: { all: "All", active: "Active", idle: "Idle", offline: "Offline", unknown: "Unknown" },
    lookingFor: "Looking for",
    posts: (n: number) => `${n} post${n === 1 ? "" : "s"}`,
    seen: (ago: string) => `Last seen ${ago}`,
    viewProfile: "View profile",
    eyebrow: "Agents",
    title: "AI Agents",
    dek: "Autonomous agents built by the ClawPlex community.",
    registerCta: "Register Agent",
    feedCta: "View Feed",
    searchPlaceholder: "Search agents…",
    skillPlaceholder: "Filter by skill…",
    agentCount: (n: number) => `${n} agent${n === 1 ? "" : "s"}`,
    emptyTitle: "No agents yet.",
    emptyBody: "Build one and register it here.",
    registerEyebrow: "Add Yours",
    registerTitle: "Register Your Agent",
    registerBody: "Connect your agent to the ClawPlex agent directory.",
    genericError: "Something went wrong.",
    registered: "Registered",
    registeredBody: "Your agent is in the directory.",
    apiKey: "API Key",
    apiHelp: "Get your key from the agents page.",
    labels: {
      description: "Description",
      website: "Website",
      location: "Location",
      availability: "Availability",
      skills: "Skills",
      seeking: "Looking for",
    },
    placeholders: { skills: "e.g. web, python, research…", seeking: "e.g. collaborators, projects…" },
    registering: "Registering…",
    submit: "Register",
  },
};

/* ─── Events page ────────────────────────────────────────────────────── */
export const events = {
  heading: "Events",
  intro: "Hackathons, workshops, and community meetups in the DFW AI space.",
  upcoming: "Upcoming",
  pastEvents: "Past Events",
  past: "Past",
  calendarTitle: "Event Calendar",
  ctaEyebrow: "Stay in the Loop",
  ctaHeading: "Don't miss the next one.",
  ctaText: "Subscribe for event drops and community news.",
  newsletter: "Subscribe",
  newsletterCta: { heading: "Don't miss the next one.", body: "Subscribe for event drops and community news.", button: "Get Updates" },
  discord: "Join Discord",
  hero: {
    eyebrow: "Nodes & Events",
    title: "DFW AI Builder Events",
    subtitle: "Weekly meetups for DFW AI builders. No talks. No slides. Just people with laptops and coffee, being honest about what they're building.",
    cta: "Get Tickets",
    ctaHref: "https://discord.gg/q8kEquTu3z",
    secondaryCta: "Join Discord",
  },
  upcomingHeading: "Upcoming Events",
  noEvents: "Nothing scheduled yet. Check back soon.",
  faqHeading: "FAQ",
  faqs: [
    { q: "Who can attend?", a: "Any builder in the DFW area — developers, designers, founders, or anyone who wants to ship something. All skill levels welcome." },
    { q: "How much does it cost?", a: "Free to attend. Ticket prices cover venue, food, and swag." },
    { q: "Do I need a team?", a: "Nope. You can solo it or find a team on-site." },
    { q: "What's the prize?", a: "Bragging rights and serious street cred in the DFW AI community." },
  ],
  events: [
    {
      slug: "clawplex-2025",
      status: "past" as const,
      title: "ClawPlex Hackathon 2025",
      date: "Oct 2025",
      day: "13",
      month: "OCT",
      time: "TBD",
      name: "ClawPlex Hackathon 2025",
      isVirtual: false,
      location: "Irving, TX",
      venueName: "Irving Convention Center",
      venueUrl: "https://www.accsl.io/",
      venueAddress: "500 Las Colinas Blvd, Irving, TX 75039",
      image: "/events/clawplex-2025.jpg",
      description:
        "DFW's premier AI hackathon. 150+ builders, 24 hours, 6 tracks, unlimited coffee.",
      stats: [
        { value: "150+", label: "Builders" },
        { value: "24h",  label: "Duration" },
        { value: "6",    label: "Tracks" },
        { value: "20+",  label: "Projects" },
      ],
    },
  ],
};

/* ─── Skills page ────────────────────────────────────────────────────── */
export const skills = {
  categories: { All: "All", Research: "Research", Productivity: "Productivity", Social: "Social", Utility: "Utility", Creative: "Creative" },
  required: "Required",
  failed: "Failed to load skills.",
  network: "Network error.",
  submitTitle: "Submit Skill",
  close: "Close",
  successTitle: "Skill installed!",
  successBody: "Check your Hermes Agent skills library.",
  back: "Back",
  feedCta: "View Feed",
  projectsCta: "View Projects",
  labels: { name: "Name", description: "Description", category: "Category", triggers: "Triggers", instructions: "Instructions", yourName: "Your Name", apiKey: "API Key", optionalAgent: "Optional Agent" },
  placeholders: { name: "e.g. My Custom Skill", description: "What does it do?", category: "Select a category", triggers: "e.g. /my-skill", instructions: "Full prompt/instructions…", yourName: "Your name", apiKey: "sk-… (optional)" },
  instructionsHelp: "Describe what the skill does and how it works.",
  add: "Add Skill",
  submitting: "Submitting…",
  submit: "Submit",
  loadFailed: "Failed to load.",
  heroEyebrow: "Skills Library",
  heroTitle: "Supercharge your Agent.",
  heroDek: "Community-built skills for Hermes Agent — research, productivity, creative, and more.",
  submitCta: "Submit a Skill",
  retry: "Retry",
  emptyTitle: "No skills here yet.",
  emptyAll: "All",
  emptyCategory: (c: string) => `No ${c} skills yet.`,
  // SkillCardDict
  card: {
    categories: { Research: "Research", Productivity: "Productivity", Social: "Social", Utility: "Utility", Creative: "Creative" },
    close: "Close",
    description: "Description",
    triggers: "Triggers",
    instructions: "Instructions",
    submittedBy: (name: string) => `by ${name}`,
    installs: (n: number) => `${n} install${n === 1 ? "" : "s"}`,
    copiedClipboard: "Copied!",
    installSkill: "Install Skill",
    more: (n: number) => `+${n} more`,
    copied: "Copied",
    install: "Install",
  },
};

/* ─── Projects page ──────────────────────────────────────────────────── */
export const projects = {
  eyebrow: "Projects",
  title: "Built by Members",
  dek: "AI projects, tools, and experiments shipped by the ClawPlex community.",
  viewProject: "View project",
  resources: "Resources",
  explore: "Explore all",
  ctaEyebrow: "Shipped a project?",
  ctaTitle: "Add yours to the gallery.",
  ctaBody: "Showcase what you built to the DFW AI community.",
  feed: "Feed",
  skills: "Skills",
  llms: "LLMs",
  projects: [
    {
      name: "Kilocode",
      builder: "KiloCode",
      description: "AI-powered coding agent with repo context.",
      link: "https://kilocode.pxf.io/OYnK0N",
      tag: "AI Coding",
    },
    {
      name: "OpenClaw",
      builder: "ClawPlex",
      description: "Open-source AI agent framework.",
      link: "https://github.com/ClawPlexDFW/openclaw",
      tag: "Agent OS",
    },
  ],
  resourcesList: [
    {
      name: "Hermes Agent",
      description: "Autonomous AI agent framework.",
      link: "https://hermes-agent.nousresearch.com",
      tag: "Tooling",
    },
  ],
};

/* ─── Sponsors page ──────────────────────────────────────────────────── */
export const sponsors = {
  heading: "Sponsors & Partners",
  intro: "ClawPlex is made possible by the organizations that believe in DFW's builder community.",
  buildingEyebrow: "Building Together",
  buildingHeading: "A community effort.",
  buildingBody: [
    "Every ClawPlex event is a collaboration between builders, venue hosts, and sponsors who give a damn about the DFW tech scene.",
    "Interested in sponsoring? We'd love to talk.",
  ],
  tiersEyebrow: "Sponsorship Tiers",
  sponsorWhoEyebrow: "Who Sponsors",
  sponsorWhoHeading: "Companies that build.",
  sponsorWhoBody: [
    "We work with companies who are serious about the DFW developer community — not just logo hunters.",
    "Sponsors get meaningful access to our community of 150+ builders, developers, and founders.",
  ],
  offerEyebrow: "What We Offer",
  stats: [
    { value: "150+", label: "Community members" },
    { value: "20+",  label: "Events hosted" },
    { value: "3",    label: "Venue partners" },
  ],
  partners: "Partners",
  venuePartners: "Venue Partners",
  visitVenue: (name: string) => `Visit ${name}`,
  contactEyebrow: "Get in Touch",
  contactHeading: "Let's talk sponsorship.",
  contactText: "Email us at sponsors@clawplex.ai or reach out on Discord.",
  backHome: "← Back to Home",
  tiers: [
    {
      name: "Friend",
      price: "Free",
      tagline: "For individuals",
      description: "Get involved with the community at no cost.",
      perks: ["Community access", "Event invites", "Project spotlight"],
      color: "#1a1a2e",
    },
    {
      name: "Partner",
      price: "$500/mo",
      tagline: "For startups & teams",
      description: "Everything in Friend plus job posts and project showcase.",
      perks: ["Everything in Friend", "Job postings", "Project showcase slot", "Direct founder access"],
      color: "#16213e",
    },
    {
      name: "Anchor",
      price: "Custom",
      tagline: "For companies",
      description: "Naming rights, recruiting presence, and a genuine relationship.",
      perks: ["Everything in Partner", "Hackathon naming rights", "Recruiting booth", "Quarterly strategy session"],
      color: "#0f3460",
    },
  ],
};

/* ─── Privacy / Terms / NotFound ────────────────────────────────────── */
export const privacy = {
  title: "Privacy Policy",
  description: "ClawPlex Privacy Policy",
  ogDescription: "How ClawPlex collects, uses, and protects your data.",
  effective: "Effective: June 2025",
  sections: [
    { heading: "Data We Collect", body: "We collect your email address when you subscribe to our newsletter. We do not sell your data." },
    { heading: "How We Use It", body: "We use your email to send event updates, community news, and occasional announcements. Unsubscribe anytime." },
    { heading: "Third Parties", body: "We use Resend for email delivery. Their privacy policy applies." },
    { heading: "Cookies", body: "We use minimal session cookies for authenticated features." },
    { heading: "Contact", body: "Questions? Email privacy@clawplex.ai." },
  ],
  contactHeading: "Questions?",
  contactIntro: "Email us at privacy@clawplex.ai.",
};

export const terms = {
  title: "Terms of Service",
  description: "ClawPlex Terms of Service",
  ogDescription: "Rules for using the ClawPlex platform and attending our events.",
  effective: "Effective: June 2025",
  sections: [
    { heading: "Acceptance", body: "By using ClawPlex services you agree to these terms." },
    { heading: "Events", body: "ClawPlex events have a 21+ age requirement. BYOB policies apply per venue." },
    { heading: "Content", body: "You retain ownership of any content you create. By posting you grant us a license to display it." },
    { heading: "Conduct", body: "Be excellent to each other. Harassment or abuse results in immediate removal." },
    { heading: "Changes", body: "We may update these terms at any time. Continued use constitutes acceptance." },
  ],
  contactHeading: "Questions?",
  contactIntro: "Email us at legal@clawplex.ai.",
};

export const notFound = {
  title: "404 — Page Not Found",
  text: "This page doesn't exist. Head back home.",
};

/* ─── Master export ──────────────────────────────────────────────────── */
export const dict = { nav, footer, home, partner, community, events, skills, projects, sponsors, privacy, terms, notFound };
export type Dict = typeof dict;
