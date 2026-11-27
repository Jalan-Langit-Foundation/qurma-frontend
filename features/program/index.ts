// Tipe & data cadangan
export type {
  MonthString,
  ProgramInfo,
  ProgramSchedule,
  RegistrationStatus,
} from "./lib/types";
export { FALLBACK_SCHEDULE } from "./lib/fallback";

export {
  getPaymentDeadline,
  isPastPaymentDeadline,
  type PaymentDeadline,
} from "./lib/payment-deadline";
export type { SavingRegistration } from "./lib/registration";

// Komponen client
export {
  ProgramProvider,
  useProgramSchedule,
  useSavingRegistration,
} from "./components/program-provider";
