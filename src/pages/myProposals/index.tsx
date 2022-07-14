import React from 'react';
import { Space, Card, Collapse, Result, Button } from 'antd';
import { useChangeProposalStatusMutation, useGetMyProposalsQuery } from 'store/api/proposalsApi';
import { Container, Heading } from 'pages/vacancies/components/projectDetails/styles';
import { IProposal, ProposalStatus } from 'types/proposal';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { CloseOutlined } from '@ant-design/icons';

export function MyProposals(): JSX.Element {
  const { data } = useGetMyProposalsQuery();
  const [changeStatus] = useChangeProposalStatusMutation();
  const { Panel } = Collapse;
  const { t } = useTranslation();

  if (data) {
    const proposals: IProposal[] | [] = data;

    return (
      <Container style={{ minHeight: '700px' }}>
        <Heading>{t('Proposal.myproposals')}</Heading>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <Card style={{
                padding: '1rem',
                boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
              }}
                key={proposal.id}
                title={<a href={`/vacancy/${proposal.vacancy.id}`}>{proposal.vacancy.title}</a>}
                size="small">
                <p>{t('Proposal.myhourlyrate')}<strong>${proposal.price}</strong></p>
                <Collapse bordered={false}>
                  <Panel header="Cover letter" key={proposal.id}>
                    <span>{t('Proposal.sentDate')}<strong>{proposal.createdAt.slice(0, 10)}</strong></span>
                    <p style={{
                      backgroundColor: '#d5eafb',
                      padding: '16px',
                      borderRadius: '15px',
                      marginTop: '20px'
                    }}>{proposal.coverLetter}</p>
                  </Panel>
                </Collapse>
                <Button onClick={() => { changeStatus({ id: proposal.id, status: ProposalStatus.Deleted }); }}
                  style={{ marginTop: '10px' }}
                  size='middle'
                  type='ghost'                  
                  icon={<CloseOutlined />}
                >{t('Invite.delete')}</Button>
              </Card>
            ))) : (<Result
              style={{
                background: 'white',
                borderRadius: '15px'
              }}
              title={t('Proposal.noproposals')}
            />)}
        </Space>
      </Container >
    );
  } return <Spinner />;
}
