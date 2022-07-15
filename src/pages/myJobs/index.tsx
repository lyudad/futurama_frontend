import React, { useMemo, useState } from 'react';
import { Space, Card, Collapse, Result, Button, message } from 'antd';
import { Container, Heading, Skill } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { IVacancy } from 'types/vacancy';
import { IProposal } from 'types/proposal';
import { Button as CustomButton } from 'components/ui/button';
import { useChangeJobStatusMutation, useDeleteJobMutation, useGetMyJobsQuery } from 'store/api/vacanciesApi';
import { CheckOutlined, CloseOutlined, SmileOutlined } from '@ant-design/icons';
import { ListSelector } from './styles';
import { ProposalsList } from './proposalsList';
import { NavLink } from 'react-router-dom';

export function MyJobs(): JSX.Element {
  const { data, isLoading } = useGetMyJobsQuery();
  const { Panel } = Collapse;
  const { t } = useTranslation();
  const [isActiveJobs, setIsAvtiveJobs] = useState<boolean>(true);
  const [changeStatus] = useChangeJobStatusMutation();
  const [deleteJob] = useDeleteJobMutation();

  function showMessage(): void {
    const key = 'updatable';
    message.success({
      content: t('CreateJob.moved'),
      key,
      duration: 2,
      style: {
        marginTop: '130px',
      },
    });
  }

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
          icon={<CloseOutlined />} onClick={() => { changeStatus({ id: job.id, status: !job.isActive }); showMessage(); }}>
          {t('CreateJob.move')}
        </Button> : <div>
          <Button onClick={() => { changeStatus({ id: job.id, status: !job.isActive }); showMessage(); }}
            style={{ marginRight: '15px' }}
            size='middle'
            type='primary'
            icon={<CheckOutlined />}
          >{t('CreateJob.restore')}</Button>
          <Button onClick={() => deleteJob({ id: job.id })}
            size='middle'
            type='default'
            icon={<CloseOutlined />}
          >{t('CreateJob.delete')}
          </Button>
        </div>}
      </div>);
  }

  const filteredJobs = useMemo(() => {
    if (data) {
      let jobs: IVacancy[] | [] = data;
      if (isActiveJobs) {
        jobs = jobs.filter(elem => elem.isActive === true);
      } else jobs = jobs.filter(elem => elem.isActive === false);
      return jobs;
    } return [];
  }, [isActiveJobs, data]);

  if (isLoading) return <Spinner />;

  return (
    <Container>
      {data?.length === 0 ? <NavLink to='/jobs/create'><Result icon={<SmileOutlined />} />
        <Heading style={{ textAlign: 'center' }}>{t('CreateJob.letscreate')}</Heading></NavLink>
        : <><Heading>{t('Proposal.myjobs')}</Heading>
          <ListSelector>
            {isActiveJobs
              ? <CustomButton theme="#75CCD2" color="white" onClick={() => setIsAvtiveJobs(true)}>{t('CreateJob.activejobs')}</CustomButton>
              : <CustomButton onClick={() => setIsAvtiveJobs(true)}>{t('CreateJob.activejobs')}</CustomButton>}
            {!isActiveJobs
              ? <CustomButton theme="#75CCD2" color="white" onClick={() => setIsAvtiveJobs(false)}>{t('CreateJob.archive')}</CustomButton>
              : <CustomButton onClick={() => setIsAvtiveJobs(false)}>{t('CreateJob.archive')}</CustomButton>}
          </ListSelector>

          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
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
                    <Panel style={{ marginTop: '20px' }} header={panelHeader(job.proposals ? job.proposals : [])} key={filteredJobs.length}>
                      <ProposalsList jobId={job.id} proposals={job.proposals ? job.proposals : []} />
                    </Panel>
                  </Collapse>
                </Card>

              ))) : (<Result title={t('Proposal.nojobs')} />)}
          </Space></>}

    </Container >
  );
}
