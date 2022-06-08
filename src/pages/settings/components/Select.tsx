import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Position } from 'types/profile';

interface Props{
  data?: Array<Position> | null;
  position?: Position;
  onChange(value: number): void;
}
export function SelectInput({data, position, onChange}: Props): JSX.Element{
  const { t } = useTranslation();
  const { Option } = Select;

  return (
  <Select
    showSearch
    defaultValue={position?.id}
    placeholder={t('GeneralSettings.select')}
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input, option) =>
      (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
    }
  >
    {data?.map((element) => {
      return <Option key={element.id} value={element.id}>{element.category}</Option>
    })}
  </Select>
)};
