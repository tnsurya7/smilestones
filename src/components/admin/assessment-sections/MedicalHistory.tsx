import React from 'react';
import { SectionTitle, YesNoRadio, TextInput } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const MedicalHistory: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 10: Medical History" 
        subtitle="Medical conditions and current medications"
      />
      
      <div className="space-y-4">
        <YesNoRadio
          label="Seizures history"
          name="seizuresHistory"
          value={data.seizuresHistory}
          onChange={(v) => handleChange('seizuresHistory', v)}
        />
        
        <YesNoRadio
          label="Chronic illness"
          name="chronicIllness"
          value={data.chronicIllness}
          onChange={(v) => handleChange('chronicIllness', v)}
        />
        
        <YesNoRadio
          label="Floppiness early childhood"
          name="floppinessEarlyChildhood"
          value={data.floppinessEarlyChildhood}
          onChange={(v) => handleChange('floppinessEarlyChildhood', v)}
        />
        
        <YesNoRadio
          label="Stiffness early childhood"
          name="stiffnessEarlyChildhood"
          value={data.stiffnessEarlyChildhood}
          onChange={(v) => handleChange('stiffnessEarlyChildhood', v)}
        />
        
        <YesNoRadio
          label="Hearing issues"
          name="hearingIssues"
          value={data.hearingIssues}
          onChange={(v) => handleChange('hearingIssues', v)}
        />
        
        <YesNoRadio
          label="Vision issues"
          name="visionIssues"
          value={data.visionIssues}
          onChange={(v) => handleChange('visionIssues', v)}
        />
        
        <YesNoRadio
          label="Medication currently taking"
          name="medicationCurrentlyTaking"
          value={data.medicationCurrentlyTaking}
          onChange={(v) => handleChange('medicationCurrentlyTaking', v)}
        />
        
        {data.medicationCurrentlyTaking && (
          <TextInput
            label="Medication name"
            name="medicationName"
            value={data.medicationName}
            onChange={(v) => handleChange('medicationName', v)}
            placeholder="Enter medication name"
          />
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
