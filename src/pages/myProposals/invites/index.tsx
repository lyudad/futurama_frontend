import React from 'react';
import { Space, Card, Collapse, Button, Result } from 'antd';
import { useGetMyInvitesQuery } from 'store/api/proposalsApi';
import { Container, Heading, Skill } from 'pages/vacancies/components/projectDetails/styles';
import { IProposal } from 'types/proposal';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/ui/Spinner';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useCreateChatMutation } from 'store/api/chatsApi';
import { useAppSelector } from 'store/hooks';

export function Invites(): JSX.Element {
    const { data, isLoading } = useGetMyInvitesQuery();
    const { Panel } = Collapse;
    const { t } = useTranslation();
    const myId = useAppSelector((state) => state.auth.user?.id);
    const [createChat] = useCreateChatMutation();

    function acceptingInvite(vacancyId: number): void {
        createChat({ freelancer: myId, vacancy: vacancyId });
    }

    if (isLoading) return <Spinner />;
    if (data) {
        const invites: IProposal[] | [] = data;

        return (
            <Container style={{ minHeight: '700px' }}>
                <Heading>{t('MenuBar.InvitesToInterview')}</Heading>
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    {invites.length > 0 ? (
                        invites.map((invite) => (
                            <Card style={{
                                padding: '1rem',
                                boxShadow: '2px 2px 2px 2px rgba(4, 8, 14, 0.5)'
                            }}
                                key={invite.id}
                                title={<span>{t('Proposal.from')}
                                    <strong>{invite.vacancy?.owner?.firstName} {invite.vacancy?.owner?.lastName}</strong>
                                </span>}
                                size="small">
                                <p>{t('Proposal.position')}{<a href={`/vacancy/${invite.vacancy.id}`}>
                                    {invite.vacancy.title}</a>} ( {t('Proposal.hourlyrate')}
                                    <strong>{invite.vacancy.price}</strong> )
                                </p>
                                <span>{t('Proposal.recieved')}<strong>{invite.createdAt.slice(0, 10)}</strong></span>
                                <Collapse bordered={false} style={{ marginTop: '15px' }}>
                                    <Panel header={<strong>{t('Proposal.jobdetails')}</strong>} key={invite.id}>
                                        <strong>{t('GeneralSettings.mainForm.description')}</strong><p>{invite.vacancy.description}</p>
                                        <strong>{t('Vacancy.skills')}</strong><br />
                                        {invite.vacancy?.skills?.map((skill: { id?: number, skill?: string; }) => (
                                            <Skill key={skill.id}>{skill.skill}</Skill>
                                        ))}
                                    </Panel>
                                </Collapse>
                                <Button
                                    style={{ marginTop: '10px' }}
                                    size='middle'
                                    type='default'
                                    icon={<CloseOutlined />}
                                >{t('Proposal.decline')}</Button>
                                <Button onClick={() => { acceptingInvite(invite.vacancy.id); }}
                                    style={{ margin: '10px' }}
                                    size='middle'
                                    type='primary'
                                    icon={<CheckOutlined />}
                                >{t('Proposal.accept')}</Button>
                            </Card>
                        ))) : (<Result
                            style={{
                                background: 'white',
                                borderRadius: '15px'
                            }}
                            title={t('Proposal.noinvites')}
                        />)}
                </Space>
            </Container >
        );
    } return <div />;
}
