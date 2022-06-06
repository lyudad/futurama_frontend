import React from 'react';
import { Space, Card, Collapse } from 'antd';
import { useGetMyJobsQuery } from 'store/api/proposalsApi';
import { Container, Heading, Skill } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { IVacancy } from 'types/vacancy';
import { IProposal } from 'types/proposal';
import { ProposalsList } from './proposalsList';


export function MyJobs(): JSX.Element {
  const { data } = useGetMyJobsQuery();
  const { Panel } = Collapse;
  const { t } = useTranslation();

  function panelHeader(proposals: IProposal[]): JSX.Element {
    if (proposals.length === 0) return <strong>No proposals yet...</strong>;
    if (proposals.length === 1)
      return <span>Show <strong>{proposals.length}</strong> proposal</span>;
    return <span>Show <strong>{proposals.length}</strong> proposals</span>;
  }

  if (data) {
    const jobs: IVacancy[] | [] = data;

    return (
      <Container style={{ minHeight: '600px' }}>
        <Heading>{t('Proposal.myjobs')}</Heading>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card
                key={job.id}
                style={{
                  boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
                }}
                title={job.title}
              >
                <span>{t('Vacancy.rate')} <strong> ${job.price}</strong></span>
                <span>  /  {t('Vacancy.duration')} <strong> {job.timePerWeek}{t('Proposal.hour')}</strong></span>

                <div style={{ paddingTop: '10px' }}>
                  <p>{job.description}</p>
                  <div>
                    {job.skills?.map((skill: { id: number; skill: string; }) => (
                      <Skill key={skill.id}>{skill.skill}</Skill>
                    ))}
                  </div>
                </div>

                <Collapse bordered={false}>
                  <Panel style={{ marginTop: '20px' }} header={panelHeader(job.proposals ? job.proposals : [])} key={jobs.length}>
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