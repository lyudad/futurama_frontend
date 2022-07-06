import React, { useState } from 'react';
import { Space, Card, Collapse, Result, Button } from 'antd';
import { Container, Heading, Skill } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { IVacancy } from 'types/vacancy';
import { IProposal } from 'types/proposal';
import { ProposalsList } from './proposalsList';
import { Button as CustomButton } from 'components/ui/button';
import { ListSelector } from './styles';
import { useChangeJobStatusMutation, useDeleteJobMutation, useGetMyJobsQuery } from 'store/api/vacanciesApi';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export function MyJobs(): JSX.Element {
  const { data } = useGetMyJobsQuery();
  const { Panel } = Collapse;
  const { t } = useTranslation();
  const [isActiveJobs, setIsAvtiveJobs] = useState(true);
  const [changeStatus] = useChangeJobStatusMutation();
  const [deleteJob] = useDeleteJobMutation();

  function panelHeader(proposals: IProposal[]): JSX.Element {
    proposals = proposals.filter(elem => elem.coverLetter !== null);
    if (proposals.length === 0) return <strong>{t('Proposal.noproposals')}</strong>;
    if (proposals.length === 1)
      return <span>{t('Proposal.show')}<strong>{proposals.length}</strong>{t('Proposal.proposal')}</span>;
    return <span>{t('Proposal.show')}<strong>{proposals.length}</strong>{t('Proposal.proposals')}</span>;
  }

  function jobHeader(job: IVacancy): JSX.Element {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <a href={`/vacancy/${job.id}`}>{job.title}</a>
        {job.isActive ? <Button size='middle'
          type='default'
          icon={<CloseOutlined />} onClick={() => changeStatus({ id: job.id, status: !job.isActive })}>
          Move to archive
        </Button> : <div>
          <Button onClick={() => changeStatus({ id: job.id, status: !job.isActive })}
            style={{ marginRight: '15px' }}
            size='middle'
            type='primary'
            icon={<CheckOutlined />}
          >Restore</Button>
          <Button onClick={() => deleteJob({ id: job.id })}
            size='middle'
            type='default'
            icon={<CloseOutlined />}
          >Delete
          </Button>
        </div>}
      </div>);
  }

  if (data) {
    let jobs: IVacancy[] | [] = data;
    if (isActiveJobs) {
      jobs = jobs.filter(elem => elem.isActive === true);
    } else jobs = jobs.filter(elem => elem.isActive === false);

    return (
      <Container style={{ minHeight: '600px' }}>
        <Heading>{t('Proposal.myjobs')}</Heading>
        <ListSelector>
          {isActiveJobs
            ? <CustomButton theme="#75CCD2" color="white" onClick={() => setIsAvtiveJobs(true)}>Active jobs</CustomButton>
            : <CustomButton onClick={() => setIsAvtiveJobs(true)}>Active jobs</CustomButton>}
          {!isActiveJobs
            ? <CustomButton theme="#75CCD2" color="white" onClick={() => setIsAvtiveJobs(false)}>Archive</CustomButton>
            : <CustomButton onClick={() => setIsAvtiveJobs(false)}>Archive</CustomButton>}
        </ListSelector>

        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card
                key={job.id}
                style={{
                  boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
                }}
                title={jobHeader(job)}
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

            ))) : (<Result
              style={{
                background: 'white',
                borderRadius: '15px'
              }}
              title={t('Proposal.nojobs')}
            />)}
        </Space>
      </Container >
    );
  } return <Spinner />;
}