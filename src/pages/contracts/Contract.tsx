import React from 'react';
import { Avatar, Card } from 'antd';
import { IContract } from 'types/contracts';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;

interface Props {
    data: IContract;
}
export function Contract({data}: Props): JSX.Element {
    const { t } = useTranslation();
  return (
    <Card 
    title={data.title} 
    style={{ width: 500, marginTop: 16, borderColor: 'black', borderRadius: '1rem'}} 
    extra={<NavLink to="#">{t('Contract.chat')}</NavLink>}>
            <Meta
            avatar={<Avatar size={80} src={data.owner.photo} />}
            title={`${t('Contract.title')}: ${data.owner.firstName  } ${  data.owner.lastName} `}
            description={data.description}
            style={{marginBottom: 10}}
            />
            <p><strong>{t('Contract.hourly_rate')}</strong> {data.hourlyRate} $</p>
            <p><strong>{t('Contract.start')}</strong> {data.startDate}</p>
            <p><strong>{t('Contract.end')}</strong> {data.endDate}</p>
    </Card>
  )
};
