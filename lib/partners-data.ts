export interface PartnerActivation {
  brand: string;
  campaign: string;
  tagline: string;
  description: string;
  logo: string;
  isLocalLogo: boolean;
  media: 
    | { type: 'video'; url: string }
    | { type: 'images'; ids: string[] };
}

export const PARTNER_ACTIVATIONS: PartnerActivation[] = [
  {
    brand: "Standard Chartered",
    campaign: "The Official Marathon Prep",
    tagline: "Endurance & Training Integration",
    description: "As the city geared up for the Standard Chartered Nairobi Marathon, we became the official on-the-ground training community. We hosted curated long runs, providing pacer groups and route intelligence to get hundreds of runners race-day ready.",
    logo: "we-run-nairobi/logos/stanchart",
    isLocalLogo: false,
    media: {
      type: 'video',
      url: "https://res.cloudinary.com/dsfgfu2kn/video/upload/v1771573706/stanchart_e6b0sl.mp4" 
    }
  },
  {
    brand: "Red Bull",
    campaign: "Wings for the Long Run",
    tagline: "Energy & Hydration",
    description: "Red Bull didn't just hand out flyers; they became part of the infrastructure. By setting up a branded energy station at the critical 15KM mark of our weekend long run, they provided actual value to exhausted athletes when they needed it most.",
    logo: "/logos/redbull.svg",
    isLocalLogo: true,
    media: {
      type: 'video',
      url: "https://res.cloudinary.com/dsfgfu2kn/video/upload/v1771573704/redbull_rp5lrh.mp4" 
    }
  },
  {
    brand: "Nivea",
    campaign: "Ultimate Sun Protection",
    tagline: "Pre-Run Skin Defense",
    description: "Running under the Nairobi sun requires serious protection. Nivea integrated seamlessly into our pre-run warmups, providing SPF application stations and educating runners on the importance of UV defense during high-exposure urban runs.",
    logo: "we-run-nairobi/logos/nivea",
    isLocalLogo: false,
    media: {
      type: 'video',
      url: "https://res.cloudinary.com/dsfgfu2kn/video/upload/v1771573714/nivea_qhaqjt.mp4" 
    }
  },
  {
    brand: "On Running",
    campaign: "CloudTec Try-On Experience",
    tagline: "Product Seeding & Testing",
    description: "We transformed our tempo run into a live testing ground. Runners swapped their daily trainers for On Running shoes, feeling the CloudTec technology in a real urban environment rather than a static retail store.",
    logo: "/logos/onlogo.svg",
    isLocalLogo: true,
    media: {
      type: 'video',
      url: "https://res.cloudinary.com/dsfgfu2kn/video/upload/v1771573709/ON_cvjapp.mp4" 
    }
  },
  {
    brand: "BaoBox",
    campaign: "The Cool-Down Hub",
    tagline: "Post-Run Recovery & Community",
    description: "The run doesn't end at the finish line. BaoBox became our official post-run sanctuary. By offering tailored runner's breakfast packages and a dedicated space, they captured a highly engaged audience for over two hours post-activity.",
    logo: "we-run-nairobi/logos/baobox",
    isLocalLogo: false,
    media: {
      type: 'images',
      ids: [
        "we-run-nairobi/gallery/baobox-1",
        "we-run-nairobi/gallery/baobox-2",
        "we-run-nairobi/gallery/baobox-3"
      ]
    }
  },
  {
    brand: "Beer District",
    campaign: "Track & Taps",
    tagline: "Social Mixer & Lifestyle",
    description: "Bridging the gap between fitness and lifestyle, Beer District hosted our Friday evening social runs. It proved that the WRN community is just as valuable to the hospitality sector as it is to the sports sector.",
    logo: "we-run-nairobi/partners/BDlogo.png",
    isLocalLogo: false,
    media: {
      type: 'images',
      ids: [
        "we-run-nairobi/BD/3",
        "we-run-nairobi/BD/2",
        "we-run-nairobi/BD/1"
      ]
    }
  },
  {
    brand: "Barbados",
    campaign: "The Finish Line Fiesta",
    tagline: "Premium Event Hosting",
    description: "For our milestone runs, Barbados provided a premium hosting experience. Their venue offered the perfect backdrop for our community to celebrate achievements, proving the spending power of the Nairobi urban athlete.",
    logo: "we-run-nairobi/partners/barbados",
    isLocalLogo: false,
    media: {
      type: 'images',
      ids: [
        "barb4_pjobwe",
        "barb2_aurapd",
        "barb3_vnlcs0"
      ]
    }
  },
  {
    brand: "KOFISI",
    campaign: "The Riverside Flow",
    tagline: "Official Workspace Partner",
    description: "Serving as the home base for our Riverside route, KOFISI provides a premium environment that perfectly bridges professional life and athletic wellness. Their sophisticated spaces offer our community the ultimate pre- and post-run experience.",
    logo: "KOFISI-Logo_g5lmi3",
    isLocalLogo: false,
    media: {
      type: 'images',
      ids: [
        "we-run-nairobi/kofisi/1",
        "we-run-nairobi/kofisi/6",
        "we-run-nairobi/kofisi/7"
      ]
    }
  },
  
  {
    brand: "Itel",
    campaign: "Pace & Power",
    tagline: "Tech Integration",
    description: "Itel activated their new wearables lineup directly with our pacing team. By equipping our run leads with their latest smartwatches, they achieved organic, high-visibility product placement throughout the entire route.",
    logo: "we-run-nairobi/logos/itel",
    isLocalLogo: false,
    media: {
      type: 'images',
      ids: [
        "we-run-nairobi/gallery/itel-1",
        "we-run-nairobi/gallery/itel-2",
        "we-run-nairobi/gallery/itel-3"
      ]
    }
  },
  
];