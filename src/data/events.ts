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
    id: 'parents-training-gallery',
    title: 'Parents Training Programs',
    date: '2024-02-14',
    subtitle: 'MY India (MISSION INDIA PROJECT)',
    images: [
      '/parents training header.jpg',
      '/gurgaon-program5.jpg',
      '/Gurgaon Program_sub1.jpg',
      '/kolkata1.jpg',
      '/Kolkata Program February 2023_sub2.jpg',
      '/rotary1.jpg',
      '/Rotary Club Madras September 2022_sub1.jpg',
      '/Rotary Club Madras September 2022_sub2.jpg',
      '/Rotary Club Madras September 2022_sub3.jpg',
      '/Rotary Club Madras September 2022_sub5.jpg',
      '/pediariacians.jpg',
    ],
    category: 'parents-training',
  },

  // PEDIATRICIANS
  {
    id: 'srm-nov-2024',
    title: 'November 2024 at SRM University',
    date: '2024-11-20',
    images: [
      '/pediariacians.jpg',
    ],
    category: 'pediatricians',
  },
  {
    id: 'east-coast-2024',
    title: 'July 2024 East Cost Pedicon',
    date: '2024-07-19',
    images: [
      '/pediariacians.jpg',
    ],
    category: 'pediatricians',
  },
  {
    id: 'abai-2024',
    title: 'Feb 2024 ABAI Conference',
    date: '2024-02-13',
    images: [
      '/pediariacians.jpg',
    ],
    category: 'pediatricians',
  },
  {
    id: 'gdbpcon-2023',
    title: 'GDBPCON 2023 at Srmch',
    date: '2023-10-17',
    images: [
      '/pediariacians.jpg',
    ],
    category: 'pediatricians',
  },
  {
    id: 'iap-tnsc-2019',
    title: 'August 2019 IAP TNSC Conference',
    date: '2019-08-08',
    images: [
      '/pediariacians.jpg',
    ],
    category: 'pediatricians',
  },
  {
    id: 'copp-module-2017',
    title: 'Oct 2017 Copp Module',
    date: '2017-10-21',
    images: [
      '/pediariacians.jpg',
    ],
    category: 'pediatricians',
  },

  // TEACHING INSTITUTES
  {
    id: 'dav-shikshanam-2024',
    title: 'Nov 2024 Dav Shikshanam Pgce Program',
    date: '2024-11-15',
    images: [
      '/teaching institues.jpg',
      '/Smile camp first page .jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'boys-dav-mogapair-2024',
    title: 'June 2024 Boys Dav Mogapair',
    date: '2024-07-17',
    images: [
      '/teaching institues.jpg',
      '/Smile camp second page.jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'girls-dav-mogapair-2024',
    title: 'July 2024 Girls Dav Mogapair',
    date: '2024-07-04',
    images: [
      '/teaching institues.jpg',
      '/Smile camp first page .jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'dav-mogappair-june-2024',
    title: 'Dav Mogappair June 2024',
    date: '2024-06-06',
    images: [
      '/teaching institues.jpg',
      '/Smile camp second page.jpg',
      '/Smile camp first page .jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'ethiraj-2019',
    title: 'Sep 2019 Ethiraj College',
    date: '2019-09-17',
    images: [
      '/teaching institues.jpg',
      '/Smile camp first page .jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'maharishi-2017',
    title: 'Dec 2017 Maharishi Vidhya Mandhir',
    date: '2017-12-20',
    images: [
      '/teaching institues.jpg',
      '/Smile camp second page.jpg',
      '/Smile camp first page .jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'dav-gill-2017',
    title: 'Dec 2017 Dav Gill Nagar',
    date: '2017-12-18',
    images: [
      '/teaching institues.jpg',
      '/Smile camp first page .jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'vaishnav-2017',
    title: '14 Oct 2017 Kolaperumal Chetty Vaishnav School',
    date: '2017-10-14',
    images: [
      '/teaching institues.jpg',
      '/Smile camp second page.jpg',
      '/Smile camp first page .jpg',
    ],
    category: 'teaching-institutes',
  },
  {
    id: 'dav-gopalapuram-2017',
    title: '17 Sep 2017 Dav Senior Secondary School Gopalapuram',
    date: '2017-09-13',
    images: [
      '/teaching institues.jpg',
    ],
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
