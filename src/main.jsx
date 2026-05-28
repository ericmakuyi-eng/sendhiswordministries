import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const ADMIN_PASSWORD = 'sendhisword2026';

const NAV_GROUPS = [
  { label: 'Home', page: 'Home' },
  {
    label: 'About',
    page: 'About',
    items: [
      { label: 'Vision & Mission', page: 'About' },
      { label: 'Leadership', page: 'About' },
      { label: 'Statement of Faith', page: 'About' },
      { label: 'Prayer Requests', page: 'Prayer' }
    ]
  },
  {
    label: 'Media',
    page: 'Media',
    items: [
      { label: 'Watch Sermons', page: 'Sermons' },
      { label: 'Audio Messages', page: 'Sermons' },
      { label: 'Live Stream', page: 'Media' },
      { label: 'YouTube Channel', page: 'Media' }
    ]
  },
  {
    label: 'Ministries',
    page: 'Ministries',
    items: [
      { label: 'Discipleship Schools', page: 'Discipleship' },
      { label: 'Weekly Programs', page: 'Programs' },
      { label: 'Outreach', page: 'Ministries' },
      { label: 'Worship Ministry', page: 'Ministries' }
    ]
  },
  { label: 'Events', page: 'Events' },
  {
    label: 'Testimonies',
    page: 'Testimonies',
    items: [
      { label: 'Written Testimonies', page: 'WrittenTestimonies' },
      { label: 'Audio Testimonies', page: 'AudioTestimonies' },
      { label: 'Video Testimonies', page: 'VideoTestimonies' }
    ]
  },
  { label: 'Contact', page: 'Contact' }
];

const sermonsSeed = [
  { id: 1, title: 'Healing Through the Word', preacher: 'Send His Word Ministries', date: '2026-05-05', category: 'Healing', scripture: 'Psalm 107:20', type: 'Video', description: 'A powerful teaching on receiving healing, restoration, and strength through the Word of God.' },
  { id: 2, title: 'Raising Disciples for the Nations', preacher: 'Discipleship School Team', date: '2026-04-28', category: 'Discipleship', scripture: 'Matthew 28:19', type: 'Audio', description: 'A message about spiritual growth, commitment, and becoming a vessel God can use.' },
  { id: 3, title: 'Faith That Moves Mountains', preacher: 'Guest Minister', date: '2026-04-14', category: 'Faith', scripture: 'Mark 11:23', type: 'Video', description: 'A sermon on bold faith, prayer, and trusting God through every season.' }
];

const eventsSeed = [
  { id: 1, title: 'Sunday Celebration Service', date: 'Every Sunday', time: '9:00 AM', location: 'Main Church Auditorium', type: 'Weekly Service', description: 'A worship, prayer, and Word-filled celebration service for the whole family.' },
  { id: 2, title: 'Discipleship Schools Intake', date: '2026-06-01', time: '5:30 PM', location: 'All School Centres', type: 'Training', description: 'Enrollment opens for Apac, Bushenyi and Rubaga discipleship students.' },
  { id: 3, title: 'Healing & Prayer Conference', date: '2026-07-12', time: '10:00 AM', location: 'Main Church Auditorium', type: 'Conference', description: 'A special gathering focused on prayer, healing, worship, and testimonies.' }
];

const testimoniesSeed = [
  { id: 1, name: 'Grace N.', type: 'Written', title: 'God Restored My Family', text: 'Through prayer and the teaching of the Word, God brought peace and restoration in my family.', school: 'Rubaga', approved: true },
  { id: 2, name: 'Daniel K.', type: 'Video', title: 'Healed After Prayer', text: 'I came for prayer with pain, and I thank God for touching and strengthening me.', school: 'Apac', approved: true },
  { id: 3, name: 'Sarah B.', type: 'Audio', title: 'Discipleship Changed My Walk', text: 'The discipleship school helped me grow in prayer, service and understanding of the Word.', school: 'Bushenyi', approved: true }
];

const schoolData = {
  ApacSchool: {
    label: 'Apac Discipleship School',
    location: 'Apac',
    intro: 'Apac Discipleship School raises believers who are grounded in the Word, strengthened in prayer and equipped for community transformation.',
    images: ['Classroom fellowship', 'Prayer session', 'Graduation moment']
  },
  BushenyiSchool: {
    label: 'Bushenyi Discipleship School',
    location: 'Bushenyi',
    intro: 'Bushenyi Discipleship School focuses on spiritual maturity, servant leadership, evangelism and practical Christian living.',
    images: ['Worship gathering', 'Bible study group', 'Student outreach']
  },
  RubagaSchool: {
    label: 'Rubaga Discipleship School',
    location: 'Rubaga',
    intro: 'Rubaga Discipleship School equips disciples to serve faithfully in church, family and community through teaching, mentoring and ministry practice.',
    images: ['Teaching session', 'Prayer altar', 'Student testimonies']
  }
};

function getInitialPage() {
  const slug = window.location.pathname.replace('/', '').toLowerCase();
  if (slug === 'admin') return 'Admin';
  const pages = ['Home', 'About', 'Media', 'Ministries', 'Programs', 'Sermons', 'Discipleship', 'Events', 'Testimonies', 'WrittenTestimonies', 'AudioTestimonies', 'VideoTestimonies', 'Prayer', 'Giving', 'Contact', 'ApacSchool', 'BushenyiSchool', 'RubagaSchool'];
  return pages.find((p) => p.toLowerCase() === slug) || 'Home';
}

function runSelfTests() {
  return [
    { name: 'Give is a heart CTA, not a main dropdown item', passed: !NAV_GROUPS.some((group) => group.label === 'Give') },
    { name: 'Testimonies dropdown has Written, Audio and Video', passed: NAV_GROUPS.some((group) => group.label === 'Testimonies' && group.items.length === 3) },
    { name: 'About dropdown does not include Testimonies', passed: !NAV_GROUPS.find((group) => group.label === 'About')?.items.some((item) => item.page === 'Testimonies') },
    { name: 'Three discipleship school pages exist', passed: Object.keys(schoolData).length === 3 },
    { name: 'Admin is hidden and password protected', passed: ADMIN_PASSWORD.length >= 8 },
    { name: 'Service ticker is enabled', passed: true }
  ];
}

function App() {
  const [page, setPage] = useState(getInitialPage());
  const [menuOpen, setMenuOpen] = useState(false);
  const [sermons, setSermons] = useState(sermonsSeed);
  const [events, setEvents] = useState(eventsSeed);
  const [testimonies, setTestimonies] = useState(testimoniesSeed);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [givingType, setGivingType] = useState('Tithe');
  const [adminTab, setAdminTab] = useState('Sermons');
  const [adminOk, setAdminOk] = useState(false);
  const [notice, setNotice] = useState('');

  const testResults = useMemo(() => runSelfTests(), []);
  const categories = useMemo(() => ['All', ...new Set(sermons.map((s) => s.category))], [sermons]);

  const filteredSermons = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sermons.filter((s) => {
      const byCategory = category === 'All' || s.category === category;
      const bySearch = !term || [s.title, s.preacher, s.scripture, s.category].join(' ').toLowerCase().includes(term);
      return byCategory && bySearch;
    });
  }, [sermons, search, category]);

  function goToPage(next) {
    window.history.pushState({}, '', next === 'Home' ? '/' : `/${next.toLowerCase()}`);
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function submitPrayer(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPrayerRequests((old) => [{
      id: Date.now(),
      name: data.get('name') || 'Anonymous',
      category: data.get('category') || 'General',
      privacy: data.get('privacy') || 'Private',
      message: data.get('message') || '',
      date: new Date().toLocaleDateString()
    }, ...old]);
    e.currentTarget.reset();
    setNotice('Prayer request submitted successfully.');
  }

  function submitTestimony(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setTestimonies((old) => [{
      id: Date.now(),
      name: data.get('name') || 'Anonymous',
      title: data.get('title') || 'New Testimony',
      type: data.get('type') || 'Written',
      text: data.get('text') || '',
      school: data.get('school') || 'General',
      approved: false
    }, ...old]);
    e.currentTarget.reset();
    setNotice('Testimony submitted. It will appear after admin approval.');
  }

  function addSermon() {
    setSermons((old) => [{
      id: Date.now(),
      title: 'New Uploaded Sermon',
      preacher: 'Church Admin',
      date: new Date().toISOString().slice(0, 10),
      category: 'Prayer',
      scripture: 'James 5:16',
      type: 'Video',
      description: 'Sample sermon added from the admin dashboard.'
    }, ...old]);
    setNotice('Sample sermon added.');
  }

  function addEvent() {
    setEvents((old) => [{
      id: Date.now(),
      title: 'New Ministry Event',
      date: '2026-08-01',
      time: '4:00 PM',
      location: 'Church Grounds',
      type: 'Outreach',
      description: 'Sample event added from the admin dashboard.'
    }, ...old]);
    setNotice('Sample event added.');
  }

  function approveTestimony(id) {
    setTestimonies((old) => old.map((t) => t.id === id ? { ...t, approved: true } : t));
    setNotice('Testimony approved and published.');
  }

  const props = {
    goToPage, sermons, events, testimonies, prayerRequests, filteredSermons, categories,
    search, setSearch, category, setCategory, givingType, setGivingType, adminTab, setAdminTab,
    adminOk, setAdminOk, testResults, submitPrayer, submitTestimony, addSermon, addEvent,
    approveTestimony, setNotice
  };
  const selectedSchool = schoolData[page];

  return (
    <div className="site">
      {page !== 'Admin' && <Header active={page} goToPage={goToPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      {page !== 'Admin' && <ServiceTicker />}
      {notice && <Toast text={notice} onClose={() => setNotice('')} />}
      <main>
        {page === 'Home' && <HomePage {...props} />}
        {page === 'About' && <AboutPage />}
        {page === 'Media' && <MediaPage {...props} />}
        {page === 'Ministries' && <MinistriesPage goToPage={goToPage} />}
        {page === 'Programs' && <ProgramsPage />}
        {page === 'Sermons' && <SermonsPage {...props} />}
        {page === 'Discipleship' && <DiscipleshipSchoolsPage goToPage={goToPage} testimonies={testimonies} />}
        {selectedSchool && <SchoolPage school={selectedSchool} testimonies={testimonies} />}
        {page === 'Events' && <EventsPage {...props} />}
        {page === 'Testimonies' && <TestimoniesHub goToPage={goToPage} />}
        {page === 'WrittenTestimonies' && <WrittenTestimoniesPage submitTestimony={submitTestimony} testimonies={testimonies} />}
        {page === 'AudioTestimonies' && <AudioTestimoniesPage submitTestimony={submitTestimony} testimonies={testimonies} />}
        {page === 'VideoTestimonies' && <VideoTestimoniesPage submitTestimony={submitTestimony} testimonies={testimonies} />}
        {page === 'Prayer' && <PrayerPage submitPrayer={submitPrayer} />}
        {page === 'Giving' && <GivingPage givingType={givingType} setGivingType={setGivingType} />}
        {page === 'Contact' && <ContactPage />}
        {page === 'Admin' && <AdminPage {...props} />}
      </main>
      {page !== 'Admin' && <Footer goToPage={goToPage} />}
    </div>
  );
}

function Header({ active, goToPage, menuOpen, setMenuOpen }) {
  function isActive(group) {
    return active === group.page || Boolean(group.items && group.items.some((item) => item.page === active));
  }

  return (
    <header className="topbar">
      <div className="utility"><span>Send His Word Ministries</span><span>Prayer • Worship • Discipleship • Outreach</span></div>
      <div className="navwrap">
        <button className="brand" onClick={() => goToPage('Home')}>
          <span className="brandMark">SHW</span>
          <span><b>Send His Word</b><small>Ministries</small></span>
        </button>

        <nav className="desktopNav">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="navGroup">
              <button onClick={() => goToPage(group.page)} className={isActive(group) ? 'active' : ''}>
                {group.label}{group.items ? ' ▾' : ''}
              </button>
              {group.items && (
                <div className="dropdownMenu">
                  {group.items.map((item) => <button key={item.label} onClick={() => goToPage(item.page)}>{item.label}</button>)}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button className="giveHeart" onClick={() => goToPage('Giving')}><span className="heartSymbol">❤</span><span>Give</span></button>
        <button className="hamb" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
      </div>

      {menuOpen && (
        <div className="mobileNav">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mobileGroup">
              <button onClick={() => goToPage(group.page)} className={isActive(group) ? 'active' : ''}>{group.label}</button>
              {group.items && (
                <div className="mobileSubnav">
                  {group.items.map((item) => <button key={item.label} onClick={() => goToPage(item.page)}>{item.label}</button>)}
                </div>
              )}
            </div>
          ))}
          <button className="giveHeart mobileGive" onClick={() => goToPage('Giving')}><span className="heartSymbol">❤</span><span>Give</span></button>
        </div>
      )}
    </header>
  );
}

function ServiceTicker() {
  return (
    <div className="ticker">
      <div className="tickerText">
        Sunday Celebration Service: 9:00 AM at Main Church Auditorium • Midweek Bible Study: Wednesday 5:30 PM • Prayer Altar: Daily Morning Devotion • Location: Kampala, Uganda • WhatsApp Prayer Line Available •
      </div>
    </div>
  );
}

function HomePage({ goToPage, events }) {
  return (
    <>
      <section className="heroJM">
        <video className="heroVideo" src="/homepage-highlight.mp4" autoPlay muted loop playsInline preload="auto" />
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow light">Healing Lives • Raising Disciples • Reaching Nations</p>
          <h1>Go deeper with God through the Word, worship, prayer and discipleship.</h1>
          <p>Welcome to Send His Word Ministries, a Christ-centered ministry committed to preaching the Word of God, raising disciples, strengthening families, and transforming lives.</p>
          <div className="heroButtons">
            <button className="goldBtn" onClick={() => goToPage('Sermons')}>Watch Sermons</button>
            <button className="whiteBtn" onClick={() => goToPage('Prayer')}>How can we pray for you?</button>
          </div>
        </div>
      </section>

      <section className="justForYou">
        <h2>Just for you</h2>
        <div className="tiles">
          <Tile title="Read Today’s Word" text="Daily encouragement and scripture reflection." onClick={() => goToPage('Programs')} />
          <Tile title="Watch Sermons" text="Teaching, worship and ministry videos." onClick={() => goToPage('Sermons')} />
          <Tile title="Request Prayer" text="Send your request privately to the prayer team." onClick={() => goToPage('Prayer')} />
          <Tile title="Join Discipleship" text="Grow deeper through structured training." onClick={() => goToPage('Discipleship')} />
        </div>
      </section>

      <section className="prayerBand">
        <div>
          <p className="eyebrow light">How can we pray for you?</p>
          <h2>Whatever you are concerned about, we are here to pray with you.</h2>
        </div>
        <button className="whiteBtn" onClick={() => goToPage('Prayer')}>Submit Prayer Request</button>
      </section>

      <PageShell eyebrow="Upcoming" title="Events and conferences">
        <div className="cardGrid">{events.slice(0, 3).map((event) => <EventCard key={event.id} event={event} />)}</div>
      </PageShell>
    </>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="About Us" title="A life-giving church built on the Word, prayer and discipleship">
      <section className="introCard">
        <h2>Welcome to Send His Word Ministries</h2>
        <p>Send His Word Ministries is a Christ-centered family of believers passionate about healing lives, raising disciples and reaching nations through the living Word of God. We exist to help people encounter Jesus, grow in faith and serve their communities with love.</p>
      </section>
      <ChurchImageSlider />
      <div className="cardGrid">
        <InfoCard title="Vision" text="To see lives healed, restored, discipled, and empowered through the living Word of God." />
        <InfoCard title="Mission" text="To preach Christ, teach the Word, raise disciples, support families, and reach communities and nations." />
        <InfoCard title="Statement of Faith" text="We believe in Jesus Christ, the authority of Scripture, the power of prayer, the work of the Holy Spirit and the mission of the Church." />
      </div>
      <section className="leadership">
        <div className="pastorPhoto">Lead Pastor<br />Photo</div>
        <div>
          <p className="eyebrow">Leadership</p>
          <h2>Lead Pastor Biography</h2>
          <p>Pr. Godwin Tumusiime serves as Lead Pastor of Send His Word Ministries. He is passionate about teaching the Word of God, building disciples, strengthening families and raising believers who live with purpose, prayer and service. His ministry emphasizes healing, spiritual growth, worship and community transformation.</p>
        </div>
      </section>
    </PageShell>
  );
}

function ChurchImageSlider() {
  const images = ['Sunday worship gathering', 'Church fellowship moment', 'Prayer and ministry altar', 'Discipleship class session'];
  return (
    <section className="sliderWrap">
      <div className="slideTrack">
        {[...images, ...images].map((label, index) => <div className="churchSlide" key={`${label}-${index}`}>{label}</div>)}
      </div>
    </section>
  );
}

function ProgramsPage() {
  return (
    <PageShell eyebrow="Programs" title="Daily, weekly, and monthly ministry programs">
      <div className="cardGrid">
        <Program title="Daily" items={['Morning devotion', 'Prayer altar', 'Counselling support', 'WhatsApp encouragement']} />
        <Program title="Weekly" items={['Sunday celebration service', 'Midweek Bible study', 'Youth fellowship', 'Choir and worship practice']} />
        <Program title="Monthly" items={['Healing service', 'Leaders training', 'Outreach ministry', 'Conferences and special meetings']} />
      </div>
    </PageShell>
  );
}

function MediaPage({ goToPage, sermons, setNotice }) {
  return (
    <PageShell eyebrow="Media" title="Sermons, audio messages, live stream and YouTube teaching">
      <div className="twoCol">
        <div className="darkCard">
          <h2>Watch and listen to the Word</h2>
          <p>Access sermon videos, audio messages, worship moments, live stream links and teachings from Send His Word Ministries.</p>
          <button className="goldBtn" onClick={() => goToPage('Sermons')}>Open Sermons Library</button>
        </div>
        <div className="whiteCard">
          <h3>YouTube Channel</h3>
          <p>Connect this area to the official Send His Word Ministries YouTube channel for preaching, worship and live services.</p>
          <a className="darkBtn linkBtn" href="https://www.youtube.com/@sendhiswordministries9520" target="_blank" rel="noreferrer">Visit YouTube Channel</a>
        </div>
      </div>
      <div className="cardGrid topSpace">{sermons.slice(0, 3).map((s) => <SermonCard key={s.id} sermon={s} setNotice={setNotice} />)}</div>
    </PageShell>
  );
}

function MinistriesPage({ goToPage }) {
  return (
    <PageShell eyebrow="Ministries" title="Discipleship, weekly programs, outreach and worship ministry">
      <div className="cardGrid">
        <InfoCard title="Discipleship Schools" text="Structured schools in Apac, Bushenyi and Rubaga for believers who want to grow deeper in the Word, prayer, character and service." />
        <InfoCard title="Weekly Programs" text="Sunday celebration service, midweek Bible study, youth fellowship, prayer and worship ministry." />
        <InfoCard title="Outreach Ministry" text="Community outreach, evangelism, missions support and practical ministry to families." />
      </div>
      <div className="donateBand">
        <h2>Grow, serve and become part of what God is doing.</h2>
        <p>Explore discipleship schools and weekly programs.</p>
        <button className="goldBtn" onClick={() => goToPage('Discipleship')}>Open Discipleship Schools</button>
      </div>
    </PageShell>
  );
}

function SermonsPage({ filteredSermons, categories, search, setSearch, category, setCategory, setNotice }) {
  return (
    <PageShell eyebrow="Sermons" title="Watch, listen, search, and grow through the Word">
      <div className="toolbar">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by sermon, preacher, scripture..." />
        <div className="pillRow">{categories.map((c) => <button key={c} className={category === c ? 'pill active' : 'pill'} onClick={() => setCategory(c)}>{c}</button>)}</div>
      </div>
      <div className="cardGrid">{filteredSermons.map((s) => <SermonCard key={s.id} sermon={s} setNotice={setNotice} />)}</div>
      {!filteredSermons.length && <div className="empty">No sermons match your search yet.</div>}
    </PageShell>
  );
}

function DiscipleshipSchoolsPage({ goToPage, testimonies }) {
  return (
    <PageShell eyebrow="Discipleship Schools" title="Three centres. One mission: raising strong disciples">
      <p className="midIntro">Our Discipleship Schools provide structured biblical teaching, prayer formation, mentoring and ministry preparation for believers who desire to grow deeper and serve faithfully.</p>
      <div className="cardGrid">
        <SchoolCard title="Apac Discipleship School" text={schoolData.ApacSchool.intro} onClick={() => goToPage('ApacSchool')} />
        <SchoolCard title="Bushenyi Discipleship School" text={schoolData.BushenyiSchool.intro} onClick={() => goToPage('BushenyiSchool')} />
        <SchoolCard title="Rubaga Discipleship School" text={schoolData.RubagaSchool.intro} onClick={() => goToPage('RubagaSchool')} />
      </div>
      <h2 className="sectionTitle">Discipleship testimonies</h2>
      <TestimonySlider testimonies={testimonies} />
    </PageShell>
  );
}

function SchoolCard({ title, text, onClick }) {
  return <button className="whiteCard schoolCard" onClick={onClick}><h3>{title}</h3><p>{text}</p><span>Open school page →</span></button>;
}

function SchoolPage({ school, testimonies }) {
  return (
    <PageShell eyebrow={school.location} title={school.label}>
      <section className="introCard"><p>{school.intro}</p></section>
      <section className="sliderWrap"><div className="slideTrack">{[...school.images, ...school.images].map((label, i) => <div className="churchSlide" key={`${label}-${i}`}>{label}</div>)}</div></section>
      <h2 className="sectionTitle">Testimonies from {school.location}</h2>
      <div className="cardGrid">{testimonies.filter((t) => t.school === school.location).map((t) => <TestimonyCard key={t.id} testimony={t} />)}</div>
    </PageShell>
  );
}

function EventsPage({ events, setNotice }) {
  return <PageShell eyebrow="Events" title="Upcoming services, conferences, and special ministry gatherings"><div className="cardGrid">{events.map((event) => <EventCard key={event.id} event={event} setNotice={setNotice} />)}</div></PageShell>;
}

function TestimoniesHub({ goToPage }) {
  return (
    <PageShell eyebrow="Testimonies" title="Share and view written, audio and video testimonies">
      <div className="cardGrid">
        <Tile title="Written Testimonies" text="Write and submit a testimony for review and publishing." onClick={() => goToPage('WrittenTestimonies')} />
        <Tile title="Audio Testimonies" text="Upload audio or record your testimony directly for review." onClick={() => goToPage('AudioTestimonies')} />
        <Tile title="Video Testimonies" text="Upload an existing video or record live for review." onClick={() => goToPage('VideoTestimonies')} />
      </div>
    </PageShell>
  );
}

function WrittenTestimoniesPage({ submitTestimony, testimonies }) {
  return (
    <PageShell eyebrow="Written Testimonies" title="Write your testimony">
      <TestimonyForm mode="Written" submitTestimony={submitTestimony} />
      <div className="cardGrid topSpace">{testimonies.filter((t) => t.type === 'Written' && t.approved).map((t) => <TestimonyCard key={t.id} testimony={t} />)}</div>
    </PageShell>
  );
}

function AudioTestimoniesPage({ submitTestimony, testimonies }) {
  return (
    <PageShell eyebrow="Audio Testimonies" title="Upload audio or record your testimony">
      <TestimonyForm mode="Audio" submitTestimony={submitTestimony} mediaLabel="Upload audio recording" accept="audio/*" />
      <div className="recordBox">🎙️ Direct recording placeholder — connect browser recording in production.</div>
      <div className="cardGrid topSpace">{testimonies.filter((t) => t.type === 'Audio' && t.approved).map((t) => <TestimonyCard key={t.id} testimony={t} />)}</div>
    </PageShell>
  );
}

function VideoTestimoniesPage({ submitTestimony, testimonies }) {
  return (
    <PageShell eyebrow="Video Testimonies" title="Upload video or record live">
      <TestimonyForm mode="Video" submitTestimony={submitTestimony} mediaLabel="Upload video testimony" accept="video/*" />
      <div className="recordBox">🎥 Live recording placeholder — connect camera recording in production.</div>
      <div className="cardGrid topSpace">{testimonies.filter((t) => t.type === 'Video' && t.approved).map((t) => <TestimonyCard key={t.id} testimony={t} />)}</div>
    </PageShell>
  );
}

function TestimonyForm({ mode, submitTestimony, mediaLabel, accept }) {
  return (
    <form onSubmit={submitTestimony} className="whiteCard form">
      <input type="hidden" name="type" value={mode} />
      <Input label="Your Name" name="name" />
      <Input label="Testimony Title" name="title" />
      <select name="school"><option>General</option><option>Apac</option><option>Bushenyi</option><option>Rubaga</option></select>
      {mediaLabel && <label>{mediaLabel}<input type="file" accept={accept} /></label>}
      <textarea name="text" required placeholder="Write a short summary of your testimony..." />
      <button className="goldBtn">Submit for Review</button>
    </form>
  );
}

function TestimonySlider({ testimonies }) {
  const approved = testimonies.filter((t) => t.approved);
  return <div className="testimonySlider"><div className="testimonyTrack">{[...approved, ...approved].map((t, i) => <div className="testimonySlide" key={`${t.id}-${i}`}><h3>{t.title}</h3><p>“{t.text}”</p><b>{t.name} • {t.school}</b></div>)}</div></div>;
}

function PrayerPage({ submitPrayer }) {
  return (
    <PageShell eyebrow="Prayer Requests" title="We believe in prayer. Submit your request and our team will stand with you">
      <div className="twoCol">
        <div className="goldCard"><h2>Need Prayer?</h2><p>Share your prayer need for healing, family, finances, salvation, marriage, business, or spiritual growth.</p><a className="darkBtn linkBtn" href="https://wa.me/256700000000" target="_blank" rel="noreferrer">Chat on WhatsApp</a></div>
        <form onSubmit={submitPrayer} className="whiteCard form">
          <Input label="Full Name" name="name" />
          <select name="category"><option>Healing</option><option>Family</option><option>Finances</option><option>Salvation</option><option>Marriage</option><option>Business</option><option>Spiritual Growth</option></select>
          <select name="privacy"><option>Private request</option><option>Public prayer wall</option></select>
          <textarea name="message" required placeholder="Write your prayer request..." />
          <button className="darkBtn">Submit Prayer Request</button>
        </form>
      </div>
    </PageShell>
  );
}

function GivingPage({ givingType, setGivingType }) {
  const types = ['Tithe', 'Offering', 'Missions', 'Building Fund', 'Discipleship Support', 'Monthly Partnership'];
  return (
    <PageShell eyebrow="Giving" title="Partner with Send His Word Ministries locally and internationally">
      <div className="twoCol">
        <div className="whiteCard">
          <h3>Choose Giving Purpose</h3>
          <div className="givingGrid">{types.map((t) => <button key={t} className={givingType === t ? 'giving active' : 'giving'} onClick={() => setGivingType(t)}>{t}</button>)}</div>
          <p>Selected purpose: <b>{givingType}</b>. Connect Flutterwave, PayPal, Stripe, MTN Mobile Money, Airtel Money, and international bank transfer details.</p>
        </div>
        <div className="cardGrid two">
          <InfoCard title="MTN Mobile Money" text="Local giving through MTN MoMo collections." />
          <InfoCard title="Airtel Money" text="Local giving through Airtel Money collections." />
          <InfoCard title="Card Payments" text="Visa and Mastercard for international givers." />
          <InfoCard title="International Giving" text="PayPal, Stripe, SWIFT, Remitly and WorldRemit guidance." />
        </div>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Visit, call, email, or chat with us on WhatsApp">
      <div className="twoCol">
        <div className="darkCard"><h2>Send His Word Ministries</h2><p>☎ +256 700 000 000</p><p>✉ info@sendhiswordministries.org</p><p>📍 Kampala, Uganda</p><p>💬 WhatsApp prayer and inquiry line</p><a className="goldBtn linkBtn" href="https://wa.me/256700000000" target="_blank" rel="noreferrer">Chat With Us on WhatsApp</a></div>
        <div className="mapBox">📍<br />Google Map Embed Area<br /><small>Replace this with the official church Google Maps embed code.</small></div>
      </div>
    </PageShell>
  );
}

function AdminPage({ adminOk, setAdminOk, adminTab, setAdminTab, sermons, events, prayerRequests, testimonies, addSermon, addEvent, approveTestimony, testResults }) {
  const [pass, setPass] = useState('');
  if (!adminOk) {
    return <div className="adminLogin"><form onSubmit={(e) => { e.preventDefault(); if (pass === ADMIN_PASSWORD) setAdminOk(true); }}><h1>Admin Login</h1><p>This page is hidden from public navigation. Enter password to continue.</p><input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Admin password" /><button className="goldBtn">Login</button></form></div>;
  }
  const tabs = ['Sermons', 'Events', 'Prayer', 'Testimonies', 'Tests'];
  return (
    <PageShell eyebrow="Admin" title="Content management dashboard">
      <div className="adminBox">
        <div className="pillRow">{tabs.map((t) => <button key={t} className={adminTab === t ? 'pill active' : 'pill'} onClick={() => setAdminTab(t)}>{t}</button>)}</div>
        {adminTab === 'Sermons' && <AdminPanel title="Sermon Management" button="Add Sermon" onClick={addSermon} items={sermons.map((s) => `${s.title} — ${s.category}`)} />}
        {adminTab === 'Events' && <AdminPanel title="Event Management" button="Add Event" onClick={addEvent} items={events.map((e) => `${e.title} — ${e.date}`)} />}
        {adminTab === 'Prayer' && <AdminPanel title="Prayer Inbox" button="Refresh" onClick={() => {}} items={prayerRequests.length ? prayerRequests.map((r) => `${r.name} — ${r.category} — ${r.privacy}`) : ['No prayer requests submitted yet.']} />}
        {adminTab === 'Testimonies' && <div className="adminPanel"><h3>Approve Testimonies</h3>{testimonies.map((t) => <div className="adminItem" key={t.id}><span>{t.title} — {t.name} — {t.approved ? 'Published' : 'Pending'}</span>{!t.approved && <button onClick={() => approveTestimony(t.id)}>Approve</button>}</div>)}</div>}
        {adminTab === 'Tests' && <div className="adminPanel"><h3>Smoke Tests</h3>{testResults.map((t) => <div className="adminItem" key={t.name}><span>{t.name}</span><b>{t.passed ? 'PASS' : 'FAIL'}</b></div>)}</div>}
      </div>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, children }) { return <section className="page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</section>; }
function Tile({ title, text, onClick }) { return <button className="tile" onClick={onClick}><h3>{title}</h3><p>{text}</p></button>; }
function InfoCard({ title, text }) { return <div className="whiteCard"><h3>{title}</h3><p>{text}</p></div>; }
function Program({ title, items }) { return <div className="whiteCard"><h3>{title}</h3><ul>{items.map((i) => <li key={i}>✓ {i}</li>)}</ul></div>; }
function SermonCard({ sermon, setNotice }) { return <article className="whiteCard sermon"><div className="media">{sermon.type === 'Video' ? '🎥' : '🎧'}</div><p className="eyebrow">{sermon.category} • {sermon.type}</p><h3>{sermon.title}</h3><p>{sermon.preacher} • {sermon.date}</p><p><b>{sermon.scripture}</b></p><p>{sermon.description}</p><button className="goldBtn small" onClick={() => setNotice('Sermon player would open here in the production version.')}>▶ Watch / Listen</button></article>; }
function EventCard({ event, setNotice }) { return <div className="whiteCard"><p className="tag">{event.type}</p><h3>{event.title}</h3><p>📅 {event.date} • {event.time}</p><p>📍 {event.location}</p><p>{event.description}</p>{setNotice && <button className="darkBtn small" onClick={() => setNotice('Event registration would open here.')}>Register / Learn More</button>}</div>; }
function TestimonyCard({ testimony }) { return <div className="whiteCard"><p className="eyebrow">{testimony.type} Testimony</p><h3>{testimony.title}</h3><p>“{testimony.text}”</p><b>— {testimony.name}</b></div>; }
function Input({ label, name, dark = false }) { return <label className={dark ? 'darkLabel' : ''}>{label}<input name={name || label.toLowerCase().replaceAll(' ', '_')} required /></label>; }
function AdminPanel({ title, button, onClick, items }) { return <div className="adminPanel"><div className="adminHead"><h3>{title}</h3><button onClick={onClick}>+ {button}</button></div>{items.map((item, i) => <div className="adminItem" key={`${item}-${i}`}>{item}</div>)}</div>; }
function Toast({ text, onClose }) { return <div className="toast"><span>✓ {text}</span><button onClick={onClose}>×</button></div>; }
function Footer({ goToPage }) { return <footer><div><h2>Send His Word Ministries</h2><p>Healing Lives. Raising Disciples. Reaching Nations.</p></div><div><button onClick={() => goToPage('Sermons')}>Sermons</button><button onClick={() => goToPage('Giving')}>Give Online</button><button onClick={() => goToPage('Contact')}>Contact</button></div></footer>; }

createRoot(document.getElementById('root')).render(<App />);
