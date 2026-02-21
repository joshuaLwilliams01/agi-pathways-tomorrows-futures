"use client";

/**
 * Block-style card for Trailmakers-inspired "snap together" builder UI.
 * Use for selectable priorities, assets, pathways, etc.
 */

import type { ReactNode } from "react";

interface BlockCardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
  role?: "button";
}

export function BlockCard({
  children,
  selected = false,
  onClick,
  className = "",
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
  role,
}: BlockCardProps) {
  const isInteractive = Boolean(onClick);
  const Wrapper = isInteractive ? "button" : "div";
  const wrapperProps = isInteractive
    ? {
        type: "button" as const,
        onClick,
        "aria-label": ariaLabel,
        "aria-pressed": ariaPressed ?? selected,
        role: role ?? "button",
        className: "block-card block-card--interactive border-2 rounded-3 p-3 text-start w-100 transition " + (selected ? "block-card--selected" : "") + " " + className,
      }
    : {
        className: "block-card border-2 rounded-3 p-3 " + (selected ? "block-card--selected" : "") + " " + className,
      };

  return <Wrapper {...wrapperProps}>{children}</Wrapper>;
}
