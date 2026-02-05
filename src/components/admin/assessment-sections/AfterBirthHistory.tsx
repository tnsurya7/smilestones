import React from 'react';
import { SectionTitle, YesNoRadio, RadioGroup } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const AfterBirthHistory: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 8: After Birth History" 
        subtitle="Immediate post-birth information"
      />
      
      <div className="space-y-4">
        <YesNoRadio
          label="Cried immediately after birth"
          name="criedImmediately"
          value={data.criedImmediately}
          onChange={(v) => handleChange('criedImmediately', v)}
        />
        
        <YesNoRadio
          label="NICU admission"
          name="nicuAdmission"
          value={data.nicuAdmission}
          onChange={(v) => handleChange('nicuAdmission', v)}
        />
        
        <YesNoRadio
          label="Phototherapy"
          name="phototherapy"
          value={data.phototherapy}
          onChange={(v) => handleChange('phototherapy', v)}
        />
        
        <YesNoRadio
          label="ET Tube"
          name="etTube"
          value={data.etTube}
          onChange={(v) => handleChange('etTube', v)}
        />
        
        <RadioGroup
          label="Development course"
          name="developmentCourse"
          options={['Normal', 'Abnormal']}
          value={data.developmentCourse}
          onChange={(v) => handleChange('developmentCourse', v)}
        />
      </div>
    </div>
  );
};

export default AfterBirthHistory;
