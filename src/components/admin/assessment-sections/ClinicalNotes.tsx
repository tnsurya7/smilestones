import React from 'react';
import { SectionTitle, TextArea, CheckboxGroup, TextInput } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const ClinicalNotes: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 13: Final Clinical Notes" 
        subtitle="Summary and therapy recommendations"
      />
      
      <div className="space-y-6">
        <TextArea
          label="General Notes"
          name="generalNotes"
          value={data.generalNotes}
          onChange={(v) => handleChange('generalNotes', v)}
          rows={4}
          placeholder="Enter general observations and notes..."
        />
        
        <TextArea
          label="Overall Impression"
          name="overallImpression"
          value={data.overallImpression}
          onChange={(v) => handleChange('overallImpression', v)}
          rows={4}
          placeholder="Enter overall clinical impression..."
        />
        
        <TextArea
          label="Provisional Diagnosis"
          name="provisionalDiagnosis"
          value={data.provisionalDiagnosis}
          onChange={(v) => handleChange('provisionalDiagnosis', v)}
          rows={3}
          placeholder="Enter provisional diagnosis..."
        />
        
        <CheckboxGroup
          label="Therapy Plan"
          name="therapyPlan"
          options={[
            'Speech Therapy',
            'Occupational Therapy',
            'Behavior Therapy',
            'Special Education',
            'Home Program'
          ]}
          values={data.therapyPlan || []}
          onChange={(v) => handleChange('therapyPlan', v)}
        />
        
        <TextInput
          label="Frequency per week"
          name="frequencyPerWeek"
          type="number"
          value={data.frequencyPerWeek}
          onChange={(v) => handleChange('frequencyPerWeek', v)}
          placeholder="e.g., 3"
        />
        
        <TextArea
          label="Next Session Goal"
          name="nextSessionGoal"
          value={data.nextSessionGoal}
          onChange={(v) => handleChange('nextSessionGoal', v)}
          rows={4}
          placeholder="Enter goals for next session..."
        />
        
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 font-semibold">
            ✓ Assessment Complete! Click "Complete Assessment" to save and finish.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotes;
