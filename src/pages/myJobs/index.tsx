import React from 'react';
import { Space, Card, Collapse } from 'antd';
import { useGetMyJobsQuery } from 'store/api/proposalsApi';
import { Container, Heading } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { IVacancy } from 'types/vacancy';
import { ProposalsList } from './proposalsList';

export function MyJobs(): JSX.Element {
  const { data } = useGetMyJobsQuery();
  const { Panel } = Collapse;
  const { t } = useTranslation();

  if (data) {
    const jobs: IVacancy[] | [] = data;

    return (
      <Container style={{ minHeight: '600px' }}>
        <Heading>{t('Proposal.myjobs')}</Heading>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card
                style={{
                  boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
                }}
                title={job.title}
              >
                <p>{t('Vacancy.rate')} <strong>${job.price}</strong></p>
                <p>{t('Vacancy.duration')} <strong>{job.timePerWeek}{t('Proposal.hour')}</strong></p>

                <Collapse bordered={false}>
                  <Panel header={`Show ${job.proposals?.length} proposal(s)`} key={jobs.length}>
                    <ProposalsList proposals={job.proposals ? job.proposals : []} />
                  </Panel>
                </Collapse>
              </Card>
            ))) : (<h5> {t('Proposal.nojobs')}</h5>)}
        </Space>
      </Container >
    );
  } return <Spinner />;
}