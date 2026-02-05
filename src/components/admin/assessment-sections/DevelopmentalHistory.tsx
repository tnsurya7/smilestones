import React from 'react';
import { SectionTitle, YesNoRadio, TextInput } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const DevelopmentalHistory: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 9: Developmental History" 
        subtitle="Developmental milestones and progress"
      />
      
      <div className="space-y-4">
        <YesNoRadio
          label="Motor milestones appropriate"
          name="motorMilestonesAppropriate"
          value={data.motorMilestonesAppropriate}
          onChange={(v) => handleChange('motorMilestonesAppropriate', v)}
        />
        
        <TextInput
          label="Social smile month"
          name="socialSmileMonth"
          type="number"
          value={data.socialSmileMonth}
          onChange={(v) => handleChange('socialSmileMonth', v)}
        />
        
        <TextInput
          label="Stranger anxiety month"
          name="strangerAnxietyMonth"
          type="number"
          value={data.strangerAnxietyMonth}
          onChange={(v) => handleChange('strangerAnxietyMonth', v)}
        />
        
        <YesNoRadio
          label="Responds to name"
          name="respondsToName"
          value={data.respondsToName}
          onChange={(v) => handleChange('respondsToName', v)}
        />
        
        <YesNoRadio
          label="Name call frequency less than expected"
          name="nameCallFrequencyLess"
          value={data.nameCallFrequencyLess}
          onChange={(v) => handleChange('nameCallFrequencyLess', v)}
        />
        
        <YesNoRadio
          label="Language milestones delayed"
          name="languageMilestonesDelayed"
          value={data.languageMilestonesDelayed}
          onChange={(v) => handleChange('languageMilestonesDelayed', v)}
        />
        
        <YesNoRadio
          label="Responds to gestures"
          name="respondsToGestures"
          value={data.respondsToGestures}
          onChange={(v) => handleChange('respondsToGestures', v)}
        />
        
        <YesNoRadio
          label="Points to objects"
          name="pointsToObjects"
          value={data.pointsToObjects}
          onChange={(v) => handleChange('pointsToObjects', v)}
        />
        
        <YesNoRadio
          label="Babbles"
          name="babbles"
          value={data.babbles}
          onChange={(v) => handleChange('babbles', v)}
        />
        
        <YesNoRadio
          label="Uses words meaningfully"
          name="usesWordsMeaningfully"
          value={data.usesWordsMeaningfully}
          onChange={(v) => handleChange('usesWordsMeaningfully', v)}
        />
      </div>
    </div>
  );
};

export default DevelopmentalHistory;
