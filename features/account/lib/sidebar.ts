export const SIDEBAR_COOKIE = "qurma_sidebar";
export const SIDEBAR_COLLAPSED = "collapsed";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function sidebarCookieValue(collapsed: boolean): string {
  return `${SIDEBAR_COOKIE}=${collapsed ? SIDEBAR_COLLAPSED : "expanded"}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}
