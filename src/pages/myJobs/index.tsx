import React from 'react';
import { Space, Card, Collapse, Result } from 'antd';
import { useGetMyJobsQuery } from 'store/api/proposalsApi';
import { Container, Heading, Skill } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { IVacancy } from 'types/vacancy';
import { IProposal } from 'types/proposal';
import { Container as Wrapper } from 'pages/contacts/styles';
import { ProposalsList } from './proposalsList';

export function MyJobs(): JSX.Element {
  const { data } = useGetMyJobsQuery();
  const { Panel } = Collapse;
  const { t } = useTranslation();

  function panelHeader(proposals: IProposal[]): JSX.Element {
    proposals = proposals.filter(elem => elem.coverLetter !== null);
    if (proposals.length === 0) return <strong>{t('Proposal.noproposals')}</strong>;
    if (proposals.length === 1)
      return <span>{t('Proposal.show')}<strong>{proposals.length}</strong>{t('Proposal.proposal')}</span>;
    return <span>{t('Proposal.show')}<strong>{proposals.length}</strong>{t('Proposal.proposals')}</span>;
  }

  if (data) {
    const jobs: IVacancy[] | [] = data;

    return (
      <>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Container style={{ minHeight: '600px' }}>
              <Heading>{t('Proposal.myjobs')}</Heading>
              <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Card
                  key={job.id}
                  style={{
                    boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
                  }}
                  title={<a href={`/vacancy/${job.id}`}>{job.title}</a>}
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
              </Space>
            </Container >
          ))) : (<Wrapper><Result
            style={{
              background: 'white',
              borderRadius: '15px'
            }}
            title={t('Proposal.nojobs')}
          /></Wrapper>)}
        <div />
      </>
    );
  } return <Spinner />;
}