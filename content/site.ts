const SCREEN_SIZE = { width: 1920, height: 973 } as const;

export const screens = {
  home: {
    ...SCREEN_SIZE,
    src: "/screens/home.webp",
    label: "Dashboard & Analytics",
    alt: "The NLMIS console home dashboard, showing supplier stock, pending approvals and system overview figures.",
  },
  requisition: {
    ...SCREEN_SIZE,
    src: "/screens/requisition.webp",
    label: "Match Requisition",
    alt: "The Match Requisition screen, listing pending facility requisitions with their match status.",
  },
  marketplace: {
    ...SCREEN_SIZE,
    src: "/screens/marketplace.webp",
    label: "Supplier Marketplace",
    alt: "The Supplier Marketplace screen, listing supplier stock with available quantity and price per unit.",
  },
  budget: {
    ...SCREEN_SIZE,
    src: "/screens/budget.webp",
    label: "Budget & Funds Setup",
    alt: "The Budget and Funds Setup screen, showing approved, released and available funds against a facility.",
  },
  trace: {
    ...SCREEN_SIZE,
    src: "/screens/trace.webp",
    label: "Requisition Journey",
    alt: "The Requisition Journey screen, tracking a requisition through dispatch and proof of delivery.",
  },
} as const;

export type ScreenKey = keyof typeof screens;

export const site = {
  name: "nlmis",
  fullName: "National Logistics Management Information System",
  programme: "Taifa Care",
  owner: "Ministry of Health · Digital Health Agency · Taifa Care",
  consoleUrl: "nlmis.taifacare.go.ke",
  description:
    "Kenya's national record for health commodities — requisitions, stock and deliveries visible from facility to patient.",
} as const;

export const intro = {
  storageKey: "nlmis-line-intro-seen",
  skip: "Skip",
  wordmark: "nlmis",
  fullName: site.fullName,
  beats: [
    { label: "Facility", line: "A facility needs stock." },
    { label: "National record", line: "NLMIS writes one national record." },
    { label: "Patient", line: "Medicine reaches the patient." },
  ],
  lede: "Requisitions, stock and deliveries — visible end to end.",
} as const;

export const nav = {
  homeLabel: "NLMIS home",
  links: [
    { label: "Platform", href: "/#platform" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Logistics", href: "/#logistics" },
    { label: "Who it's for", href: "/#audiences" },
    { label: "Tutorials", href: "/tutorials" },
  ],
  cta: { label: "Request onboarding", href: "/#onboarding" },
  openMenu: "Open menu",
  closeMenu: "Close menu",
} as const;

export const hero = {
  eyebrow: "Taifa Care · National Logistics Management Information System",
  headline: ["Every medicine has a journey.", "Now it has a record."],
  body: "NLMIS follows health commodities from the facility's request to the patient's hand. Requisitions, stock and deliveries are on one national line, straight through to KEMSA and MEDS.",
  primaryCta: { label: "Request onboarding", href: "#onboarding" },
  secondaryCta: { label: "Follow the line", href: "#how-it-works" },
  matched: {
    title: "Requisition matched",
    note: "Supplier picked on price and stock",
  },
  ship: {
    aria: "Shipping label: from KEMSA, MEDS and onboarded suppliers to any health facility in 47 counties. Contents: health commodities from the PPB catalogue. Record: one, national, end to end. Status: pilots live, 2026.",
    code: "SSCC · GS1-128",
    fromLabel: "FROM",
    from: "KEMSA · MEDS · ONBOARDED SUPPLIERS",
    toLabel: "TO",
    to: "ANY HEALTH FACILITY · 47 COUNTIES",
    contentsLabel: "CONTENTS",
    contents: "HEALTH COMMODITIES · PPB CATALOGUE",
    recordLabel: "RECORD",
    record: "ONE · NATIONAL · END TO END",
    statusLabel: "STATUS",
    status: "PILOTS LIVE · 2026",
    barcodeCaption: "(00) 0 0614141 000000001 8",
    stamp: {
      eyebrow: "STATUS",
      lines: ["PILOTS", "LIVE"],
      year: "2026",
    },
  },
  screen: screens.home,
} as const;

export const problem = {
  eyebrow: "Today · the line breaks",
  headline: "Stock lives in paper registers and spreadsheets.",
  body: "A county can't see what a facility has until someone counts it and types it up. By then the shortage is already weeks old.",
  breaks: [
    {
      number: "BREAK 01",
      title: "Stockouts found too late",
      body: "A facility finds out it has run out when a patient is at the counter, not when stock crossed the reorder threshold.",
    },
    {
      number: "BREAK 02",
      title: "No national view",
      body: "Nobody can say what is where, how much and when it expires across 47 counties without a manual data call.",
    },
    {
      number: "BREAK 03",
      title: "Avoidable wastage",
      body: "Stock expires on one shelf while another facility in the same county orders the same item.",
    },
  ],
} as const;

export const overview = {
  eyebrow: "What is NLMIS · the line joins",
  headline: "One national record for health commodities.",
  body: "The reference point for reporting the quantity, status and location of every health product moving through Kenya's public and private health system.",
  links: [
    { number: "01", title: "Requisition", href: "#how-it-works" },
    { number: "02", title: "Visibility", href: "#platform" },
    { number: "03", title: "Standards", href: "#standards" },
  ],
} as const;

export const platform = {
  eyebrow: "The platform",
  headline: ["Six modules,", "one system of record."],
  modules: [
    {
      number: "01",
      title: "Supplier marketplace",
      body: "See live stock and pricing from onboarded suppliers before you raise a requisition. Compare, then decide.",
      size: "big" as const,
      screen: "marketplace" as const,
    },
    {
      number: "02",
      title: "Order management",
      body: "Raise a request, route it through approval and follow every purchase order to fulfilment, visible to all parties.",
      size: "big" as const,
      screen: "trace" as const,
    },
    {
      number: "03",
      title: "Inventory visibility",
      body: "Stock positions, batch and expiry tracking, and reorder alerts across the facility hierarchy.",
      size: "sm" as const,
      screen: null,
    },
    {
      number: "04",
      title: "Demand forecasting",
      body: "Last quarter's dispensing becomes next quarter's plan, so replenishment stops being a guess.",
      size: "sm" as const,
      screen: null,
    },
    {
      number: "05 · 06",
      title: "Reporting & integrations",
      body: "Dashboards against agreed KPIs, and approved APIs into HMIS, the HIE and supplier ERPs.",
      size: "sm" as const,
      screen: null,
    },
  ],
} as const;

export const howItWorks = {
  eyebrow: "How it works",
  headline: "From requisition to patient.",
  body: "One flow, visible end to end. Every step writes back to the same record.",
  awaitingLabel: "SCREEN CAPTURE PENDING",
  awaitingTitle: "Goods receipt",
  steps: [
    {
      number: "01",
      title: "The facility raises a request",
      body: "A purchase request is submitted to NLMIS with the required minimum data elements — drawn from the facility's own HMIS consumption and stock data.",
      screen: "requisition" as ScreenKey | null,
    },
    {
      number: "02",
      title: "NLMIS selects the supplier",
      body: "The request is evaluated against configured allocation, pricing, availability and policy rules, and the appropriate onboarded supplier is identified.",
      screen: "marketplace" as ScreenKey | null,
    },
    {
      number: "03",
      title: "The purchase order is issued",
      body: "NLMIS forwards the order into the distributor's own ERP — KEMSA, MEDS or another onboarded supplier. They validate it, confirm, and issue warehouse dispatch instructions.",
      screen: "budget" as ScreenKey | null,
    },
    {
      number: "04",
      title: "The consignment is tracked",
      body: "Dispatch status stays visible in transit — from warehouse to facility — with alerts when a leg runs late.",
      screen: "trace" as ScreenKey | null,
    },
    {
      number: "05",
      title: "The facility receives stock",
      body: "Goods are received into the facility store through its HMIS. Stock positions update, and any discrepancy raises a return notification automatically.",
      screen: null,
    },
    {
      number: "06",
      title: "The record closes the loop",
      body: "Dispensing data flows back as next cycle's forecast, so replenishment starts from real consumption.",
      screen: "home" as ScreenKey | null,
    },
  ],
} as const;

export const logistics = {
  eyebrow: "Logistics · the physical line",
  headline: ["Every move on one record.", "Visible end to end."],
  body: "From the central warehouse to the last health facility, each consignment stays on one national record from dispatch to receipt.",
  legs: [
    {
      number: "01",
      title: "Warehouse dispatch",
      body: "Orders leave KEMSA, MEDS or an onboarded supplier into the national record.",
    },
    {
      number: "02",
      title: "Line-haul & last mile",
      body: "Consignments move county to facility, with alerts when a leg runs late.",
    },
    {
      number: "03",
      title: "Goods receipt",
      body: "The facility's HMIS closes the delivery straight into its stock record.",
    },
  ],
} as const;

export const audiences = {
  eyebrow: "Who it's for",
  headline: "Everyone who touches the line.",
  groups: [
    {
      title: "Health facilities",
      body: "Public hospitals and clinics, private and faith-based facilities, and community pharmacies.",
      href: "/#onboarding",
      imgSrc:
        "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-6wMF08KL3k63lcTffQtNl21e7rnvlZ.png&w=320&q=75",
      imgAlt: "Pharmacy illustration",
      variant: "primary" as const,
      span: "sm:col-span-2 lg:col-span-4",
    },
    {
      title: "County health teams",
      body: "A live picture of stock and consumption across every facility in the county.",
      href: "/#how-it-works",
      imgSrc:
        "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ts6ZXLlUdjdrfqk7toDKORM6uPzxuH.png&w=320&q=75",
      imgAlt: "Medical report illustration",
      variant: "ink" as const,
      span: "lg:col-span-2",
    },
    {
      title: "Distributors & suppliers",
      body: "KEMSA, MEDS and other suppliers connect over approved APIs and receive orders directly.",
      href: "/#platform",
      imgSrc:
        "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-uBD2X8E9FMFPGgAZv0YYRXCMZbaJTt.png&w=320&q=75",
      imgAlt: "Shipment truck illustration",
      variant: "ink" as const,
      span: "lg:col-span-3",
    },
    {
      title: "Pharmacy and Poisons Board",
      body: "Licensing, product safety and quality across the national commodity catalogue.",
      href: "/#standards",
      imgSrc:
        "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-Hw2fBErc10Krg5cppU7KMgSGaWQHL4.png&w=320&q=75",
      imgAlt: "Pill bottle illustration",
      variant: "teal" as const,
      span: "lg:col-span-3",
    },
  ],
} as const;

export const standards = {
  eyebrow: "Standards & assurance",
  headline: "Open standards, by design.",
  body: "NLMIS is one part of Kenya's digital health infrastructure. It is built to connect, not to enclose.",
  chips: [
    "GS1",
    "PPB product catalogue",
    "Health Information Exchange",
    "Digital Health Regulations, 2024",
  ],
} as const;

export const partners = {
  eyebrow: "A joint programme",
  headline: "Three partners, one supply chain.",
  organisations: [
    {
      name: "Ministry of Health",
      role: "Sets policy, standards and the mandate for national health commodity reporting.",
    },
    {
      name: "Digital Health Agency",
      role: "Runs the national digital health infrastructure the platform is built on.",
    },
    {
      name: "Taifa Care",
      role: "The programme delivering universal health coverage services to Kenyans.",
    },
  ],
} as const;

export const onboarding = {
  eyebrow: "End of the line · a patient gets their medicine",
  headline: ["Pilots are live.", "Rollout begins soon."],
  body: "If you run a facility, a county health function, or a supplier system that needs to connect, start here.",
  tutorials: {
    label: "Watch the tutorials",
    note: "Short recordings for each step, for facilities, counties and suppliers.",
    href: "/tutorials",
  },
  form: {
    name: "Name",
    namePlaceholder: "Amina Otieno",
    email: "Email",
    emailPlaceholder: "amina@county.go.ke",
    seat: "Where you sit",
    seats: ["HMIS level", "Facility", "Distributor"],
    system: "Your system",
    systemPlaceholder: "KenyaEMR, DHIS2 or your ERP",
    reason: "Your interest",
    reasonPlaceholder: "We need stock visibility at our county hospital.",
    reasonHint: "Why you want to onboard, and what you need from the team.",
    submit: "Request onboarding",
  },
} as const;

export const tutorials = {
  eyebrow: "Tutorials · six stops, six recordings",
  headline: "Learn the console, stop by stop.",
  showing: (n: number) => `SHOWING ${n} OF 6`,
  allLabel: "All tutorials",
  pending: "Recording not up yet",
  pendingNote: "RUNTIME APPEARS ONCE PUBLISHED",
  cta: {
    title: "Want a walkthrough for your county?",
    body: "Request onboarding and the team will schedule a session for your facilities or supplier system.",
    href: "/#onboarding",
    label: "Request onboarding",
  },
  filters: [
    "all",
    "Health facilities",
    "County health teams",
    "Distributors & suppliers",
  ] as const,
  groups: [
    {
      number: "01",
      title: "The facility raises a request",
      outcome:
        "Submit a purchase request drawn from the facility's own consumption and stock.",
      audience: "Health facilities",
      screen: "requisition" as ScreenKey | null,
    },
    {
      number: "02",
      title: "NLMIS selects the supplier",
      outcome:
        "See how a request is matched to an onboarded supplier on price, availability and policy.",
      audience: "County health teams",
      screen: "marketplace" as ScreenKey | null,
    },
    {
      number: "03",
      title: "The purchase order is issued",
      outcome:
        "Follow the order into the distributor's ERP and the commitment against the facility wallet.",
      audience: "Distributors & suppliers",
      screen: "budget" as ScreenKey | null,
    },
    {
      number: "04",
      title: "The consignment is tracked",
      outcome:
        "Follow a dispatch from warehouse to facility as status updates along the route.",
      audience: "County health teams",
      screen: "trace" as ScreenKey | null,
    },
    {
      number: "05",
      title: "The facility receives stock",
      outcome:
        "Receive goods into the facility store and see stock positions update.",
      audience: "Health facilities",
      screen: null,
    },
    {
      number: "06",
      title: "The record closes the loop",
      outcome:
        "See dispensing flow back into the next forecast.",
      audience: "County health teams",
      screen: "home" as ScreenKey | null,
    },
  ],
} as const;

export const notFound = {
  tag: "ERROR 404 · OFF THE LINE",
  headline: ["This page isn't", "on the line."],
  body: "The link may be old, or the page may have moved. Every consignment on NLMIS has a known location, but this page doesn't. Let's get you back on route.",
  primary: { label: "Back to the start", href: "/" },
  secondary: { label: "Watch the tutorials", href: "/tutorials" },
  links: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Platform", href: "/#platform" },
    { label: "Request onboarding", href: "/#onboarding" },
  ],
  map: {
    home: "HOME",
    last: "LAST KNOWN STOP",
    here: "You are here",
  },
} as const;

export const footer = {
  note: site.owner,
} as const;

