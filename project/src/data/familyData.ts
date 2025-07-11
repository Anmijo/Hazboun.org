import { FamilyMember, FamilyBranch, Location } from '../types/family';

export const familyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Ahmad Hazboun',
    birthYear: 1945,
    location: 'Jerusalem',
    country: 'Palestine',
    email: 'ahmad.hazboun@email.com',
    profession: 'Historian',
    branch: 'Jerusalem Branch',
    generation: 2,
    bio: 'Family historian and keeper of our ancestral stories.'
  },
  {
    id: '2',
    name: 'Layla Hazboun-Smith',
    birthYear: 1972,
    location: 'New York',
    country: 'United States',
    email: 'layla.hazboun@email.com',
    profession: 'Software Engineer',
    branch: 'American Branch',
    generation: 3,
    parents: ['1'],
    bio: 'Tech entrepreneur bridging tradition and innovation.'
  },
  {
    id: '3',
    name: 'Omar Hazboun',
    birthYear: 1968,
    location: 'London',
    country: 'United Kingdom',
    email: 'omar.hazboun@email.com',
    profession: 'Doctor',
    branch: 'European Branch',
    generation: 3,
    bio: 'Cardiologist working in NHS, passionate about family heritage.'
  },
  {
    id: '4',
    name: 'Fatima Hazboun-Al-Rashid',
    birthYear: 1980,
    location: 'Dubai',
    country: 'United Arab Emirates',
    email: 'fatima.hazboun@email.com',
    profession: 'Business Consultant',
    branch: 'Gulf Branch',
    generation: 3,
    bio: 'International business leader connecting Middle Eastern markets.'
  },
  {
    id: '5',
    name: 'Khalil Hazboun',
    birthYear: 1951,
    location: 'São Paulo',
    country: 'Brazil',
    email: 'khalil.hazboun@email.com',
    profession: 'Engineer',
    branch: 'South American Branch',
    generation: 2,
    bio: 'Civil engineer who helped build modern São Paulo infrastructure.'
  },
  {
    id: '6',
    name: 'Nadia Hazboun-Chen',
    birthYear: 1985,
    location: 'Toronto',
    country: 'Canada',
    email: 'nadia.hazboun@email.com',
    profession: 'Teacher',
    branch: 'Canadian Branch',
    generation: 4,
    parents: ['3'],
    bio: 'Educator passionate about multicultural learning and family history.'
  },
  {
    id: '7',
    name: 'Samir Hazboun',
    birthYear: 1943,
    location: 'Ramallah',
    country: 'Palestine',
    profession: 'Olive Farmer',
    branch: 'Palestine Origin',
    generation: 1,
    bio: 'Guardian of our ancestral olive groves and family traditions.'
  },
  {
    id: '8',
    name: 'Dina Hazboun-Ahmed',
    birthYear: 1990,
    location: 'Sydney',
    country: 'Australia',
    email: 'dina.hazboun@email.com',
    profession: 'Marine Biologist',
    branch: 'Australian Branch',
    generation: 4,
    bio: 'Marine researcher studying coral reef conservation.'
  }
];

export const familyBranches: FamilyBranch[] = [
  {
    id: 'jerusalem',
    name: 'Jerusalem Branch',
    origin: 'Jerusalem, Palestine',
    destination: 'Various Global Cities',
    migrationYear: 1948,
    story: 'The Jerusalem branch maintained strong ties to the holy city while members dispersed globally for education and opportunities.',
    members: familyMembers.filter(m => m.branch === 'Jerusalem Branch'),
    historicalNotes: 'This branch preserved many historical documents and family artifacts.'
  },
  {
    id: 'american',
    name: 'American Branch',
    origin: 'Palestine',
    destination: 'United States',
    migrationYear: 1965,
    story: 'Members of this branch immigrated to America during the 1960s, establishing roots in major cities and contributing to various industries.',
    members: familyMembers.filter(m => m.branch === 'American Branch'),
    historicalNotes: 'First generation focused on education and professional development.'
  },
  {
    id: 'european',
    name: 'European Branch',
    origin: 'Palestine',
    destination: 'United Kingdom & Europe',
    migrationYear: 1970,
    story: 'This branch settled across Europe, with many pursuing higher education and establishing successful careers in medicine and academia.',
    members: familyMembers.filter(m => m.branch === 'European Branch'),
    historicalNotes: 'Strong academic tradition with several university professors.'
  },
  {
    id: 'gulf',
    name: 'Gulf Branch',
    origin: 'Palestine',
    destination: 'Gulf Countries',
    migrationYear: 1980,
    story: 'Members moved to the Gulf states during the oil boom, contributing to business development and regional growth.',
    members: familyMembers.filter(m => m.branch === 'Gulf Branch'),
    historicalNotes: 'Played significant roles in regional business and trade.'
  },
  {
    id: 'south-american',
    name: 'South American Branch',
    origin: 'Palestine',
    destination: 'Brazil & Argentina',
    migrationYear: 1955,
    story: 'Early immigrants to South America, particularly Brazil, where they integrated into local communities while maintaining cultural traditions.',
    members: familyMembers.filter(m => m.branch === 'South American Branch'),
    historicalNotes: 'Established successful businesses in textile and food industries.'
  }
];

export const locations: Location[] = [
  { country: 'Palestine', city: 'Jerusalem', memberCount: 2 },
  { country: 'United States', city: 'New York', memberCount: 3 },
  { country: 'United Kingdom', city: 'London', memberCount: 2 },
  { country: 'United Arab Emirates', city: 'Dubai', memberCount: 2 },
  { country: 'Brazil', city: 'São Paulo', memberCount: 4 },
  { country: 'Canada', city: 'Toronto', memberCount: 2 },
  { country: 'Australia', city: 'Sydney', memberCount: 1 }
];