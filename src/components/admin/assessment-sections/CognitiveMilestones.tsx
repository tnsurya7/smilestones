import React, { useState } from 'react';
import { SectionTitle, TextArea } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const AGE_GROUPS = [
  '2m', '4m', '6m', '8m', '9m', '10m', '12m', '14m', '15m', '16m', '18m',
  '20m', '22m', '24m', '27m', '30m', '33m', '36m', '42m', '48m', '54m', '60m'
];

const MILESTONE_QUESTIONS = {
  '2m': ['Follows objects with eyes', 'Responds to sounds', 'Smiles at people'],
  '4m': ['Holds head steady', 'Coos and babbles', 'Brings hands to mouth'],
  '6m': ['Rolls over', 'Begins to sit without support', 'Responds to own name'],
  '8m': ['Sits without support', 'Passes objects hand to hand', 'Looks for dropped objects'],
  '9m': ['Stands holding on', 'Picks up small objects', 'Says mama/dada'],
  '10m': ['Pulls to stand', 'Waves bye-bye', 'Understands no'],
  '12m': ['Walks holding furniture', 'Says 2-3 words', 'Drinks from cup'],
  '14m': ['Walks alone', 'Says 4-6 words', 'Scribbles with crayon'],
  '15m': ['Walks well', 'Points to objects', 'Follows simple commands'],
  '16m': ['Runs stiffly', 'Says 10+ words', 'Feeds self with spoon'],
  '18m': ['Runs well', 'Says 20+ words', 'Removes clothing'],
  '20m': ['Kicks ball', 'Combines 2 words', 'Turns pages'],
  '22m': ['Walks up stairs', 'Uses 50+ words', 'Washes hands'],
  '24m': ['Jumps', 'Uses 2-3 word sentences', 'Turns doorknobs'],
  '27m': ['Pedals tricycle', 'Knows first name', 'Helps put things away'],
  '30m': ['Throws ball overhand', 'Uses pronouns', 'Dresses with help'],
  '33m': ['Climbs well', 'Speaks clearly', 'Takes turns'],
  '36m': ['Alternates feet on stairs', 'Tells stories', 'Dresses self mostly'],
  '42m': ['Hops on one foot', 'Counts to 10', 'Plays cooperatively'],
  '48m': ['Catches bounced ball', 'Knows colors', 'Understands same/different'],
  '54m': ['Skips', 'Counts 10+ objects', 'Draws person with 6 parts'],
  '60m': ['Stands on one foot 10 seconds', 'Prints letters', 'Knows address/phone'],
};

const CognitiveMilestones: React.FC<Props> = ({ data, onChange }) => {
  const [selectedAge, setSelectedAge] = useState(AGE_GROUPS[0]);

  const handleMilestoneChange = (age: string, questionIndex: number, status: string) => {
    const milestones = data.milestones || {};
    const ageData = milestones[age] || {};
    const questions = ageData.questions || [];
    
    questions[questionIndex] = {
      ...questions[questionIndex],
      status
    };
    
    onChange({
      ...data,
      milestones: {
        ...milestones,
        [age]: {
          ...ageData,
          questions
        }
      }
    });
  };

  const handleRemarksChange = (age: string, questionIndex: number, remarks: string) => {
    const milestones = data.milestones || {};
    const ageData = milestones[age] || {};
    const questions = ageData.questions || [];
    
    questions[questionIndex] = {
      ...questions[questionIndex],
      remarks
    };
    
    onChange({
      ...data,
      milestones: {
        ...milestones,
        [age]: {
          ...ageData,
          questions
        }
      }
    });
  };

  const getMilestoneStatus = (age: string, questionIndex: number) => {
    return data.milestones?.[age]?.questions?.[questionIndex]?.status || '';
  };

  const getMilestoneRemarks = (age: string, questionIndex: number) => {
    return data.milestones?.[age]?.questions?.[questionIndex]?.remarks || '';
  };

  return (
    <div>
      <SectionTitle 
        title="Section 12: Cognitive Milestone Tracker" 
        subtitle="Track developmental milestones by age group"
      />
      
      {/* Age Group Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {AGE_GROUPS.map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedAge === age
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Milestone Questions for Selected Age */}
      <div className="space-y-6">
        {MILESTONE_QUESTIONS[selectedAge as keyof typeof MILESTONE_QUESTIONS]?.map((question, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">{question}</h4>
            
            {/* Status Checkboxes */}
            <div className="flex gap-6 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={getMilestoneStatus(selectedAge, index) === 'A'}
                  onChange={(e) => handleMilestoneChange(selectedAge, index, e.target.checked ? 'A' : '')}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Achieved (A)</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={getMilestoneStatus(selectedAge, index) === 'C'}
                  onChange={(e) => handleMilestoneChange(selectedAge, index, e.target.checked ? 'C' : '')}
                  className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">Concern (C)</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={getMilestoneStatus(selectedAge, index) === 'N'}
                  onChange={(e) => handleMilestoneChange(selectedAge, index, e.target.checked ? 'N' : '')}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Not Yet (N)</span>
              </label>
            </div>
            
            {/* Remarks */}
            <textarea
              value={getMilestoneRemarks(selectedAge, index)}
              onChange={(e) => handleRemarksChange(selectedAge, index, e.target.value)}
              placeholder="Optional remarks..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CognitiveMilestones;
