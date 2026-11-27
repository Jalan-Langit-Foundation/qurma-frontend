import * as React from "react";
import { buildLandingStructuredData } from "../lib/structured-data";

export function StructuredData() {
  const json = JSON.stringify(buildLandingStructuredData()).replace(
    /</g,
    "\\u003c",
  );
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
