import React from 'react';
import { SectionTitle, YesNoRadio } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const FunctionalSkills: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const skills = [
    { key: 'understandsHouseholdObjects', label: 'Understands household objects' },
    { key: 'operatesMobilePhone', label: 'Operates mobile phone' },
    { key: 'labelsCommonObjects', label: 'Labels common objects' },
    { key: 'identifiesFamilyMembers', label: 'Identifies family members' },
    { key: 'identifiesSelfInMirror', label: 'Identifies self in mirror/photo' },
    { key: 'understandsSimpleCommands', label: 'Understands simple commands' },
    { key: 'understandsDoubleCommands', label: 'Understands double commands' },
    { key: 'understands3StepCommands', label: 'Understands 3-step commands' },
    { key: 'matchesObjects', label: 'Matches objects' },
    { key: 'sortsObjectsByColorShape', label: 'Sorts objects by color/shape' },
    { key: 'countsNumbersVerbally', label: 'Counts numbers verbally' },
    { key: 'recognizesColors', label: 'Recognizes colors' },
    { key: 'recognizesAlphabets', label: 'Recognizes alphabets' },
  ];

  return (
    <div>
      <SectionTitle 
        title="Section 11: Functional & Cognitive Skills" 
        subtitle="Assess the child's functional and cognitive abilities"
      />
      
      <div className="space-y-4">
        {skills.map((skill) => (
          <YesNoRadio
            key={skill.key}
            label={skill.label}
            name={skill.key}
            value={data[skill.key]}
            onChange={(v) => handleChange(skill.key, v)}
          />
        ))}
      </div>
    </div>
  );
};

export default FunctionalSkills;
