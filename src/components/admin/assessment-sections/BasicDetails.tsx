import React from 'react';
import { SectionTitle, TextInput, CheckboxGroup, TextArea } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const BasicDetails: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <SectionTitle 
        title="Section 1: Basic Child Details" 
        subtitle="Enter the child's basic information"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Child Name"
          name="childName"
          value={data.childName}
          onChange={(v) => handleChange('childName', v)}
          required
          placeholder="Enter child's full name"
          disabled={!!data.childId}
        />
        
        <TextInput
          label="Age"
          name="age"
          type="number"
          value={data.age}
          onChange={(v) => handleChange('age', v)}
          required
          placeholder="Enter age in years"
        />
        
        <TextInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={data.dob}
          onChange={(v) => handleChange('dob', v)}
        />
        
        <div>
          <CheckboxGroup
            label="Gender"
            name="gender"
            options={['Male', 'Female', 'Other']}
            values={data.gender ? [data.gender] : []}
            onChange={(v) => handleChange('gender', v[v.length - 1])}
            required
          />
        </div>
        
        <TextInput
          label="Parent Name"
          name="parentName"
          value={data.parentName}
          onChange={(v) => handleChange('parentName', v)}
          required
          placeholder="Enter parent/guardian name"
        />
        
        <TextInput
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={data.phoneNumber}
          onChange={(v) => handleChange('phoneNumber', v)}
          required
          placeholder="Enter contact number"
        />
      </div>
      
      <TextArea
        label="Address"
        name="address"
        value={data.address}
        onChange={(v) => handleChange('address', v)}
        rows={3}
      />
    </div>
  );
};

export default BasicDetails;
