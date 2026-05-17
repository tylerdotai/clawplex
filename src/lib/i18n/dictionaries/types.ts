// ── Shared utility types ──────────────────────────────────────────────────

export type AvailabilityKey = "all" | "active" | "idle" | "offline" | "unknown";

export type TimeAgoFns = {
  justNow: string;
  minuteAgo: (count: number) => string;
  hourAgo: (count: number) => string;
  dayAgo: (count: number) => string;
};

export type CountFn = (count: number) => string;

export type StringFn = (value: string) => string;

// ── Nav ───────────────────────────────────────────────────────────────────

export type NavLink = { href: string; label: string; external?: boolean };

export interface NavDict {
  home: string;
  community: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  primaryCta: string;
  links: NavLink[];
  communityLinks: NavLink[];
}

// ── Footer ────────────────────────────────────────────────────────────────

export type FooterNavCategory = Record<string, NavLink[]>;

export interface FooterDict {
  home: string;
  eyebrow: string;
  description: string;
  copyright: string;
  privacy: string;
  terms: string;
  builtOn: string;
  language: string;
  nav: FooterNavCategory;
}

// ── Home ──────────────────────────────────────────────────────────────────

export type CountdownItem = { key: string; label: string };

export type WayItem = {
  num: string;
  label: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
};

export type SpotlightItem = {
  name: string;
  builder: string;
  description: string;
  tag: string;
  href: string;
  external: boolean;
};

export type Founder = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  x: string;
};

export interface HomeDict {
  countdown: CountdownItem[];
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleLine2Accent: string;
    body: string;
    nextLabel: string;
    nextMeta: string;
    rsvp: string;
    discord: string;
    imageAlt: string;
    caption: string;
  };
  what: {
    imageAlt: string;
    caption: string;
    facts: Array<{ value: string; label: string }>;
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    paragraphs: string[];
    ship: string;
    tags: string[];
  };
  event: {
    eyebrow: string;
    title: string;
    in: string;
    locationAccent: string;
    dateMeta: string;
    placeMeta: string;
    termsMeta: string;
    startsIn: string;
    rsvp: string;
    discord: string;
    imageAlt: string;
    caption: string;
    badgeDay: string;
    badgeMonthTime: string;
  };
  ways: {
    eyebrow: string;
    items: WayItem[];
  };
  spotlight: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    allProjects: string;
    by: string;
    visit: string;
    explore: string;
    items: SpotlightItem[];
  };
  founders: {
    eyebrow: string;
    titlePrefix: string;
    ariaLinkedIn: (name: string) => string;
    ariaX: (name: string) => string;
    people: Founder[];
  };
  agents: {
    prompt: string;
    promptVerb: string;
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    promptTextSuffix: string;
    helper: string;
    copied: string;
    copyPrompt: string;
    apiSummary: string;
    apiPre: string;
    notes: string;
    privacy: string;
    docs: string;
  };
  newsletter: {
    success: string;
    fallbackError: string;
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    body: string;
    emailLabel: string;
    placeholder: string;
    sending: string;
    subscribe: string;
    finePrint: string;
  };
}

// ── Community ─────────────────────────────────────────────────────────────

export type AvailabilityLabels = {
  all: string;
  active: string;
  idle: string;
  offline: string;
  unknown: string;
};

export interface CommunityLabels {
  agentName?: string;
  name?: string;
  owner?: string;
  description: string;
  website: string;
  location: string;
  availability: string;
  skills: string;
  seeking: string;
}

export interface CommunityPlaceholders {
  name: string;
  owner: string;
  description: string;
  website: string;
  location: string;
  skills: string;
  seeking: string;
}

export interface AgentProfileDict {
  failedLoad: string;
  mustLogin: string;
  updated: string;
  saveFailed: string;
  notFound: string;
  notFoundBody: string;
  backToAgents: string;
  allAgents: string;
  builtBy: StringFn;
  website: string;
  cancelEdit: string;
  editProfile: string;
  stats: { posts: string; skills: string; location: string };
  labels: CommunityLabels;
  placeholders: { skills: string; seeking: string };
  availability: AvailabilityLabels;
  saving: string;
  save: string;
  lookingFor: string;
  posts: string;
  agentPosts: StringFn;
  total: CountFn;
  noPosts: string;
}

export interface CommunityClientDict extends TimeAgoFns {
  eyebrow: string;
  title: string;
  dek: string;
  agentCount: CountFn;
  postCount: CountFn;
  active: string;
  forAgents: string;
  apiInfo: string;
  directory: string;
  loading: string;
  emptyTitle: string;
  emptyBody: string;
  muted: string;
  verified: string;
  builtOn: string;
  hidden: string;
  postImageAlt: string;
  reportPrompt: string;
  yes: string;
  no: string;
  report: string;
}

export interface DashboardDict {
  dashboard: string;
  saved: string;
  localOnly: string;
  yourAgents: string;
  registered: CountFn;
  registerNew: string;
  noAgents: string;
  noAgentsBody: string;
  registerFirst: string;
  browserSaved: string;
  posts: CountFn;
  view: string;
  apiKey: string;
  hide: string;
  apiHelp: string;
  reveal: string;
  feed: string;
  feedBody: string;
  viewFeed: string;
}

export interface AgentsDict {
  availability: AvailabilityLabels;
  lookingFor: string;
  posts: CountFn;
  seen: StringFn;
  viewProfile: string;
  eyebrow: string;
  title: string;
  dek: string;
  registerCta: string;
  feedCta: string;
  searchPlaceholder: string;
  skillPlaceholder: string;
  agentCount: CountFn;
  emptyTitle: string;
  emptyBody: string;
  registerEyebrow: string;
  registerTitle: string;
  registerBody: string;
  genericError: string;
  registered: string;
  registeredBody: string;
  apiKey: string;
  apiHelp: string;
  labels: CommunityLabels;
  placeholders: CommunityPlaceholders;
  registering: string;
  submit: string;
}

export interface ProjectsDict {
  eyebrow: string;
  title: string;
  dek: string;
  viewProject: string;
  resources: string;
  explore: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  feed: string;
  llms: string;
  projects: Array<{
    name: string;
    builder: string;
    description: string;
    link: string;
    tag: string;
  }>;
  resourcesList: Array<{
    name: string;
    description: string;
    link: string;
    tag: string;
  }>;
}

// ── Skills ────────────────────────────────────────────────────────────────

export type SkillCategoryLabel = {
  All: string;
  Research: string;
  Productivity: string;
  Social: string;
  Utility: string;
  Creative: string;
};

export interface SkillsDict {
  categories: SkillCategoryLabel;
  required: string;
  failed: string;
  network: string;
  submitTitle: string;
  close: string;
  successTitle: string;
  successBody: string;
  back: string;
  labels: {
    name: string;
    description: string;
    category: string;
    triggers: string;
    instructions: string;
    yourName: string;
    apiKey: string;
    optionalAgent: string;
  };
  placeholders: {
    name: string;
    description: string;
    category: string;
    triggers: string;
    instructions: string;
    yourName: string;
    apiKey: string;
  };
  instructionsHelp: string;
  add: string;
  submitting: string;
  submit: string;
  loadFailed: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDek: string;
  submitCta: string;
  retry: string;
  emptyTitle: string;
  emptyAll: string;
  emptyCategory: (category: string) => string;
}

export interface SkillCardDict {
  categories: Omit<SkillCategoryLabel, "All">;
  close: string;
  description: string;
  triggers: string;
  instructions: string;
  submittedBy: StringFn;
  installs: CountFn;
  copiedClipboard: string;
  installSkill: string;
  more: CountFn;
  copied: string;
  install: string;
}

// ── Events ────────────────────────────────────────────────────────────────

export type EventStats = Array<{ value: string; label: string }>;

export interface EventItem {
  slug: string;
  status: "past";
  title: string;
  date: string;
  image: string;
  description: string;
  stats: EventStats | null;
}

export interface EventsDict {
  heading: string;
  intro: string;
  upcoming: string;
  pastEvents: string;
  past: string;
  calendarTitle: string;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaText: string;
  newsletter: string;
  discord: string;
  events: EventItem[];
}

// ── Sponsors ──────────────────────────────────────────────────────────────

export type Tier = {
  name: string;
  price: string;
  tagline: string;
  description: string;
  perks: string[];
  color: string;
};

export interface SponsorsDict {
  heading: string;
  intro: string;
  buildingEyebrow: string;
  buildingHeading: string;
  buildingBody: string[];
  tiersEyebrow: string;
  sponsorWhoEyebrow: string;
  sponsorWhoHeading: string;
  sponsorWhoBody: string[];
  offerEyebrow: string;
  stats: Array<{ value: string; label: string }>;
  partners: string;
  venuePartners: string;
  visitVenue: (name: string) => string;
  contactEyebrow: string;
  contactHeading: string;
  contactText: string;
  backHome: string;
  tiers: Tier[];
}

// ── Legal / Misc ──────────────────────────────────────────────────────────

export interface PrivacyDict {
  title: string;
  description: string;
  ogDescription: string;
  effective: string;
  sections: Array<{ heading: string; body: string }>;
  contactHeading: string;
  contactIntro: string;
}

export interface TermsDict {
  title: string;
  description: string;
  ogDescription: string;
  effective: string;
  sections: Array<{ heading: string; body: string }>;
  contactHeading: string;
  contactIntro: string;
}

export interface NotFoundDict {
  title: string;
  text: string;
  cta: string;
}

export interface NewsletterPageDict {
  title: string;
  description: string;
  heading: string;
}

// ── Full dictionary shape ────────────────────────────────────────────────

export interface Dictionary {
  nav: NavDict;
  footer: FooterDict;
  home: HomeDict;
  agents: AgentsDict;
  agentProfile: AgentProfileDict;
  communityClient: CommunityClientDict;
  dashboard: DashboardDict;
  projects: ProjectsDict;
  skills: SkillsDict;
  skillCard: SkillCardDict;
  events: EventsDict;
  sponsors: SponsorsDict;
  privacy: PrivacyDict;
  terms: TermsDict;
  notFound: NotFoundDict;
  newsletterPage: NewsletterPageDict;
}

export type DictionaryKey = keyof Dictionary;