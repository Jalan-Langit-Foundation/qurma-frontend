import "server-only";
import { cache } from "react";
import { fetchCurrentUser } from "../api/auth.api";

export const getCurrentUser = cache(fetchCurrentUser);
