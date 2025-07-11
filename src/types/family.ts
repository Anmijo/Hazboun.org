export interface FamilyMember {
  id: string;
  name: string;
  birthYear?: number;
  location: string;
  country: string;
  email?: string;
  phone?: string;
  profession?: string;
  branch: string;
  generation: number;
  parents?: string[];
  children?: string[];
  photo?: string;
  bio?: string;
}

export interface FamilyBranch {
  id: string;
  name: string;
  origin: string;
  destination: string;
  migrationYear: number;
  story: string;
  members: FamilyMember[];
  historicalNotes?: string;
}

export interface Location {
  country: string;
  city: string;
  memberCount: number;
}