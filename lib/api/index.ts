/**
 * Re-export seluruh fungsi API, Client, dan Error Handler
 */

export * from "./client";

export * as authApi from "./auth";
export {
  register,
  login,
  getMe,
  logout,
  isAuthenticated,
  getToken,
  setToken,
  removeToken,
} from "./auth";

export * as savingsApi from "./savings";
export {
  createSaving,
  getCurrentSaving,
  getSavingDeposits,
} from "./savings";
