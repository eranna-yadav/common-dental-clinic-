"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";

let hasNavigated = false;

/**
 * Soft page transition between routes. The very first render is not animated so
 * server-rendered content is visible immediately (protects LCP).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [initial] = useState(() => (hasNavigated ? { opacity: 0, y: 8 } : false));
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <m.div initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </m.div>
  );
}
