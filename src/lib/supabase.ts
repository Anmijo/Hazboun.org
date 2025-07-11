import { createClient } from '@supabase/supabase-js';
import { FamilyMember } from '../types/family';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL:', supabaseUrl);
  console.error('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('family_members').select('count', { count: 'exact', head: true });
    if (error) {
      console.error('Connection test failed:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (err) {
    console.error('Connection test error:', err);
    return false;
  }
};

// Database operations
export const familyService = {
  // Get all family members
  async getAllMembers(): Promise<FamilyMember[]> {
    try {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .order('generation', { ascending: true });
      
      if (error) {
        console.error('Error fetching family members:', error);
        throw new Error(`Failed to fetch family members: ${error.message}`);
      }
      
      if (!data) {
        console.log('No family members found');
        return [];
      }
      
      return data.map(member => ({
        id: member.id,
        name: member.name,
        birthYear: member.birth_year || undefined,
        location: member.location,
        country: member.country,
        email: member.email || undefined,
        phone: member.phone || undefined,
        profession: member.profession || undefined,
        branch: member.branch,
        generation: member.generation,
        parents: member.parents || undefined,
        bio: member.bio || undefined
      }));
    } catch (err) {
      console.error('getAllMembers error:', err);
      throw err;
    }
  },

  // Add new family member
  async addMember(member: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
    try {
      console.log('Adding member:', member);
      
      // Validate required fields
      if (!member.name || !member.location || !member.country || !member.branch || typeof member.generation !== 'number') {
        throw new Error('Missing required fields: name, location, country, branch, and generation are required');
      }
      
      const insertData = {
        name: member.name,
        birth_year: member.birthYear || null,
        location: member.location,
        country: member.country,
        email: member.email || null,
        phone: member.phone || null,
        profession: member.profession || null,
        branch: member.branch,
        generation: member.generation,
        parents: member.parents || null,
        bio: member.bio || null
      };
      
      console.log('Insert data:', insertData);
      
      const { data, error } = await supabase
        .from('family_members')
        .insert(insertData)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(`Failed to add family member: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('No data returned from insert operation');
      }
      
      console.log('Successfully added member:', data);
      
      return {
        id: data.id,
        name: data.name,
        birthYear: data.birth_year || undefined,
        location: data.location,
        country: data.country,
        email: data.email || undefined,
        phone: data.phone || undefined,
        profession: data.profession || undefined,
        branch: data.branch,
        generation: data.generation,
        parents: data.parents || undefined,
        bio: data.bio || undefined
      };
    } catch (err) {
      console.error('addMember error:', err);
      throw err;
    }
  },

  // Update family member
  async updateMember(id: string, updates: Partial<FamilyMember>): Promise<FamilyMember> {
    try {
      const updateData = {
        name: updates.name,
        birth_year: updates.birthYear || null,
        location: updates.location,
        country: updates.country,
        email: updates.email || null,
        phone: updates.phone || null,
        profession: updates.profession || null,
        branch: updates.branch,
        generation: updates.generation,
        parents: updates.parents || null,
        bio: updates.bio || null
      };
      
      const { data, error } = await supabase
        .from('family_members')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating family member:', error);
        throw new Error(`Failed to update family member: ${error.message}`);
      }
      
      return {
        id: data.id,
        name: data.name,
        birthYear: data.birth_year || undefined,
        location: data.location,
        country: data.country,
        email: data.email || undefined,
        phone: data.phone || undefined,
        profession: data.profession || undefined,
        branch: data.branch,
        generation: data.generation,
        parents: data.parents || undefined,
        bio: data.bio || undefined
      };
    } catch (err) {
      console.error('updateMember error:', err);
      throw err;
    }
  },

  // Delete family member
  async deleteMember(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('family_members')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting family member:', error);
        throw new Error(`Failed to delete family member: ${error.message}`);
      }
    } catch (err) {
      console.error('deleteMember error:', err);
      throw err;
    }
  }
};