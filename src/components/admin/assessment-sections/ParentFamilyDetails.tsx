import React from 'react';
import { SectionTitle, TextInput, CheckboxGroup } from '../FormComponents';

interface Props {
  data: any;
  onChange: (data: any) => void;
}

const ParentFamilyDetails: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const educationOptions = [
    'No School',
    'Studied till 5th',
    'Studied till 8th',
    'Studied till 10th',
    'Studied till 12th',
    'UG',
    'PG',
    'Higher'
  ];

  return (
    <div>
      <SectionTitle 
        title="Section 2: Parent & Family Details" 
        subtitle="Information about parents and family"
      />
      
      {/* Father Details */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Father's Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Age"
            name="fatherAge"
            type="number"
            value={data.fatherAge}
            onChange={(v) => handleChange('fatherAge', v)}
          />
          <TextInput
            label="Occupation"
            name="fatherOccupation"
            value={data.fatherOccupation}
            onChange={(v) => handleChange('fatherOccupation', v)}
          />
        </div>
        <CheckboxGroup
          label="Education"
          name="fatherEducation"
          options={educationOptions}
          values={data.fatherEducation ? [data.fatherEducation] : []}
          onChange={(v) => handleChange('fatherEducation', v[v.length - 1])}
        />
        <TextInput
          label="Hours Spent With Child Daily"
          name="fatherHoursWithChild"
          type="number"
          value={data.fatherHoursWithChild}
          onChange={(v) => handleChange('fatherHoursWithChild', v)}
        />
      </div>

      {/* Mother Details */}
      <div className="mb-8 p-4 bg-pink-50 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Mother's Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Age"
            name="motherAge"
            type="number"
            value={data.motherAge}
            onChange={(v) => handleChange('motherAge', v)}
          />
          <TextInput
            label="Occupation"
            name="motherOccupation"
            value={data.motherOccupation}
            onChange={(v) => handleChange('motherOccupation', v)}
          />
        </div>
        <CheckboxGroup
          label="Education"
          name="motherEducation"
          options={educationOptions}
          values={data.motherEducation ? [data.motherEducation] : []}
          onChange={(v) => handleChange('motherEducation', v[v.length - 1])}
        />
        <TextInput
          label="Hours Spent With Child Daily"
          name="motherHoursWithChild"
          type="number"
          value={data.motherHoursWithChild}
          onChange={(v) => handleChange('motherHoursWithChild', v)}
        />
      </div>

      {/* Grandparent Details */}
      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Grandparent Details</h3>
        <CheckboxGroup
          label="Education"
          name="grandparentEducation"
          options={educationOptions}
          values={data.grandparentEducation ? [data.grandparentEducation] : []}
          onChange={(v) => handleChange('grandparentEducation', v[v.length - 1])}
        />
        <TextInput
          label="Hours Spent With Child Daily"
          name="grandparentHoursWithChild"
          type="number"
          value={data.grandparentHoursWithChild}
          onChange={(v) => handleChange('grandparentHoursWithChild', v)}
        />
      </div>
    </div>
  );
};

export default ParentFamilyDetails;
