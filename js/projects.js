/*
 * Portfolio data. Each card on index.html / work.html has a data-project
 * attribute matching a `slug` here; clicking it opens the project dialog.
 * Image paths are relative to the site root.
 */
window.TF_PROJECTS = [
  {
    slug: '270towin',
    client: '270toWin',
    title: 'Live election maps & prediction-market data',
    category: 'web',
    years: '2016 – present',
    role: 'Front-end development, data visualization, third-party data integration',
    caseStudy: 'work/270towin.html',
    summary: 'Interactive President, Senate, House and Governor maps, polling dashboards and real-time Kalshi prediction-market visuals for one of the web’s best-known election sites.',
    body: [
      '270toWin is one of the web\u2019s go-to places to build your own electoral map. We help keep that experience fast, accurate and engaging — from the classic click-to-color map to a new generation of data-driven features.',
      'For the 2026 midterm cycle we built prediction-market content in partnership with Kalshi: candidate treemaps that resize with live trading prices, side-by-side odds comparisons, and market probabilities layered directly onto the Senate, House and Governor maps.'
    ],
    highlights: [
      'Live Kalshi treemaps — three on one page, each updating independently',
      'Senate, House & Governor maps with consensus and market overlays',
      'State-by-state polling averages with sortable pie-chart grids',
      'Odds-spread dumbbell chart comparing markets with forecaster ratings'
    ],
    tags: ['Data viz', 'Interactive maps', 'API integration', 'Responsive'],
    images: [
      ['img/work/270-treemap-overview.webp', '2028 presidential prediction markets — live treemaps'],
      ['img/work/270-senate-map.webp', '2026 Senate interactive map with Kalshi control odds'],
      ['img/work/270-president-markets.webp', 'Nominee markets for both parties'],
      ['img/work/270-polls.webp', 'Polling averages by state'],
      ['img/work/270-dumbbell.webp', 'Odds spread: Kalshi vs. forecaster ratings by district'],
      ['img/work/270-race-polls.webp', 'Race page: market odds plus every poll'],
      ['img/work/270-map-tools.webp', 'Map palette, share & embed tools and incumbents table'],
      ['img/work/270-map-2016.webp', 'The classic interactive electoral map']
    ]
  },
  {
    slug: 'ecaring',
    client: 'eCaring',
    title: 'Website, CMS, help portal & product UI for a health-tech company',
    category: 'sites',
    years: '',
    role: 'Information architecture, WordPress development, support portal, UI design, IT administration',
    caseStudy: 'work/ecaring.html',
    summary: 'A complete digital presence for a home-healthcare platform — from sitemap to WordPress build, help center, internal wiki and the CareTracker touchscreen interface.',
    body: [
      'eCaring gives home-care teams real-time insight into patients’ daily lives. They needed a web presence that could speak to health systems and payers, plus the tools to support the caregivers and clinicians using the product.',
      'We planned the information architecture, built the marketing site on a custom WordPress setup their team can edit, launched a self-serve help portal and wiki, designed interface graphics for the CareTracker app, and managed their Google Workspace.'
    ],
    highlights: [
      'Sitemap and content architecture for marketing and product audiences',
      'Editable WordPress site with custom page templates',
      '“Get started in 6 simple steps” help portal with manuals, FAQs and video',
      'Touch-friendly CareTracker icon system for caregivers'
    ],
    tags: ['WordPress', 'IA & UX', 'Help center', 'UI design'],
    images: [
      ['img/work/ecaring-site.webp', 'Marketing website — full page'],
      ['img/work/ecaring-help.webp', 'Help portal'],
      ['img/work/ecaring-wordpress.webp', 'WordPress CMS'],
      ['img/work/ecaring-caretracker.webp', 'CareTracker touchscreen UI'],
      ['img/work/ecaring-sitemap.webp', 'Information architecture'],
      ['img/work/ecaring-architecture.webp', 'Platform architecture diagram'],
      ['img/work/ecaring-wiki.webp', 'Internal wiki'],
      ['img/work/ecaring-gsuite.webp', 'Google Workspace administration']
    ]
  },
  {
    slug: 'kidtropolis',
    client: 'Children’s Museum of Houston',
    title: 'Kidtropolis: a kid-sized city with a working bank',
    category: 'exhibits',
    years: '',
    role: 'Interactive software & content management, with Moey, Inc.',
    summary: 'A 6,000 sq ft miniature city where kids earn, save and spend — powered by an exhibit-wide banking system and ATMs across 42 networked computers.',
    body: [
      'Kidtropolis lets children experience “grown-up” life in a miniature city. On arrival every child gets an ATM card loaded with $20 in checking and $20 in savings, then earns money at jobs and spends it in shops around town.',
      'Every debit and credit is tracked across the visit and is available from custom-built ATMs — the most popular stop in the exhibit, and a real way for families to talk about money. A custom CMS lets museum staff update content across all 42 networked computers.'
    ],
    highlights: [
      'Exhibit-wide accounts with checking, savings, earnings and purchases',
      'Custom ATM interface designed for young children',
      'Central CMS managing 42 networked exhibit computers'
    ],
    tags: ['Networked exhibits', 'CMS', 'Kiosk UI'],
    credit: 'Interpretation and design by Argyle Design, Inc. Photos courtesy of Moey, Inc.',
    images: [
      ['img/work/kidtropolis-entrance.webp', 'Welcome to Kidtropolis'],
      ['img/work/kidtropolis-atm.webp', 'Kidtropolis ATM'],
      ['img/work/kidtropolis-kiosk.webp', 'Job and shop kiosks'],
      ['img/work/kidtropolis-bank.webp', 'Banking in action'],
      ['img/work/kidtropolis-crowd.webp', 'Busy day at the bank'],
      ['img/work/kidtropolis-news.webp', 'The Kidtropolis news station']
    ]
  },
  {
    slug: 'powerplay',
    client: 'Children’s Museum of Houston',
    title: 'Powerplay: fitness tracking across a three-floor exhibit',
    category: 'exhibits',
    years: '',
    role: 'Kiosk software, with Moey, Inc.',
    summary: 'Kids register, climb, run and balance their way through activity stations while Power Tracker kiosks record their heart rate and fitness measures.',
    body: [
      'Next door to Kidtropolis, Powerplay gets kids moving: climbing walls, obstacle courses, strength tests and rope bridges. It isn’t play for play’s sake — visitors enter baseline information on arrival, then check their heart rate and other measures at Power Tracker kiosks throughout the three-floor installation.',
      'Software running across 42 computers ties it all together and gives each child a final read-out of their activity and fitness.'
    ],
    highlights: [
      'Check-in kiosks linking each visitor to a personal card',
      'Heart-rate and fitness tracking at stations across three floors',
      'End-of-visit summary of every activity'
    ],
    tags: ['Kiosks', 'Biometric data', 'Networked exhibits'],
    credit: 'Interpretation and design by Argyle Design, Inc. Photos courtesy of Moey, Inc.',
    images: [
      ['img/work/powerplay-tracker.webp', 'Power Tracker kiosk'],
      ['img/work/powerplay-kiosk.webp', 'Activity station kiosk']
    ]
  },
  {
    slug: 'energy-lab',
    client: 'National Guard',
    title: 'Energy Lab: a touring science exhibit in a truck',
    category: 'exhibits',
    years: '2010',
    role: 'Interactive media, with Moey, Inc. and RedPeg Marketing',
    summary: 'Earth, Wind, Fire and Water zones with touch tables and custom interactives that teach high-school students about energy use and conservation.',
    body: [
      'Energy Lab was created for the National Guard and produced by RedPeg Marketing, with exhibit design, media and technology by Moey. The exhibit is split into four zones — Earth, Wind, Fire and Water — each teaching a different lesson about energy and conservation through hands-on interactives.',
      'Geared toward high-school students, the whole lab travels the country inside a truck, so every piece of hardware and software had to be tough, fast to set up and reliable on the road.'
    ],
    highlights: [
      'Multi-user touch tables and custom control consoles',
      'Four themed zones with their own interactives and media',
      'Road-ready hardware built for a touring truck'
    ],
    tags: ['Touch tables', 'Custom hardware', 'Touring exhibit'],
    credit: 'Photos courtesy of Moey, Inc.',
    images: [
      ['img/work/energylab-table.webp', 'Fire zone touch table'],
      ['img/work/energylab-hall.webp', 'The Wind zone'],
      ['img/work/energylab-crowd.webp', 'Students at the Water table'],
      ['img/work/energylab-console.webp', 'Hands-on control console'],
      ['img/work/energylab-kiosks.webp', 'Interactive kiosks'],
      ['img/work/energylab-fire.webp', 'Fire zone'],
      ['img/work/energylab-water.webp', 'Water zone'],
      ['img/work/energylab-truck.webp', 'The Energy Lab truck']
    ]
  },
  {
    slug: 'intrepid',
    client: 'Intrepid Sea, Air & Space Museum',
    title: 'Exploreum interactives',
    category: 'exhibits',
    years: '',
    role: 'Interactive exhibits, with Moey, Inc.',
    summary: 'Hands-on interactives for the Exploreum hall, including the Buoyancy station — named one of NYC’s 20 best museum exhibits for kids by Time Out New York Kids.',
    body: [
      'The Intrepid’s Exploreum hall was featured in Time Out New York Kids’ “NYC Museums: 20 Best Exhibits for Kids”.',
      'Numerous interactives fill the hall, including the Buoyancy interactive, where visitors experiment with how ships stay afloat.'
    ],
    highlights: [
      'Featured in Time Out NY Kids’ 20 best museum exhibits for kids',
      'Physical controls paired with real-time on-screen simulation'
    ],
    tags: ['Interactive exhibits', 'Simulation'],
    credit: 'Photos courtesy of Moey, Inc.',
    images: [
      ['img/work/intrepid-buoyancy.webp', 'Buoyancy interactive'],
      ['img/work/intrepid-visitors.webp', 'Exploreum interactive station'],
      ['img/work/intrepid-hall.webp', 'The Exploreum hall']
    ]
  },
  {
    slug: 'jaha',
    client: 'Johnstown Area Heritage Association',
    title: 'Virtual Mold Making in a steel-mill exhibit',
    category: 'exhibits',
    years: '2009',
    role: 'RFID interactive & hardware integration, with Moey, Inc.',
    summary: 'Kids pass molds down a conveyor belt; RFID tags trigger video of real molten steel filling the same mold — and the finished cog it produces.',
    body: [
      'Johnstown, Pennsylvania thrived in the heyday of coal mining, iron smelting and railway shipping. The heritage center’s exhibits help young visitors understand that industrial past.',
      'In the virtual steel mill, children slide physical molds down a conveyor. An RFID reader identifies each one and plays matching footage of molten steel being poured and the resulting cog being produced. The controller hardware was wired and tested on site.'
    ],
    highlights: [
      'RFID-triggered video playback',
      'Custom controller boards and on-site wiring',
      'Durable physical props designed for kids'
    ],
    tags: ['RFID', 'Hardware', 'Video'],
    credit: 'Photos courtesy of Moey, Inc.',
    images: [
      ['img/work/jaha-steelmill.webp', 'The Steel Mill'],
      ['img/work/jaha-screen.webp', 'Mold station screen'],
      ['img/work/jaha-mold.webp', 'Mold with RFID tag'],
      ['img/work/jaha-cog.webp', 'The finished cog'],
      ['img/work/lab-wiring.webp', 'Controller board wiring'],
      ['img/work/lab-boards.webp', 'Custom I/O boards during install']
    ]
  },
  {
    slug: 'cowgirl',
    client: 'National Cowgirl Museum & Hall of Fame',
    title: 'Honoree kiosks with a curator-friendly database',
    category: 'exhibits',
    years: '',
    role: 'Kiosk software & database, with Moey, Inc.',
    summary: 'Four touchscreen kiosks give visitors quick access to the museum’s inductees, all fed from a custom database curators can update at any time.',
    body: [
      'Four kiosks let visitors browse the Hall of Fame’s whoopin’ and hollerin’ inductees by name, occupation, home state and year inducted.',
      'Each touchscreen runs from a networked computer that reads from a custom-built database, designed so museum curators can monitor and update content themselves.'
    ],
    highlights: ['Networked touchscreen kiosks', 'Custom content database for curators', 'Themed UI matching the museum’s brand'],
    tags: ['Kiosks', 'Database', 'UI design'],
    credit: 'Images courtesy of Moey, Inc.',
    images: [
      ['img/work/cowgirl-home.webp', 'Kiosk home screen'],
      ['img/work/cowgirl-profile.webp', 'Honoree profile']
    ]
  },
  {
    slug: 'cell-table',
    client: 'Museum touch table',
    title: 'Explore an animal cell, layer by layer',
    category: 'exhibits',
    years: '',
    role: 'Illustration & interactive design, with Moey, Inc.',
    summary: 'A richly illustrated animal cell for a multi-touch table, built in layers so visitors can peel back membranes and explore each organelle.',
    body: [
      'Science content works best when visitors can touch it. This illustrated animal cell was built in separate layers for a touch-table interactive, letting visitors uncover the nucleus, mitochondria, Golgi apparatus and more at their own pace.'
    ],
    highlights: ['Layered illustration built for interaction', 'Designed for large multi-touch displays'],
    tags: ['Illustration', 'Touch tables', 'Science'],
    images: [['img/work/cell-table.webp', 'Animal cell illustration']]
  },
  {
    slug: 'health-exhibits',
    client: 'Advanced Animations',
    title: 'Face Your Future & a family of health exhibit games',
    category: 'media',
    years: '',
    role: 'Interactive software',
    summary: 'Interactive software for traveling health exhibits — Face Your Future, Decisions Diner, Grab-a-Bite and Supersize — that make healthy choices playful.',
    body: [
      'Working with exhibit builders Advanced Animations, we developed the software behind a series of health and nutrition interactives: Face Your Future, Decisions Diner, Grab-a-Bite and Supersize.',
      'Each title is built for short, walk-up sessions on a busy exhibit floor.'
    ],
    highlights: ['Four exhibit titles for traveling health exhibitions', 'Walk-up gameplay tuned for museum floors'],
    tags: ['Exhibit games', 'Health education'],
    images: [['img/work/face-your-future.webp', 'Face Your Future exhibit']]
  },
  {
    slug: 'train-signs',
    client: 'Advanced Animations',
    title: 'Train Signs: a full-body motion game',
    category: 'media',
    years: '',
    role: 'Game design & development',
    summary: 'Players use their whole body to tag the right railroad-safety signs as they pop up around the screen — no controller required.',
    body: [
      'Train Signs turns rail-safety education into a workout. A camera tracks the player against the backdrop, and they reach, jump and wave to hit the correct signs as they appear around the edge of the screen. Scores tick up in real time.',
      'It’s a compact example of the kind of gesture-driven experience that keeps visitors at an exhibit long enough to learn something.'
    ],
    highlights: ['Camera-based body tracking', 'Real-time scoring and feedback', 'Safety messaging built into play'],
    tags: ['Motion tracking', 'Game', 'Exhibit'],
    images: [
      ['img/work/train-signs-1.webp', 'Gameplay — hitting the right sign'],
      ['img/work/train-signs-2.webp', 'Score feedback'],
      ['img/work/train-signs-3.webp', 'Gameplay']
    ]
  },
  {
    slug: 'phoebetv',
    client: 'PhoebeTV',
    title: 'Video entertainment network',
    category: 'media',
    years: '2014',
    role: 'Web design & development',
    summary: 'An online video network with show pages, episode players and editorial features for a slate of original series.',
    body: [
      'PhoebeTV needed a home for its original web series. We built a video-first site with a featured carousel, most-popular and new-episode rails, show pages with cast and episode lists, and an embedded player for every episode.'
    ],
    highlights: ['Show and episode templates', 'Video player integration', 'Editorial homepage rails'],
    tags: ['Video', 'Web design', 'CMS'],
    images: [
      ['img/work/phoebetv-home.webp', 'Homepage'],
      ['img/work/phoebetv-show.webp', 'Show pages'],
      ['img/work/phoebetv-series.webp', 'Series page'],
      ['img/work/phoebetv-player.webp', 'Episode player']
    ]
  },
  {
    slug: 'purestream',
    client: 'PureStream · Whisperings Solo Piano Radio',
    title: 'Streaming radio player with member accounts',
    category: 'media',
    years: '',
    role: 'Player design & development',
    summary: 'A pop-out streaming player for an internet radio station, with now-playing info, track history, buy links and a members-only ad-free stream.',
    body: [
      'Whisperings Solo Piano Radio wanted listeners to stay with the music. We designed and built a compact player that shows the current track and album, lists previous songs with links to buy, and invites listeners to sign up for PureStream — an ad-free, members-only stream with more playlist features.'
    ],
    highlights: ['Now-playing and track-history display', 'Member login and subscription upsell', 'Pop-out player that keeps playing while you browse'],
    tags: ['Audio streaming', 'Membership', 'UI'],
    images: [
      ['img/work/purestream-player.webp', 'Free player'],
      ['img/work/purestream-member.webp', 'Members’ player'],
      ['img/work/purestream-login.webp', 'Login and sign-up']
    ]
  },
  {
    slug: 'bicycling',
    client: 'Bicycling Magazine',
    title: 'Tour of California race coverage hub',
    category: 'sites',
    years: '',
    role: 'Web design & development',
    summary: 'A dedicated race site for the Tour of California with daily blog coverage, stage video, top-riders features and integrated sponsor placements.',
    body: [
      'Bicycling Magazine’s coverage of the Tour of California needed to move as fast as the race. The hub paired a daily blog with a video player, rider features and stage guides, plus sponsor placements designed into the layout rather than bolted on.'
    ],
    highlights: ['Daily blog and video coverage', 'Sponsor integration built into the design'],
    tags: ['Publishing', 'Video', 'Advertising'],
    images: [
      ['img/work/bicycling-toc.webp', 'Tour of California homepage'],
      ['img/work/bicycling-blog.webp', 'Blog coverage'],
      ['img/work/bicycling-video.webp', 'Stage video']
    ]
  },
  {
    slug: 'myrateplan',
    client: 'MyRatePlan',
    title: 'MyPhoneFinder: compare every phone at once',
    category: 'web',
    years: '',
    role: 'Interactive application development',
    summary: 'A visual phone-finder: enter a zip code, then slide filters for camera, keyboard, price and more while matching phones light up across a wall of devices.',
    body: [
      'Choosing a phone from a list of hundreds is painful. MyPhoneFinder showed every available handset at once, then narrowed the wall in real time as shoppers set their zip code, plan type and must-have features — with details and pricing a click away.'
    ],
    highlights: ['Real-time faceted filtering', 'Zip-code-aware availability', 'Visual “wall of phones” results'],
    tags: ['Interactive app', 'Filtering', 'E-commerce'],
    images: [
      ['img/work/myrateplan-finder.webp', 'Phone finder'],
      ['img/work/myrateplan-results.webp', 'Filtered results']
    ]
  },
  {
    slug: 'vpr',
    client: 'Vermont Public Radio',
    title: 'Rich-media campaign for a new schedule',
    category: 'media',
    years: '',
    role: 'Ad design & animation',
    summary: 'Animated display ads that walked listeners through VPR’s new program lineup, hour by hour.',
    body: [
      'To launch a new weekday schedule, VPR ran an animated ad campaign that scrolls through the lineup like a program guide — Morning Edition, BBC News Hour, On Point and more — with a clear call to listen live.'
    ],
    highlights: ['Animated schedule ticker', 'Multiple ad sizes', 'Brand-consistent illustration'],
    tags: ['Advertising', 'Animation'],
    images: [['img/work/vpr-ad.webp', 'Campaign ads in context']]
  },
  {
    slug: 'scudder',
    client: 'Scudder Parker for Governor',
    title: 'Statewide campaign website',
    category: 'sites',
    years: '2007 \u2013 2008',
    role: 'Web design, development & database',
    summary: 'A database-driven campaign site for a Vermont gubernatorial race: news, blog, photo galleries, video and volunteer sign-ups.',
    body: [
      'Campaigns move fast. We built Scudder Parker’s site on a database-backed CMS so the team could post news, blog entries, trail photos and video the same day, from anywhere on the trail.'
    ],
    highlights: ['Database-driven content management', 'Photo gallery and video pages', 'Campaign blog'],
    tags: ['Political', 'CMS', 'MySQL'],
    images: [
      ['img/work/scudder-home.webp', 'Homepage'],
      ['img/work/scudder-gallery.webp', 'Campaign photos'],
      ['img/work/scudder-video.webp', 'Video page']
    ]
  },
  {
    slug: 'ift',
    client: 'Resourceful Recordings · IFT',
    title: 'Conference session archive for IFT 2009',
    category: 'media',
    years: '2009',
    role: 'Interface design & development',
    summary: 'A navigable archive of recorded sessions from the Institute of Food Technologists’ Annual Meeting & Food Expo, with an online store for orders.',
    body: [
      'Resourceful Recordings captures conference sessions and sells them to attendees. For the IFT 2009 Annual Meeting & Food Expo, we designed the menu-driven interface for browsing presentations by track and topic, alongside the online store used to order them.'
    ],
    highlights: ['Track-based session navigation', 'Branded event interface', 'Online ordering'],
    tags: ['Interface design', 'E-commerce'],
    images: [
      ['img/work/ift-menu.webp', 'Session menu'],
      ['img/work/ift-main.webp', 'Main screen']
    ]
  },
  {
    slug: 'small-business',
    client: '911 Consulting · Richmond Family Medicine',
    title: 'Responsive sites for local organizations',
    category: 'sites',
    years: '2023',
    role: 'Web design & development',
    summary: 'Clean, mobile-first websites that load fast, read clearly and are easy for small teams to keep current.',
    body: [
      'Not every project is a data platform. For 911 Consulting — an emergency-management consultancy — and Richmond Family Medicine, a Vermont primary-care practice, we built responsive sites with clear service information, patient-portal access and layouts that work on any device.'
    ],
    highlights: ['Mobile-first responsive layouts', 'Patient portal link-up', 'Clear, scannable service information'],
    tags: ['Responsive', 'Small business'],
    images: [
      ['img/work/nine11-consulting.webp', '911 Consulting'],
      ['img/work/richmond-family-medicine.webp', 'Richmond Family Medicine']
    ]
  }
];
