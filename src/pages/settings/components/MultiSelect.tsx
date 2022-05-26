import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props{
    data: Array<string>;
    skills?: Array<string>;
}

export function MultiSelect({data, skills = []}: Props): JSX.Element {
    const { t } = useTranslation();
    const { Option } = Select;

    const handleChange = (value: string[]): void => {
    console.log(`selected ${value}`);
    };

    return (
        <Select
          mode="multiple"
          style={{ width: '20rem', padding: '0'}}
          placeholder={t('GeneralSettings.selectSkills')}
          defaultValue={skills !== null? skills : []}
          onChange={handleChange}
          optionLabelProp="label"
        >
          {data.map((element, index) => {
              return (
                <Option style={{margin: '0'}} key={index} value={element} label={element}>
                    {element}
                </Option>
          )})}
        </Select>
      )
}

export default MultiSelect;