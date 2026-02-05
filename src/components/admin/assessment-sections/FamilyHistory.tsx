import React from 'react';
import { SectionTitle, YesNoRadio, CheckboxGroup, RadioGroup, TextInput } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const FamilyHistory: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 6: Family History" 
        subtitle="Family medical and developmental history"
      />
      
      <div className="space-y-4">
        <YesNoRadio
          label="Family speech delay"
          name="familySpeechDelay"
          value={data.familySpeechDelay}
          onChange={(v) => handleChange('familySpeechDelay', v)}
        />
        
        <YesNoRadio
          label="Intellectual disability"
          name="intellectualDisability"
          value={data.intellectualDisability}
          onChange={(v) => handleChange('intellectualDisability', v)}
        />
        
        <YesNoRadio
          label="Developmental delay"
          name="developmentalDelay"
          value={data.developmentalDelay}
          onChange={(v) => handleChange('developmentalDelay', v)}
        />
        
        <YesNoRadio
          label="Autism"
          name="autism"
          value={data.autism}
          onChange={(v) => handleChange('autism', v)}
        />
        
        <CheckboxGroup
          label="Sibling Type"
          name="siblingType"
          options={['None', 'Younger', 'Elder']}
          values={data.siblingType || []}
          onChange={(v) => handleChange('siblingType', v)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Father age at delivery"
            name="fatherAgeAtDelivery"
            type="number"
            value={data.fatherAgeAtDelivery}
            onChange={(v) => handleChange('fatherAgeAtDelivery', v)}
          />
          
          <TextInput
            label="Mother age at delivery"
            name="motherAgeAtDelivery"
            type="number"
            value={data.motherAgeAtDelivery}
            onChange={(v) => handleChange('motherAgeAtDelivery', v)}
          />
        </div>
        
        <CheckboxGroup
          label="Illness During Pregnancy"
          name="illnessDuringPregnancy"
          options={['Antenatal', 'Natal', 'Postnatal', 'None']}
          values={data.illnessDuringPregnancy || []}
          onChange={(v) => handleChange('illnessDuringPregnancy', v)}
        />
        
        <YesNoRadio
          label="Consanguinity"
          name="consanguinity"
          value={data.consanguinity}
          onChange={(v) => handleChange('consanguinity', v)}
        />
        
        <CheckboxGroup
          label="Who identified first"
          name="whoIdentifiedFirst"
          options={['Mother', 'Father', 'Grandparent', 'Pediatrician', 'Teacher']}
          values={data.whoIdentifiedFirst || []}
          onChange={(v) => handleChange('whoIdentifiedFirst', v)}
        />
        
        <CheckboxGroup
          label="Who suggested therapy"
          name="whoSuggestedTherapy"
          options={['Mother', 'Father', 'Grandparent', 'Pediatrician', 'Teacher']}
          values={data.whoSuggestedTherapy || []}
          onChange={(v) => handleChange('whoSuggestedTherapy', v)}
        />
        
        <RadioGroup
          label="Residence Type"
          name="residenceType"
          options={['Individual House', 'Apartment']}
          value={data.residenceType}
          onChange={(v) => handleChange('residenceType', v)}
        />
        
        <YesNoRadio
          label="Substance Use / Drugs"
          name="substanceUse"
          value={data.substanceUse}
          onChange={(v) => handleChange('substanceUse', v)}
        />
        
        <RadioGroup
          label="Sleep Pattern"
          name="sleepPattern"
          options={['Normal', 'Disturbed']}
          value={data.sleepPattern}
          onChange={(v) => handleChange('sleepPattern', v)}
        />
        
        <TextInput
          label="Screen Time (hours)"
          name="screenTime"
          type="number"
          value={data.screenTime}
          onChange={(v) => handleChange('screenTime', v)}
        />
      </div>
    </div>
  );
};

export default FamilyHistory;
