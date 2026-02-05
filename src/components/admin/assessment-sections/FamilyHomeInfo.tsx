import React from 'react';
import { SectionTitle, RadioGroup, CheckboxGroup, TextArea } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const FamilyHomeInfo: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 4: Family & Home Info" 
        subtitle="Family structure and referral information"
      />
      
      <RadioGroup
        label="Locality"
        name="locality"
        options={['Urban', 'Rural']}
        value={data.locality}
        onChange={(v) => handleChange('locality', v)}
      />
      
      <CheckboxGroup
        label="Birth Order"
        name="birthOrder"
        options={['1st', '2nd', '3rd', '4th+']}
        values={data.birthOrder ? [data.birthOrder] : []}
        onChange={(v) => handleChange('birthOrder', v[v.length - 1])}
      />
      
      <RadioGroup
        label="Family Type"
        name="familyType"
        options={['Nuclear', 'Joint']}
        value={data.familyType}
        onChange={(v) => handleChange('familyType', v)}
      />
      
      <CheckboxGroup
        label="Referred By"
        name="referredBy"
        options={['Doctor', 'Friends', 'Website', 'Direct', 'School']}
        values={data.referredBy || []}
        onChange={(v) => handleChange('referredBy', v)}
      />
      
      <TextArea
        label="Referral Notes"
        name="referralNotes"
        value={data.referralNotes}
        onChange={(v) => handleChange('referralNotes', v)}
        rows={3}
      />
    </div>
  );
};

export default FamilyHomeInfo;
