import React from 'react';
import { Space, Card, Collapse, Image } from 'antd';

import { useGetMyJobsQuery } from 'store/api/proposalsApi';
import { Container, Heading } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { IVacancy } from 'types/vacancy';
import { IProposal } from 'types/proposal';
import { constants } from 'constants/urls';
import { Message } from './styles';

export function MyJobs(): JSX.Element {
  const { data } = useGetMyJobsQuery();
  const { Panel } = Collapse;
  const { t } = useTranslation();

  function panelHeader(proposal: IProposal): JSX.Element {
    return (<h4>
      {t('Proposal.proposalfrom')}
      <strong>{proposal.user?.firstName} {proposal.user?.lastName} </strong> ( {t('Proposal.hourlyrate')}
      <strong>{proposal.price}</strong> )
    </h4>);
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
                style={{
                  boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
                }}

                title={job.title}
              >
                <p>{t('Vacancy.rate')} <strong>${job.price}</strong></p>
                <p>{t('Vacancy.duration')} <strong>{job.timePerWeek}{t('Proposal.hour')}</strong></p>

                <Collapse bordered={false}>
                  <Panel header="Show proposals" key={jobs.length}>

                    {job.proposals?.map((proposal: IProposal) => (
                      <Collapse accordion key={proposal.id}>
                        <Panel style={{
                          border: '1px solid rgba(25, 133, 179, 0.5)', marginBottom: '10px'
                        }} header={panelHeader(proposal)} key={proposal.createdAt} showArrow={false} >
                          <p>
                            {t('Proposal.recieved')}<strong>{proposal.createdAt.slice(0, 10)}</strong>
                          </p>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}><Image
                              style={{
                                maxHeight: '100px',
                                borderRadius: '50%',
                                margin: '5px'
                              }}
                              preview={false}
                              src={proposal.user?.photo}
                              fallback={constants.PHOTO_PLACEHOLDER}
                            /> <Message>{proposal.coverLetter}</Message>
                          </div>

                        </Panel>
                      </Collapse>
                    ))}
                  </Panel>
                </Collapse>
              </Card>
            ))) : (<h5> {t('Proposal.nojobs')}</h5>)}
        </Space>
      </Container >

    );
  } return <Spinner />;
}