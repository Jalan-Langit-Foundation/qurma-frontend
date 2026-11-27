import * as React from "react";
import { hasSession } from "@/lib/server/session";
import { Navbar } from "./navbar";

async function NavbarWithSession() {
  const isLoggedIn = await hasSession();
  return <Navbar isLoggedIn={isLoggedIn} />;
}

export function SessionAwareNavbar() {
  return (
    <React.Suspense fallback={<Navbar isLoggedIn={false} />}>
      <NavbarWithSession />
    </React.Suspense>
  );
}
