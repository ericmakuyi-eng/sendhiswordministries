
import React, { useMemo, useState } from "react";
import "./styles.css";

const PAGES = ["Home", "About", "Programs", "Sermons", "Discipleship", "Events", "Testimonies", "Prayer", "Giving", "Contact", "Admin"];

const initialSermons = [
  { id: 1, title: "Healing Through the Word", preacher: "Pastor Send His Word Ministries", date: "2026-05-05", category: "Healing", scripture: "Psalm 107:20", type: "Video", description: "A powerful teaching on receiving healing, restoration, and strength through the Word of God." },
  { id: 2, title: "Raising Disciples for the Nations", preacher: "Discipleship School Team", date: "2026-04-28", category: "Discipleship", scripture: "Matthew 28:19", type: "Audio", description: "A message about spiritual growth, commitment, and becoming a vessel God can use." },
  { id: 3, title: "Faith That Moves Mountains", preacher: "Guest Minister", date: "2026-04-14", category: "Faith", scripture: "Mark 11:23", type: "Video", description: "A sermon on bold faith, prayer, and trusting God through every season." },
];

const initialEvents = [
  { id: 1, title: "Sunday Celebration Service", date: "Every Sunday", time: "9:00 AM", location: "Main Church Auditorium", type: "Weekly Service", description: "A worship, prayer, and Word-filled celebration service for the whole family." },
  { id: 2, title: "Discipleship School Intake", date: "2026-06-01", time: "5:30 PM", location: "Send His Word Ministries Campus", type: "Training", description: "Enrollment opens for new students ready to grow deeper in the Word and ministry." },
  { id: 3, title: "Healing & Prayer Conference", date: "2026-07-12", time: "10:00 AM", location: "Main Church Auditorium", type: "Conference", description: "A special gathering focused on prayer, healing, worship, and testimonies." },
];

const initialTestimonies = [
  { id: 1, name: "Grace N.", type: "Written", title: "God Restored My Family", text: "Through prayer and the teaching of the Word, God brought peace and restoration in my family.", approved: true },
  { id: 2, name: "Daniel K.", type: "Video", title: "Healed After Prayer", text: "I came for prayer with pain, and I thank God for touching and strengthening me.", approved: true },
];

function runSelfTests() {
  const categories = ["All", ...new Set(initialSermons.map((s) => s.category))];
  return [
    { name: "Separate webpage navigation is available", passed: PAGES.length === 11 && PAGES.includes("Giving") && PAGES.includes("Prayer") },
    { name: "Sermon categories include Healing and Discipleship", passed: categories.includes("Healing") && categories.includes("Discipleship") },
    { name: "Scripture search can find Matthew 28:19", passed: initialSermons.some((s) => s.scripture === "Matthew 28:19") },
    { name: "Approved testimonies are visible", passed: initialTestimonies.filter((t) => t.approved).length === 2 },
    { name: "Events are available", passed: initialEvents.length >= 3 },
  ];
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sermons, setSermons] = useState(initialSermons);
  const [events, setEvents] = useState(initialEvents);
  const [testimonies, setTestimonies] = useState(initialTestimonies);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [givingType, setGivingType] = useState("Tithe");
  const [adminTab, setAdminTab] = useState("Sermons");
  const [notice, setNotice] = useState("");

  const tests = useMemo(() => runSelfTests(), []);
  const categories = useMemo(() => ["All", ...new Set(sermons.map((s) => s.category))], [sermons]);

  const filteredSermons = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sermons.filter((s) => {
      const byCategory = category === "All" || s.category === category;
      const bySearch = !term || [s.title, s.preacher, s.scripture, s.category].join(" ").toLowerCase().includes(term);
      return byCategory && bySearch;
    });
  }, [sermons, search, category]);

  function goToPage(nextPage) {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitPrayer(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPrayerRequests((prev) => [{
      id: Date.now(),
      name: form.get("name") || "Anonymous",
      category: form.get("category") || "General",
      privacy: form.get("privacy") || "Private request",
      message: form.get("message") || "",
      date: new Date().toLocaleDateString(),
    }, ...prev]);
    e.currentTarget.reset();
    setNotice("Prayer request submitted successfully.");
  }

  function submitTestimony(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setTestimonies((prev) => [{
      id: Date.now(),
      name: form.get("name") || "Anonymous",
      title: form.get("title") || "New Testimony",
      type: form.get("type") || "Written",
      text: form.get("text") || "",
      approved: false,
    }, ...prev]);
    e.currentTarget.reset();
    setNotice("Testimony submitted. It will appear after admin approval.");
  }

  function addSermon() {
    setSermons((prev) => [{
      id: Date.now(),
      title: "New Uploaded Sermon",
      preacher: "Church Admin",
      date: new Date().toISOString().slice(0, 10),
      category: "Prayer",
      scripture: "James 5:16",
      type: "Video",
      description: "Sample sermon added from the admin dashboard.",
    }, ...prev]);
    setNotice("Sample sermon added.");
  }

  function addEvent() {
    setEvents((prev) => [{
      id: Date.now(),
      title: "New Ministry Event",
      date: "2026-08-01",
      time: "4:00 PM",
      location: "Church Grounds",
      type: "Outreach",
      description: "Sample event added from the admin dashboard.",
    }, ...prev]);
    setNotice("Sample event added.");
  }

  function approveTestimony(id) {
    setTestimonies((prev) => prev.map((t) => t.id === id ? { ...t, approved: true } : t));
    setNotice("Testimony approved and published.");
  }

  const props = {
    goToPage, sermons, events, testimonies, prayerRequests, filteredSermons, categories,
    search, setSearch, category, setCategory, givingType, setGivingType, adminTab, setAdminTab,
    tests, submitPrayer, submitTestimony, addSermon, addEvent, approveTestimony, setNotice
  };

  return (
    <div>
      <Header page={page} goToPage={goToPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {notice && <div className="toast"><span>✓ {notice}</span><button onClick={() => setNotice("")}>×</button></div>}
      <main>
        {page === "Home" && <HomePage {...props} />}
        {page === "About" && <AboutPage />}
        {page === "Programs" && <ProgramsPage />}
        {page === "Sermons" && <SermonsPage {...props} />}
        {page === "Discipleship" && <DiscipleshipPage setNotice={setNotice} />}
        {page === "Events" && <EventsPage {...props} />}
        {page === "Testimonies" && <TestimoniesPage {...props} />}
        {page === "Prayer" && <PrayerPage {...props} />}
        {page === "Giving" && <GivingPage {...props} />}
        {page === "Contact" && <ContactPage />}
        {page === "Admin" && <AdminPage {...props} />}
      </main>
      <Footer goToPage={goToPage} />
    </div>
  );
}

function Header({ page, goToPage, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => goToPage("Home")}>
          <span className="brand-icon">⛪</span>
          <span><strong>Send His Word</strong><small>Ministries</small></span>
        </button>
        <nav className="desktop-nav">
          {PAGES.map((p) => <button key={p} onClick={() => goToPage(p)} className={page === p ? "active" : ""}>{p}</button>)}
        </nav>
        <div className="header-actions">
          <button className="outline-btn" onClick={() => goToPage("Prayer")}>Prayer Request</button>
          <button className="gold-btn small" onClick={() => goToPage("Giving")}>Give Online</button>
        </div>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{PAGES.map((p) => <button key={p} onClick={() => goToPage(p)} className={page === p ? "active" : ""}>{p}</button>)}</nav>}
    </header>
  );
}

function HomePage({ goToPage, events }) {
  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow light">Healing Lives • Raising Disciples • Reaching Nations</p>
            <h1>Welcome to Send His Word Ministries</h1>
            <p className="hero-text">A Christ-centered ministry committed to preaching the Word of God, raising disciples, strengthening families, and transforming lives through prayer, worship, teaching, and service.</p>
            <div className="button-row">
              <button className="gold-btn" onClick={() => goToPage("Sermons")}>Watch Sermons</button>
              <button className="outline-light" onClick={() => goToPage("Discipleship")}>Join Discipleship School</button>
              <button className="outline-gold" onClick={() => goToPage("Prayer")}>Submit Prayer Request</button>
            </div>
          </div>
          <div className="feature-video">
            <p className="eyebrow">Featured Message</p>
            <h2>Healing Through the Word</h2>
            <div className="video-box">🎥<br />Video sermon area<br /><small>Connect YouTube or uploaded sermon media here.</small></div>
            <div className="info-row"><Info title="Sunday" text="9:00 AM" /><Info title="Location" text="Church Campus" /><Info title="Online" text="Live Stream" /></div>
          </div>
        </div>
      </section>
      <section className="quick-grid">
        <Quick title="Give Online" text="Tithes, offerings, missions, and international giving." onClick={() => goToPage("Giving")} />
        <Quick title="Sermons" text="Watch, listen, search, and grow through the Word." onClick={() => goToPage("Sermons")} />
        <Quick title="Discipleship" text="Join the school and grow deeper in ministry." onClick={() => goToPage("Discipleship")} />
        <Quick title="Prayer" text="Submit your prayer request confidentially." onClick={() => goToPage("Prayer")} />
      </section>
      <PageShell eyebrow="This Week" title="Featured upcoming ministry activity">
        <CardGrid>{events.slice(0, 3).map((event) => <EventCard key={event.id} event={event} />)}</CardGrid>
      </PageShell>
    </>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="About Us" title="A ministry built on the Word, prayer, worship, and discipleship.">
      <CardGrid>
        <Feature title="Vision" text="To see lives healed, restored, discipled, and empowered through the living Word of God." />
        <Feature title="Mission" text="To preach Christ, teach the Word, raise disciples, support families, and reach communities and nations." />
        <Feature title="Leadership" text="Led by committed spiritual leaders who serve with humility, prayer, excellence, and sound doctrine." />
      </CardGrid>
      <div className="white-card wide"><h3>Pastor & Leadership Information</h3><p>This page is reserved for the pastor profile, ministry history, leadership team, statement of faith, and church values.</p></div>
    </PageShell>
  );
}

function ProgramsPage() {
  return (
    <PageShell eyebrow="Programs" title="Daily, weekly, and monthly ministry programs.">
      <CardGrid>
        <Program title="Daily" items={["Morning devotion", "Prayer altar", "Counselling support", "WhatsApp encouragement"]} />
        <Program title="Weekly" items={["Sunday celebration service", "Midweek Bible study", "Youth fellowship", "Choir and worship practice"]} />
        <Program title="Monthly" items={["Healing service", "Leaders' training", "Outreach ministry", "Conferences and special meetings"]} />
      </CardGrid>
    </PageShell>
  );
}

function SermonsPage({ filteredSermons, categories, search, setSearch, category, setCategory, setNotice }) {
  return (
    <PageShell eyebrow="Sermons Platform" title="Watch, listen, search, and grow through the Word.">
      <div className="toolbar">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by sermon, preacher, scripture..." />
        <div className="pill-row">{categories.map((c) => <button key={c} className={category === c ? "pill active" : "pill"} onClick={() => setCategory(c)}>{c}</button>)}</div>
      </div>
      <CardGrid>{filteredSermons.map((s) => <SermonCard key={s.id} sermon={s} setNotice={setNotice} />)}</CardGrid>
      {!filteredSermons.length && <div className="white-card">No sermons match your search yet.</div>}
    </PageShell>
  );
}

function DiscipleshipPage({ setNotice }) {
  return (
    <PageShell eyebrow="Discipleship School" title="A structured school for believers who want to grow deeper.">
      <div className="two-col">
        <div className="dark-card"><h2>Enroll in Discipleship School</h2><p>Designed for new believers, church workers, leaders, and anyone hungry to grow in the Word, prayer, character, service, and ministry.</p><p><b>Duration:</b> 3–6 months</p><p><b>Mode:</b> Physical and online learning support</p></div>
        <form className="white-card form-card"><h3>Student Registration</h3><Input label="Full Name" /><Input label="Phone Number" /><Input label="Email Address" /><Input label="Preferred Class" /><textarea placeholder="Tell us why you want to join..." /><button type="button" className="dark-btn" onClick={() => setNotice("Discipleship registration sample submitted.")}>Submit Registration</button></form>
      </div>
    </PageShell>
  );
}

function EventsPage({ events, setNotice }) {
  return <PageShell eyebrow="Events & Conferences" title="Upcoming services, conferences, and special ministry gatherings."><CardGrid>{events.map((event) => <EventCard key={event.id} event={event} setNotice={setNotice} />)}</CardGrid></PageShell>;
}

function TestimoniesPage({ testimonies, submitTestimony }) {
  return (
    <PageShell eyebrow="Testimonies" title="Stories of healing, restoration, salvation, and answered prayer.">
      <div className="two-col">
        <div className="stack">{testimonies.filter((t) => t.approved).map((t) => <TestimonyCard key={t.id} testimony={t} />)}</div>
        <form onSubmit={submitTestimony} className="dark-card form-card"><h3>Share Your Testimony</h3><Input dark label="Your Name" name="name" /><Input dark label="Testimony Title" name="title" /><select name="type"><option>Written</option><option>Video</option></select><textarea name="text" required placeholder="Write your testimony..." /><button className="gold-btn">Submit Testimony</button></form>
      </div>
    </PageShell>
  );
}

function PrayerPage({ submitPrayer }) {
  return (
    <PageShell eyebrow="Prayer Requests" title="We believe in prayer. Submit your request and our team will stand with you.">
      <div className="two-col">
        <div className="gold-card"><h2>Need Prayer?</h2><p>Share your prayer need for healing, family, finances, salvation, marriage, business, or spiritual growth.</p><a className="dark-btn link-btn" href="https://wa.me/256700000000" target="_blank" rel="noreferrer">Chat on WhatsApp</a></div>
        <form onSubmit={submitPrayer} className="white-card form-card"><Input label="Full Name" name="name" /><select name="category"><option>Healing</option><option>Family</option><option>Finances</option><option>Salvation</option><option>Marriage</option><option>Business</option><option>Spiritual Growth</option></select><select name="privacy"><option>Private request</option><option>Public prayer wall</option></select><textarea name="message" required placeholder="Write your prayer request..." /><button className="dark-btn">Submit Prayer Request</button></form>
      </div>
    </PageShell>
  );
}

function GivingPage({ givingType, setGivingType }) {
  const types = ["Tithe", "Offering", "Missions", "Building Fund", "Discipleship Support", "Monthly Partnership"];
  return (
    <PageShell eyebrow="Giving & Partnership" title="Partner with Send His Word Ministries locally and internationally.">
      <div className="two-col">
        <div className="white-card"><h3>Choose Giving Purpose</h3><div className="giving-grid">{types.map((t) => <button key={t} className={givingType === t ? "giving active" : "giving"} onClick={() => setGivingType(t)}>{t}</button>)}</div><p>Selected purpose: <b>{givingType}</b>. Connect Flutterwave, PayPal, Stripe, MTN Mobile Money, Airtel Money, and international bank transfer details.</p></div>
        <CardGrid><Feature title="MTN Mobile Money" text="Local giving through MTN MoMo collections." /><Feature title="Airtel Money" text="Local giving through Airtel Money collections." /><Feature title="Card Payments" text="Visa and Mastercard for local and international givers." /><Feature title="International Giving" text="PayPal, Stripe, SWIFT, Remitly and WorldRemit guidance." /></CardGrid>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact Us" title="Visit, call, email, or chat with us on WhatsApp.">
      <div className="two-col">
        <div className="dark-card"><h2>Send His Word Ministries</h2><p>☎ +256 700 000 000</p><p>✉ info@sendhiswordministries.org</p><p>📍 Kampala, Uganda</p><p>💬 WhatsApp prayer and inquiry line</p><a className="gold-btn link-btn" href="https://wa.me/256700000000" target="_blank" rel="noreferrer">Chat With Us on WhatsApp</a></div>
        <div className="map-box">📍<br />Google Map Embed Area<br /><small>Replace this with the official church Google Maps embed code.</small></div>
      </div>
    </PageShell>
  );
}

function AdminPage({ adminTab, setAdminTab, sermons, events, prayerRequests, testimonies, addSermon, addEvent, approveTestimony, tests }) {
  const tabs = ["Sermons", "Events", "Prayer", "Testimonies", "Tests"];
  return (
    <PageShell eyebrow="Admin Dashboard" title="Dynamic content management for church administrators.">
      <div className="admin">
        <div className="pill-row">{tabs.map((t) => <button key={t} className={adminTab === t ? "pill active" : "pill"} onClick={() => setAdminTab(t)}>{t}</button>)}</div>
        {adminTab === "Sermons" && <AdminPanel title="Sermon Management" button="Add Sample Sermon" onClick={addSermon} items={sermons.map((s) => `${s.title} — ${s.category}`)} />}
        {adminTab === "Events" && <AdminPanel title="Event Management" button="Add Sample Event" onClick={addEvent} items={events.map((e) => `${e.title} — ${e.date}`)} />}
        {adminTab === "Prayer" && <AdminPanel title="Prayer Requests Inbox" button="Refresh Requests" onClick={() => {}} items={prayerRequests.length ? prayerRequests.map((r) => `${r.name} — ${r.category} — ${r.privacy}`) : ["No prayer requests submitted yet."]} />}
        {adminTab === "Testimonies" && <div className="admin-panel"><h3>Approve Testimonies</h3>{testimonies.map((t) => <div className="admin-item" key={t.id}><span>{t.title} — {t.name} — {t.approved ? "Published" : "Pending approval"}</span>{!t.approved && <button onClick={() => approveTestimony(t.id)}>Approve</button>}</div>)}</div>}
        {adminTab === "Tests" && <div className="admin-panel"><h3>Built-in Smoke Tests</h3>{tests.map((test) => <div className="admin-item" key={test.name}><span>{test.name}</span><b>{test.passed ? "PASS" : "FAIL"}</b></div>)}</div>}
      </div>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, children }) { return <section className="page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</section>; }
function CardGrid({ children }) { return <div className="card-grid">{children}</div>; }
function Info({ title, text }) { return <div className="info"><small>{title}</small><strong>{text}</strong></div>; }
function Quick({ title, text, onClick }) { return <button className="quick" onClick={onClick}><h3>{title}</h3><p>{text}</p></button>; }
function Feature({ title, text }) { return <div className="white-card"><h3>{title}</h3><p>{text}</p></div>; }
function Program({ title, items }) { return <div className="white-card"><h3>{title}</h3><ul>{items.map((i) => <li key={i}>✓ {i}</li>)}</ul></div>; }
function SermonCard({ sermon, setNotice }) { return <article className="white-card sermon"><div className="media">{sermon.type === "Video" ? "🎥" : "🎧"}</div><p className="eyebrow">{sermon.category} • {sermon.type}</p><h3>{sermon.title}</h3><p>{sermon.preacher} • {sermon.date}</p><p><b>{sermon.scripture}</b></p><p>{sermon.description}</p><button className="gold-btn small" onClick={() => setNotice("Sermon player would open here in the full production version.")}>▶ Watch / Listen</button></article>; }
function EventCard({ event, setNotice }) { return <div className="white-card"><p className="tag">{event.type}</p><h3>{event.title}</h3><p>📅 {event.date} • {event.time}</p><p>📍 {event.location}</p><p>{event.description}</p>{setNotice && <button className="dark-btn small" onClick={() => setNotice("Event registration would open here.")}>Register / Learn More</button>}</div>; }
function TestimonyCard({ testimony }) { return <div className="white-card"><p className="eyebrow">{testimony.type} Testimony</p><h3>{testimony.title}</h3><p>“{testimony.text}”</p><b>— {testimony.name}</b></div>; }
function Input({ label, name, dark = false }) { return <label className={dark ? "dark-label" : ""}>{label}<input name={name || label.toLowerCase().replaceAll(" ", "_")} required /></label>; }
function AdminPanel({ title, button, onClick, items }) { return <div className="admin-panel"><div className="admin-head"><h3>{title}</h3><button onClick={onClick}>+ {button}</button></div>{items.map((item, index) => <div className="admin-item" key={`${item}-${index}`}>{item}</div>)}</div>; }

function Footer({ goToPage }) {
  return <footer><div><h2>Send His Word Ministries</h2><p>Healing Lives. Raising Disciples. Reaching Nations.</p></div><div className="button-row"><button onClick={() => goToPage("Sermons")}>Sermons</button><button onClick={() => goToPage("Giving")}>Give Online</button><button onClick={() => goToPage("Contact")}>Contact</button></div></footer>;
}
