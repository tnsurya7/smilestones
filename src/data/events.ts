export interface Event {
  id: string;
  title: string;
  date: string;
  location?: string;
  subtitle?: string;
  images: string[];
  category: 'parents-training' | 'pediatricians' | 'teaching-institutes';
}

export const events: Event[] = [
  // PARENTS TRAINING
  {
    id: 'gurgaon-2024',
    title: 'MY India (MISSION INDIA PROJECT) - PARENTS TRAINING',
    date: '2024-02-14',
    location: 'Gurgaon Program',
    images: [
      '/gurgaon-program5.jpg',
      '/7287a954-7940-49f6-9cca-4db37db0b942.jpg',
      '/c6fcaf62-0f54-4b36-8a74-714eb98704ee.jpg',
    ],
    category: 'parents-training',
  },
  {
    id: 'cochin-2024',
    title: 'Cochin Rotary Program for 2024',
    date: '2024-02-13',
    subtitle: 'MY India (MISSION INDIA PROJECT)',
    images: [
      '/cochin1.jpg',
      '/c0b57792-304e-45b9-8cb9-a8feafadcf47.jpg',
    ],
    category: 'parents-training',
  },
  {
    id: 'kolkata-2023',
    title: 'Kolkata Program February 2023',
    date: '2023-02-13',
    images: [
      '/kolkata1.jpg',
      '/98849268-a9bb-4589-b67b-a77a4a16c285.jpg',
    ],
    category: 'parents-training',
  },
  {
    id: 'rotary-madras-2022',
    title: 'Rotary Club Madras September 2022',
    date: '2022-09-15',
    subtitle: 'MY India (MISSION INDIA PROJECT) - TEACHING INSTITUTES',
    images: [
      '/rotary1.jpg',
      '/2abaa56d-f660-4925-8c58-23a869c508ce.jpg',
      '/5655cbe4-6c3c-45aa-ac0f-77abb8c1a6e8.jpg',
      '/68022e53-c10f-49f6-b899-9390a3f4ade7.jpg',
      '/84a49640-e9e6-48aa-bfc0-2b0783ef6663.jpg',
      '/91c3acb0-8c04-4e4c-a175-e119ec8627af.jpg',
      '/925ec947-2d3b-4095-af29-acfe7f272bf8.jpg',
      '/9d518e01-a679-4ea3-841a-768ea3ae5131.jpg',
    ],
    category: 'parents-training',
  },

  // PEDIATRICIANS
  {
    id: 'srm-nov-2024',
    title: 'November 2024 at SRM University',
    date: '2024-11-20',
    images: ['/events/srm2.jpg', '/events/srm3.jpg', '/events/srm4.jpg'],
    category: 'pediatricians',
  },
  {
    id: 'east-coast-2024',
    title: 'July 2024 East Cost Pedicon',
    date: '2024-07-19',
    images: ['/events/east1.jpg', '/events/east2.jpg'],
    category: 'pediatricians',
  },
  {
    id: 'abai-2024',
    title: 'Feb 2024 ABAI Conference',
    date: '2024-02-13',
    images: ['/events/abai-confrence2.jpg'],
    category: 'pediatricians',
  },
  {
    id: 'gdbpcon-2023',
    title: 'GDBPCON 2023 at Srmch',
    date: '2023-10-17',
    images: ['/events/gdp2.jpg', '/events/gdp3.jpg'],
    category: 'pediatricians',
  },
  {
    id: 'iap-tnsc-2019',
    title: 'August 2019 IAP TNSC Conference',
    date: '2019-08-08',
    images: [
      '/events/tnsc1.jpg',
      '/events/tnsc2.jpg',
      '/events/tnsc4.jpg',
      '/events/tnsc5.jpg',
      '/events/tnsc6.jpg',
    ],
    category: 'pediatricians',
  },
  {
    id: 'copp-module-2017',
    title: 'Oct 2017 Copp Module',
    date: '2017-10-21',
    images: ['/events/module1.jpg', '/events/module2.jpg'],
    category: 'pediatricians',
  },

  // TEACHING INSTITUTES
  {
    id: 'dav-shikshanam-2024',
    title: 'Nov 2024 Dav Shikshanam Pgce Program',
    date: '2024-11-15',
    images: ['/events/shikshanam1.jpg', '/events/shikshanam2.jpg'],
    category: 'teaching-institutes',
  },
  {
    id: 'boys-dav-mogapair-2024',
    title: 'June 2024 Boys Dav Mogapair',
    date: '2024-07-17',
    images: ['/events/mgapair1.jpg', '/events/mgapair2.jpg'],
    category: 'teaching-institutes',
  },
  {
    id: 'girls-dav-mogapair-2024',
    title: 'July 2024 Girls Dav Mogapair',
    date: '2024-07-04',
    images: ['/events/mogapair-girls3.jpg', '/events/mogapair-girls2.jpg'],
    category: 'teaching-institutes',
  },
  {
    id: 'dav-mogappair-june-2024',
    title: 'Dav Mogappair June 2024',
    date: '2024-06-06',
    images: ['/events/dav-mogapair1.jpg', '/events/dav-mogapair2.jpg', '/events/dav-mogapair3.jpg'],
    category: 'teaching-institutes',
  },
  {
    id: 'ethiraj-2019',
    title: 'Sep 2019 Ethiraj College',
    date: '2019-09-17',
    images: ['/events/ethiraj.jpg', '/events/ethiraj1.jpg'],
    category: 'teaching-institutes',
  },
  {
    id: 'maharishi-2017',
    title: 'Dec 2017 Maharishi Vidhya Mandhir',
    date: '2017-12-20',
    images: [
      '/events/maharishi-vidhya-mandhir2.jpg',
      '/events/maharishi-vidhya-mandhir4.jpg',
      '/events/maharishi-vidhya-mandhir3.jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'dav-gill-2017',
    title: 'Dec 2017 Dav Gill Nagar',
    date: '2017-12-18',
    images: ['/events/gill1.jpg', '/events/gill2.jpg'],
    category: 'teaching-institutes',
  },
  {
    id: 'vaishnav-2017',
    title: '14 Oct 2017 Kolaperumal Chetty Vaishnav School',
    date: '2017-10-14',
    images: [
      '/events/vaishnav1.jpg',
      '/events/vaishnav2.jpg',
      '/events/vaishnav3.jpg',
      '/events/vaishnav5.jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'dav-gopalapuram-2017',
    title: '17 Sep 2017 Dav Senior Secondary School Gopalapuram',
    date: '2017-09-13',
    images: ['/events/sep-17.jpg'],
    category: 'teaching-institutes',
  },
];

// Helper function to get events by category
export function getEventsByCategory(category: Event['category']): Event[] {
  return events
    .filter((event) => event.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper function to format date
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Helper function to group events by month and year
export function groupEventsByMonthYear(events: Event[]): Record<string, Event[]> {
  const grouped: Record<string, Event[]> = {};
  
  events.forEach((event) => {
    const date = new Date(event.date);
    const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(event);
  });
  
  return grouped;
}
