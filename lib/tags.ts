// Single source of truth for case-study tags. Mirrors the enum in
// sanity/schemas/caseStudy.ts. Add a new tag here AND in the schema AND
// drop the matching SVG into public/icons/tags/.

export type TagValue =
  | "identity"
  | "visuals"
  | "webApp"
  | "website"
  | "designSystem"
  | "mobileApp";

export type TagDefinition = {
  value: TagValue;
  label: string;
  iconSrc: string; // path under /public
};

export const TAGS: Record<TagValue, TagDefinition> = {
  identity: {
    value: "identity",
    label: "Identity",
    iconSrc: "/icons/tags/brand-identity.svg",
  },
  visuals: {
    value: "visuals",
    label: "Visuals",
    iconSrc: "/icons/tags/visuals.svg",
  },
  webApp: {
    value: "webApp",
    label: "Web App",
    iconSrc: "/icons/tags/web-app.svg",
  },
  website: {
    value: "website",
    label: "Website",
    iconSrc: "/icons/tags/website.svg",
  },
  designSystem: {
    value: "designSystem",
    label: "Design System",
    iconSrc: "/icons/tags/design-system.svg",
  },
  mobileApp: {
    value: "mobileApp",
    label: "Mobile App",
    iconSrc: "/icons/tags/mobile-app.svg",
  },
};

export const TAG_LIST: TagDefinition[] = Object.values(TAGS);
