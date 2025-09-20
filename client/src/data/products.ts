export type Dimensions = {
  widthCm: number;
  heightCm: number;
  depthCm: number;
  weightKg?: number;
};

export type Product = {
  id: string;
  name: string;
  category: "Cookware" | "Blenders" | "Air Fryers" | "Coffee Makers";
  description: string;
  features: string[];
  dimensions: Dimensions;
  images: string[];
  videos: string[];
  amazonUrl: string;
};

export const products: Product[] = [
  {
    id: "cookware-ss-pro",
    name: "Stainless Steel Cookware Set",
    category: "Cookware",
    description:
      "Premium tri-ply stainless steel pots and pans engineered for even heating and long-lasting performance.",
    features: [
      "Tri-ply construction for optimal heat distribution",
      "Oven and induction safe",
      "Riveted stay-cool handles",
    ],
    dimensions: { widthCm: 32, heightCm: 18, depthCm: 32, weightKg: 7.2 },
    images: [
      "https://images.pexels.com/photos/31467781/pexels-photo-31467781.jpeg",
      "https://images.pexels.com/photos/3682218/pexels-photo-3682218.jpeg",
    ],
    videos: [
      "https://videos.pexels.com/video-files/7223593/7223593-hd_2048_1080_25fps.mp4",
    ],
    amazonUrl: "https://www.amazon.in/s?k=HomeElem+Stainless+Steel+Cookware+Set",
  },
  {
    id: "blender-speedmax",
    name: "SpeedMax High-Speed Blender",
    category: "Blenders",
    description:
      "Crushes ice and blends smoothies to perfection with a powerful motor and precision blades.",
    features: [
      "1200W motor with pulse",
      "BPA‑free Tritan jar",
      "5 pre-set programs",
    ],
    dimensions: { widthCm: 20, heightCm: 42, depthCm: 20, weightKg: 3.4 },
    images: [
      "https://images.pexels.com/photos/33389378/pexels-photo-33389378.jpeg",
      "https://images.pexels.com/photos/7964645/pexels-photo-7964645.jpeg",
    ],
    videos: [
      "https://videos.pexels.com/video-files/7963177/7963177-hd_1920_1080_25fps.mp4",
    ],
    amazonUrl: "https://www.amazon.in/s?k=HomeElem+High+Speed+Blender",
  },
  {
    id: "airfryer-crisp360",
    name: "Crisp360 Digital Air Fryer",
    category: "Air Fryers",
    description:
      "Healthy frying with up to 90% less oil. Digital presets and a spacious non-stick basket.",
    features: [
      "6L family size",
      "8 smart presets",
      "Removable dishwasher-safe basket",
    ],
    dimensions: { widthCm: 28, heightCm: 34, depthCm: 28, weightKg: 5.1 },
    images: [
      "https://images.pexels.com/photos/7061339/pexels-photo-7061339.jpeg",
      "https://images.pexels.com/photos/6962860/pexels-photo-6962860.jpeg",
    ],
    videos: [
      "https://videos.pexels.com/video-files/5780022/5780022-sd_360_640_24fps.mp4",
    ],
    amazonUrl: "https://www.amazon.in/s?k=HomeElem+Crisp+Air+Fryer",
  },
  {
    id: "coffee-brewpro",
    name: "BrewPro Drip Coffee Maker",
    category: "Coffee Makers",
    description:
      "Programmable drip brewer for consistently rich coffee, with reusable filter and auto‑shutoff.",
    features: [
      "Programmable timer",
      "Reusable mesh filter",
      "Keep-warm plate",
    ],
    dimensions: { widthCm: 23, heightCm: 33, depthCm: 20, weightKg: 2.9 },
    images: [
      "https://images.pexels.com/photos/6205737/pexels-photo-6205737.jpeg",
      "https://images.pexels.com/photos/17516410/pexels-photo-17516410.jpeg",
    ],
    videos: [
      "https://videos.pexels.com/video-files/4795016/4795016-sd_640_338_25fps.mp4",
    ],
    amazonUrl: "https://www.amazon.in/s?k=HomeElem+BrewPro+Coffee+Maker",
  },
];

export const categories = [
  "Cookware",
  "Blenders",
  "Air Fryers",
  "Coffee Makers",
] as const;
