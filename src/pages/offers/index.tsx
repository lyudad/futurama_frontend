import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space, Card, Collapse, Result } from 'antd';
import { Container, Heading, Skill } from 'pages/vacancies/components/projectDetails/styles';
import { useGetMyOffersQuery } from 'store/api/proposalsApi';
import { Spinner } from 'components/ui/Spinner';
import { IProposal } from 'types/proposal';
import Buttons from 'pages/myProposals/invites/buttons';

export default function Offers(): JSX.Element {
    const { data, isLoading } = useGetMyOffersQuery();
    const { Panel } = Collapse;
    const { t } = useTranslation();

    if (isLoading) return <Spinner />;
    if (data) {
        const offers: IProposal[] | [] = data;

        return (
            <Container style={{ minHeight: '700px' }}>
                <Heading>{t('MenuBar.offers')}</Heading>
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    {offers.length > 0 ? (
                        offers.map((offer) => (
                            <Card style={{
                                padding: '1rem',
                                boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
                            }}
                                key={offer.id}
                                title={<p>{t('Proposal.position')}{<a href={`/vacancy/${offer.vacancy.id}`}>
                                    {offer.vacancy.title}</a>}
                                </p>}
                                size="small">
                                <span>{t('Vacancies.price')}<strong> {offer.price}</strong></span>
                                <Collapse bordered={false} style={{ marginTop: '15px' }}>
                                    <Panel header={<strong>{t('Proposal.jobdetails')}</strong>} key={offer.id}>
                                        <strong>{t('GeneralSettings.mainForm.description')}</strong><p>{offer.vacancy.description}</p>
                                        <strong>{t('Vacancy.skills')}</strong><br />
                                        {offer.vacancy?.skills?.map((skill: { id?: number, skill?: string; }) => (
                                            <Skill key={skill.id}>{skill.skill}</Skill>
                                        ))}
                                    </Panel>
                                </Collapse>
                                <Buttons
                                    contract
                                    inviteId={offer.id}
                                    vacancyId={offer.vacancy.id}
                                    status={offer.status}
                                    title={offer.vacancy.title}
                                    hourlyRate={offer.price}
                                    description={offer.vacancy.description}
                                    owner={offer.vacancy.owner?.id}
                                />
                            </Card>
                        ))) : (<Result
                            style={{
                                background: 'white',
                                borderRadius: '15px'
                            }}
                            title={t('Offers.noofers')}
                        />)}
                </Space>
            </Container >
        );
    } return <div />;
}

