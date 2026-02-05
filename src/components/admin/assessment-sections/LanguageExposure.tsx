import React from 'react';
import { SectionTitle, CheckboxGroup, TextInput } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const LanguageExposure: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 3: Language Exposure" 
        subtitle="Languages the child is exposed to"
      />
      
      <CheckboxGroup
        label="Select all languages the child is exposed to"
        name="languages"
        options={['Tamil', 'English', 'Telugu', 'Malayalam', 'Hindi', 'Urdu']}
        values={data.languages || []}
        onChange={(v) => handleChange('languages', v)}
      />
      
      <TextInput
        label="Other Language (if any)"
        name="otherLanguage"
        value={data.otherLanguage}
        onChange={(v) => handleChange('otherLanguage', v)}
        placeholder="Specify other language"
      />
    </div>
  );
};

export default LanguageExposure;
