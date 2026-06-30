const pages = [
  'Home',
  'About',
  'Vision & Mission',
  'Statement of Faith',
  'Ministries',
  'Programs',
  'Sermons',
  'Giving',
  'Contact'
];

const ministryPages = [
  'Discipleship Ministry',
  'Healing Ministry',
  "Married's Ministry",
  'Youth Ministry',
  "Children's Ministry"
];

const faithStatements = [
  ['1. The Holy Scriptures', 'We believe that the Bible is the inspired, infallible, and authoritative Word of God. It is the supreme guide for faith, doctrine, and Christian living.', '2 Timothy 3:16-17; 2 Peter 1:20-21'],
  ['2. The One True God', 'We believe in one eternal God, revealed in three persons: the Father, the Son, and the Holy Spirit. These three are co-equal and co-eternal.', 'Matthew 28:19; 2 Corinthians 13:14'],
  ['3. The Lord Jesus Christ', 'We believe that Jesus Christ is the Son of God, conceived by the Holy Spirit, born of the virgin Mary, fully God and fully man. He lived a sinless life, died for our sins, rose bodily from the dead, ascended into heaven, and will return again in power and glory.', 'John 1:1-14; 1 Corinthians 15:3-4; Acts 1:11'],
  ['4. Salvation', "We believe that salvation is a gift of God's grace received through faith in Jesus Christ. Through His death and resurrection, mankind is redeemed from sin and reconciled to God.", 'Ephesians 2:8-9; Romans 10:9-10; John 3:16'],
  ['5. The Holy Spirit', 'We believe in the present ministry of the Holy Spirit, who convicts, regenerates, indwells, sanctifies, empowers, and equips believers for Christian living and ministry.', 'John 14:16-17; Acts 1:8; Galatians 5:22-23'],
  ['6. The Church', 'We believe that the Church is the Body of Christ, composed of all believers who have received Jesus Christ as Lord and Savior. The Church exists to worship God, make disciples, fellowship, and proclaim the Gospel to all nations.', 'Ephesians 1:22-23; Matthew 28:19-20'],
  ['7. The Fivefold Ministry', 'We believe that Christ has given apostles, prophets, evangelists, pastors, and teachers to equip the saints for the work of ministry and to build up the Body of Christ until believers attain spiritual maturity and unity in the faith.', 'Ephesians 4:11-13'],
  ['8. Divine Healing', 'We believe that healing was provided through the redemptive work of Jesus Christ and that God continues to heal today according to His Word and through faith in His promises.', 'Isaiah 53:5; Matthew 8:16-17; James 5:14-16'],
  ['9. The Resurrection and Eternal Life', 'We believe in the bodily resurrection of both the saved and the lost. Those who have trusted in Christ will enjoy eternal life with God, while those who reject Him will face eternal separation from God.', 'John 5:28-29; Revelation 20:11-15'],
  ['10. The Second Coming of Christ', "We believe in the personal, visible, and glorious return of the Lord Jesus Christ to establish His Kingdom and fulfill God's eternal purposes.", 'Acts 1:11; Titus 2:13; Revelation 22:12']
];

let currentPage = 'Home';
let faithPaused = false;

const root = document.getElementById('root');

function goToPage(page) {
  currentPage = page;
  faithPaused = false;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function button(page, label = page) {
  const active = currentPage === page ? 'active' : '';
  return `<button class="${active}" data-page="${page}">${label}</button>`;
}

function header() {
  const ministriesActive = ministryPages.includes(currentPage) || currentPage === 'Ministries' ? 'active' : '';
  return `
    <header class="siteHeader">
      <div class="serviceBar">
        <span>Sunday Service: 9:00 AM</span>
        <span>Rubaga Road near Furniture House</span>
        <span>Prayer Line: 0773 272 195 / 0705 272 195</span>
      </div>
      <div class="navWrap">
        <button class="brand" data-page="Home" aria-label="Go to home page">
          <span class="logoMark">SHW</span>
          <span class="brandText">Send His Word Ministries</span>
        </button>
        <nav class="desktopNav">
          ${pages.slice(0, 4).map((item) => button(item)).join('')}
          <div class="navGroup">
            <button class="${ministriesActive}" data-page="Ministries">Ministries</button>
            <div class="dropdownMenu">
              ${ministryPages.map((item) => button(item)).join('')}
            </div>
          </div>
          ${pages.slice(5, 7).map((item) => button(item)).join('')}
        </nav>
        <button class="giveHeart" data-page="Giving"><span>Give</span></button>
        <button class="menuButton" data-toggle-menu>Menu</button>
      </div>
      <nav class="mobileNav" id="mobileNav">
        ${[...pages, ...ministryPages].map((item) => button(item)).join('')}
      </nav>
    </header>
  `;
}

function pageShell(eyebrow, title, children) {
  return `<section class="page"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${children}</section>`;
}

function visionMissionStrip() {
  return `
    <section class="visionStrip">
      <article>
        <p class="eyebrow">Vision</p>
        <h2>Making Disciples of All Nations</h2>
        <b>Matthew 28:19-20</b>
      </article>
      <article>
        <p class="eyebrow">Mission</p>
        <h2>Equipping and maturing believers through the fivefold ministry to build up the Body of Christ into His fullness.</h2>
        <b>Ephesians 4:11-13</b>
      </article>
    </section>
  `;
}

function card(title, text) {
  return `<article class="card"><h3>${title}</h3><p>${text}</p></article>`;
}

function homePage() {
  return `
    <section class="hero">
      <div class="heroMedia"></div>
      <div class="heroContent">
        <p class="scriptLine">Welcome</p>
        <h1>Send His Word Ministries</h1>
        <h2>Making Disciples of All Nations</h2>
        <p>A Christ-centered ministry equipping and maturing believers through the Word, prayer, fellowship and the fivefold ministry.</p>
        <div class="heroButtons">
          <button class="primaryBtn" data-page="Vision & Mission">Vision & Mission</button>
          <button class="lightBtn" data-page="Ministries">Explore Ministries</button>
        </div>
      </div>
    </section>
    ${visionMissionStrip()}
    <section class="quickGrid">
      ${quickCard('Healing School', 'Conducted twice every year in May and August.', 'Healing Ministry')}
      ${quickCard("Married's Ministry", "Strengthening marriages and families through God's Word.", "Married's Ministry")}
      ${quickCard('Youth Ministry', 'Raising young people who love God and influence their world.', 'Youth Ministry')}
      ${quickCard("Children's Ministry", 'Nurturing children in the knowledge and love of Christ.', "Children's Ministry")}
    </section>
    <section class="section">
      <p class="eyebrow">Ministries</p>
      <h1>Grow, serve and be equipped</h1>
      <div class="ministryGrid">
        ${ministryPages.map((item) => ministryTile(item)).join('')}
      </div>
    </section>
  `;
}

function quickCard(title, text, target) {
  return `<button class="quickCard" data-page="${target}"><h3>${title}</h3><p>${text}</p><span>Open page</span></button>`;
}

function ministryTile(title) {
  return `<button class="ministryTile" data-page="${title}"><h3>${title}</h3><span>Learn more</span></button>`;
}

function aboutPage() {
  return pageShell('About Us', 'A church family built on the Word, prayer and discipleship', `
    <section class="introText">
      <p>Send His Word Ministries is a Christ-centered family of believers committed to making disciples of all nations through the living Word of God. The ministry exists to help believers encounter Jesus, mature in faith, serve faithfully and carry the Gospel with love and power.</p>
      <button class="primaryBtn" data-page="Statement of Faith">Read Our Faith</button>
    </section>
    ${visionMissionStrip()}
  `);
}

function visionMissionPage() {
  return pageShell('Vision & Mission', 'Our mandate and direction', `
    ${visionMissionStrip()}
    <div class="twoCol">
      ${card('How We Pursue the Vision', 'Through discipleship, biblical teaching, prayer, fellowship, evangelism and practical ministry that helps believers grow into maturity.')}
      ${card('Our Ministry Foundation', 'The fivefold ministry equips the saints for the work of ministry and builds the Body of Christ into unity, fullness and maturity.')}
    </div>
  `);
}

function statementPage() {
  const pausedClass = faithPaused ? ' paused' : '';
  const repeated = [...faithStatements, ...faithStatements].map(([title, text, scripture], index) => `
    <article class="faithCard">
      <h3>${title}</h3>
      <p>${text}</p>
      <b>${scripture}</b>
    </article>
  `).join('');

  return pageShell('Statement of Faith', 'What we believe', `
    <section class="faithIntro">
      <p>The statements below present the core beliefs of Send His Word Ministries. The first three appear together, then the remaining statements continue in a gentle repeating flow.</p>
      <button class="primaryBtn small" data-pause-faith>${faithPaused ? 'Resume' : 'Pause'}</button>
    </section>
    <section class="faithCarousel${pausedClass}" data-faith-carousel>
      <div class="faithTrack">${repeated}</div>
    </section>
  `);
}

function ministriesPage() {
  return pageShell('Ministries', 'Find your place to grow and serve', `
    <div class="ministryGrid full">
      ${ministryPages.map((item) => ministryTile(item)).join('')}
    </div>
  `);
}

function discipleshipPage() {
  return pageShell('Discipleship Ministry', 'Three centres. One mission: making disciples of all nations', `
    <section class="introText">
      <p>The Discipleship Ministry provides structured biblical teaching, prayer formation, mentoring and ministry preparation for believers who desire to grow deeper and serve faithfully.</p>
    </section>
    <div class="threeCol">
      ${card('Northern Discipleship School', 'Raising and equipping believers for Kingdom impact in Northern Uganda.')}
      ${card('Central Discipleship School', 'Strengthening believers through teaching, prayer and practical discipleship.')}
      ${card('Western Discipleship School', 'Building mature disciples who serve Christ faithfully in their communities.')}
    </div>
  `);
}

function healingPage() {
  return pageShell('Healing Ministry', 'Healing School', `
    <section class="featureHero">
      <img src="/images/healing-ministry.png" alt="Healing School teaching session" />
      <div>
        <p class="scriptLine">Beloved</p>
        <h2>Equipping believers to receive divine healing and walk in divine health.</h2>
        <p>The Healing School is a special ministry program of Send His Word Ministries conducted twice every year, in May and August. The program equips believers with biblical knowledge and practical understanding of how to receive divine healing and walk in divine health by raising their faith in the Word of God.</p>
        <blockquote>Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth. <span>3 John 1:2</span></blockquote>
      </div>
    </section>
    <div class="threeCol">
      ${card('Kampala Region', 'Hosted at Send His Word Church premises on Rubaga Road near Furniture House.')}
      ${card('Western Region', 'Hosted in partnership with Yesu Taremwa Churches.')}
      ${card('Northern Uganda Region', 'Hosted through 90.0 Kioga FM.')}
    </div>
    <div class="twoCol">
      ${card('How the Ministry Reaches Believers', 'Healing sessions run for two weeks through physical teaching sessions, radio ministry, YouTube broadcasts, TikTok outreach and other social media platforms.')}
      ${card('Objective', "The Healing School helps believers understand God's provision for healing through the atoning sacrifice of Jesus Christ, strengthen their faith in God's Word, and live under divine health while ministering healing to others also.")}
    </div>
  `);
}

function ministryArticle(eyebrow, title, image, alt, text, second) {
  return pageShell(eyebrow, title, `
    <section class="articleHero">
      <img src="${image}" alt="${alt}" />
      <div class="articleText">
        <p>${text}</p>
        <p>${second}</p>
      </div>
    </section>
    <div class="threeCol">
      ${card('Biblical Teaching', 'Grounded in the Word of God and practical Christian living.')}
      ${card('Fellowship', 'A warm environment for encouragement, friendship and growth.')}
      ${card('Prayer & Care', 'Pastoral care, prayer support and spiritual strengthening.')}
    </div>
  `);
}

function marriedsPage() {
  return ministryArticle(
    "Married's Ministry",
    'Strengthening marriages and families',
    '/images/marrieds-ministry.png',
    'Married couples in Bible fellowship',
    'The Marrieds Ministry of Send His Word Ministries is dedicated to strengthening marriages and families through biblical teaching, discipleship, fellowship, counseling, and prayer. We believe that strong marriages are the foundation of strong families, healthy churches, and transformed communities.',
    "Our mission is to equip married couples with God's Word and practical tools that enable them to build Christ-centered relationships characterized by love, faithfulness, unity, mutual respect, and spiritual growth."
  );
}

function youthPage() {
  return ministryArticle(
    'Youth Ministry',
    'Raising young people who love God and influence their communities',
    '/images/youth-ministry.png',
    'Youth ministry Bible fellowship',
    'The Youth Ministry of Send His Word Ministries is dedicated to raising a generation of young people who passionately love God, live according to His Word, and positively influence their communities for Jesus Christ.',
    "In a world filled with challenges and competing influences, the Youth Ministry provides a supportive environment where young people can grow in their relationship with God, discover their gifts, build meaningful friendships, and develop into strong Christian leaders."
  );
}

function childrenPage() {
  return ministryArticle(
    "Children's Ministry",
    'Nurturing children in the knowledge and love of Christ',
    '/images/children-ministry.png',
    'Children learning Bible stories',
    "The Children's Ministry is committed to nurturing children in the knowledge, love, and fear of the Lord Jesus Christ. We believe that children are a precious gift from God and an important part of His Kingdom.",
    'Through age-appropriate Bible teaching, worship, prayer, and interactive learning activities, we provide a safe and loving environment where children can grow spiritually, emotionally, and socially.'
  );
}

function programsPage() {
  return pageShell('Programs', 'Daily, weekly and seasonal ministry programs', `
    <div class="threeCol">
      ${card('Daily', 'Prayer, devotion, counseling support and WhatsApp encouragement.')}
      ${card('Weekly', 'Sunday celebration service, Bible teaching, youth fellowship and worship practice.')}
      ${card('Seasonal', 'Healing School in May and August, conferences, discipleship intensives and outreach ministry.')}
    </div>
  `);
}

function sermonsPage() {
  return pageShell('Sermons', 'Watch, listen and grow through the Word', `
    <div class="threeCol">
      ${card('Growing Through the Word', 'Matthew 28:19-20. Send His Word Ministries.')}
      ${card('Equipped for the Work of Ministry', 'Ephesians 4:11-13. Fivefold ministry teaching.')}
      ${card('Faith for Divine Health', '3 John 1:2. Healing School teaching.')}
    </div>
  `);
}

function givingPage() {
  return pageShell('Giving', 'Partner with Send His Word Ministries', `
    <div class="twoCol">
      ${card('Local Giving', 'Connect MTN Mobile Money and Airtel Money collection details for tithes, offerings, missions and discipleship support.')}
      ${card('International Giving', 'Provide card, PayPal, bank transfer or other international giving options for partners outside Uganda.')}
    </div>
  `);
}

function contactPage() {
  return pageShell('Contact', 'Visit, call or send a prayer request', `
    <div class="twoCol">
      <section class="darkPanel">
        <h2>Send His Word Ministries</h2>
        <p>Rubaga Road near Furniture House, Kampala Region</p>
        <p>Prayer Lines: 0773 272 195 / 0705 272 195</p>
        <p>YouTube, TikTok, radio ministry and social media outreach.</p>
      </section>
      <form class="formCard">
        <label>Full Name<input required /></label>
        <label>Phone or Email<input required /></label>
        <label>Message<textarea required></textarea></label>
        <button class="primaryBtn">Submit</button>
      </form>
    </div>
  `);
}

function footer() {
  return `
    <footer>
      <div>
        <h2>Send His Word Ministries</h2>
        <p>Making Disciples of All Nations</p>
      </div>
      <div class="footerActions">
        <button data-page="Statement of Faith">Statement of Faith</button>
        <button data-page="Giving">Give Online</button>
        <button data-page="Contact">Contact</button>
      </div>
    </footer>
  `;
}

function route() {
  if (currentPage === 'Home') return homePage();
  if (currentPage === 'About') return aboutPage();
  if (currentPage === 'Vision & Mission') return visionMissionPage();
  if (currentPage === 'Statement of Faith') return statementPage();
  if (currentPage === 'Ministries') return ministriesPage();
  if (currentPage === 'Discipleship Ministry') return discipleshipPage();
  if (currentPage === 'Healing Ministry') return healingPage();
  if (currentPage === "Married's Ministry") return marriedsPage();
  if (currentPage === 'Youth Ministry') return youthPage();
  if (currentPage === "Children's Ministry") return childrenPage();
  if (currentPage === 'Programs') return programsPage();
  if (currentPage === 'Sermons') return sermonsPage();
  if (currentPage === 'Giving') return givingPage();
  if (currentPage === 'Contact') return contactPage();
  return homePage();
}

function render() {
  root.innerHTML = `${header()}<main>${route()}</main>${footer()}`;
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-page]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      goToPage(element.dataset.page);
    });
  });

  const menuButton = document.querySelector('[data-toggle-menu]');
  const mobileNav = document.getElementById('mobileNav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      menuButton.textContent = mobileNav.classList.contains('open') ? 'Close' : 'Menu';
    });
  }

  document.querySelectorAll('[data-pause-faith], [data-faith-carousel]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation();
      faithPaused = !faithPaused;
      render();
    });
  });
}

render();
