// Corporate content for Amptek Engineering. Mock/placeholder copy — swap for a
// CMS or real data later. The store data lives separately in ./products.

export const company = {
  name: "Amptek Engineering",
  tagline: "Engineering Tomorrow Today",
  subtitle: "Electrical, Fire Safety & Mechanical Solutions",
  blurb:
    "Amptek Engineering is a Bangladesh-based engineering firm delivering turnkey electrical, fire safety, and mechanical solutions for industrial, commercial, and infrastructure projects nationwide.",
  founded: 2014,
};

export const contact = {
  phone: "+880 1671 113615",
  phoneHref: "tel:+8801671113615",
  email: "info@amptekeng.com",
  website: "www.amptekeng.com",
  websiteHref: "https://www.amptekeng.com",
  address: "Holding No - 266, Rajabari Uttarkhan, Dhaka-1230, Bangladesh",
};

export type Service = {
  id: string;
  title: string;
  /** One-line summary for cards and overviews. */
  summary: string;
  /** Specific offerings within this service line. */
  items: string[];
  /** Longer copy for the services page. */
  description: string;
};

export const services: Service[] = [
  {
    id: "power",
    title: "Power",
    summary: "End-to-end electrical power distribution and protection.",
    items: ["HT/LT Switchgear", "BBT & Transformers"],
    description:
      "Design, supply, installation, and commissioning of high- and low-tension switchgear, busbar trunking systems, and distribution transformers. We build reliable power infrastructure engineered for safety, efficiency, and uptime.",
  },
  {
    id: "fire",
    title: "Fire Safety",
    summary: "Code-compliant detection and suppression systems.",
    items: ["NFPA Detection", "Hydrants & FM-200"],
    description:
      "NFPA-compliant fire detection and alarm systems, hydrant and sprinkler networks, and clean-agent FM-200 suppression for critical assets. Complete fire protection from risk assessment through commissioning and maintenance.",
  },
  {
    id: "mechanical",
    title: "Mechanical",
    summary: "Process, climate, and fabrication solutions.",
    items: ["Boiler", "HVAC & Tank Fabrication"],
    description:
      "Boiler installation, HVAC design and execution, and custom steel tank fabrication. Our mechanical team delivers durable process and climate systems built to specification and standard.",
  },
  {
    id: "industrial",
    title: "Industrial",
    summary: "Automation and reliability for the plant floor.",
    items: ["Automation", "PLC & Machine Maintenance"],
    description:
      "Industrial automation, PLC programming and integration, and preventive machine maintenance that keep production lines running. We modernize controls and minimize downtime across your operations.",
  },
  {
    id: "safety",
    title: "Safety",
    summary: "Protection and regulatory compliance.",
    items: ["Lightning Protection & Compliance"],
    description:
      "Lightning protection system design and installation plus full regulatory compliance support — ensuring your facility meets electrical, fire, and workplace safety standards.",
  },
];

export type WhyPoint = {
  id: string;
  title: string;
  description: string;
};

export const whyChooseUs: WhyPoint[] = [
  {
    id: "expertise",
    title: "Proven Expertise",
    description:
      "A multidisciplinary team of licensed engineers with a decade of field experience across power, fire, and mechanical systems.",
  },
  {
    id: "turnkey",
    title: "Turnkey Delivery",
    description:
      "Single point of accountability from design and supply through installation, commissioning, and after-sales support.",
  },
  {
    id: "compliance",
    title: "Safety & Compliance",
    description:
      "Every system is engineered to NFPA, IEC, and national standards — safety and code compliance are never optional.",
  },
  {
    id: "support",
    title: "Dependable Support",
    description:
      "Responsive nationwide service and preventive maintenance programs that keep your facilities running.",
  },
];

export const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "250+", label: "Projects Delivered" },
  { value: "5", label: "Engineering Disciplines" },
  { value: "100%", label: "Compliance Focus" },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  image: string;
  summary: string;
};

const projImg = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

export const projects: Project[] = [
  {
    id: "pr1",
    title: "33/11kV Substation Installation",
    category: "Power",
    location: "Gazipur",
    year: 2024,
    image: projImg("amptek-proj-substation"),
    summary:
      "Turnkey HT/LT switchgear and transformer installation for a textile manufacturing complex.",
  },
  {
    id: "pr2",
    title: "FM-200 Clean-Agent Suppression",
    category: "Fire Safety",
    location: "Dhaka",
    year: 2024,
    image: projImg("amptek-proj-fm200"),
    summary:
      "NFPA-compliant detection and FM-200 suppression for a commercial data center.",
  },
  {
    id: "pr3",
    title: "Industrial Boiler & HVAC System",
    category: "Mechanical",
    location: "Narayanganj",
    year: 2023,
    image: projImg("amptek-proj-boiler"),
    summary:
      "Boiler installation and full HVAC execution for a food-processing facility.",
  },
  {
    id: "pr4",
    title: "PLC Automation Upgrade",
    category: "Industrial",
    location: "Chattogram",
    year: 2023,
    image: projImg("amptek-proj-plc"),
    summary:
      "Controls modernization and PLC integration across three production lines.",
  },
  {
    id: "pr5",
    title: "Lightning Protection & Earthing",
    category: "Safety",
    location: "Savar",
    year: 2023,
    image: projImg("amptek-proj-lightning"),
    summary:
      "Facility-wide lightning protection system and earthing for a pharmaceutical plant.",
  },
  {
    id: "pr6",
    title: "Busbar Trunking Distribution",
    category: "Power",
    location: "Dhaka",
    year: 2022,
    image: projImg("amptek-proj-bbt"),
    summary:
      "BBT-based power distribution for a multi-storey commercial tower.",
  },
];

// Primary navigation shared by the header and footer. Home is the storefront;
// the corporate landing lives at /company.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/company", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
