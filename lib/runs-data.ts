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
  mapUrl: string;
  mapEmbed: string;
}

export const RUNS: RunType[] = [
  {
    id: 'karura',
    title: 'KARURA FOREST',
    location: 'Gate A, Limuru Rd',
    meetingPoint: 'KFEET Grounds',
    description: 'Trail running through nature. Meet at the field next to tennis courts.',
    longDescription: 'Experience the lungs of Nairobi. Our Karura runs take you through shaded canopy trails, waterfalls, and caves. Perfect for those looking to escape the tarmac and embrace the dirt.',
    time: '7:30 AM',
    distances: '5 / 10 / 15 KM',
    stats: [
      { label: 'Terrain', value: 'Technical Trail', icon: Navigation },
      { label: 'Elevation', value: '80m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Dirt/Hardpack', icon: MapPin },
    ],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560',
    gallery: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200',
        'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200',
        'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200',
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200',
    ],
    mapUrl: 'https://goo.gl/maps/karura',
    mapEmbed: 'https://www.google.com/maps/embed?pb=...' 
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
      { label: 'Elevation', value: '45m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Tarmac', icon: MapPin },
    ],
    image: '/baobox.webp',
    gallery: ['/baobox.webp', '/BD/2.jpg', '/BD/3.jpg', '/BD/4.jpg', '/BD/5.jpg'],
    mapUrl: 'https://goo.gl/maps/baobox',
    mapEmbed: 'https://www.google.com/maps/embed?pb=...'
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
      { label: 'Elevation', value: '150m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Tarmac/Hills', icon: MapPin },
    ],
    image: '/BD/3.jpg',
    gallery: ['/BD/3.jpg', '/BD/2.jpg', '/BD/4.jpg', '/BD/5.jpg', '/kofisi/1.jpg'],
    mapUrl: 'https://goo.gl/maps/beer-district',
    mapEmbed: 'https://www.google.com/maps/embed?pb=...'
  },
  {
    id: 'kofisi',
    title: 'KOFISI',
    location: 'Riverside Square, Nairobi',
    meetingPoint: 'Riverside Entrance',
    description: 'A premium riverside experience. Starting from the heart of Riverside Square.',
    longDescription: 'A premium riverside experience. Starting from the heart of Riverside Square, this route offers a mix of urban elevation and scenic garden paths.',
    time: '7:30 AM',
    distances: 'Up to 14KM',
    stats: [
      { label: 'Pace', value: '4:30 - 6:30', icon: Navigation },
      { label: 'Elevation', value: '120m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Tarmac/Trail', icon: MapPin },
    ],
    image: '/kofisi/1.jpg',
    gallery: ['/kofisi/1.jpg', '/BD/2.jpg', '/BD/3.jpg', '/BD/4.jpg', '/BD/5.jpg'],
    mapUrl: 'https://goo.gl/maps/kofisi',
    mapEmbed: 'https://www.google.com/maps/embed?pb=...'
  }
];