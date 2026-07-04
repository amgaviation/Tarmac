// @ts-nocheck
import { FormEvent, useMemo, useState } from "react";
const videoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

const introVideoUrl = "/video/tarmac-intro.mp4";
const contactEmail = "concierge@tarmacbyamg.com";

const navItems = [
  { label: "Start", href: "#start" },
  { label: "Story", href: "#story" },
  { label: "Rates", href: "#rates" },
  { label: "Benefits", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
];

const missionStats = [
  { value: "01", label: "Relationship", copy: "One desk learns the owner, client, and mission profile." },
  { value: "12", label: "Market channels", copy: "Qualified operators, brokers, vendors, and service partners." },
  { value: "0", label: "Blind shopping", copy: "No repeating the same trip brief across scattered quote threads." },
];

const serviceCards = [
  {
    glyph: "SR",
    title: "Charter sourcing",
    copy: "Share the mission once. Tarmac compares aircraft, routing, availability, operator fit, and price logic before options reach you.",
  },
  {
    glyph: "NW",
    title: "Broker network access",
    copy: "Requests are routed through relevant aviation partners instead of forcing you to manage a spreadsheet of brokers and callbacks.",
  },
  {
    glyph: "OC",
    title: "Owner-side coordination",
    copy: "Owners get a communication bridge for quoting, positioning, service requests, partner follow-up, and trip readiness.",
  },
  {
    glyph: "DS",
    title: "Service desk support",
    copy: "From FBO needs and ground transport to catering, overnight details, and client preferences, the in-between work is handled.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Profile the mission",
    copy: "Passenger count, route, timing, aircraft preference, service expectations, budget sensitivity, and non-negotiables.",
  },
  {
    number: "02",
    title: "Scan the network",
    copy: "Tarmac checks qualified partners, broker channels, operator fit, aircraft availability, and pricing context.",
  },
  {
    number: "03",
    title: "Compare the options",
    copy: "You receive a concise shortlist with quote assumptions, likely fees, trade-offs, and why each option made the cut.",
  },
  {
    number: "04",
    title: "Control the handoff",
    copy: "Once approved, Tarmac coordinates the moving parts between client, owner, broker, operator, and service providers.",
  },
];

const benefits = [
  "Aviation preferences become reusable operating intelligence.",
  "Fewer quote threads, callbacks, duplicate briefs, and vendor dead ends.",
  "Pricing conversations show the assumptions behind the number.",
  "Aircraft, route, timing, service, and budget fit are compared together.",
  "Owners, brokers, operators, FBOs, and vendors stay aligned through one desk.",
  "Inflated pricing and unnecessary competition games get filtered earlier.",
];

const quoteFactors = [
  "Aircraft class and cabin fit",
  "Route and repositioning logic",
  "Operator and partner availability",
  "Crew, airport, tax, and service factors",
  "Comparable options and trade-offs",
  "Coordination scope and disclosed economics",
];

const faqs = [
  {
    question: "Is Tarmac a charter company or a broker?",
    answer:
      "Tarmac by AMG is positioned as a client-side private aviation coordination and brokerage support partner. The value is not another quote inbox. It is one relationship that sources the right qualified company or service for each mission.",
  },
  {
    question: "How does pricing stay transparent?",
    answer:
      "Every quote is reviewed around route, aircraft class, timing, positioning, crew, airport, taxes, service needs, and partner economics. The goal is to show what drives the number before a client approves it.",
  },
  {
    question: "Can owners use Tarmac too?",
    answer:
      "Yes. Owners can use Tarmac as a communication bridge for service requests, partner coordination, charter support, and trip logistics so they are not forced to chase multiple vendors themselves.",
  },
  {
    question: "What aircraft types can you source?",
    answer:
      "Tarmac can coordinate sourcing across turboprops, light jets, midsize jets, super-midsize jets, heavy jets, and ultra-long-range aircraft based on mission fit and availability.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  route: string;
  timing: string;
  aircraft: string;
  details: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  route: "",
  timing: "",
  aircraft: "Best fit",
  details: "",
};

function BrandLogo({
  className = "",
  variant = "dark",
  compact = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const isLight = variant === "light";

  return (
    <img
      src="/brand/tarmacfinal.png"
      alt="Tarmac"
      className={`${compact ? "h-16 w-16" : "h-20 w-20"} object-contain ${
        isLight ? "drop-shadow-[0_18px_36px_rgba(255,255,255,0.14)]" : "brightness-0"
      } ${className}`}
    />
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="aero-label flex items-center gap-3 text-[#5D7DBC]">
      <span className="text-[#9A92D1]">{index}</span>
      <span className="h-px w-10 bg-[#C8D8F0]" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Tarmac request from ${form.name || "new client"}`);
    const body = encodeURIComponent(
      [
        "New Tarmac by AMG request",
        "",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Route: ${form.route}`,
        `Timing: ${form.timing}`,
        `Aircraft preference: ${form.aircraft}`,
        "",
        "Details:",
        form.details,
      ].join("\n"),
    );

    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }, [form]);

  const updateField = (field: keyof FormState, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.location.href = mailtoHref;
  };

  return (
    <div className="min-h-screen bg-white font-body text-[#0B1F3F]">
      {!introComplete ? (
        <div className="fixed inset-0 z-[120] overflow-hidden bg-white">
          <video
            className="h-full w-full object-cover"
            src={introVideoUrl}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setIntroComplete(true)}
            onError={() => setIntroComplete(true)}
            aria-label="Tarmac by AMG intro animation"
          />
        </div>
      ) : null}

      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-20 bg-white px-4 py-2 text-sm font-semibold text-[#0B1F3F] shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <section id="start" className="aero-grid relative min-h-screen overflow-hidden bg-white">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.78)_48%,rgba(255,255,255,1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_34%,rgba(154,146,209,0.22),transparent_30%),linear-gradient(90deg,rgba(93,125,188,0.12),transparent_24%,transparent_76%,rgba(154,146,209,0.12))]" />

        <div className="relative flex min-h-screen flex-col">
          <header className="z-20 border-b border-[#DDE8F8]/80 bg-white/76 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-12 lg:px-24">
              <a href="#start" aria-label="Tarmac home">
                <BrandLogo />
              </a>

              <div className="hidden items-center gap-8 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="aero-label text-[#0B1F3F]/76 transition-colors hover:text-[#9A92D1]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="aero-button bg-[#0B2A55] text-white hover:bg-[#5D7DBC]"
                >
                  Request
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-[#C8D8F0] bg-white text-[#0B1F3F] shadow-sm transition-colors hover:border-[#9A92D1] md:hidden"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span aria-hidden="true" className="aero-label">
                  {menuOpen ? "X" : "MENU"}
                </span>
              </button>
            </nav>

            {menuOpen ? (
              <div className="mx-5 mb-5 border border-[#DDE8F8] bg-white/96 p-3 shadow-2xl backdrop-blur md:hidden">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-[#DDE8F8] px-4 py-4 text-sm font-semibold text-[#0B1F3F] transition-colors last:border-b-0 hover:bg-[#F3F6FF]"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-[#9A92D1]">&gt;</span>
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="aero-button mt-3 w-full justify-center bg-[#0B2A55] text-white hover:bg-[#5D7DBC]"
                >
                  Start Request
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            ) : null}
          </header>

          <main
            id="main"
            className="relative z-10 flex flex-1 items-center px-5 pb-80 pt-20 md:px-12 md:pb-44 lg:px-24"
          >
            <div className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <BrandLogo className="mb-10" compact />
                <SectionLabel index="00" label="Private aviation network" />
                <h1 className="mt-8 max-w-5xl font-display text-6xl font-medium leading-none text-[#0B1F3F] md:text-8xl lg:text-[128px]">
                  Charter{" "}
                  <span className="block text-[#5D6F8F]">without the chase.</span>
                </h1>
              </div>
              <div className="border-l border-[#C8D8F0] pl-6 lg:col-span-4">
                <p className="text-xl font-semibold leading-8 text-[#52627C] md:text-2xl">
                  One aviation desk that learns the mission, filters the network, compares real
                  options, and controls the handoff from quote to wheels up.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href="#contact"
                  className="aero-button justify-center bg-[#9A92D1] text-white hover:bg-[#867DCA]"
                >
                  Start a Request
                  <span aria-hidden="true">-&gt;</span>
                </a>
                  <a
                    href="#story"
                  className="aero-button justify-center border border-[#C8D8F0] bg-white text-[#0B2A55] hover:bg-[#F3F6FF]"
                >
                  See the Model
                  <span aria-hidden="true">&gt;</span>
                </a>
                </div>
              </div>
            </div>
          </main>

          <div data-hero-rail className="absolute inset-x-0 bottom-0 z-10 border-y border-[#DDE8F8] bg-white/88 backdrop-blur">
            <div className="mx-auto grid max-w-[1500px] grid-cols-1 divide-y divide-[#DDE8F8] px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-12 lg:px-24">
              {missionStats.map((stat) => (
                <article key={stat.label} className="py-5 md:px-6">
                  <p className="font-display text-5xl font-light leading-none text-[#9A92D1]">{stat.value}</p>
                  <p className="aero-label mt-4 text-[#0B1F3F]">{stat.label}</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#64748B]">{stat.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DDE8F8] bg-white px-5 py-10 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-[1500px] gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <SectionLabel index="01" label="AMG Aviation Partnership" />
            <p className="mt-5 max-w-4xl text-xl font-semibold leading-8 text-[#52627C]">
              Tarmac combines client-side coordination with aviation partner access, so the
              relationship stays personal while the sourcing stays broad.
            </p>
          </div>
          <div className="flex items-center gap-8 md:col-span-4 md:justify-end">
            <BrandLogo compact />
            <img src="/brand/amg-logo.png" alt="AMG Aviation" className="h-14 w-44 object-contain" />
          </div>
        </div>
      </section>

      <section id="story" className="aero-grid bg-[#F8FBFF] px-5 py-24 md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="02" label="Why Tarmac exists" />
            <h2 className="mt-8 font-display text-5xl font-medium leading-tight text-[#0B1F3F] md:text-7xl">
              Stop shopping the same trip ten different ways.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-4xl text-xl font-semibold leading-8 text-[#52627C] md:text-2xl">
              Private aviation should not force owners, assistants, and frequent flyers to chase
              a dozen quote threads just to learn who is fair, who is available, and who is
              inflating the number.
            </p>
            <div className="mt-10 grid border-l border-t border-[#DDE8F8] sm:grid-cols-2">
            {[
              {
                  glyph: "01",
                  title: "One conversation",
                  copy: "Your preferences become reusable intelligence, not a new intake call every time.",
                },
                {
                  glyph: "02",
                  title: "Price discipline",
                  copy: "Quotes are compared against mission realities before they become your problem.",
                },
                {
                  glyph: "03",
                  title: "Clear trade-offs",
                  copy: "Aircraft, routing, timing, and service compromises are explained in plain English.",
                },
                {
                  glyph: "04",
                  title: "Hours returned",
                  copy: "Tarmac absorbs the searching, filtering, confirming, and coordination burden.",
                },
              ].map((item) => (
                <article key={item.title} className="border-b border-r border-[#DDE8F8] bg-white/82 p-7">
                  <p className="aero-label text-[#9A92D1]">{item.glyph}</p>
                  <h3 className="mt-8 font-display text-2xl font-medium text-[#0B1F3F]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#52627C]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 text-[#0B1F3F] md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel index="03" label="Network desk" />
              <h2 className="mt-8 font-display text-5xl font-medium leading-tight md:text-6xl">
                Charter, owners, brokers, and services in one operating layer.
              </h2>
            </div>
            <div className="grid border-l border-t border-[#DDE8F8] md:grid-cols-2 lg:col-span-8">
              {serviceCards.map((service) => (
                <article key={service.title} className="border-b border-r border-[#DDE8F8] bg-[#F8FBFF] p-8 transition-colors hover:bg-[#F3F6FF]">
                  <p className="aero-label text-[#9A92D1]">{service.glyph}</p>
                  <h3 className="mt-10 font-display text-3xl font-medium">{service.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-[#52627C]">{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="aero-grid bg-[#EEF5FF] px-5 py-24 md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-4xl">
            <SectionLabel index="04" label="How it works" />
            <h2 className="mt-8 font-display text-5xl font-medium leading-tight text-[#0B1F3F] md:text-7xl">
              Built like an account manager for private aviation.
            </h2>
          </div>

          <div className="mt-14 grid border-l border-t border-[#C8D8F0] lg:grid-cols-4">
            {processSteps.map((step) => (
              <article key={step.number} className="border-b border-r border-[#C8D8F0] bg-white/86 p-8">
                <p className="font-display text-6xl font-light leading-none text-[#9A92D1]">{step.number}</p>
                <h3 className="mt-12 font-display text-2xl font-medium text-[#0B1F3F]">{step.title}</h3>
                <p className="mt-5 text-sm leading-6 text-[#52627C]">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rates" className="bg-white px-5 py-24 md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionLabel index="05" label="Rates and pricing" />
            <h2 className="mt-8 font-display text-5xl font-medium leading-tight text-[#0B1F3F] md:text-7xl">
              Transparent pricing before you approve the mission.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#52627C]">
              Private charter rates move with aircraft class, route, positioning, demand, crew
              duty limits, airport costs, and service requirements. Tarmac makes those drivers visible.
            </p>
          </div>

          <div className="border border-[#DDE8F8] bg-[#F8FBFF] lg:col-span-7">
            <div className="flex items-start justify-between gap-6 border-b border-[#DDE8F8] p-8">
              <div>
                <p className="aero-label text-[#5D7DBC]">Quote review matrix</p>
                <h3 className="mt-3 font-display text-3xl font-medium text-[#0B1F3F]">
                  The numbers behind the number.
                </h3>
              </div>
              <p aria-hidden="true" className="aero-label shrink-0 text-[#9A92D1]">OK</p>
            </div>
            <div className="grid md:grid-cols-2">
              {quoteFactors.map((item) => (
                <div key={item} className="flex gap-4 border-b border-r border-[#DDE8F8] p-6">
                  <span aria-hidden="true" className="aero-label mt-1 shrink-0 text-[#9A92D1]">+</span>
                  <p className="text-sm leading-6 text-[#52627C]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="aero-grid bg-[#F8FBFF] px-5 py-24 text-[#0B1F3F] md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel index="06" label="Benefits" />
              <h2 className="mt-8 font-display text-5xl font-medium leading-tight md:text-7xl">
                Less noise between request and wheels up.
              </h2>
            </div>

            <div className="grid border-l border-t border-[#DDE8F8] sm:grid-cols-2 lg:col-span-8">
              {benefits.map((benefit, index) => (
                <div key={benefit} className="flex gap-5 border-b border-r border-[#DDE8F8] bg-white p-6">
                  <span className="aero-label text-[#9A92D1]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-6 text-[#52627C]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid border border-[#DDE8F8] bg-white md:grid-cols-2">
            <div className="p-8">
              <p className="aero-label text-[#5D6F8F]">The old way</p>
              <h3 className="mt-5 font-display text-4xl font-medium">Ten threads. Ten incentives.</h3>
              <p className="mt-5 text-sm leading-6 text-[#52627C]">
                Owners and travelers compare scattered quotes, repeat the same trip details, and still
                have to decide which number is fair.
              </p>
            </div>
            <div className="border-t border-[#DDE8F8] bg-[linear-gradient(135deg,#EEF5FF,#F4F1FF)] p-8 md:border-l md:border-t-0">
              <p className="aero-label text-[#746AD1]">The Tarmac way</p>
              <h3 className="mt-5 font-display text-4xl font-medium">One desk. Clear rationale.</h3>
              <p className="mt-5 text-sm leading-6 text-[#52627C]">
                Tarmac gathers the brief, filters the market, shows the trade-offs, and keeps the
                handoffs moving until the trip is complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-5 py-24 md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="07" label="FAQ" />
            <h2 className="mt-8 font-display text-5xl font-medium leading-tight text-[#0B1F3F] md:text-6xl">
              Straight answers for a relationship business.
            </h2>
          </div>

          <div className="border-t border-[#DDE8F8] lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-[#DDE8F8] py-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl font-medium text-[#0B1F3F]">
                  {faq.question}
                  <span aria-hidden="true" className="shrink-0 text-[#9A92D1] transition-transform group-open:rotate-90">
                    &gt;
                  </span>
                </summary>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-[#52627C]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="aero-grid-dark bg-[#0B2A55] px-5 py-24 text-white md:px-12 md:py-36 lg:px-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <BrandLogo className="mb-10" variant="light" />
            <SectionLabel index="08" label="Start with the mission" />
            <h2 className="mt-8 font-display text-5xl font-medium leading-tight md:text-7xl">
              Bring one trip, owner need, or service request.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72">
              Tarmac will turn the brief into an actionable path across the AMG Aviation
              partnership network, broker channels, charter resources, and service partners.
            </p>

            <div className="mt-10 grid border-l border-t border-white/16 sm:grid-cols-2">
              {[
                { glyph: "CB", title: "Charter brief", copy: "Route, timing, passengers, and cabin fit." },
                { glyph: "PF", title: "Partner filter", copy: "Qualified operators, services, and broker support." },
                { glyph: "DD", title: "Direct desk", copy: contactEmail },
                { glyph: "E2E", title: "End-to-end", copy: "Source, compare, coordinate, and follow through." },
              ].map((item) => (
                <div key={item.title} className="border-b border-r border-white/16 bg-white/[0.06] p-6">
                  <p className="aero-label text-[#B9C8FF]">{item.glyph}</p>
                  <p className="mt-7 font-display text-xl font-medium">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/66">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-[#DDE8F8] bg-white p-6 text-[#0B1F3F] shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-8 lg:col-span-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="aero-label text-[#0B1F3F]">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="mt-3 h-12 w-full border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="aero-label text-[#0B1F3F]">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="mt-3 h-12 w-full border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
                  autoComplete="email"
                />
              </label>
              <label className="block">
                <span className="aero-label text-[#0B1F3F]">Phone</span>
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="mt-3 h-12 w-full border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
                  autoComplete="tel"
                />
              </label>
              <label className="block">
                <span className="aero-label text-[#0B1F3F]">Aircraft preference</span>
                <select
                  value={form.aircraft}
                  onChange={(event) => updateField("aircraft", event.target.value)}
                  className="mt-3 h-12 w-full border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
                >
                  <option>Best fit</option>
                  <option>Light jet</option>
                  <option>Midsize jet</option>
                  <option>Super-midsize jet</option>
                  <option>Heavy jet</option>
                  <option>Ultra-long-range</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="aero-label text-[#0B1F3F]">Route</span>
                <input
                  required
                  value={form.route}
                  onChange={(event) => updateField("route", event.target.value)}
                  placeholder="Example: TEB to MIA, round trip"
                  className="mt-3 h-12 w-full border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors placeholder:text-[#90A0B7] focus:border-[#9A92D1]"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="aero-label text-[#0B1F3F]">Timing</span>
                <input
                  required
                  value={form.timing}
                  onChange={(event) => updateField("timing", event.target.value)}
                  placeholder="Dates, departure window, flexibility"
                  className="mt-3 h-12 w-full border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors placeholder:text-[#90A0B7] focus:border-[#9A92D1]"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="aero-label text-[#0B1F3F]">Mission notes</span>
                <textarea
                  value={form.details}
                  onChange={(event) => updateField("details", event.target.value)}
                  rows={5}
                  placeholder="Passengers, pets, catering, budget sensitivity, owner needs, service requests, or broker coordination details."
                  className="mt-3 w-full resize-none border border-[#DDE8F8] bg-[#F8FBFF] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#90A0B7] focus:border-[#9A92D1]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="aero-button mt-6 min-h-12 w-full justify-center bg-[#9A92D1] text-white hover:bg-[#867DCA]"
            >
              Send Request
              <span aria-hidden="true">-&gt;</span>
            </button>
            <p className="mt-5 text-xs leading-5 text-[#5D6F8F]">
              By sending a request, you are asking Tarmac by AMG to review the mission and
              coordinate relevant partner options. Final charter services are subject to
              operator availability, safety review, and agreement terms.
            </p>
            {submitted ? (
              <p role="status" className="mt-4 bg-[#EEF5FF] px-4 py-3 text-sm text-[#0B2A55]">
                Your email client is opening with the request details prepared.
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <footer className="border-t border-[#DDE8F8] bg-white px-5 py-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="#start" aria-label="Tarmac home">
            <BrandLogo compact />
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#52627C]">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-[#9A92D1]">
                {item.label}
              </a>
            ))}
            <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-[#9A92D1]">
              {contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
