export * from "./product";
export * from "./category";
export * from "./admin";
export * from "./admin-product";
export * from "./admin-order";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}
