'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { CheckboxGroup, TextArea, YesNoRadio } from '@/components/admin/FormComponents';
import { Save, BookOpen, Users, Gift, Calendar } from 'lucide-react';

type TabType = 'online' | 'parent-training' | 'free-resources' | 'weekly';

interface OnlineProgram {
  enabled: boolean;
  description: string;
  targetAudience: string[];
  notes: string;
}

interface ParentTrainingSkill {
  ageGroups: string[];
  skillLevel: string;
  notes: string;
  printEnabled: boolean;
}

interface ParentTraining {
  skills: {
    [key: string]: ParentTrainingSkill;
  };
}

interface FreeResource {
  enabled: boolean;
  description: string;
}

interface FreeResources {
  resources: {
    [key: string]: FreeResource;
  };
}

interface WeeklyProgram {
  targetGroups: string[];
  focusAreas: string[];
  notes: string;
}

export default function ProgramsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('online');
  const [saveMessage, setSaveMessage] = useState('');

  // Online Programs State
  const [onlineProgram, setOnlineProgram] = useState<OnlineProgram>({
    enabled: false,
    description: '',
    targetAudience: [],
    notes: ''
  });

  // Parent Training State
  const [parentTraining, setParentTraining] = useState<ParentTraining>({
    skills: {
      'Toilet Training': { ageGroups: [], skillLevel: '', notes: '', printEnabled: false },
      'Brushing': { ageGroups: [], skillLevel: '', notes: '', printEnabled: false },
      'Bathing': { ageGroups: [], skillLevel: '', notes: '', printEnabled: false },
      'Grooming': { ageGroups: [], skillLevel: '', notes: '', printEnabled: false },
      'Feeding Problems': { ageGroups: [], skillLevel: '', notes: '', printEnabled: false }
    }
  });

  // Free Resources State
  const [freeResources, setFreeResources] = useState<FreeResources>({
    resources: {
      'School readiness checklist': { enabled: false, description: '' },
      'Behavior analysis chart': { enabled: false, description: '' },
      'Development checklist': { enabled: false, description: '' },
      'Games for improving concentration': { enabled: false, description: '' },
      'Worksheets for writing': { enabled: false, description: '' }
    }
  });

  // Weekly Programs State
  const [weeklyProgram, setWeeklyProgram] = useState<WeeklyProgram>({
    targetGroups: [],
    focusAreas: [],
    notes: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = () => {
    const online = localStorage.getItem('programs_online');
    const parent = localStorage.getItem('programs_parent_training');
    const free = localStorage.getItem('programs_free_resources');
    const weekly = localStorage.getItem('programs_weekly');

    if (online) setOnlineProgram(JSON.parse(online));
    if (parent) setParentTraining(JSON.parse(parent));
    if (free) setFreeResources(JSON.parse(free));
    if (weekly) setWeeklyProgram(JSON.parse(weekly));
  };

  const saveOnlineProgram = () => {
    localStorage.setItem('programs_online', JSON.stringify(onlineProgram));
    showSaveMessage();
  };

  const saveParentTraining = () => {
    localStorage.setItem('programs_parent_training', JSON.stringify(parentTraining));
    showSaveMessage();
  };

  const saveFreeResources = () => {
    localStorage.setItem('programs_free_resources', JSON.stringify(freeResources));
    showSaveMessage();
  };

  const saveWeeklyProgram = () => {
    localStorage.setItem('programs_weekly', JSON.stringify(weeklyProgram));
    showSaveMessage();
  };

  const showSaveMessage = () => {
    setSaveMessage('Saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: 'online' as TabType, label: 'Online Programs', icon: BookOpen },
    { id: 'parent-training' as TabType, label: 'Parent Training', icon: Users },
    { id: 'free-resources' as TabType, label: 'Free Resources', icon: Gift },
    { id: 'weekly' as TabType, label: 'Weekly Programs', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Programs Management" />

        {/* Save Message */}
        {saveMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">
            {saveMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-4 font-medium transition-colors text-xs sm:text-base whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
          {/* Online Programs Tab */}
          {activeTab === 'online' && (
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Online Programs</h2>
              
              <YesNoRadio
                label="Enable Program"
                name="online_enabled"
                value={onlineProgram.enabled}
                onChange={(val) => setOnlineProgram({ ...onlineProgram, enabled: val })}
              />

              <TextArea
                label="Program Description"
                name="online_description"
                value={onlineProgram.description}
                onChange={(val) => setOnlineProgram({ ...onlineProgram, description: val })}
                rows={4}
                placeholder="Describe the online program..."
              />

              <CheckboxGroup
                label="Target Audience"
                name="online_audience"
                options={['Other cities', 'NRI', 'Academic difficulty']}
                values={onlineProgram.targetAudience}
                onChange={(val) => setOnlineProgram({ ...onlineProgram, targetAudience: val })}
              />

              <TextArea
                label="Notes"
                name="online_notes"
                value={onlineProgram.notes}
                onChange={(val) => setOnlineProgram({ ...onlineProgram, notes: val })}
                rows={3}
                placeholder="Additional notes..."
              />

              <button
                onClick={saveOnlineProgram}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                Save Online Program
              </button>
            </div>
          )}

          {/* Parent Training Tab */}
          {activeTab === 'parent-training' && (
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Parent Training Programs</h2>
              
              {Object.keys(parentTraining.skills).map((skillName) => {
                const skill = parentTraining.skills[skillName];
                return (
                  <div key={skillName} className="mb-6 sm:mb-8 p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{skillName}</h3>
                    
                    <CheckboxGroup
                      label="Age Group"
                      name={`${skillName}_age`}
                      options={['2-4', '4-6', '6-9', '9+']}
                      values={skill.ageGroups}
                      onChange={(val) => setParentTraining({
                        ...parentTraining,
                        skills: {
                          ...parentTraining.skills,
                          [skillName]: { ...skill, ageGroups: val }
                        }
                      })}
                    />

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Skill Level
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                          <label key={level} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`${skillName}_level`}
                              value={level}
                              checked={skill.skillLevel === level}
                              onChange={(e) => setParentTraining({
                                ...parentTraining,
                                skills: {
                                  ...parentTraining.skills,
                                  [skillName]: { ...skill, skillLevel: e.target.value }
                                }
                              })}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <TextArea
                      label="Therapist Guidance Notes"
                      name={`${skillName}_notes`}
                      value={skill.notes}
                      onChange={(val) => setParentTraining({
                        ...parentTraining,
                        skills: {
                          ...parentTraining.skills,
                          [skillName]: { ...skill, notes: val }
                        }
                      })}
                      rows={2}
                      placeholder="Guidance notes..."
                    />

                    <YesNoRadio
                      label="Printable Material Enabled"
                      name={`${skillName}_print`}
                      value={skill.printEnabled}
                      onChange={(val) => setParentTraining({
                        ...parentTraining,
                        skills: {
                          ...parentTraining.skills,
                          [skillName]: { ...skill, printEnabled: val }
                        }
                      })}
                    />
                  </div>
                );
              })}

              <button
                onClick={saveParentTraining}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                Save Parent Training
              </button>
            </div>
          )}

          {/* Free Resources Tab */}
          {activeTab === 'free-resources' && (
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Free Resources for Parents</h2>
              
              {Object.keys(freeResources.resources).map((resourceName) => {
                const resource = freeResources.resources[resourceName];
                return (
                  <div key={resourceName} className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{resourceName}</h3>
                    
                    <YesNoRadio
                      label="Enabled"
                      name={`${resourceName}_enabled`}
                      value={resource.enabled}
                      onChange={(val) => setFreeResources({
                        ...freeResources,
                        resources: {
                          ...freeResources.resources,
                          [resourceName]: { ...resource, enabled: val }
                        }
                      })}
                    />

                    <TextArea
                      label="Short Description"
                      name={`${resourceName}_desc`}
                      value={resource.description}
                      onChange={(val) => setFreeResources({
                        ...freeResources,
                        resources: {
                          ...freeResources.resources,
                          [resourceName]: { ...resource, description: val }
                        }
                      })}
                      rows={2}
                      placeholder="Describe this resource..."
                    />
                  </div>
                );
              })}

              <button
                onClick={saveFreeResources}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                Save Free Resources
              </button>
            </div>
          )}

          {/* Weekly Programs Tab */}
          {activeTab === 'weekly' && (
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Weekly Programs</h2>
              
              <CheckboxGroup
                label="Target Groups"
                name="weekly_groups"
                options={[
                  'Working parents (Sat/Sun only)',
                  'Children taking therapy elsewhere but want only ABA',
                  'Children who improved but need behavior-specific programs',
                  'School-going children with specific problems'
                ]}
                values={weeklyProgram.targetGroups}
                onChange={(val) => setWeeklyProgram({ ...weeklyProgram, targetGroups: val })}
              />

              <CheckboxGroup
                label="Focus Areas"
                name="weekly_focus"
                options={['Attention', 'Hyperactivity', 'Handwriting', 'Reading', 'Mathematics', 'Behaviour']}
                values={weeklyProgram.focusAreas}
                onChange={(val) => setWeeklyProgram({ ...weeklyProgram, focusAreas: val })}
              />

              <TextArea
                label="Notes"
                name="weekly_notes"
                value={weeklyProgram.notes}
                onChange={(val) => setWeeklyProgram({ ...weeklyProgram, notes: val })}
                rows={4}
                placeholder="Additional notes..."
              />

              <button
                onClick={saveWeeklyProgram}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                Save Weekly Program
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
