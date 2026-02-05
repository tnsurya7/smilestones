import React from 'react';
import { SectionTitle, RadioGroup, CheckboxGroup, YesNoRadio, TextInput } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const PeriNatalHistory: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 7: Peri-Natal History" 
        subtitle="Birth and delivery information"
      />
      
      <div className="space-y-4">
        <RadioGroup
          label="Conception"
          name="conception"
          options={['Natural', 'Assisted']}
          value={data.conception}
          onChange={(v) => handleChange('conception', v)}
        />
        
        <RadioGroup
          label="Term or Preterm"
          name="termOrPreterm"
          options={['Term', 'Preterm']}
          value={data.termOrPreterm}
          onChange={(v) => handleChange('termOrPreterm', v)}
        />
        
        <TextInput
          label="Weeks of gestation"
          name="weeksOfGestation"
          type="number"
          value={data.weeksOfGestation}
          onChange={(v) => handleChange('weeksOfGestation', v)}
        />
        
        <TextInput
          label="Birth Weight (kg)"
          name="birthWeight"
          type="number"
          value={data.birthWeight}
          onChange={(v) => handleChange('birthWeight', v)}
          placeholder="e.g., 3.2"
        />
        
        <CheckboxGroup
          label="Delivery Type"
          name="deliveryType"
          options={['Normal', 'LSCS', 'Assisted']}
          values={data.deliveryType ? [data.deliveryType] : []}
          onChange={(v) => handleChange('deliveryType', v[v.length - 1])}
        />
        
        <YesNoRadio
          label="Required assistance at birth"
          name="requiredAssistanceAtBirth"
          value={data.requiredAssistanceAtBirth}
          onChange={(v) => handleChange('requiredAssistanceAtBirth', v)}
        />
        
        <TextInput
          label="APGAR Score"
          name="apgarScore"
          type="number"
          value={data.apgarScore}
          onChange={(v) => handleChange('apgarScore', v)}
          placeholder="0-10"
        />
      </div>
    </div>
  );
};

export default PeriNatalHistory;
