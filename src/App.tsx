import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Handshake,
  Mail,
  Menu,
  MessageSquareText,
  Network,
  Plane,
  RadioTower,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

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

const serviceCards = [
  {
    icon: Search,
    title: "Charter sourcing",
    copy: "Share the mission once. Tarmac compares aircraft, routing, availability, operator fit, and price logic before options reach you.",
  },
  {
    icon: Network,
    title: "Broker network access",
    copy: "We route requests through the right aviation partners instead of making you manage a spreadsheet of brokers and callbacks.",
  },
  {
    icon: Handshake,
    title: "Owner-side coordination",
    copy: "Owners get a communication bridge for quoting, positioning, service requests, partner follow-up, and trip readiness.",
  },
  {
    icon: RadioTower,
    title: "Service desk support",
    copy: "From FBO needs and ground transport to catering, overnight details, and client preferences, the in-between work is handled.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Tell us the mission",
    copy: "Passenger count, timing, route, aircraft preferences, budget sensitivity, service expectations, and non-negotiables.",
  },
  {
    number: "02",
    title: "We source the network",
    copy: "Tarmac checks qualified partners, broker channels, operator fit, aircraft availability, and pricing context.",
  },
  {
    number: "03",
    title: "You see clean options",
    copy: "Receive a concise comparison with trade-offs, quote assumptions, likely fees, and the reason each option made the shortlist.",
  },
  {
    number: "04",
    title: "We manage the handoffs",
    copy: "Once approved, Tarmac coordinates the moving parts between client, owner, broker, operator, and service providers.",
  },
];

const benefits = [
  "One aviation desk that learns your preferences over time.",
  "Less quote chasing, fewer cold calls, and fewer duplicate requests.",
  "Transparent pricing conversations before the trip is committed.",
  "Better matching across aircraft, timing, service expectations, and budget.",
  "Coordination across owners, brokers, operators, FBOs, and support vendors.",
  "A practical filter against inflated pricing and unnecessary competition games.",
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
    <div className="min-h-screen bg-white text-[#0B1F3F]">
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
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0B1F3F] shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <section id="start" className="relative h-screen min-h-[760px] overflow-hidden bg-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.72)_42%,rgba(255,255,255,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(154,146,209,0.22),transparent_30%),linear-gradient(90deg,rgba(10,70,130,0.12),transparent_24%,transparent_76%,rgba(154,146,209,0.12))]" />

        <div className="relative flex h-full flex-col">
          <header className="z-20">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
              <a
                href="#start"
                className="group"
                aria-label="Tarmac by AMG home"
              >
                <BrandLogo />
              </a>

              <div className="hidden items-center gap-8 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-semibold text-[#0B1F3F]/80 transition-colors hover:text-[#9A92D1]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B2A55] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5D7DBC]"
                >
                  Request
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DDE8F8] bg-white/80 text-[#0B1F3F] shadow-sm backdrop-blur transition-colors hover:border-[#9A92D1] md:hidden"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </nav>

            {menuOpen ? (
              <div className="mx-5 rounded-lg border border-[#DDE8F8] bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-semibold text-[#0B1F3F] transition-colors hover:bg-[#F3F6FF]"
                  >
                    {item.label}
                    <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#9A92D1]" />
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0B2A55] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5D7DBC]"
                >
                  Start a Request
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            ) : null}
          </header>

          <main
            id="main"
            className="relative z-10 flex flex-1 items-center justify-center px-6 pb-80 pt-20 text-center md:px-8 md:pb-44"
          >
            <div className="-mt-28 max-w-5xl md:-mt-24">
              <BrandLogo className="mb-6 justify-center" compact />
              <p className="mb-4 text-sm font-semibold uppercase text-[#5D7DBC]">
                Private aviation network
              </p>
              <h1 className="mx-auto text-5xl font-normal leading-none text-[#0B1F3F] md:text-7xl lg:text-8xl">
                <span className="block text-[#5D6F8F]">Charter.</span>
                <span className="-mt-2 block text-[#0B1F3F] md:-mt-3">Handled.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#52627C] md:mt-6 md:text-xl md:leading-8">
                Tarmac by AMG is the one-stop aviation desk that learns your needs, sources
                the right partners, compares real options, and coordinates every handoff.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#9A92D1] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(154,146,209,0.32)] transition-colors hover:bg-[#867DCA]"
                >
                  Start a Request
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <a
                  href="#story"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B2A55] ring-1 ring-[#DDE8F8] transition-colors hover:bg-[#F3F6FF]"
                >
                  See the Model
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </main>

          <div data-hero-rail className="absolute inset-x-0 bottom-0 z-10 border-t border-[#DDE8F8] bg-white/84 backdrop-blur">
            <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#DDE8F8] px-6 text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
              {[
                ["01", "Brief once", "We capture route, timing, budget, preferences, and service needs."],
                ["02", "Source smarter", "Qualified partners are compared before they reach your inbox."],
                ["03", "Coordinate all", "Tarmac keeps owner, broker, operator, and vendors aligned."],
              ].map(([number, title, copy]) => (
                <div key={title} className="py-4 sm:px-5 md:py-5">
                  <p className="text-xs font-semibold text-[#9A92D1]">{number}</p>
                  <p className="mt-1 text-sm font-semibold text-[#0B1F3F]">{title}</p>
                  <p className="mt-1 max-w-sm text-xs leading-5 text-[#64748B]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#DDE8F8] bg-white px-6 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-[#5D7DBC]">In partnership with AMG Aviation</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#52627C]">
              Tarmac combines client-side coordination with aviation partner access, so the
              relationship stays personal while the sourcing stays broad.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <BrandLogo compact />
            <img
              src="/brand/amg-logo.png"
              alt="AMG Aviation"
              className="h-12 w-36 object-contain md:h-14 md:w-44"
            />
          </div>
        </div>
      </section>

      <section id="story" className="bg-[#F8FBFF] px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#5D7DBC]">Why Tarmac exists</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#0B1F3F] md:text-6xl">
              Stop shopping the same trip ten different ways.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#52627C]">
              Private aviation should not force owners, assistants, and frequent flyers to
              chase a dozen quote threads just to learn who is fair, who is available, and
              who is inflating the number. Tarmac becomes the practical layer in the middle:
              one accountable aviation desk that knows your preferences and connects the
              right company or service to the right mission.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: MessageSquareText,
                title: "One conversation",
                copy: "Your preferences become reusable intelligence, not a new intake call every time.",
              },
              {
                icon: BadgeDollarSign,
                title: "Price discipline",
                copy: "Quotes are compared against mission realities before they become your problem.",
              },
              {
                icon: FileCheck2,
                title: "Clear trade-offs",
                copy: "Aircraft, routing, timing, and service compromises are explained in plain English.",
              },
              {
                icon: Clock3,
                title: "Hours returned",
                copy: "Tarmac absorbs the searching, filtering, confirming, and coordination burden.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-[#DDE8F8] bg-white p-6 shadow-[0_18px_46px_rgba(11,31,63,0.08)]"
              >
                <item.icon aria-hidden="true" className="h-6 w-6 text-[#9A92D1]" />
                <h3 className="mt-5 text-lg font-semibold text-[#0B1F3F]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#52627C]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-[#0B1F3F] md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase text-[#5D7DBC]">What we coordinate</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
                A network desk for charter, owners, brokers, and services.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#52627C]">
                Tarmac is built for people who value private aviation but do not want the
                operational drag that comes with shopping, comparing, and managing every
                conversation themselves.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {serviceCards.map((service) => (
                <article
                  key={service.title}
                  className="rounded-lg border border-[#DDE8F8] bg-[#F8FBFF] p-6 transition-colors hover:bg-[#F3F6FF]"
                >
                  <service.icon aria-hidden="true" className="h-7 w-7 text-[#9A92D1]" />
                  <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#52627C]">{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EEF5FF] px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-[#5D7DBC]">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0B1F3F] md:text-5xl">
              Built like an account manager for private aviation.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-lg border border-[#DDE8F8] bg-white p-6 shadow-[0_18px_46px_rgba(11,31,63,0.07)]"
              >
                <p className="font-mono text-sm font-bold text-[#9A92D1]">{step.number}</p>
                <h3 className="mt-8 text-xl font-semibold text-[#0B1F3F]">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#52627C]">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rates" className="bg-white px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-[#5D7DBC]">Rates and pricing</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0B1F3F] md:text-5xl">
              Transparent pricing before you approve the mission.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#52627C]">
              Private charter rates move with aircraft class, route, positioning, demand,
              crew duty limits, airport costs, and service requirements. Tarmac makes those
              drivers visible so clients can compare options without spending hours shopping
              the same trip.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["No blind markups", "Quote logic explained", "Mission-specific sourcing"].map(
                (pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-[#C8D8F0] bg-[#F8FBFF] px-4 py-2 text-sm font-semibold text-[#0B2A55]"
                  >
                    {pill}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="rounded-lg border border-[#DDE8F8] bg-[#F8FBFF] p-6 shadow-[0_22px_70px_rgba(11,31,63,0.10)] md:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-[#DDE8F8] pb-6">
              <div>
                <p className="text-sm font-bold uppercase text-[#5D7DBC]">Quote review includes</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#0B1F3F]">
                  The numbers behind the number.
                </h3>
              </div>
              <ShieldCheck aria-hidden="true" className="h-8 w-8 shrink-0 text-[#9A92D1]" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Aircraft class and cabin fit",
                "Route and repositioning logic",
                "Operator and partner availability",
                "Crew, airport, tax, and service factors",
                "Comparable options and trade-offs",
                "Coordination scope and disclosed economics",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#9A92D1]" />
                  <p className="text-sm leading-6 text-[#52627C]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-[#F8FBFF] px-6 py-20 text-[#0B1F3F] md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase text-[#5D7DBC]">Benefits</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Less noise between request and wheels up.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#52627C]">
                The point is not to add another broker. The point is to remove the mess
                between client intent, partner capability, owner needs, and a fair trip plan.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex gap-3 rounded-lg border border-[#DDE8F8] bg-white p-5 shadow-[0_14px_36px_rgba(11,31,63,0.06)]"
                >
                  <Sparkles aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#9A92D1]" />
                  <p className="text-sm leading-6 text-[#52627C]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-lg border border-[#DDE8F8] bg-white shadow-[0_20px_60px_rgba(11,31,63,0.08)] md:grid-cols-2">
            <div className="bg-white p-6 md:p-8">
              <p className="text-sm font-bold uppercase text-[#5D6F8F]">The old way</p>
              <h3 className="mt-3 text-2xl font-semibold">Ten threads. Ten incentives.</h3>
              <p className="mt-4 text-sm leading-6 text-[#52627C]">
                Owners and travelers compare scattered quotes, repeat the same trip details,
                and still have to decide which number is fair.
              </p>
            </div>
            <div className="bg-[linear-gradient(135deg,#EEF5FF,#F4F1FF)] p-6 text-[#0B1F3F] md:p-8">
              <p className="text-sm font-bold uppercase text-[#746AD1]">The Tarmac way</p>
              <h3 className="mt-3 text-2xl font-semibold">One desk. Clear rationale.</h3>
              <p className="mt-4 text-sm leading-6 text-[#52627C]">
                Tarmac gathers the brief, filters the market, shows the trade-offs, and
                keeps the handoffs moving until the trip is complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase text-[#5D7DBC]">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0B1F3F] md:text-5xl">
              Straight answers for a relationship business.
            </h2>
          </div>

          <div className="divide-y divide-[#DDE8F8] border-y border-[#DDE8F8]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-[#0B1F3F]">
                  {faq.question}
                  <ChevronRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#9A92D1] transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#52627C]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0B2A55] px-6 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <BrandLogo className="mb-8" variant="light" />
            <p className="text-sm font-bold uppercase text-[#B9C8FF]">Start with the mission</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Bring one trip, owner need, or service request.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Tarmac will turn the brief into an actionable path across the AMG Aviation
              partnership network, broker channels, charter resources, and service partners.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Plane, title: "Charter brief", copy: "Route, timing, passengers, and cabin fit." },
                { icon: ShieldCheck, title: "Partner filter", copy: "Qualified operators, services, and broker support." },
                { icon: Mail, title: "Direct desk", copy: contactEmail },
                { icon: CheckCircle2, title: "End-to-end", copy: "Source, compare, coordinate, and follow through." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-white/14 bg-white/[0.08] p-5">
                  <item.icon aria-hidden="true" className="h-6 w-6 text-[#B9C8FF]" />
                  <p className="mt-4 font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/66">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-[#DDE8F8] bg-white p-5 text-[#0B1F3F] shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[#0B1F3F]">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#0B1F3F]">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
                  autoComplete="email"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#0B1F3F]">Phone</span>
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
                  autoComplete="tel"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#0B1F3F]">Aircraft preference</span>
                <select
                  value={form.aircraft}
                  onChange={(event) => updateField("aircraft", event.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors focus:border-[#9A92D1]"
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
                <span className="text-sm font-semibold text-[#0B1F3F]">Route</span>
                <input
                  required
                  value={form.route}
                  onChange={(event) => updateField("route", event.target.value)}
                  placeholder="Example: TEB to MIA, round trip"
                  className="mt-2 h-12 w-full rounded-md border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors placeholder:text-[#90A0B7] focus:border-[#9A92D1]"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-[#0B1F3F]">Timing</span>
                <input
                  required
                  value={form.timing}
                  onChange={(event) => updateField("timing", event.target.value)}
                  placeholder="Dates, departure window, flexibility"
                  className="mt-2 h-12 w-full rounded-md border border-[#DDE8F8] bg-[#F8FBFF] px-4 text-sm outline-none transition-colors placeholder:text-[#90A0B7] focus:border-[#9A92D1]"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-[#0B1F3F]">Mission notes</span>
                <textarea
                  value={form.details}
                  onChange={(event) => updateField("details", event.target.value)}
                  rows={5}
                  placeholder="Passengers, pets, catering, budget sensitivity, owner needs, service requests, or broker coordination details."
                  className="mt-2 w-full resize-none rounded-md border border-[#DDE8F8] bg-[#F8FBFF] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#90A0B7] focus:border-[#9A92D1]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#9A92D1] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#867DCA]"
            >
              Send Request
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <p className="mt-4 text-xs leading-5 text-[#5D6F8F]">
              By sending a request, you are asking Tarmac by AMG to review the mission and
              coordinate relevant partner options. Final charter services are subject to
              operator availability, safety review, and agreement terms.
            </p>
            {submitted ? (
              <p role="status" className="mt-4 rounded-md bg-[#EEF5FF] px-4 py-3 text-sm text-[#0B2A55]">
                Your email client is opening with the request details prepared.
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <footer className="border-t border-[#DDE8F8] bg-white px-6 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <a href="#start" aria-label="Tarmac by AMG home">
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
