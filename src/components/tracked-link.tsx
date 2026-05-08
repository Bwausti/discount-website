"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackingEventName =
  | "phone_click"
  | "directions_click"
  | "financing_click"
  | "product_detail_click"
  | "collection_click"
  | "navigation_click";

interface TrackedLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  href: string;
  eventName: TrackingEventName;
  eventLabel: string;
  eventCategory?: string;
  children: ReactNode;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({
  eventName,
  eventLabel,
  eventCategory = "engagement",
  href,
}: {
  eventName: TrackingEventName;
  eventLabel: string;
  eventCategory?: string;
  href?: string;
}) {
  window.dataLayer?.push({
    event: eventName,
    event_category: eventCategory,
    event_label: eventLabel,
    link_url: href,
  });

  window.gtag?.("event", eventName, {
    event_category: eventCategory,
    event_label: eventLabel,
    link_url: href,
  });
}

export function TrackedLink({
  href,
  eventName,
  eventLabel,
  eventCategory,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent({ eventName, eventLabel, eventCategory, href });
  };

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
