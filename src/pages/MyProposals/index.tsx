import React from 'react';
import { Space, Card, Collapse } from 'antd';
import { useGetMyProposalsQuery } from 'store/api/proposalsApi';
import { Container, Heading } from 'pages/vacancies/components/projectDetails/styles';
import { IProposal } from 'types/proposal';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';

export function MyProposals(): JSX.Element {
  const { data } = useGetMyProposalsQuery();
  const { Panel } = Collapse;
  const { t } = useTranslation();

  if (data) {
    const proposals: IProposal[] | [] = data;

    return (
      <Container>
        <Heading>{t('Proposal.myproposals')}</Heading>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {proposals.map((proposal) => (
            <Card
              key={proposal.id}
              title={<a href={`/vacancy/${proposal.vacancy.id}`} rel="noreferrer" target='_blank'>{proposal.vacancy.title}</a>}
              size="small">
              <p>{t('Proposal.myhourlyrate')}<strong>${proposal.price}</strong></p>
              <Collapse>
                <Panel header="Cover letter" key={proposal.id}>
                  <p>{proposal.coverLetter}</p>
                </Panel>
              </Collapse>
            </Card>
          ))}
        </Space>
      </Container >

    );
  } return <Spinner />;
}
