const Blog    = require('../models/Blog');
const slugify = require('slugify');

const posts = [
  {
    title:      'The Rise of Artificial Intelligence: How AI is Reshaping Every Industry',
    category:   'technology',
    author:     'ApolloNews Editorial',
    excerpt:    'From healthcare to finance, artificial intelligence is no longer a futuristic concept — it\'s the engine driving today\'s most transformative breakthroughs.',
    coverImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    tags:       ['AI', 'technology', 'machine learning', 'future'],
    content: `<p>Artificial intelligence has quietly embedded itself into virtually every sector of the global economy. What began as a niche academic pursuit in the mid-20th century has exploded into the defining technology of our era.</p>

<h3>Healthcare: Diagnosing Disease With Unprecedented Accuracy</h3>
<p>AI models trained on millions of medical images can now detect cancers, diabetic retinopathy, and cardiovascular disease at accuracy rates that match — and sometimes exceed — seasoned specialists. Startups like Tempus and DeepMind's AlphaFold (which solved the 50-year-old protein-folding problem) have dramatically accelerated drug discovery.</p>

<h3>Finance: Smarter Markets, Better Fraud Detection</h3>
<p>Hedge funds and investment banks have long used algorithmic trading, but modern deep-learning systems go far beyond rule-based logic. JPMorgan's COiN platform reviews 12,000 commercial credit agreements in seconds — work that previously took 360,000 hours annually. Meanwhile, real-time fraud detection models save the global banking industry billions every year.</p>

<h3>Manufacturing and Supply Chains</h3>
<p>Predictive maintenance powered by IoT sensors and AI reduces unplanned downtime by up to 50%. Tesla's AI-driven Gigafactories produce a car roughly every 45 seconds. Supply chain optimization algorithms, sharpened painfully during the COVID-19 disruptions, now dynamically reroute logistics around port congestion, weather events, and demand spikes.</p>

<h3>The Concerns We Cannot Ignore</h3>
<p>Rapid adoption comes with serious caveats. Labour displacement is a genuine risk — the McKinsey Global Institute estimates up to 375 million workers may need to switch occupational categories by 2030. Algorithmic bias, deepfakes, and autonomous weapons raise profound ethical questions that regulators worldwide are still scrambling to address.</p>

<p>The challenge is not to slow AI's progress but to ensure it advances in a way that is transparent, accountable, and genuinely beneficial to all of humanity — not just the technologically privileged few.</p>`,
  },
  {
    title:      'India\'s Space Ambitions: From ISRO\'s Chandrayaan to a Human Moon Mission',
    category:   'science',
    author:     'ApolloNews Editorial',
    excerpt:    'With Chandrayaan-3 landing near the lunar south pole, India joined an exclusive club. Now the country has its sights set on sending astronauts to the Moon by 2040.',
    coverImage: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80',
    tags:       ['ISRO', 'space', 'Chandrayaan', 'India', 'Moon'],
    content: `<p>On 23 August 2023, the Vikram lander touched down at 69.37° south latitude — closer to the lunar south pole than any spacecraft in history. India became the fourth nation to achieve a soft lunar landing, and the first to reach this scientifically critical region.</p>

<h3>Why the South Pole?</h3>
<p>Permanently shadowed craters near the poles are suspected to harbour water ice, the result of billions of years of comet and asteroid impacts. Water ice is the Holy Grail of lunar exploration: it can be split into hydrogen and oxygen for rocket fuel, potentially transforming the Moon into a refuelling station for deep-space missions.</p>

<p>The Pragyan rover's Alpha Particle X-ray Spectrometer confirmed the presence of sulphur, aluminium, calcium, iron, chromium, titanium, manganese, oxygen and silicon in the south polar soil — data that will guide sample-return and future crewed missions.</p>

<h3>Gaganyaan: India's Human Spaceflight Programme</h3>
<p>ISRO's Gaganyaan programme aims to send a three-member crew to low Earth orbit by 2026. Four Indian Air Force pilots have already completed cosmonaut training in Russia. The spacecraft's crew module survived a successful emergency abort test in October 2023.</p>

<h3>A 2040 Moon Mission?</h3>
<p>Prime Minister Narendra Modi announced an ambitious goal: an Indian astronaut on the Moon by 2040 and an Indian space station by 2035. ISRO has laid out a roadmap that includes Chandrayaan-4 (a sample-return mission), Chandrayaan-5, and eventually a crewed lunar lander that could piggyback on international Gateway cooperation.</p>

<p>For a space agency operating on roughly $1.6 billion per year — a fraction of NASA's $25 billion — ISRO's cost-effectiveness is extraordinary. Mangalyaan's Mars Orbiter Mission cost less than the production budget of the film <em>The Martian</em>. The world is watching.</p>`,
  },
  {
    title:      'The Mental Health Crisis Nobody Wants to Talk About: Young Men and Loneliness',
    category:   'health',
    author:     'ApolloNews Editorial',
    excerpt:    'Suicide remains the leading cause of death for men under 50 in many countries. Yet social stigma keeps millions suffering in silence. It\'s time for an honest conversation.',
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
    tags:       ['mental health', 'loneliness', 'men', 'suicide prevention'],
    content: `<p>The statistics are stark and they have barely shifted in a decade. In the United Kingdom, men account for approximately three-quarters of all suicides. In the United States, the rate is similar. In India, male suicide rates consistently outpace female rates, yet the conversation around men's mental health remains almost entirely absent from public discourse.</p>

<h3>The Loneliness Epidemic</h3>
<p>Former US Surgeon General Dr Vivek Murthy declared loneliness a national health epidemic in 2023, equating its mortality impact to smoking 15 cigarettes a day. Survey data consistently shows that a growing proportion of young men — particularly those aged 18–34 — report having no close friends at all.</p>

<p>The reasons are complex: delayed marriage, remote work dissolving office social bonds, declining participation in organised religion and civic groups, and social media's paradoxical ability to create connection and deepen isolation simultaneously.</p>

<h3>Why Men Don't Seek Help</h3>
<p>Cultural messaging about masculine self-reliance runs deep. Men are disproportionately less likely to see a GP, less likely to confide in friends, and less likely to present to mental health services until they are in acute crisis. By the time many men receive any support, the situation has become catastrophic.</p>

<h3>What Actually Works</h3>
<ul>
  <li><strong>Activity-based socialising</strong> — men bond through doing, not talking. Sports clubs, hiking groups, and maker spaces have shown measurable benefits.</li>
  <li><strong>Peer support models</strong> — organisations like Movember and Beyond Blue train men to have supportive conversations with other men.</li>
  <li><strong>Reducing waiting times for NHS/public mental health services</strong> — in many countries, waiting lists run to 18 months or more.</li>
  <li><strong>Workplace mental health programmes</strong> — since men tend to stay in work even when struggling, the workplace is a critical access point.</li>
</ul>

<p>The goal is not to pathologise masculinity but to broaden what it means to be a man — to make seeking help, expressing vulnerability, and building genuine friendships as natural as going to the gym.</p>`,
  },
  {
    title:      'Electric Vehicles in 2025: The Battery Revolution That Changed Everything',
    category:   'technology',
    author:     'ApolloNews Editorial',
    excerpt:    'Solid-state batteries, 10-minute charging, and 800km range — the EV industry crossed multiple milestones in 2024-25. Here\'s what it means for drivers and the planet.',
    coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    tags:       ['EV', 'electric vehicles', 'Tesla', 'battery', 'climate'],
    content: `<p>Two years ago, prospective EV buyers worried about three things above all else: range anxiety, charging time, and battery degradation. In 2025, all three concerns look substantially different — not because they have disappeared, but because the underlying technology has made a generational leap.</p>

<h3>Solid-State Batteries: The Game-Changer Arrives</h3>
<p>Toyota, Samsung SDI, and QuantumScape have each announced production-ready solid-state battery cells in the 2024–2025 period. Unlike liquid-electrolyte lithium-ion cells, solid-state batteries offer:</p>
<ul>
  <li>Energy density 50–70% higher than current lithium-ion</li>
  <li>Charge times as low as 10 minutes for an 80% charge</li>
  <li>Significantly reduced fire risk (no flammable liquid electrolyte)</li>
  <li>Cycle life exceeding 1,000–2,000 full charges with minimal degradation</li>
</ul>

<h3>What This Means for Range</h3>
<p>Toyota's next-generation bZ series and Nissan's 2026 EV lineup are targeting 800–1,000 km (500–620 miles) on a single charge. For context, the average Indian or European driver covers fewer than 50 km per day. Range anxiety, for most users, becomes as irrational as worrying about running out of petrol between service stations.</p>

<h3>The Infrastructure Race</h3>
<p>Global fast-charging infrastructure has grown from roughly 1 million public chargers in 2020 to over 5 million in 2025. India's government has set a target of 100,000 public charging stations by 2026 under the FAME-III scheme. The bottleneck is shifting from car technology to grid capacity.</p>

<h3>The Climate Equation</h3>
<p>Life-cycle carbon analysis consistently shows that EVs — even charged on today's grid mix — produce 50–70% fewer emissions than equivalent petrol or diesel vehicles. As grids decarbonise, that gap widens further. Bloomberg NEF projects EVs will represent 75% of all new car sales globally by 2040.</p>`,
  },
  {
    title:      'Cricket Beyond Borders: How the IPL Became Bigger Than Most Sports Leagues on Earth',
    category:   'sports',
    author:     'ApolloNews Editorial',
    excerpt:    'Launched in 2008 with eight franchises and a controversial television deal, the IPL is now the second-most-attended sports league in the world. How did it get here?',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    tags:       ['IPL', 'cricket', 'BCCI', 'sports business', 'India'],
    content: `<p>In April 2008, the first ball of the Indian Premier League was bowled in front of a packed Chinnaswamy Stadium in Bengaluru. Brendon McCullum smashed 158 not out off 73 balls for Kolkata Knight Riders, and a revolution in global sport had begun.</p>

<h3>The Numbers Are Staggering</h3>
<p>The IPL's media rights deal for 2023–2027 was valued at ₹48,390 crore ($6.2 billion) — surpassing the per-match value of the English Premier League and NFL, making it, by that metric, the most valuable sports property per game on Earth. Total franchise valuations have crossed $10 billion collectively. Mumbai Indians alone are valued at over $1.5 billion.</p>

<h3>The Talent Pipeline Effect</h3>
<p>No other domestic league accelerates elite cricket development as efficiently. A teenager from Jharkhand or Assam can play alongside (and against) Virat Kohli, Pat Cummins, and Jofra Archer in front of 60,000 fans and a billion television viewers. The quality of Indian domestic cricket has risen sharply in the IPL era as a direct result.</p>

<h3>The Controversies</h3>
<p>The league has not been without its shadow. The 2013 spot-fixing scandal led to the suspension of franchises and officials. The Supreme Court of India mandated governance reforms and the appointment of the Lodha Committee. Player workload management remains a flashpoint — international players arrive in India fatigued; they leave even more exhausted.</p>

<h3>What Comes Next?</h3>
<p>The BCCI has approved an expanded IPL with ten teams. Women's Premier League franchises sold for extraordinary valuations in their inaugural 2023 auction, signalling that women's cricket is finally receiving the commercial investment it deserves. The next frontier is truly global: IPL team owners are now investing in franchise leagues in the UAE, South Africa, USA, and the Caribbean.</p>`,
  },
  {
    title:      'The Global Water Crisis: Why the Next World War Could Be Fought Over Rivers',
    category:   'science',
    author:     'ApolloNews Editorial',
    excerpt:    'Two billion people already lack access to safe drinking water. Climate change and population growth are turning a humanitarian challenge into a geopolitical tinderbox.',
    coverImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    tags:       ['water crisis', 'climate change', 'geopolitics', 'environment'],
    content: `<p>Water covers 71% of Earth's surface, yet less than 3% is fresh water — and of that, two-thirds is locked in glaciers and polar ice caps. The remaining liquid fresh water, distributed profoundly unequally across the planet, is becoming the defining resource conflict of the 21st century.</p>

<h3>The Scale of the Problem</h3>
<p>According to the UN, 2.2 billion people currently lack access to safely managed drinking water services. By 2040, global demand for fresh water is projected to exceed supply by 40%. The World Economic Forum has consistently ranked the water crisis among the top five long-term global risks by impact.</p>

<h3>India: A Country in Crisis</h3>
<p>NITI Aayog's landmark report warned that 21 Indian cities — including Delhi, Bengaluru, Chennai, and Hyderabad — face groundwater depletion to critical levels. Chennai went eight days with essentially zero municipal water supply in 2019. The Cauvery water dispute between Karnataka and Tamil Nadu periodically erupts into violence. India's per-capita fresh water availability has fallen from 5,177 cubic metres in 1951 to around 1,544 cubic metres today — below the internationally defined "water stress" threshold of 1,700.</p>

<h3>International Flashpoints</h3>
<p>The Nile basin dispute between Egypt, Sudan, and Ethiopia over the Grand Ethiopian Renaissance Dam has brought the countries to the brink of conflict multiple times. China's construction of dams on the upper Mekong has created downstream tensions with Vietnam, Thailand, Cambodia, and Laos. The Indus Waters Treaty between India and Pakistan — one of the world's most successful water-sharing agreements — is showing significant strain under the pressure of climate change and political tensions.</p>

<h3>Solutions That Work</h3>
<p>Israel desalinates over 80% of its municipal water supply, having turned a barren coastline into fertile agricultural land. Singapore recycles 100% of its wastewater through the NEWater programme. Rajasthan's Jal Jeevan Mission and community-managed johads (traditional stepwells) demonstrate that local, culturally-rooted solutions can be as powerful as high-tech ones. The path forward requires both.</p>`,
  },
  {
    title:      'How India\'s Start-up Ecosystem Became the World\'s Third Largest',
    category:   'business',
    author:     'ApolloNews Editorial',
    excerpt:    'With over 110 unicorns and $140 billion in cumulative funding, India\'s start-up story is about more than money — it\'s about the democratisation of entrepreneurship.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags:       ['startups', 'India', 'unicorns', 'entrepreneurship', 'venture capital'],
    content: `<p>When Flipkart was founded from a Bengaluru apartment in 2007, India had fewer than a handful of recognisable consumer internet companies. By 2025, India has produced over 110 unicorns — private companies valued at $1 billion or more — spanning fintech, edtech, healthtech, agritech, deeptech, and SaaS.</p>

<h3>The Infrastructure That Made It Possible</h3>
<p>Three government-driven initiatives changed the game fundamentally:</p>
<ul>
  <li><strong>Aadhaar</strong> — the world's largest biometric identity system, now enrolled by over 1.3 billion Indians, enabled instant Know-Your-Customer (KYC) verification and unlocked financial services for hundreds of millions who had been excluded.</li>
  <li><strong>UPI (Unified Payments Interface)</strong> — India now processes over 10 billion digital transactions per month, surpassing the US, UK, and EU combined. UPI's open-architecture has been licenced to Bahrain, Singapore, UAE, and France.</li>
  <li><strong>Jio</strong> — Reliance's 2016 telecom revolution brought 4G data costs from ₹250 per GB to under ₹10, connecting 500 million new internet users in five years.</li>
</ul>

<h3>Challenges Remain</h3>
<p>The 2022–2023 funding winter hit India's start-up ecosystem hard. Several high-profile unicorns — Byju's, Go First, BharatPe — faced governance crises that raised serious questions about growth-at-all-costs culture, financial oversight, and founder accountability. Profitability, long treated as a dirty word in start-up circles, was suddenly the only metric that mattered.</p>

<h3>The Next Wave</h3>
<p>India's next generation of start-ups is building in deeper-tech sectors: semiconductor design (Mindgrove Technologies), satellite communications (Pixxel), generative AI (Sarvam AI, Krutrim), and climate technology. The talent pipeline — IITs, IIMs, and a generation of returned diaspora — has never been stronger. The question is whether governance, regulation, and patient capital can keep pace.</p>`,
  },
  {
    title:      'What Science Actually Says About Sleep — And Why You\'re Probably Getting It Wrong',
    category:   'health',
    author:     'ApolloNews Editorial',
    excerpt:    'Sleep deprivation is linked to obesity, cardiovascular disease, dementia, and depression. Yet most adults sleep an hour less than they need. Here\'s what the research says.',
    coverImage: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&q=80',
    tags:       ['sleep', 'health', 'wellness', 'neuroscience', 'lifestyle'],
    content: `<p>Matthew Walker, professor of neuroscience at UC Berkeley and author of <em>Why We Sleep</em>, opens his book with a blunt statement: "No aspect of our biology is left unscathed by sleep deprivation." The research literature bears this out comprehensively — and it should alarm all of us.</p>

<h3>What Happens When You Sleep</h3>
<p>Sleep is not passive rest. During Non-REM deep sleep, your brain replays and consolidates memories from the day, transfers information from the hippocampus to long-term cortical storage, and clears metabolic waste products including beta-amyloid — the protein associated with Alzheimer's disease — through the glymphatic system. During REM sleep, the brain processes emotional memories, makes creative connections between disparate ideas, and regulates mood.</p>

<h3>The Cost of Sleeping Less Than 7 Hours</h3>
<p>Large-scale epidemiological studies consistently associate sleeping fewer than 7 hours per night with:</p>
<ul>
  <li>45% increased risk of coronary heart disease</li>
  <li>Significantly elevated risk of type-2 diabetes (via disrupted insulin sensitivity)</li>
  <li>Up to 40% impaired memory consolidation</li>
  <li>Dysregulation of hunger hormones (ghrelin and leptin), leading to increased caloric intake and weight gain</li>
  <li>Suppression of natural killer cell activity, reducing immune function</li>
</ul>

<h3>Common Myths, Demolished</h3>
<p><strong>"I can catch up on sleep at weekends."</strong> False. Metabolic damage from a week of insufficient sleep is not reversed by weekend recovery sleep, according to a landmark 2019 study in <em>Current Biology</em>.</p>
<p><strong>"Some people only need 5-6 hours."</strong> True for fewer than 1% of people, due to a rare genetic mutation. For everyone else, this is rationalisation.</p>
<p><strong>"Alcohol helps you sleep."</strong> Alcohol is a sedative, not a sleep aid. It fragments REM sleep and suppresses deep NREM sleep — leaving you feeling unrefreshed regardless of hours spent in bed.</p>

<h3>Evidence-Based Improvements</h3>
<p>The most powerful interventions are also the most unsexy: consistent sleep and wake times (even on weekends), a bedroom kept cool (around 18°C), no screens for 60 minutes before bed, and daylight exposure within an hour of waking to anchor your circadian rhythm. Simple. Difficult. Transformative.</p>`,
  },
];

module.exports = async function blogSeed() {
  for (const post of posts) {
    const slug = slugify(post.title, { lower: true, strict: true });
    const exists = await Blog.findOne({ slug });
    if (!exists) {
      await Blog.create({ ...post, slug, published: true });
      console.log(`📝  Blog seeded: "${post.title.substring(0, 50)}…"`);
    }
  }
};
