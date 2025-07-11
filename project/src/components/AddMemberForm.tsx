import React, { useState } from 'react';
import { Plus, Save, X, User } from 'lucide-react';
import { FamilyMember } from '../types/family';

interface AddMemberFormProps {
  onAddMember: (member: Omit<FamilyMember, 'id'>) => void;
  existingMembers: FamilyMember[];
  onClose: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onAddMember, existingMembers, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthYear: '',
    location: '',
    country: '',
    email: '',
    phone: '',
    profession: '',
    branch: '',
    generation: '',
    parents: [] as string[],
    bio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const branches = [
    'Palestine Branch',
    'Jordan Branch',
    'Arabian Gulf Branch',
    'North America Branch',
    'South America Branch',
    'Europe Branch',
    'Australia Branch',
    'Other'
  ];

  const countries = [
'Afghanistan',
'Albania',
'Algeria',
'Andorra',
'Angola',
'Antigua and Barbuda',
'Argentina',
'Armenia',
'Australia',
'Austria',
'Azerbaijan',
'Bahamas',
'Bahrain',
'Bangladesh',
'Barbados',
'Belarus',
'Belgium',
'Belize',
'Benin',
'Bhutan',
'Bolivia',
'Bosnia and Herzegovina',
'Botswana',
'Brazil',
'Brunei',
'Bulgaria',
'Burkina Faso',
'Burundi',
'Cabo Verde',
'Cambodia',
'Cameroon',
'Canada',
'Central African Republic',
'Chad',
'Chile',
'China',
'Colombia',
'Comoros',
'Congo, Republic of the',
'Congo, Democratic Republic of the',
'Costa Rica',
'Côte dIvoire',
'Croatia',
'Cuba',
'Cyprus',
'Czechia',
'Denmark',
'Djibouti',
'Dominica',
'Dominican Republic',
'Ecuador',
'Egypt',
'El Salvador',
'Equatorial Guinea',
'Eritrea',
'Estonia',
'Eswatini',
'Ethiopia',
'Fiji',
'Finland',
'France',
'Gabon',
'Gambia',
'Georgia',
'Germany',
'Ghana',
'Greece',
'Grenada',
'Guatemala',
'Guinea',
'Guinea-Bissau',
'Guyana',
'Haiti',
'Holy See',
'Honduras',
'Hungary',
'Iceland',
'India',
'Indonesia',
'Iran',
'Iraq',
'Ireland',
'Italy',
'Jamaica',
'Japan',
'Jordan',
'Kazakhstan',
'Kenya',
'Kiribati',
'Korea, North',
'Korea, South',
'Kosovo',
'Kuwait',
'Kyrgyzstan',
'Laos',
'Latvia',
'Lebanon',
'Lesotho',
'Liberia',
'Libya',
'Liechtenstein',
'Lithuania',
'Luxembourg',
'Madagascar',
'Malawi',
'Malaysia',
'Maldives',
'Mali',
'Malta',
'Marshall Islands',
'Mauritania',
'Mauritius',
'Mexico',
'Micronesia',
'Moldova',
'Monaco',
'Mongolia',
'Montenegro',
'Morocco',
'Mozambique',
'Myanmar',
'Namibia',
'Nauru',
'Nepal',
'Netherlands',
'New Zealand',
'Nicaragua',
'Niger',
'Nigeria',
'North Macedonia',
'Norway',
'Oman',
'Pakistan',
'Palau',
'Palestine',
'Panama',
'Papua New Guinea',
'Paraguay',
'Peru',
'Philippines',
'Poland',
'Portugal',
'Qatar',
'Romania',
'Russia',
'Rwanda',
'Saint Kitts and Nevis',
'Saint Lucia',
'Saint Vincent and the Grenadines',
'Samoa',
'San Marino',
'Sao Tome and Principe',
'Saudi Arabia',
'Senegal',
'Serbia',
'Seychelles',
'Sierra Leone',
'Singapore',
'Slovakia',
'Slovenia',
'Solomon Islands',
'Somalia',
'South Africa',
'South Sudan',
'Spain',
'Sri Lanka',
'Sudan',
'Suriname',
'Sweden',
'Switzerland',
'Syria',
'Taiwan',
'Tajikistan',
'Tanzania',
'Thailand',
'Timor-Leste',
'Togo',
'Tonga',
'Trinidad and Tobago',
'Tunisia',
'Turkey',
'Turkmenistan',
'Tuvalu',
'Uganda',
'Ukraine',
'United Arab Emirates',
'United Kingdom',
'United States',
'Uruguay',
'Uzbekistan',
'Vanuatu',
'Venezuela',
'Vietnam',
'Yemen',
'Zambia',
'Zimbabwe'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.name || !formData.location || !formData.country || !formData.branch || !formData.generation) {
      setError('Please fill in all required fields (Name, Location, Country, Branch, and Generation)');
      return;
    }

    const generationNum = parseInt(formData.generation);
    if (isNaN(generationNum) || generationNum < 1 || generationNum > 10) {
      setError('Generation must be a valid number between 1 and 10');
      return;
    }

    setIsSubmitting(true);

    try {
      const newMember: Omit<FamilyMember, 'id'> = {
        name: formData.name.trim(),
        birthYear: formData.birthYear ? parseInt(formData.birthYear) : undefined,
        location: formData.location.trim(),
        country: formData.country,
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        profession: formData.profession.trim() || undefined,
        branch: formData.branch,
        generation: generationNum,
        parents: formData.parents.length > 0 ? formData.parents : undefined,
        bio: formData.bio.trim() || undefined
      };

      console.log('Submitting new member:', newMember);
      await onAddMember(newMember);
      onClose();
    } catch (error) {
      console.error('Error adding member:', error);
      setError(error instanceof Error ? error.message : 'Failed to add family member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleParentToggle = (parentId: string) => {
    setFormData(prev => ({
      ...prev,
      parents: prev.parents.includes(parentId)
        ? prev.parents.filter(id => id !== parentId)
        : [...prev.parents, parentId]
    }));
  };

  const potentialParents = existingMembers.filter(member => 
    !formData.generation || member.generation < parseInt(formData.generation)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-hazboun-800 flex items-center">
              <Plus className="h-6 w-6 mr-2" />
              Add New Family Member
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
              disabled={isSubmitting}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hazboun-800 border-b pb-2">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  placeholder="Enter full name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Birth Year
                </label>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.birthYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthYear: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  placeholder="e.g., 1985"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City/Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  placeholder="e.g., New York, London, Dubai"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  required
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  disabled={isSubmitting}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  placeholder="e.g., Doctor, Engineer, Teacher"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Family Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hazboun-800 border-b pb-2">Family Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Family Branch *
                </label>
                <select
                  required
                  value={formData.branch}
                  onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  disabled={isSubmitting}
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Generation *
                </label>
                <select
                  required
                  value={formData.generation}
                  onChange={(e) => setFormData(prev => ({ ...prev, generation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  disabled={isSubmitting}
                >
                  <option value="">Select Generation</option>
                  <option value="1">1st Generation</option>
                  <option value="2">2nd Generation</option>
                  <option value="3">3rd Generation</option>
                  <option value="4">4th Generation</option>
                  <option value="5">5th Generation</option>
                </select>
              </div>

              {potentialParents.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parents (select if applicable)
                  </label>
                  <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                    {potentialParents.map(member => (
                      <label key={member.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={formData.parents.includes(member.id)}
                          onChange={() => handleParentToggle(member.id)}
                          className="mr-2"
                          disabled={isSubmitting}
                        />
                        <span className="text-sm">{member.name} (Gen {member.generation})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  placeholder="email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biography
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
              placeholder="Brief biography or description..."
              disabled={isSubmitting}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-hazboun-600 hover:bg-hazboun-700 text-white rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Adding...' : 'Add Family Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;