// Typed wrapper around the Electron preload bridge (window.api).
// Every call is safe to make in a plain browser: when the bridge is absent
// the helpers return demo/placeholder data so the dev preview still renders.

export interface ServiceStatus {
  up: boolean;
  app?: string | null;
  isBridge?: boolean;
  raw?: string | number;
}

export interface ServicesMap {
  awb: ServiceStatus;
  paperclip: ServiceStatus;
  resumeMatcher: ServiceStatus;
}

export type StartableService = 'paperclip' | 'resume-matcher' | 'all';

export interface ServiceStartResult {
  up: boolean;
  spawned?: boolean;
  alreadyRunning?: boolean;
  dockerMissing?: boolean;
  error?: string;
  raw?: string | number;
}

export interface ServicesStartResponse {
  paperclip?: ServiceStartResult;
  resumeMatcher?: ServiceStartResult;
}

export interface DoctorResult {
  code: number | null;
  output: string;
}

export interface JobRow {
  [key: string]: string;
}

export interface JobsResult {
  exists: boolean;
  rows: JobRow[];
  path?: string;
  error?: string;
}

export type ApplicationOutcomeFlag = 'interview' | 'denied' | 'not_selected';

export interface ApplicationRecord {
  identity_key: string;
  job_id: string;
  company: string;
  title: string;
  status: string;
  status_label: string;
  status_inferred: boolean;
  outcome_flag: ApplicationOutcomeFlag | '';
  outcome_label: string;
  applied_at: string;
  updated_at: string;
  location: string;
  source: string;
  fit_score: number | '';
  notes: string;
  url: string;
}

export interface ApplicationSummary {
  total: number;
  active: number;
  interviewing: number;
  offers: number;
  closed: number;
  status_not_recorded: number;
  companies: number;
  status_counts: Record<string, number>;
}

export interface ApplicationDashboardResult {
  exists: boolean;
  summary: Partial<ApplicationSummary>;
  applications: ApplicationRecord[];
  error?: string | null;
}

export interface AgentInfo {
  id?: string;
  name?: string;
  adapterType?: string;
  status?: string;
  paused?: boolean;
  [key: string]: unknown;
}

export interface AgentsResult {
  online: boolean;
  agents: AgentInfo[];
  company?: string;
  message?: string;
}

export interface ConfigReadResult {
  exists: boolean;
  text: string;
  path?: string;
  error?: string;
}

export interface ConfigWriteResult {
  ok: boolean;
  path?: string;
  error?: string;
}

export interface SessionsResult {
  exists: boolean;
  data: Record<string, unknown>;
  error?: string;
}

export interface AwbLaunchResult {
  launched: boolean;
  bridgeUp: boolean;
  app?: string | null;
  raw?: string | number;
  error?: string;
}

export interface SearchArgs {
  query: string;
  location: string;
  hoursOld: number;
  resultsWanted: number;
  concurrency: number;
}

export interface SearchLogPayload {
  line: string;
  stream: 'stdout' | 'stderr';
}

interface Api {
  doctor(): Promise<DoctorResult>;
  services(): Promise<ServicesMap>;
  servicesStart(service: StartableService): Promise<ServicesStartResponse>;
  searchSpawn(args: SearchArgs): Promise<{ code: number | null; output: string }>;
  onSearchLog(cb: (p: SearchLogPayload) => void): () => void;
  jobsRead(): Promise<JobsResult>;
  reportOpen(): Promise<{ ok: boolean; error?: string | null; path?: string }>;
  applicationsRead(): Promise<ApplicationDashboardResult>;
  applicationsRefresh(): Promise<{ code: number | null; output: string }>;
  applicationsFlag(
    identityKey: string,
    flag: ApplicationOutcomeFlag,
  ): Promise<{ code: number | null; output: string }>;
  applicationsUndo(identityKey: string): Promise<{ code: number | null; output: string }>;
  applicationsReportOpen(): Promise<{ ok: boolean; error?: string | null; path?: string }>;
  agentsList(): Promise<AgentsResult>;
  configRead(name: string): Promise<ConfigReadResult>;
  configWrite(name: string, text: string): Promise<ConfigWriteResult>;
  sessionsRead(): Promise<SessionsResult>;
  awbLaunch(): Promise<AwbLaunchResult>;
  loginUrl(siteKey: string): Promise<{ ok: boolean; url?: string; error?: string }>;
}

declare global {
  interface Window {
    api?: Api;
  }
}

export const isDesktop = typeof window !== 'undefined' && !!window.api;

// ── demo data for plain-browser preview ─────────────────────────────────────

const DEMO_DOCTOR: DoctorResult = {
  code: 0,
  output: [
    'Expedient Employment doctor',
    'python ............ ok (3.12)',
    'webclaw ........... ok (demo)',
    'serper ............ ok (key present)',
    'reports dir ....... ok',
    '',
    '(browser preview — demo data; run inside Electron for live checks)',
  ].join('\n'),
};

const DEMO_SERVICES: ServicesMap = {
  awb: { up: false, app: null, isBridge: false, raw: 'desktop-only' },
  paperclip: { up: false, raw: 'desktop-only' },
  resumeMatcher: { up: false, raw: 'desktop-only' },
};

const DEMO_JOBS: JobRow[] = [
  {
    score: '92', fit_label: 'Strong Fit', title: 'Senior Recruiting Coordinator',
    company: 'ExampleCo Talent', location: 'San Francisco, CA', work_mode: 'Hybrid',
    salary: '$85k-$105k', matched_skills: 'scheduling; ATS; sourcing',
    gaps: 'greenhouse', url: 'https://example.com/job/1',
  },
  {
    score: '81', fit_label: 'Good Fit', title: 'Talent Acquisition Specialist',
    company: 'BlueWave HR', location: 'Irvine, CA', work_mode: 'Remote',
    salary: '$75k-$95k', matched_skills: 'sourcing; interviewing',
    gaps: 'workday', url: 'https://example.com/job/2',
  },
  {
    score: '64', fit_label: 'Stretch', title: 'HR Operations Analyst',
    company: 'Coastline Group', location: 'Costa Mesa, CA', work_mode: 'Onsite',
    salary: '$70k-$88k', matched_skills: 'reporting',
    gaps: 'people analytics; sql', url: 'https://example.com/job/3',
  },
];

export const api: Api = {
  doctor: () => window.api ? window.api.doctor() : Promise.resolve(DEMO_DOCTOR),
  services: () => window.api ? window.api.services() : Promise.resolve(DEMO_SERVICES),
  servicesStart: (service) =>
    window.api
      ? window.api.servicesStart(service)
      : Promise.resolve(
          service === 'paperclip' || service === 'all'
            ? { paperclip: { up: false, error: 'desktop-only feature' } }
            : { resumeMatcher: { up: false, dockerMissing: true, error: 'desktop-only feature' } },
        ),
  searchSpawn: (args) =>
    window.api
      ? window.api.searchSpawn(args)
      : Promise.resolve({ code: 0, output: 'demo run (browser preview)' }),
  onSearchLog: (cb) =>
    window.api ? window.api.onSearchLog(cb) : (() => { void cb; return () => {}; }),
  jobsRead: () =>
    window.api ? window.api.jobsRead() : Promise.resolve({ exists: true, rows: DEMO_JOBS }),
  reportOpen: () =>
    window.api
      ? window.api.reportOpen()
      : Promise.resolve({ ok: false, error: 'desktop-only feature' }),
  applicationsRead: () =>
    window.api
      ? window.api.applicationsRead()
      : Promise.resolve({ exists: true, summary: {}, applications: [] }),
  applicationsRefresh: () =>
    window.api
      ? window.api.applicationsRefresh()
      : Promise.resolve({ code: 0, output: 'browser preview refreshed' }),
  applicationsFlag: (identityKey, flag) =>
    window.api
      ? window.api.applicationsFlag(identityKey, flag)
      : Promise.resolve({ code: 0, output: 'browser preview updated' }),
  applicationsUndo: (identityKey) =>
    window.api
      ? window.api.applicationsUndo(identityKey)
      : Promise.resolve({ code: 0, output: 'browser preview restored' }),
  applicationsReportOpen: () =>
    window.api
      ? window.api.applicationsReportOpen()
      : Promise.resolve({ ok: false, error: 'desktop-only feature' }),
  agentsList: () =>
    window.api
      ? window.api.agentsList()
      : Promise.resolve({
          online: false,
          agents: [],
          message: 'Paperclip offline — start it with scripts/paperclip-start-local.ps1',
        }),
  configRead: (name) =>
    window.api
      ? window.api.configRead(name)
      : Promise.resolve({ exists: false, text: '', error: `desktop-only: cannot read ${name}` }),
  configWrite: (name, text) =>
    window.api
      ? window.api.configWrite(name, text)
      : Promise.resolve({ ok: false, error: `desktop-only: cannot write ${name}` }),
  sessionsRead: () =>
    window.api
      ? window.api.sessionsRead()
      : Promise.resolve({ exists: false, data: {} }),
  awbLaunch: () =>
    window.api
      ? window.api.awbLaunch()
      : Promise.resolve({ launched: false, bridgeUp: false, error: 'desktop-only feature' }),
  loginUrl: (siteKey) =>
    window.api
      ? window.api.loginUrl(siteKey)
      : Promise.resolve({ ok: false, error: `desktop-only: no login url for ${siteKey}` }),
};
