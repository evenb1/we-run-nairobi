const IK = "https://ik.imagekit.io/znzj2xg4q/we-run";

export interface PartnerActivation {
  brand: string;
  campaign: string;
  tagline: string;
  description: string;
  logo: string;
  isLocalLogo: boolean;
  media:
    | { type: 'video'; url: string }
    | { type: 'images'; urls: string[] };
}

export const PARTNER_ACTIVATIONS: PartnerActivation[] = [
  {
    brand: "Standard Chartered",
    campaign: "The Official Marathon Prep",
    tagline: "Endurance & Training Integration",
    description: "As the city geared up for the Standard Chartered Nairobi Marathon, we became the official on-the-ground training community. We hosted curated long runs, providing pacer groups and route intelligence to get hundreds of runners race-day ready.",
    logo: `${IK}/logos/stanchart_LEwiwLnTB.png`,
    isLocalLogo: false,
    media: {
      type: 'video',
      url: `${IK}/partners/stanchart_gh_P8CxHc.mp4`
    }
  },
  {
    brand: "Red Bull",
    campaign: "Wings for the Long Run",
    tagline: "Energy & Hydration",
    description: "Red Bull didn't just hand out flyers; they became part of the infrastructure. By setting up a branded energy station at the critical 15KM mark of our weekend long run, they provided actual value to exhausted athletes when they needed it most.",
    logo: `${IK}/logos/redbull_AJZaIl5sp.svg`,
    isLocalLogo: false,
    media: {
      type: 'video',
      url: `${IK}/partners/redbull_mnVOxlUSC.mp4`
    }
  },
  {
    brand: "Nivea",
    campaign: "Ultimate Sun Protection",
    tagline: "Pre-Run Skin Defense",
    description: "Running under the Nairobi sun requires serious protection. Nivea integrated seamlessly into our pre-run warmups, providing SPF application stations and educating runners on the importance of UV defense during high-exposure urban runs.",
    logo: `${IK}/logos/nivea_d-S0QA-Njp.png`,
    isLocalLogo: false,
    media: {
      type: 'video',
      url: `${IK}/partners/redbull_mnVOxlUSC.mp4`
    }
  },
  {
    brand: "On Running",
    campaign: "CloudTec Try-On Experience",
    tagline: "Product Seeding & Testing",
    description: "We transformed our tempo run into a live testing ground. Runners swapped their daily trainers for On Running shoes, feeling the CloudTec technology in a real urban environment rather than a static retail store.",
    logo: `${IK}/logos/onlogo_rEr_hITQh.svg`,
    isLocalLogo: false,
    media: {
      type: 'video',
      url: `${IK}/partners/ON_4N2YRfNEXg.mp4`
    }
  },
  {
    brand: "BaoBox",
    campaign: "The Cool-Down Hub",
    tagline: "Post-Run Recovery & Community",
    description: "The run doesn't end at the finish line. BaoBox became our official post-run sanctuary. By offering tailored runner's breakfast packages and a dedicated space, they captured a highly engaged audience for over two hours post-activity.",
    logo: `${IK}/logos/baobox_55DzumDyH.png`,
    isLocalLogo: false,
    media: {
      type: 'images',
      urls: [
        `${IK}/root/baobox_leWBKSxUU.webp`,
        `${IK}/BD/2_GlR8zs1EL.jpg`,
        `${IK}/BD/3_6Pm4L1kDQ.jpg`,
      ]
    }
  },
  {
    brand: "Beer District",
    campaign: "Track & Taps",
    tagline: "Social Mixer & Lifestyle",
    description: "Bridging the gap between fitness and lifestyle, Beer District hosted our Friday evening social runs. It proved that the WRN community is just as valuable to the hospitality sector as it is to the sports sector.",
    logo: `${IK}/partners/BDlogo_0fS6dFF-i.png`,
    isLocalLogo: false,
    media: {
      type: 'images',
      urls: [
        `${IK}/BD/3_6Pm4L1kDQ.jpg`,
        `${IK}/BD/2_GlR8zs1EL.jpg`,
        `${IK}/BD/1_O1saSAcr3.jpg`,
      ]
    }
  },
  {
    brand: "Barbados",
    campaign: "The Finish Line Fiesta",
    tagline: "Premium Event Hosting",
    description: "For our milestone runs, Barbados provided a premium hosting experience. Their venue offered the perfect backdrop for our community to celebrate achievements, proving the spending power of the Nairobi urban athlete.",
    logo: `${IK}/partners/barbados_ngRZlHH45.png`,
    isLocalLogo: false,
    media: {
      type: 'images',
      urls: [
        `${IK}/root/BARB_xtsaKGani.jpg`,
        `${IK}/root/2_wxiAt3MJn.png`,
        `${IK}/root/IMG_5326_srC6-nXPI.JPG`,
      ]
    }
  },
  {
    brand: "KOFISI",
    campaign: "The Riverside Flow",
    tagline: "Official Workspace Partner",
    description: "Serving as the home base for our Riverside route, KOFISI provides a premium environment that perfectly bridges professional life and athletic wellness. Their sophisticated spaces offer our community the ultimate pre- and post-run experience.",
    logo: `${IK}/karura/KOFISI-Logo_5UEekSziw.png`,
    isLocalLogo: false,
    media: {
      type: 'images',
      urls: [
        `${IK}/kofisi/1_6ryp5opuq.jpg`,
        `${IK}/kofisi/6_JSJY9gMt2.jpg`,
        `${IK}/kofisi/7_vfx74wyKpf.jpg`,
      ]
    }
  },
  {
    brand: "Itel",
    campaign: "Pace & Power",
    tagline: "Tech Integration",
    description: "Itel activated their new wearables lineup directly with our pacing team. By equipping our run leads with their latest smartwatches, they achieved organic, high-visibility product placement throughout the entire route.",
    logo: `${IK}/logos/itel__WiYMIlwY.webp`,
    isLocalLogo: false,
    media: {
      type: 'images',
      urls: [
        `${IK}/kofisi/1_6ryp5opuq.jpg`,
        `${IK}/kofisi/2_ym280Wi0N.jpg`,
        `${IK}/kofisi/3_Ffv8t1tn1.jpg`,
      ]
    }
  },
];