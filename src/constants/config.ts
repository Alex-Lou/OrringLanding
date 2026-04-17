/**
 * Single source of truth for every external URL, endpoint and
 * bump-per-release identifier. Change the version here, everywhere updates.
 */

export const APP_VERSION = 'v2.1.4';

export const SITE_URL = 'https://alex-lou.github.io/OrringLanding/';

export const REPO_APP = 'Alex-Lou/Orring';
export const REPO_LANDING = 'Alex-Lou/OrringLanding';

export const APK_URL =
  `https://github.com/${REPO_LANDING}/releases/download/${APP_VERSION}/Orring.apk`;

export const SOURCE_URL = `https://github.com/${REPO_APP}`;

export const CONTACT_EMAIL = 'alex.guennad@gmail.com';

export const API = {
  githubLatestRelease: `https://api.github.com/repos/${REPO_LANDING}/releases/latest`,
  githubAppRepo: `https://api.github.com/repos/${REPO_APP}`,
  likeHit: 'https://abacus.jasoncameron.dev/hit/orring-landing/likes',
  likeGet: 'https://abacus.jasoncameron.dev/get/orring-landing/likes',
  feedback: `https://formsubmit.co/ajax/${encodeURIComponent('alex.guennad@gmail.com')}`,
} as const;

export const STORAGE_KEYS = {
  lang: 'orring-lang',
  liked: 'orring-liked',
} as const;

export const TOAST_DURATION_MS = 6000;
export const COPY_FEEDBACK_DURATION_MS = 2500;
