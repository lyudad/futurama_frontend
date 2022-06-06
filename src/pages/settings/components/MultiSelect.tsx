import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Skill } from 'types/profile';

interface Props{
    data?: Array<Skill> | null;
    skills?: Array<number>;
    handleChange(values: number[]): void;
}

export function MultiSelect({data, skills, handleChange}: Props): JSX.Element {
    const { t } = useTranslation();
    const { Option } = Select;

    return (
        <Select
          mode="multiple"
          style={{ width: '20rem', padding: '0'}}
          placeholder={t('GeneralSettings.selectSkills')}
          defaultValue={skills}
          onChange={handleChange}
          optionLabelProp="label"
          filterOption={(input, option) =>
            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
        >
          {data?.map((element, index) => {
              return (
                <Option style={{margin: '0'}} key={index} value={element.id} label={element.skill}>
                    {element.skill}
                </Option>
          )})}
        </Select>
      )
}

export default MultiSelect;