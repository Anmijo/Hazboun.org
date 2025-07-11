import React, { useState } from 'react';
import { Settings, Plus, Users, Download, Upload } from 'lucide-react';
import { FamilyMember } from '../types/family';
import AddMemberForm from './AddMemberForm';

interface AdminPanelProps {
  familyMembers: FamilyMember[];
  onAddMember: (member: FamilyMember) => void;
  onUpdateMembers: (members: FamilyMember[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ familyMembers, onAddMember, onUpdateMembers }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const exportData = () => {
    const dataStr = JSON.stringify(familyMembers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hazboun-family-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedData)) {
          onUpdateMembers(importedData);
          alert('Family data imported successfully!');
        } else {
          alert('Invalid file format. Please upload a valid JSON file.');
        }
      } catch (error) {
        alert('Error reading file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-hazboun-600 hover:bg-hazboun-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
        title="Admin Panel"
      >
        <Settings className="h-6 w-6" />
      </button>
    );
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-40 min-w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-hazboun-800 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Admin Panel
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center px-4 py-3 bg-hazboun-600 hover:bg-hazboun-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Family Member
          </button>

          <div className="flex space-x-2">
            <button
              onClick={exportData}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
            
            <label className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm cursor-pointer">
              <Upload className="h-4 w-4 mr-1" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              Total Members: {familyMembers.length}
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <AddMemberForm
          onAddMember={onAddMember}
          existingMembers={familyMembers}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </>
  );
};

export default AdminPanel;