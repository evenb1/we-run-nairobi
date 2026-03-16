import { Navigation, ArrowRight, MapPin, LucideIcon } from 'lucide-react';

export interface RunStat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface RunType {
  id: string;
  title: string;
  location: string;
  meetingPoint: string;
  description: string;
  longDescription: string;
  time: string;
  distances: string;
  stats: RunStat[];
  image: string;
  gallery: string[];
  routeImage: string;
  mapUrl: string;
  mapEmbed: string;
}

const IK = "https://ik.imagekit.io/znzj2xg4q/we-run";

export const RUNS: RunType[] = [
  {
    id: 'karura',
    title: 'KARURA FOREST',
    location: 'Gate A, Limuru Rd',
    meetingPoint: 'Field next to Tennis Courts',
    description: 'Trail running through nature. Meet at the field next to tennis courts.',
    longDescription: 'Experience the lungs of Nairobi. Our Karura runs take you through shaded canopy trails, waterfalls, and caves. Perfect for those looking to escape the tarmac and embrace the dirt.',
    time: '7:30 AM',
    distances: '5 / 10 / 15 KM',
    stats: [
      { label: 'Terrain', value: 'Technical Trail', icon: Navigation },
      { label: 'Elevation', value: '120m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Dirt/Hardpack', icon: MapPin },
    ],
    image: `${IK}/karura/karura_oU_KVKcYL.jpeg`,
    gallery: [
      `${IK}/karura/karura_oU_KVKcYL.jpeg`,
    ],
    routeImage: `${IK}/karura/2021-09-15_1YHTB4g9Ib.png`,
    mapUrl: 'https://maps.app.goo.gl/BFyQADiYyWiwbV9T6',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8730088627435!2d36.81462977577999!3d-1.2472603355863843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170000b39e3b%3A0x5c64ec570397e766!2sKarura%20Forest%20Gate%20A!5e0!3m2!1sen!2ske!4v1771344794588!5m2!1sen!2ske'
  },
  {
    id: 'bao-box',
    title: 'BAO BOX RUN',
    location: 'Gen. Mathenge Dr',
    meetingPoint: 'Bao Box Terrace',
    description: 'Urban run along General Mathenge ending with good vibes and food.',
    longDescription: 'A high-energy urban route through the heart of Westlands. We start and finish at Bao Box, where the energy is high and the community is even higher.',
    time: '7:30 AM',
    distances: '6 / 10 / 15 KM',
    stats: [
      { label: 'Pace', value: 'Sub 5:00 - 7:00', icon: Navigation },
      { label: 'Elevation', value: '115m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Tarmac', icon: MapPin },
    ],
    image: `${IK}/root/baobox_leWBKSxUU.webp`,
    gallery: [
      `${IK}/root/baobox_leWBKSxUU.webp`,
      `${IK}/BD/2_GlR8zs1EL.jpg`,
      `${IK}/BD/3_6Pm4L1kDQ.jpg`,
      `${IK}/BD/4_ekOfJferi.jpg`,
      `${IK}/BD/5_cCzfHDuJr.jpg`,
    ],
    routeImage: `${IK}/root/baobox_leWBKSxUU.webp`,
    mapUrl: 'https://maps.app.goo.gl/EzzDXYSEmSCXsoGHA',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.86831692985!2d36.787195375779895!3d-1.2503519355895827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173a1357bc9b%3A0x6b8743e1274c418e!2sBao%20Box!5e0!3m2!1sen!2ske!4v1771344941562!5m2!1sen!2ske'
  },
  {
    id: 'beer-district',
    title: 'BEER DISTRICT',
    location: 'Delta Towers, Westlands',
    meetingPoint: 'Main Courtyard',
    description: 'Saturday run + dawn sessions at Delta Towers.',
    longDescription: 'The ultimate social run. Push your limits on the hilly terrain of Westlands and Riverside, then recover with the community at Beer District.',
    time: '7:30 AM',
    distances: '6 / 10 / 12 / 15 KM',
    stats: [
      { label: 'Pace', value: 'Social To Fast', icon: Navigation },
      { label: 'Elevation', value: '115m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Tarmac/Hills', icon: MapPin },
    ],
    image: `${IK}/BD/3_6Pm4L1kDQ.jpg`,
    gallery: [
      `${IK}/BD/3_6Pm4L1kDQ.jpg`,
      `${IK}/BD/2_GlR8zs1EL.jpg`,
      `${IK}/BD/4_ekOfJferi.jpg`,
      `${IK}/BD/5_cCzfHDuJr.jpg`,
      `${IK}/root/BARB_xtsaKGani.jpg`,
    ],
    routeImage: `${IK}/BD/3_6Pm4L1kDQ.jpg`,
    mapUrl: 'https://maps.app.goo.gl/Uh55EV9DnrtmXQj79',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8438435826797!2d36.79939537577996!3d-1.2663555356063454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17c9e6423597%3A0xf14948a5f019daa7!2s254%20Beer%20District!5e0!3m2!1sen!2ske!4v1771344988626!5m2!1sen!2ske'
  },
  {
    id: 'kofisi',
    title: 'KOFISI',
    location: 'Kofisi Square, Nairobi',
    meetingPoint: 'Kofisi Square',
    description: 'A premium riverside experience. Starting from the heart of Riverside Square.',
    longDescription: 'A premium riverside experience. Starting from the heart of Riverside Square, this route offers a mix of urban elevation and scenic garden paths.',
    time: '7:30 AM',
    distances: 'Up to 14KM',
    stats: [
      { label: 'Pace', value: '4:30 - 6:30', icon: Navigation },
      { label: 'Elevation', value: '114m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Tarmac/Trail', icon: MapPin },
    ],
    image: `${IK}/kofisi/1_6ryp5opuq.jpg`,
    gallery: [
      `${IK}/kofisi/1_6ryp5opuq.jpg`,
      `${IK}/kofisi/7_vfx74wyKpf.jpg`,
      `${IK}/kofisi/4_eb0yvBFyEQ.jpg`,
      `${IK}/kofisi/5_rQk2BTf1q.jpg`,
      `${IK}/kofisi/6_JSJY9gMt2.jpg`,
    ],
    routeImage: `${IK}/kofisi/1_6ryp5opuq.jpg`,
    mapUrl: 'https://maps.app.goo.gl/5P1JrCnA2LF1CRPv7',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8396046809994!2d36.78698737578023!3d-1.2691069356092692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1714b5483c07%3A0x535f2b92a9c0cb03!2sKOFISI%20Square!5e0!3m2!1sen!2ske!4v1771344887962!5m2!1sen!2ske'
  }
];