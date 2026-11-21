"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ToothIcon } from "./Icon";
import { cn } from "@/lib/utils";

/**
 * next/image with a graceful branded fallback if a remote placeholder image
 * fails to load (so the layout never shows a broken-image icon).
 */
export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-primary/90 via-primary to-navy text-mint/70",
          props.fill ? "absolute inset-0" : "",
          className,
        )}
        style={!props.fill ? { width: Number(props.width), height: Number(props.height) } : undefined}
      >
        <ToothIcon size={56} strokeWidth={1.25} />
      </div>
    );
  }
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
