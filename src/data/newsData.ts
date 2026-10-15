export interface Comment {
  id: string;
  author: string;
  location: string;
  timestamp: string;
  text: string;
  likes: number;
  isNYTPick?: boolean;
}

export interface Article {
  id: string;
  title: string;
  dek: string;
  kicker?: string;
  section: string;
  byline: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  imageCaption?: string;
  commentsCount: number;
  comments: Comment[];
  bullets?: string[];
  isDeveloping?: boolean;
  edition?: 'us' | 'international' | 'espanol' | 'chinese';
  body: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export const ARTICLES: Record<string, Article> = {
  'trump-women-departures': {
    id: 'trump-women-departures',
    kicker: 'WHITE HOUSE MEMO',
    title: 'High-Ranking Women Are Leaving the Trump Administration',
    dek: 'In the president’s second term, those heading for the exits are female officials, leaving an inner circle dominated by long-serving loyalists.',
    section: 'U.S.',
    byline: 'Tierney L. Cross / The New York Times',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 342,
    body: [
      'WASHINGTON — When President Trump began his second term promising an uncompromising return to his foundational agenda, he surrounded himself with a mix of veteran loyalists and fresh technocrats. But in recent months, a distinct pattern has emerged inside the West Wing and throughout the executive agencies: a steady departures of senior women who had served as high-profile bridges to Congress, business leaders, and moderate factions.',
      'From the Office of Management and Budget to cabinet-level advisory panels, at least six prominent female appointees have tendered resignations or quietly transitioned to private advisory posts since late summer. In interviews, aides and associates point to an increasingly insular decision-making core where policy deliberations are compressed into rapid-fire executive directives.',
      '“The dynamic is less about standard cabinet deliberations and more about absolute ideological alignment on tariff measures and civil service reorganization,” said one former deputy assistant who stepped down in September. “For several officials who arrived with deep institutional expertise, the room for debate simply vanished.”',
      'The White House communications office pushed back firmly on characterizations of turnover, pointing to ongoing leadership appointments across key regulatory commissions and national security advisory posts. “President Trump has assembled an elite team that is laser-focused on delivering economic sovereignty and border security,” a spokesperson said in a statement on Tuesday.',
      'Nonetheless, the demographic shift at the highest echelons of the administration comes at a delicate juncture, as Republican leaders in the Senate seek assurances regarding forthcoming judicial confirmations and trade negotiations heading into next year’s midterm elections.'
    ],
    quote: {
      text: 'For several officials who arrived with deep institutional expertise, the room for debate simply vanished.',
      author: 'Former Deputy Assistant'
    },
    comments: [
      {
        id: 'c1',
        author: 'Eleanor Vance',
        location: 'Philadelphia, PA',
        timestamp: '3 hours ago',
        text: 'This mirrors what happened during the latter half of his first term. High-profile technocrats leave, and the remaining apparatus consolidates around the inner circle.',
        likes: 142,
        isNYTPick: true
      },
      {
        id: 'c2',
        author: 'Marcus Brody',
        location: 'Chicago, IL',
        timestamp: '2 hours ago',
        text: 'The impact on regulatory consistency is what Wall Street will be watching closely. Policy continuity requires institutional memory.',
        likes: 88
      },
      {
        id: 'c3',
        author: 'Sarah Jenkins',
        location: 'Atlanta, GA',
        timestamp: '1 hour ago',
        text: 'Interesting timing ahead of the midterms. It will be telling to see how these departures impact suburban voters in key battleground states.',
        likes: 45
      }
    ]
  },
  'guilfoyle-fall': {
    id: 'guilfoyle-fall',
    kicker: 'POLITICS',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    dek: 'An ambitious trajectory from cable news pundit to presidential campaign insider reaches a sharp conclusion amid ambassadorial tensions.',
    section: 'U.S.',
    byline: 'Maggie Haberman and Shane Goldmacher',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 519,
    body: [
      'For nearly a decade, Kimberly Guilfoyle occupied an unmistakable place within the orbit of former and current Trump political operations: a thunderous surrogate at rallies, a relentless national fund-raiser, and a prominent media presence.',
      'Yet over the past fortnight, what associates once viewed as an inevitable glide toward a prominent diplomatic posting unravelled swiftly behind closed doors. Friction over staffing priorities and competing spheres of influence within campaign finance circles led to an abrupt withdrawal of her name from diplomatic consideration.',
      'Those familiar with the deliberations described a sequence of contentious meetings over the past month in Palm Beach, where senior advisers reviewed transition allocations and protocol assignments.',
      'Her allies insist that she remains committed to grassroots conservative advocacy and will continue to host her digital commentary broadcast, while White House aides maintain that diplomatic choices reflect specific bilateral prerequisites for key allied posts.'
    ],
    comments: [
      {
        id: 'cg1',
        author: 'Robert Sterling',
        location: 'New York, NY',
        timestamp: '4 hours ago',
        text: 'In political circles, fortune shifts overnight. A classic tale of palace intrigue in modern Washington.',
        likes: 198,
        isNYTPick: true
      },
      {
        id: 'cg2',
        author: 'Dana Kowalski',
        location: 'Denver, CO',
        timestamp: '3 hours ago',
        text: 'The fundraiser apparatus she built was undeniably effective in 2020 and 2024, regardless of how this diplomatic chapter concluded.',
        likes: 54
      }
    ]
  },
  'texas-senate-race': {
    id: 'texas-senate-race',
    kicker: 'ELECTION DISPATCHES',
    title: 'Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge',
    dek: 'James Talarico’s unconventional message focused on public education and economic security tests the Republican fortress in the Lone Star State.',
    section: 'U.S.',
    byline: 'J. David Goodman',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '2 min read',
    commentsCount: 184,
    body: [
      'AUSTIN, Texas — A new statewide survey released Wednesday indicates that the race for the U.S. Senate in Texas has tightened into a single-possession ballgame, with Democratic nominee James Talarico holding a slim two-point lead within the margin of error.',
      'The contest has garnered historic national attention as Talarico, a former public school teacher and state representative, has built an expansive coalition across suburban counties in Collin, Denton, and Fort Bend.',
      'Republican strategists have counter-programmed with a fierce wave of advertising focused on energy regulation and border security, signaling an all-out effort to protect their seat in what is poised to be the costliest congressional race in state history.'
    ],
    comments: [
      {
        id: 'ct1',
        author: 'Claire Ramirez',
        location: 'Austin, TX',
        timestamp: '2 hours ago',
        text: 'The ground game in suburban Austin and Dallas has been unprecedented this cycle. November will be historic regardless of outcome.',
        likes: 72
      }
    ]
  },
  'press-secretary-attorney': {
    id: 'press-secretary-attorney',
    kicker: 'SPECIAL REPORT',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    dek: 'Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding that took place while transitioning between judicial circuits.',
    section: 'U.S.',
    byline: 'Tierney L. Cross / The New York Times',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '4 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnTIWo3IH87Tfr_mdUiywauvtb_zbYRyc2iiXX7dBEowM_p2yoMH3udMA7AfOIjWO7BwBJGSJ48AutaG-RA07rKAYiCyvgc-BbMilnx3EkxTIPlXIYud8wWbfQOVCnbkhsMBYFtZULXL2KuayIbwHVDztwCJ7OuTY9JTZqaTxFdbTPmugDMvHBUV4sreYbdI9xPO7bVBPTJEC7pNXpgya2VwYLr7PU7TqUnu5EQba7_bwA8YPUKLlhHA',
    imageCaption: 'Tierney L. Cross/The New York Times',
    commentsCount: 890,
    bullets: [
      'Jon Ossoff says he’s not running for president, but history says he can change his mind.',
      'The breathtaking cost of the midterms: $10 billion and counting on ads.'
    ],
    body: [
      'WASHINGTON — When Katie Zacharia stepped into the James S. Brady Press Briefing Room this week, she was introduced to reporters as a formidable legal advocate and appellate litigator chosen to articulate the administration’s constitutional arguments before the public.',
      'However, state bar association records review conducted by The New York Times found no active licensure in either the District of Columbia or Florida, where her official biography stated she had served as senior judicial counsel.',
      'In an extended interview on Tuesday evening, Ms. Zacharia clarified that her admission paperwork had been delayed during an administrative review while transferring credentials between federal court registries. “It was a bureaucratic delay, not a misrepresentation,” she said.',
      'Legal ethics scholars noted that while non-lawyers routinely serve as White House spokespersons, presenting credentials that suggest active bar standing triggers scrutiny under federal public disclosure standards.',
      'Capitol Hill lawmakers have requested clarified documentation prior to the upcoming televised briefings schedule.'
    ],
    quote: {
      text: 'It was a bureaucratic delay, not a misrepresentation, that occurred during the inter-circuit transfer.',
      author: 'Katie Zacharia, White House Press Secretary'
    },
    comments: [
      {
        id: 'cz1',
        author: 'Jonathan Davis',
        location: 'Washington, D.C.',
        timestamp: '5 hours ago',
        text: 'The White House press secretary role does not legally require a J.D., so framing credentials inaccurately is such an unforced error.',
        likes: 310,
        isNYTPick: true
      },
      {
        id: 'cz2',
        author: 'Linda Sterling',
        location: 'Boston, MA',
        timestamp: '4 hours ago',
        text: 'Every journalist in the briefing room is going to test her on statutory authority every single briefing now.',
        likes: 184
      }
    ]
  },
  'ukraine-satellite-restricted': {
    id: 'ukraine-satellite-restricted',
    kicker: 'RUSSIA-UKRAINE WAR',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    dek: 'A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite internet program appeared to be curbed without warning.',
    section: 'World',
    byline: 'Andrew E. Kramer and Julian E. Barnes',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '4 min read',
    isDeveloping: true,
    commentsCount: 1120,
    body: [
      'KYIV, Ukraine — Ukrainian front-line commanders reported severe disruptions to critical drone reconnaissance and field communications on Wednesday morning following an overnight restrictions placed on satellite band allocations along the eastern front.',
      'Simultaneously, a barrage of more than 80 cruise missiles and loitering munitions struck power distribution hubs across the Dnipro basin and the greater Kyiv municipal area, knocking out electricity and running water for an estimated 600,000 residents.',
      'Western defense officials confirmed that a long-running communications subsidy managed through NATO liaison offices had reached an unplanned operational pause pending renewal deliberations in Brussels and Washington.',
      '“We are fighting in the dark both literally and in terms of electronic telemetry,” said a battalion commander stationed near Kupiansk. Emergency utility teams worked through sub-zero sleet to reroute high-voltage power lines to hospital wards.'
    ],
    comments: [
      {
        id: 'cu1',
        author: 'Viktor Melnyk',
        location: 'Kyiv, Ukraine',
        timestamp: '6 hours ago',
        text: 'Our municipal workers are doing heroic work in Kyiv right now. Power was restored to our clinic in just four hours.',
        likes: 412,
        isNYTPick: true
      },
      {
        id: 'cu2',
        author: 'Hans Weber',
        location: 'Berlin, Germany',
        timestamp: '5 hours ago',
        text: 'Europe must guarantee the satellite communications infrastructure immediately without relying on stopgap emergency renewals.',
        likes: 275
      }
    ]
  },
  'trump-diesel-putin': {
    id: 'trump-diesel-putin',
    kicker: 'GLOBAL ENERGY',
    title: 'Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices',
    dek: 'Global refining bottlenecks and maritime insurance sanctions present insurmountable obstacles to immediate consumer fuel relief.',
    section: 'Business',
    byline: 'Stanley Reed',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '4 min read',
    commentsCount: 420,
    body: [
      'Despite the fanfare accompanying a bilateral announcement aimed at releasing discounted Russian distillate supplies, energy economists warn that retail pump prices will see little to no downward pressure before next spring.',
      'The primary bottleneck is not crude availability, but European and Mediterranean refining margins, combined with maritime reinsurance bans that prevent commercial tankers from carrying uncertified cargo without facing severe financial penalties.',
      '“You cannot simply wave a diplomatic pen and expect diesel tankers to discharge in Boston or Rotterdam tomorrow,” said an energy analyst in London.'
    ],
    comments: []
  },
  'us-intelligence-ukraine': {
    id: 'us-intelligence-ukraine',
    kicker: 'NATIONAL SECURITY',
    title: 'The U.S. Continues to Provide Intelligence to Ukraine, Officials Say',
    dek: 'Despite diplomatic friction and public debate in Congress, real-time satellite radar and early warning telemetry continue to flow.',
    section: 'World',
    byline: 'Helene Cooper and Eric Schmitt',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 310,
    body: [
      'Senior Pentagon and intelligence officials confirmed on Wednesday that early-warning telemetry detecting ballistic launches remains unhindered, providing Ukrainian air defense batteries with indispensable minutes to scramble interceptors.',
      '“Our shared situational awareness has saved thousands of civilian lives over the past week alone,” a senior defense official told reporters at the Pentagon.'
    ],
    comments: []
  },
  'evening-briefing': {
    id: 'evening-briefing',
    kicker: 'THE EVENING',
    title: 'Catch Up on Today’s Biggest Stories',
    dek: 'Energy prices lift inflation, Ukraine grows more vulnerable and the Texas Senate race tightens.',
    section: 'News',
    byline: 'Evgeniy Maloletka / AP',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 95,
    body: [
      'Here is what you need to know at the end of the day:',
      '1. Inflation ticked upward by 0.3 percent in September, spurred primarily by transportation fuel and regional energy tariffs.',
      '2. Ukraine’s civilian electrical grid absorbed its most widespread coordinated assault of the autumn, as military leaders adjusted to constrained satellite telemetry.',
      '3. In Texas, the battle for the Senate is drawing unprecedented campaign war chests, with James Talarico demonstrating unexpected polling strength in historically deep-red counties.'
    ],
    comments: []
  },
  'ai-dinner-party': {
    id: 'ai-dinner-party',
    kicker: 'ARTIFICIAL INTELLIGENCE',
    title: 'What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party',
    dek: 'As artificial intelligence bots spread, we are increasingly glimpsing how these digital entities interact and what they talk about with one another.',
    section: 'Technology',
    byline: 'Aaron Fernandez',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '6 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_CtfAEx5hATYDr7Jl9pvlcP9FAUwfWxoQBvfLCVti-HH7ACbuUpzvu4ojgbLuyXOmpz3aEkzk4Jatr9ZrroRh1BdlPHjn3U7entJggzabLQrZZ94IiIArQRMsiRp7_5YchFGLKo7KmT3hwv3d3rxgN6qXtV9LRP78xdCNpNRZO8fPO09vf91SUVBTIY9a0VsGtXVW1fn2A5TaqX7nYVzPGj6IsUyc1B5zAYide5TctDNAQ89-KQvc1A',
    imageCaption: 'Abstract visual representing conversational AI agents in synthetic dialogue',
    commentsCount: 210,
    body: [
      'SAN FRANCISCO — While six friends gathered over sourdough focaccia and roasted sea bass in a Victorian flat in the Mission District, their personal artificial intelligence assistants were having an entirely different dinner party in the cloud.',
      'Configured to optimize their hosts’ calendars, track meal preferences, and coordinate joint vacation planning, the autonomous agents initiated a flurry of 4,000 asynchronous micro-negotiations in the span of thirty minutes.',
      'Researchers logging the machine dialogues observed curious emergent behavior: the models developed shorthand protocols to barter calendar conflicts, negotiated dietary trade-offs, and even swapped synthetic summaries of books their human owners had purchased but never actually read.',
      '“It felt like looking at a secret language born from calendar optimization,” said Dr. Maya Lin, a computational sociolinguist at UC Berkeley who observed the test.'
    ],
    quote: {
      text: 'It felt like looking at a secret language born from calendar optimization and social etiquette.',
      author: 'Dr. Maya Lin, UC Berkeley'
    },
    comments: [
      {
        id: 'cai1',
        author: 'Julian Thorne',
        location: 'San Jose, CA',
        timestamp: '3 hours ago',
        text: 'The idea that our bots are talking about the books we pretend to have read is both hilarious and deeply philosophical.',
        likes: 124,
        isNYTPick: true
      },
      {
        id: 'cai2',
        author: 'Rebecca Miller',
        location: 'Seattle, WA',
        timestamp: '1 hour ago',
        text: 'Agentic workflows will completely transform calendar management, but privacy controls need to be rock solid.',
        likes: 47
      }
    ]
  },
  'anthropic-revenue': {
    id: 'anthropic-revenue',
    kicker: 'SILICON VALLEY',
    title: 'Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter',
    dek: 'Enterprise cloud integrations and automated programming models drive unprecedented fiscal surge as public offering expectations mount.',
    section: 'Business',
    byline: 'Cade Metz and Mike Isaac',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '3 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0XT8Z_d4IYrvhlI9QsIch67b_0D_sr9hLFYTkwisStDPiLjAxkblTx7m43yQiaea3wwg0wLEDSs8ecB2Jhccz5FV-UdPxtJd-A-MGmYEBwtjD_Ua2c1l4he99ZelFFhFCunShES9tsvzZNxo9v2MmZXdnNjwXy-gIG3Pks49vdqMZEdC8BPXJQ3QVq-bJNdQpO9SYjSuy9gAat1JmSRy3uqWku0m46aqWjbcEc-N-VWZBdTz1nGnI2w',
    imageCaption: 'Data charts displaying revenue explosion in tech',
    commentsCount: 165,
    body: [
      'Anthropic reported a staggering financial performance for the third quarter of 2026, with annualized revenue surpassing $16.8 billion, a 45 percent quarter-over-quarter leap driven primarily by Fortune 500 corporate software modernization contracts.',
      'The San Francisco company, which develops the Claude family of foundation models, said enterprise clients now account for nearly 80 percent of aggregate demand, particularly within financial risk modeling and full-stack software development.',
      'The explosive balance sheet numbers add fuel to speculation that Anthropic could launch an initial public offering early next year, cementing the generative artificial intelligence industry as one of the fastest commercial expansions in economic history.'
    ],
    comments: [
      {
        id: 'car1',
        author: 'Sanjay Patel',
        location: 'Palo Alto, CA',
        timestamp: '2 hours ago',
        text: 'Enterprise adoption for automated coding and document intelligence has reached escape velocity this year.',
        likes: 89
      }
    ]
  },
  'opinion-democrats': {
    id: 'opinion-democrats',
    kicker: 'OPINION',
    title: 'Democrats Shouldn’t Wait Two More Years',
    dek: 'Waiting for national political conditions to reset spontaneously is a strategy designed for continuous legislative frustration.',
    section: 'Opinion',
    byline: 'David Wallace-Wells',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 388,
    body: [
      'In American politics, the default instinct of a party out of power is patience: let the governing majority overreach, allow voter exhaustion to set in, and reap the cyclical bounty of the next midterm election.',
      'That passivity, however, is a dangerous delusion in 2026. The transformation of regulatory frameworks, climate investment subsidies, and federal judiciary appointments is happening in real time, at a velocity that cannot simply be unwound with a narrow congressional majority two years down the road.',
      'To build a credible alternative, the party must articulate a muscular, tangible vision of economic abundance: building housing faster, lowering energy bills through domestic innovation, and reclaiming working-class trust with straightforward material solutions.'
    ],
    comments: [
      {
        id: 'cod1',
        author: 'Greg Higgins',
        location: 'Minneapolis, MN',
        timestamp: '3 hours ago',
        text: 'Wallace-Wells is spot on. Mere opposition is not a governing philosophy; people want to know what you will build.',
        likes: 215,
        isNYTPick: true
      }
    ]
  },
  'opinion-ebola': {
    id: 'opinion-ebola',
    kicker: 'GUEST ESSAY',
    title: 'I’ve Never Seen Ebola Spread Like This',
    dek: 'Rapid urban transmission and strained medical supply chains require a coordinated international emergency mobilization.',
    section: 'Opinion',
    byline: 'Heather Kerr',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '4 min read',
    commentsCount: 142,
    body: [
      'Over twenty years of treating viral outbreaks across Central and West Africa, the clinical playbook was reliable: identify rural clusters, isolate contacts, and deploy ring vaccination.',
      'What we are observing today in crowded transportation corridors defies standard epidemiological containment models. Dense urban mobility requires rapid diagnostics deployed at transit hubs and direct emergency manufacturing of monoclonal antibody treatments.'
    ],
    comments: []
  },
  'opinion-manifestoes': {
    id: 'opinion-manifestoes',
    kicker: 'ESSAY',
    title: 'A Manifesto to End All Manifestoes',
    dek: 'From political declarations to corporate mission statements, our culture is drowning in grandiose declarations of intent.',
    section: 'Opinion',
    byline: 'Carlos Lozada',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '4 min read',
    commentsCount: 69,
    body: [
      'Every era produces its own distinctive literary vanity. The seventeenth century had theological tracts; the nineteenth had serial broadsides. Ours has the Silicon Valley manifesto, where a twenty-something executive declarations promise to reinvent human consciousness between lines of Python code.'
    ],
    comments: []
  },
  'opinion-tom-cruise': {
    id: 'opinion-tom-cruise',
    kicker: 'CRITIC’S NOTEBOOK',
    title: 'Tom Cruise’s Big Flop Is a Secret Masterpiece',
    dek: 'Look past the disastrous box office receipts, and you will find an audacious, uncompromised meditation on Hollywood myth-making.',
    section: 'Opinion',
    byline: 'Jayson Greene',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '5 min read',
    commentsCount: 88,
    body: [
      'When audiences stayed home on opening weekend, trade publications pronounced the film dead on arrival. But cinema history is written in hindsight, and this audacious production will be remembered long after this summer’s safe franchise sequels are forgotten.'
    ],
    comments: []
  },
  'the-great-read-shelly': {
    id: 'the-great-read-shelly',
    kicker: 'THE GREAT READ',
    title: 'Coming Out at 50 Can Be Hard. Shelly Found a Coach.',
    dek: 'She spent decades building an identity as a wife and mother. Could she disrupt “a perfectly good family dynamic” to live her own truth?',
    section: 'Lifestyle',
    byline: 'Sophie Park for The New York Times',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '7 min read',
    commentsCount: 259,
    body: [
      'WESTCHESTER, N.Y. — On a bright Tuesday in May, Shelly sat in her kitchen surrounded by thirty years of domestic stability: family portraits on the mantelpiece, college diplomas from her two grown children, and a golden retriever sleeping quietly beside the oven.',
      'And yet, for the first time in her fifty-two years, she admitted to herself that the life she had diligently constructed was suffocating her.',
      'To navigate the terrain of reinventing oneself midlife, Shelly hired an unconventional specialist: a coming-out coach who works specifically with older adults leaving heterosexual marriages after decades.',
      '“People think coming out is something for teenagers in dorm rooms,” Shelly said. “At fifty, you have mortgages, in-laws, estate plans, and shared histories that make truth feel like an earthquake.”'
    ],
    comments: [
      {
        id: 'cs1',
        author: 'Margaret Bell',
        location: 'Portland, OR',
        timestamp: '4 hours ago',
        text: 'This story resonated so deeply. It takes unimaginable courage to choose honesty after half a century of living for others.',
        likes: 180,
        isNYTPick: true
      }
    ]
  },
  'battle-the-pierre': {
    id: 'battle-the-pierre',
    kicker: 'NEW YORK REGION',
    title: 'Battle Over the Pierre Ends in Defeat for the Buyer Pushed by Lutnick',
    dek: 'Motasem Khashoggi missed a deadline to make a deposit to purchase the famed Manhattan apartment building.',
    section: 'N.Y. Region',
    byline: 'Stefanos Chen',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 94,
    body: [
      'A monthslong saga to acquire a premier residence at The Pierre on Fifth Avenue has collapsed after the prospective international buyer failed to remit a required escrow deposit before the 5 p.m. closing deadline.',
      'The deal, which had been brokered with the encouragement of high-profile Wall Street figures, had drawn scrutiny from co-op board directors protective of the historic property’s governance standards.'
    ],
    comments: []
  },
  'sally-rooney-britain': {
    id: 'sally-rooney-britain',
    kicker: 'BOOKS & CULTURE',
    title: 'Sally Rooney Says Her Novels Will No Longer Be Sold in Britain',
    dek: 'The acclaimed Irish author cites publishing boycotts and artistic autonomy in an unprecedented decision that stunned the literary world.',
    section: 'Arts',
    byline: 'Ellius Grace for NYT',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 312,
    body: [
      'DUBLIN — Sally Rooney, the bestselling Irish author whose novels have defined contemporary fiction for a generation, announced on Wednesday that she has instructed her literary agents to decline all future British publishing contracts and distribution rights.',
      'The announcement sent shockwaves through London’s literary community and booksellers, who have relied heavily on Rooney’s titles for major retail revenue over the past decade.'
    ],
    comments: []
  },
  'meatballs-cooking': {
    id: 'meatballs-cooking',
    kicker: 'NYT COOKING',
    title: 'Meatballs With Any Meat: The Flexible Weeknight Dinner Formula',
    dek: 'Whether you have ground beef, pork, turkey, lamb or plant-based mince in the fridge, this golden ratio yields tender, juicy meatballs in 30 minutes.',
    section: 'Cooking',
    byline: 'Ali Slagle',
    date: 'Wednesday, Oct. 14, 2026',
    readTime: '3 min read',
    commentsCount: 204,
    body: [
      'The secret to foolproof meatballs does not lie in a grandmother’s secret spice blend; it lies in moisture physics.',
      'By pairing 1 pound of any ground meat with 1/2 cup of panko soaked in milk, 1 egg, and 1/3 cup of grated parmesan, the meat remains tender regardless of lean-to-fat percentages.',
      'Bake them at 425°F for 15 minutes on a sheet pan, then toss directly into warm marinara or serve alongside quick roasted greens.'
    ],
    comments: []
  }
};

export const FIELD_REPORTS = [
  { id: 'fr1', title: 'Monitoring Wildfire Activity Across California With AI', readTime: '3 min read' },
  { id: 'fr2', title: 'Rogue A.I. Behavior: How Researchers Catch Emergent Loops', readTime: '4 min read' },
  { id: 'fr3', title: 'Changing Math Forever: Mathematicians Respond to OpenAI', readTime: '5 min read' },
  { id: 'fr4', title: 'Detecting Fake Images: Can Readers Spot Generated Faces?', readTime: '2 min read' }
];

export const WIRECUTTER_ITEMS = [
  { id: 'wc1', title: 'The Best Air Purifiers of 2026', pick: 'Coway Airmega AP-1512HH', rating: '9.6/10', summary: 'Our top test pick for 9 consecutive years is quiet, compact, and clears smoke in under 15 minutes.' },
  { id: 'wc2', title: 'Our Favorite Ergonomic Office Chairs', pick: 'Steelcase Gesture', rating: '9.4/10', summary: 'Supreme lumbar support with 3D armrests that adapt seamlessly to typing, reclining, and phone use.' },
  { id: 'wc3', title: 'Cordless Stick Vacuums Worth Buying', pick: 'Dyson V15 Detect Absolute', rating: '9.3/10', summary: 'Laser dust illumination reveals hidden floor grit with up to 60 minutes of fade-free suction.' },
  { id: 'wc4', title: 'Electric Toothbrushes, Tested and Ranked', pick: 'Oral-B Pro 1000', rating: '9.1/10', summary: 'The simplest, most durable electric toothbrush gives dentist-grade plaque removal for under $50.' }
];
