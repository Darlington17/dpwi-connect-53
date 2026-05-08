import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, Calendar, Building2, Home, Wrench, FileText, Users,
  MapPin, Phone, Mail, Clock,
  Briefcase, Download, Send, Hammer, Globe,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DPWI — Department of Public Works and Infrastructure" },
      { name: "description", content: "Official portal of the Department of Public Works and Infrastructure of South Africa. Building infrastructure for a better life." },
      { property: "og:title", content: "DPWI — Department of Public Works and Infrastructure" },
      { property: "og:description", content: "Building South Africa's future through sustainable infrastructure and property management." },
    ],
  }),
  component: Index,
});

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "leave-portal", label: "Leave Portal" },
  { id: "projects", label: "Projects" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

const services = [
  { icon: Calendar, title: "Leave Management", desc: "Streamlined digital portal for department staff to apply for and manage leave of absence efficiently." },
  { icon: Building2, title: "Infrastructure Development", desc: "Planning and executing large-scale public infrastructure projects across South Africa." },
  { icon: Home, title: "Property Management", desc: "Managing the state's extensive portfolio of land and buildings to ensure optimal utility." },
  { icon: Wrench, title: "Facilities Management", desc: "Maintenance and operational support for government facilities and office accommodations." },
  { icon: FileText, title: "Contractor Procurement", desc: "Transparent and fair tendering processes for construction and professional services." },
  { icon: Users, title: "HR & Payroll Services", desc: "Comprehensive support for DPWI personnel regarding benefits, payroll, and career growth." },
];

const projects = [
  { title: "Salvokop Government Precinct", desc: "Modernization and consolidation of national department offices.", status: "Active", province: "Gauteng", category: "Infrastructure" },
  { title: "N1 Bridge Expansion", desc: "Structural upgrades to key economic transport corridors.", status: "Completed", province: "Limpopo", category: "Roads" },
  { title: "Conradie Better Living Model", desc: "Integrated human settlement and mixed-use development.", status: "Planned", province: "Western Cape", category: "Housing" },
  { title: "Regional Hospital Refurbishment", desc: "Critical maintenance of healthcare facilities in rural nodes.", status: "Active", province: "KwaZulu-Natal", category: "Infrastructure" },
  { title: "ASIDI Schools Project", desc: "Replacing inappropriate school structures with modern facilities.", status: "Completed", province: "Eastern Cape", category: "Infrastructure" },
  { title: "Bethlehem Bypass Route", desc: "Improving regional connectivity and road safety standards.", status: "Active", province: "Free State", category: "Roads" },
];

const jobs = [
  { title: "Senior Civil Engineer", branch: "Infrastructure Branch", location: "Pretoria, Head Office", closing: "30 June 2026" },
  { title: "Quantity Surveyor", branch: "Professional Services", location: "Durban Regional Office", closing: "15 July 2026" },
  { title: "Project Manager", branch: "EPWP Programme", location: "Polokwane", closing: "22 June 2026" },
  { title: "Legal Services Officer", branch: "Corporate Services", location: "Pretoria, Head Office", closing: "05 July 2026" },
];

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => {
      const offset = 120;
      for (const link of [...navLinks].reverse()) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(link.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const active = useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("appear")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="font-sans text-gov-dark-grey">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all ${
          scrolled ? "h-[70px]" : "h-20"
        }`}
      >
        <div className="w-[90%] max-w-6xl mx-auto h-full flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 font-bold text-gov-green">
            <span className="w-10 h-10 rounded-full bg-gov-gold flex items-center justify-center text-gov-green">
              <Hammer size={20} />
            </span>
            <span className="hidden sm:inline">DPWI</span>
          </button>

          <nav className={`${menuOpen ? "left-0" : "-left-full"} md:left-auto md:relative md:flex md:items-center md:gap-5 fixed md:static top-20 w-full md:w-auto h-[calc(100vh-80px)] md:h-auto bg-white md:bg-transparent flex-col md:flex-row pt-10 md:pt-0 transition-all duration-300 shadow-md md:shadow-none`}>
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`relative font-semibold text-sm py-3 md:py-0 transition-colors hover:text-gov-green ${
                  active === l.id ? "text-gov-green" : ""
                }`}
              >
                {l.label}
                {active === l.id && (
                  <span className="hidden md:block absolute -bottom-2 left-0 w-full h-[3px] bg-gov-gold" />
                )}
              </button>
            ))}
          </nav>

          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center text-white pt-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.40 0.10 155 / 0.85), oklch(0.30 0.08 155 / 0.85)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="max-w-4xl fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building South Africa's Future
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Department of Public Works and Infrastructure — providing high-quality infrastructure and property management services for the nation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => scrollTo("leave-portal")}
              className="px-8 py-3 rounded bg-gov-gold text-gov-green font-semibold hover:-translate-y-1 transition-transform"
            >
              Access Leave Portal
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="px-8 py-3 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-gov-green transition-colors"
            >
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="w-[90%] max-w-6xl mx-auto fade-in">
          <SectionHeader title="Our Mandate" />
          <p className="italic text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
            The Department of Public Works and Infrastructure is responsible for providing and managing the accommodation and infrastructure needs of all national departments, leading the Expanded Public Works Programme, and regulating the construction and property industries.
          </p>
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-gov-green">
              <h3 className="text-xl text-gov-green mb-3">Our Mission</h3>
              <p>To provide sustainable infrastructure and property management services that contribute to South Africa's socio-economic development and improve the quality of life for all citizens.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-gov-gold">
              <h3 className="text-xl text-gov-green mb-3">Our Vision</h3>
              <p>To be a leader in the provision and management of public assets and infrastructure for a better life for all South Africans.</p>
            </div>
          </div>
          <div className="bg-gov-green text-white rounded-xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "12,500+", l: "Projects Completed" },
              { n: "28,000", l: "Employees Nationwide" },
              { n: "9", l: "Provinces Served" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <span className="block text-4xl md:text-5xl font-bold text-gov-gold mb-2">{s.n}</span>
                <span className="opacity-90">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="w-[90%] max-w-6xl mx-auto fade-in">
          <SectionHeader title="Our Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white p-8 rounded-xl shadow-md text-center border-b-4 border-transparent hover:border-gov-gold hover:-translate-y-2 transition-all"
              >
                <s.icon className="mx-auto text-gov-green mb-4" size={42} />
                <h3 className="text-lg font-bold text-gov-green mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave Portal */}
      <section id="leave-portal" className="py-24 bg-secondary/30">
        <div className="w-[90%] max-w-5xl mx-auto fade-in">
          <SectionHeader title="Leave Application Portal" />
          <p className="text-center text-muted-foreground -mt-10 mb-12">
            Digital Application for Leave of Absence (With Effect From 19 May 2021)
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Application submitted (demo)."); }}
            className="bg-white p-6 md:p-10 rounded-xl shadow-md border-t-8 border-gov-green"
          >
            <div className="grid sm:grid-cols-3 gap-5 mb-5">
              <Field label="Surname" />
              <Field label="Initials" />
              <Field label="PERSAL Number" />
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-5">
              <RadioField label="Shift Worker?" name="shift" />
              <RadioField label="Casual Employee?" name="casual" />
              <Field label="Department" />
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-5">
              <Field label="Component / Office" />
              <Field label="Tel. No." type="tel" />
              <Field label="IT Field" />
            </div>

            <div className="mb-5">
              <Field label="Address during Leave Period" />
            </div>

            <SubHeading>SECTION A: FULL DAY LEAVE</SubHeading>
            <LeaveTable
              headers={["Type of Leave", "Start Date", "End Date", "Working Days"]}
              rows={[
                ["Annual Leave", "date", "date", "number"],
                ["Normal Sick Leave (Attach evidence)", "date", "date", "number"],
                ["Family Responsibility Leave", "date", "date", "number"],
                ["Special Leave (specify)", "date", "date", "number"],
              ]}
            />

            <h4 className="font-bold text-gov-green mb-2 mt-6">Calendar Days (Specific Categories)</h4>
            <LeaveTable
              headers={["Type", "Start Date", "End Date", "Calendar Days / Months"]}
              rows={[["Maternity Leave", "date", "date", "number"], ["Unpaid Leave (Provide Motivation)", "text", "text", "text"]]}
            />

            <SubHeading>SECTION B: PARTIAL DAY LEAVE</SubHeading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mb-4">
                <thead>
                  <tr className="bg-secondary">
                    {["Type", "Date", "Start Time", "End Time", "Total Hours"].map((h) => (
                      <th key={h} className="border p-2 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Annual / Sick / Special</td>
                    <td className="border p-2"><input type="date" className="w-full p-1 border rounded" /></td>
                    <td className="border p-2"><input type="time" className="w-full p-1 border rounded" /></td>
                    <td className="border p-2"><input type="time" className="w-full p-1 border rounded" /></td>
                    <td className="border p-2"><input type="number" className="w-full p-1 border rounded" /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-secondary p-4 border-l-4 border-gov-gold text-sm my-6">
              <strong>Employee Certification:</strong> I certify that the information provided is correct. I understand that if I fail to return to duty on the first working day following the expiry of my leave, disciplinary action may be taken.
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <Field label="Electronic Signature (Type Full Name)" />
              <Field label="Date of Application" type="date" />
            </div>

            <SubHeading>SUPERVISOR RECOMMENDATION</SubHeading>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Decision</label>
                <div className="flex flex-wrap gap-3 text-sm">
                  <label className="flex items-center gap-1"><input type="radio" name="dec" /> Recommended</label>
                  <label className="flex items-center gap-1"><input type="radio" name="dec" /> Not Recommended</label>
                  <label className="flex items-center gap-1"><input type="radio" name="dec" /> Rescheduled</label>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm self-end">
                <input type="checkbox" /> Telephonically discussed
              </label>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Supervisor Remarks</label>
              <textarea rows={3} className="w-full p-2 border rounded" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-3 rounded border-2 border-gov-green text-gov-green font-semibold hover:bg-gov-green hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} /> Download as PDF
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded bg-gov-green text-white font-semibold hover:bg-gov-green/90 flex items-center justify-center gap-2"
              >
                <Send size={18} /> Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24">
        <div className="w-[90%] max-w-6xl mx-auto fade-in">
          <SectionHeader title="Key Projects" />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["All", "Infrastructure", "Housing", "Roads"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full border border-gov-green font-semibold text-sm transition-colors ${
                  filter === f ? "bg-gov-green text-white" : "text-gov-green hover:bg-gov-green/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <article key={p.title} className="rounded-xl overflow-hidden shadow-md bg-white hover:-translate-y-1 transition-transform">
                <div className="h-44 bg-gradient-to-br from-gov-green to-gov-gold flex items-center justify-center">
                  <Building2 className="text-white/80" size={56} />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <Badge status={p.status} />
                    <span className="text-xs text-muted-foreground">{p.province}</span>
                  </div>
                  <h3 className="font-bold text-gov-green mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-24 bg-secondary/30">
        <div className="w-[90%] max-w-6xl mx-auto fade-in">
          <SectionHeader title="Career Opportunities" />
          <p className="text-center text-muted-foreground -mt-10 mb-12">
            Join the team building the foundation of our democracy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jobs.map((j) => (
              <div key={j.title} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gov-gold">
                <h3 className="font-bold text-gov-green mb-3">{j.title}</h3>
                <div className="text-sm text-muted-foreground space-y-1 mb-4">
                  <p className="flex items-center gap-2"><Briefcase size={14} /> {j.branch}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> {j.location}</p>
                  <p className="flex items-center gap-2"><Clock size={14} /> Closing: {j.closing}</p>
                </div>
                <button className="w-full py-2 rounded bg-gov-green text-white text-sm font-semibold hover:bg-gov-green/90">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="w-[90%] max-w-6xl mx-auto fade-in">
          <SectionHeader title="Contact Us" />
          <div className="grid md:grid-cols-2 gap-12">
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Message sent (demo)."); }}
              className="space-y-4 bg-white p-8 rounded-xl shadow-md"
            >
              <Field label="Full Name" />
              <Field label="Email Address" type="email" />
              <div>
                <label className="block text-sm font-semibold mb-1">Subject</label>
                <select className="w-full p-2.5 border rounded">
                  <option>General Enquiry</option>
                  <option>Tenders & Procurement</option>
                  <option>EPWP Information</option>
                  <option>HR Queries</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <textarea rows={5} className="w-full p-2.5 border rounded" />
              </div>
              <button className="w-full py-3 rounded bg-gov-green text-white font-semibold hover:bg-gov-green/90 flex items-center justify-center gap-2">
                <Send size={18} /> Send Message
              </button>
            </form>

            <div>
              <ul className="space-y-5">
                <ContactItem icon={MapPin} title="Physical Address" body="CGO Building, 256 Madiba Street, Pretoria, 0001" />
                <ContactItem icon={Phone} title="Phone Number" body="+27 (0)12 406 1000" />
                <ContactItem icon={Mail} title="Email Address" body="enquiries@dpw.gov.za" />
                <ContactItem icon={Clock} title="Office Hours" body="Mon - Fri: 07:30 - 16:00" />
              </ul>
              <div className="h-64 mt-6 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2" />
                  Pretoria Central CBD Map
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gov-dark-grey text-white pt-20 pb-6">
        <div className="w-[90%] max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 font-bold mb-4">
                <span className="w-9 h-9 rounded-full bg-gov-gold flex items-center justify-center text-gov-green">
                  <Hammer size={18} />
                </span>
                DPWI SOUTH AFRICA
              </div>
              <p className="text-sm opacity-80 mb-5">
                Building a better South Africa through sustainable infrastructure and property management.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gov-gold hover:text-gov-green transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            <FooterCol title="Quick Links" links={["About Us", "Our Services", "Current Projects", "Careers", "Tenders"]} />
            <FooterCol title="Resources" links={["PAIA Manual", "POPI Act", "Annual Reports", "Strategic Plan", "Media Gallery"]} />
          </div>
          <div className="text-xs text-white/60 text-center border-t border-white/15 pt-5 space-y-1">
            <p>© 2026 Department of Public Works and Infrastructure. All Rights Reserved. Republic of South Africa.</p>
            <p>This is an official government portal. Unauthorized access is prohibited.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gov-green inline-block relative pb-3">
        {title}
        <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gov-gold" />
      </h2>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input type={type} className="w-full p-2.5 border rounded" />
    </div>
  );
}

function RadioField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-1"><input type="radio" name={name} /> Yes</label>
        <label className="flex items-center gap-1"><input type="radio" name={name} /> No</label>
      </div>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="bg-gov-green text-white px-4 py-2 rounded my-5 text-sm font-semibold">{children}</h3>;
}

function LeaveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse mb-4">
        <thead>
          <tr className="bg-secondary">
            {headers.map((h) => <th key={h} className="border p-2 text-left">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className="border p-2">
                  {j === 0 ? cell : <input type={cell} className="w-full p-1 border rounded" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Planned: "bg-orange-100 text-orange-700",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${styles[status]}`}>
      {status}
    </span>
  );
}

function ContactItem({ icon: Icon, title, body }: { icon: typeof MapPin; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <Icon className="text-gov-gold flex-shrink-0 mt-1" size={22} />
      <div>
        <strong className="block text-gov-green">{title}</strong>
        <span className="text-sm text-muted-foreground">{body}</span>
      </div>
    </li>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-bold mb-4 text-gov-gold">{title}</h4>
      <ul className="space-y-2 text-sm opacity-80">
        {links.map((l) => <li key={l}><a href="#" className="hover:text-gov-gold transition-colors">{l}</a></li>)}
      </ul>
    </div>
  );
}
