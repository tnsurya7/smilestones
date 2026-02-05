import React from 'react';
import { SectionTitle, YesNoRadio } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const ParentalConcerns: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const concerns = [
    { key: 'speechDelay', label: 'Speech Delay' },
    { key: 'hyperactivity', label: 'Hyperactivity' },
    { key: 'behaviourProblem', label: 'Behaviour Problem' },
    { key: 'poorEyeContact', label: 'Poor Eye Contact' },
    { key: 'notRespondingToName', label: 'Not responding to name' },
    { key: 'poorImitation', label: 'Poor imitation' },
    { key: 'limitedPlaySkills', label: 'Limited play skills' },
    { key: 'poorAttentionSpan', label: 'Poor attention span' },
    { key: 'temperTantrums', label: 'Temper tantrums' },
  ];

  return (
    <div>
      <SectionTitle 
        title="Section 5: Parental Concerns" 
        subtitle="Indicate if any of these concerns are present"
      />
      
      <div className="space-y-4">
        {concerns.map((concern) => (
          <YesNoRadio
            key={concern.key}
            label={concern.label}
            name={concern.key}
            value={data[concern.key]}
            onChange={(v) => handleChange(concern.key, v)}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentalConcerns;
