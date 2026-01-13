// app/lib/blogPosts.ts

export type BlogCategory = "Tips" | "Promotions" | "Behind the Scenes" | "Guides";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO ili bilo koji string (npr. "2026-01-13")
  coverImage: string; // local path ili remote url
  content: Array<
    | { type: "paragraph"; text: string }
    | { type: "image"; src: string; alt: string }
    | { type: "video"; youtubeId: string; title?: string }
    | { type: "code"; language?: string; code: string }
    | { type: "list"; items: string[] }
    | { type: "quote"; text: string }
  >;
  tags: string[];
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Tips",
  "Promotions",
  "Behind the Scenes",
  "Guides",
];

// IMPORTANT:
// - Za lokalne slike: stavi ih u /public/blog/ pa koristi npr. "/blog/post-1.jpg"
// - Ako koristiš remote (Unsplash) i Next <Image>, trebaš dodati domain u next.config.js.
//   Da izbjegnemo greške, ovdje koristimo obican <img> u komponentama.

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-keep-your-car-clean-in-split",
    title: "How to Keep Your Car Clean (Split Edition)",
    excerpt:
      "Simple routines that keep your car looking fresh even with salty air, dust, and city driving.",
    category: "Tips",
    date: "2026-01-13",
    coverImage: "/blog/cover-1.jpg",
    tags: ["wash", "maintenance", "split"],
    content: [
      {
        type: "paragraph",
        text: "Split is beautiful — but salty air + dust can make your paint look tired fast. Here are a few habits that make a big difference.",
      },
      {
        type: "list",
        items: [
          "Quick rinse after seaside drive (especially wheels)",
          "Microfiber towel only (avoid gas station brushes)",
          "Wax/sealant every 6–8 weeks for protection",
        ],
      },
      {
        type: "image",
        src: "/blog/post-1.jpg",
        alt: "Car wash foam on car",
      },
      {
        type: "quote",
        text: "Clean car isn’t about perfection — it’s about consistent protection.",
      },
      {
        type: "paragraph",
        text: "If you want the easiest method: book a Basic Wash weekly and do a quick interior wipe between visits.",
      },
    ],
  },
  {
    slug: "basic-vs-premium-wash-whats-the-real-difference",
    title: "Basic vs Premium Wash — What’s the Real Difference?",
    excerpt:
      "Not sure which wash to choose? Here’s what you actually get and who each option is for.",
    category: "Guides",
    date: "2026-01-10",
    coverImage: "/blog/cover-2.jpg",
    tags: ["basic wash", "premium wash"],
    content: [
      {
        type: "paragraph",
        text: "Both washes clean your car — but Premium adds protection + deeper finish. Here’s the short version.",
      },
      {
        type: "list",
        items: [
          "Basic: exterior wash + dry (fast and effective)",
          "Premium: wash + wax protection + tire shine + interior vacuum",
          "Best pick if you drive daily: Premium every 2–3 weeks",
        ],
      },
      {
        type: "image",
        src: "/blog/post-2.jpg",
        alt: "Car being washed with pressure washer",
      },
    ],
  },
  {
    slug: "ceramic-coating-is-it-worth-it",
    title: "Ceramic Coating: Is It Worth It?",
    excerpt:
      "We break down the benefits, what it protects against, and when it makes sense to invest.",
    category: "Guides",
    date: "2026-01-08",
    coverImage: "/blog/cover-3.jpg",
    tags: ["ceramic", "protection", "detailing"],
    content: [
      {
        type: "paragraph",
        text: "Ceramic coating is a long-lasting protective layer that makes washing easier and adds gloss. It’s not magic — but it’s very effective.",
      },
      {
        type: "list",
        items: [
          "Hydrophobic effect (water beads and slides)",
          "Less dirt sticking to paint",
          "UV + chemical resistance (better long-term look)",
        ],
      },
      {
        type: "image",
        src: "/blog/post-3.jpg",
        alt: "Detailing interior with glove",
      },
      {
        type: "paragraph",
        text: "If you want maximum shine and less maintenance — ceramic is your best option.",
      },
    ],
  },
  {
    slug: "behind-the-scenes-full-detailing-process",
    title: "Behind the Scenes: Full Detailing Process (Step-by-Step)",
    excerpt:
      "A quick walkthrough of what really happens during a full detail — from interior to paint correction.",
    category: "Behind the Scenes",
    date: "2026-01-06",
    coverImage: "/blog/cover-4.jpg",
    tags: ["full detailing", "process"],
    content: [
      {
        type: "paragraph",
        text: "Full detailing is not just a wash — it’s a deep clean + refinement. Here’s the process we follow.",
      },
      {
        type: "list",
        items: [
          "Deep interior vacuum + upholstery cleaning",
          "Surface decontamination",
          "Paint correction (where needed)",
          "Protection layer (wax/sealant)",
        ],
      },
      {
        type: "image",
        src: "/blog/post-4.jpg",
        alt: "Polishing car paint",
      },
    ],
  },
  {
    slug: "promo-weekend-deal-20-off-premium",
    title: "Weekend Deal: 20% Off Premium Wash",
    excerpt:
      "This weekend only — get Premium Wash with wax protection and interior vacuum at a special price.",
    category: "Promotions",
    date: "2026-01-05",
    coverImage: "/blog/cover-5.jpg",
    tags: ["promo", "discount", "premium wash"],
    content: [
      {
        type: "paragraph",
        text: "Limited weekend promo for Premium Wash. Perfect if you want that fresh, glossy finish.",
      },
      {
        type: "quote",
        text: "Book early — slots go fast on Saturdays.",
      },
      {
        type: "image",
        src: "/blog/post-5.jpg",
        alt: "Car wash bay",
      },
      {
        type: "paragraph",
        text: "Mention 'PITSTOP20' when booking (for now demo only — backend later).",
      },
    ],
  },
  {
    slug: "quick-checklist-before-you-book",
    title: "Quick Checklist Before You Book",
    excerpt:
      "Save time and get the best result — here’s what helps our team deliver a perfect service.",
    category: "Tips",
    date: "2026-01-03",
    coverImage: "/blog/cover-6.jpg",
    tags: ["booking", "tips"],
    content: [
      {
        type: "paragraph",
        text: "These small things help us finish faster and cleaner.",
      },
      {
        type: "list",
        items: [
          "Remove valuables from visible areas",
          "Empty the trunk if you want trunk cleaning",
          "Tell us about sensitive surfaces (matte wraps, fresh paint)",
        ],
      },
    ],
  },
  {
    slug: "embedding-video-demo",
    title: "Video: How We Apply Protection (Demo)",
    excerpt:
      "Short demo video embed (YouTube) to satisfy the requirement for video content in posts.",
    category: "Guides",
    date: "2026-01-02",
    coverImage: "/blog/cover-7.jpg",
    tags: ["video", "demo"],
    content: [
      {
        type: "paragraph",
        text: "Here’s a quick YouTube embed example. Later we can replace with your own video.",
      },
      {
        type: "video",
        youtubeId: "dQw4w9WgXcQ",
        title: "Protection demo (placeholder)",
      },
      {
        type: "paragraph",
        text: "When you record your own, just replace youtubeId with the new ID.",
      },
    ],
  },
  {
    slug: "code-snippet-booking-validation-example",
    title: "Code Snippet: Booking Validation (Example)",
    excerpt:
      "A small code snippet inside a post (required): demonstrates simple booking validation logic.",
    category: "Guides",
    date: "2026-01-01",
    coverImage: "/blog/cover-8.jpg",
    tags: ["code", "validation", "snippet"],
    content: [
      {
        type: "paragraph",
        text: "Example: on the backend we’ll later validate that date/time/service exist. Here’s a simplified snippet.",
      },
      {
        type: "code",
        language: "ts",
        code: `type Booking = {
  service: string;
  date: string;  // YYYY-MM-DD
  time: string;  // HH:mm
};

export function validateBooking(b: Booking) {
  if (!b.service?.trim()) return { ok: false, error: "Service is required" };
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(b.date)) return { ok: false, error: "Invalid date format" };
  if (!/^\\d{2}:\\d{2}$/.test(b.time)) return { ok: false, error: "Invalid time format" };
  return { ok: true };
}`,
      },
      {
        type: "paragraph",
        text: "Ovo je samo demo. Kasnije ćemo ovo spustit u API route i spojit s CMS/DB.",
      },
    ],
  },
  // Dodatni postovi da bude “veći broj”
  {
    slug: "winter-care-salt-and-wheels",
    title: "Winter Care: Salt, Wheels, and Undercarriage",
    excerpt:
      "Zimi najveći problem nije blato nego sol. Evo kako zaštitit felge i podvozje.",
    category: "Tips",
    date: "2025-12-28",
    coverImage: "/blog/cover-9.jpg",
    tags: ["winter", "wheels", "salt"],
    content: [
      { type: "paragraph", text: "Sol se najviše hvata na felge i podvozje. Ako to ignoriraš, korozija je realna." },
      { type: "list", items: ["Često ispiranje felgi", "Zaštitni premaz", "Brzi underbody rinse (kad možeš)"] },
    ],
  },
  {
    slug: "interior-smells-how-to-fix",
    title: "Interior Smells: What Actually Works",
    excerpt:
      "Brzi savjeti za mirise u autu — bez parfema koji samo maskira problem.",
    category: "Tips",
    date: "2025-12-20",
    coverImage: "/blog/cover-10.jpg",
    tags: ["interior", "cleaning"],
    content: [
      { type: "paragraph", text: "Mirisi dolaze iz izvora: tkanina, klima, tepisi. Rješenje je deep clean + neutralizacija." },
      { type: "list", items: ["Očisti filter klime", "Ukloni vlagu iz tepiha", "Upholstery cleaning (po potrebi)"] },
    ],
  },
  {
    slug: "paint-swirls-and-how-we-reduce-them",
    title: "Paint Swirls: Why They Happen & How We Reduce Them",
    excerpt:
      "Zašto se pojavljuju swirlovi i kako pravilna tehnika pranja spašava lak.",
    category: "Guides",
    date: "2025-12-12",
    coverImage: "/blog/cover-11.jpg",
    tags: ["paint", "swirls"],
    content: [
      { type: "paragraph", text: "Swirlovi nastaju najčešće od krive spužve i krivog sušenja. Mikrovlakna + pravilna tehnika čine razliku." },
      { type: "image", src: "/blog/post-6.jpg", alt: "Close-up of car paint" },
    ],
  },
  {
    slug: "new-tooling-in-the-shop",
    title: "New Tools in the Shop",
    excerpt:
      "Što smo novo ubacili u proces (bolji rezultati, manje vremena).",
    category: "Behind the Scenes",
    date: "2025-12-01",
    coverImage: "/blog/cover-12.jpg",
    tags: ["shop", "tools"],
    content: [
      { type: "paragraph", text: "Uveli smo nove nastavke i bolju rasvjetu za preciznije detailing rezultate." },
      { type: "quote", text: "Bolji alat + bolji proces = bolji rezultat." },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
