import React from 'react';
import { Avatar, Button, Card } from 'antd';
import { IContract } from 'types/contracts';
import { useTranslation } from 'react-i18next';
import { ContractWrapper } from './styles';

const { Meta } = Card;

interface Props {
  data: IContract;
  closeContract?(): void;
  isOwner: boolean;
}

export function Contract({ data, closeContract, isOwner }: Props): JSX.Element {
  const { t } = useTranslation();
  return (
    <ContractWrapper>
      {isOwner ? <Meta
        avatar={<Avatar size={80} src={data.freelancer.photo} />}
        title={`${t('Contract.freelancer')}: ${data.freelancer.firstName} ${data.freelancer.lastName} `}
        description={data.title}
        style={{ marginBottom: 10 }}
      /> : <Meta
        avatar={<Avatar size={80} src={data.owner.photo} />}
        title={`${t('Contract.owner')}: ${data.owner.firstName} ${data.owner.lastName} `}
        description={data.title}
        style={{ marginBottom: 10 }}
      />}
      <p><strong>{t('Contract.hourly_rate')}</strong>{data.hourlyRate}</p>
      <p><strong>{t('Contract.start')}</strong> {data.start.slice(0, 10)}, {data.start.slice(11, 16)} </p>
      {data.end ? <p><strong>{t('Contract.end')}</strong> {data.end.slice(0, 10)}, {data.end.slice(11, 16)}</p> :
        <p><strong>{t('Contract.end')}</strong> -</p>}
      {data.active && isOwner && <Button onClick={closeContract}>{t('Contract.closeContract')}</Button>}
    </ContractWrapper>
  );
};
