import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props{
  data: Array<string>;
  position?: string;
}
export function SelectInput({data, position}: Props): JSX.Element{
  const { t } = useTranslation();
  const { Option } = Select;

  const onChange = (value: string): void => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string): void => {
    console.log('search:', value);
  };
  return (
  <Select
    showSearch
    defaultValue={position}
    placeholder={t('GeneralSettings.select')}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterOption={(input, option: any) =>
      (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
    }
  >
    {data.map((element) => {
      return <Option key={element} value={element}>{element}</Option>
    })}
  </Select>
)};
