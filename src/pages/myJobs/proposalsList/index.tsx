import React, { useEffect } from 'react';
import { Button, Collapse, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { IProposal, ProposalStatus } from 'types/proposal';
import { constants } from 'constants/urls';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { useCreateChatMutation } from 'store/api/chatsApi';
import { useChangeProposalStatusMutation } from 'store/api/proposalsApi';
import notification, { NotificationPlacement } from 'antd/lib/notification';
import { ListSelector, Message } from '../styles';

interface IProps {
    proposals: IProposal[];
    jobId: number;
    refetch: () => void;
}

export function ProposalsList({ proposals, jobId, refetch }: IProps): JSX.Element {
    const [createChat] = useCreateChatMutation();
    const { Panel } = Collapse;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [changeStatus] = useChangeProposalStatusMutation();

    const openNotification = (placement: NotificationPlacement): void => {
        notification.success({
            message: t('Chats.success'),
            description: t('Chats.chat'),
            placement,
        });
    };

    function acceptProposal(freelancerId: number, proposal: number): void {
        createChat({ freelancer: freelancerId, vacancy: jobId });
        changeStatus({ id: proposal, status: ProposalStatus.Accepted });
        navigate('/chats');
        openNotification('bottomRight');
    }

    useEffect(() => {
        refetch();
    }, [changeStatus]);

    function panelHeader(proposal: IProposal): JSX.Element {
        return (
            <h4 style={{ marginTop: '4px' }}>
                {t('Proposal.proposalfrom')}
                <strong>{proposal.user?.firstName} {proposal.user?.lastName} </strong> ( {t('Proposal.hourlyrate')}
                <strong>{proposal.price}</strong> )
            </h4>
        );
    }

    return (
        <>
            {
                proposals.filter(elem => elem.coverLetter !== null).map((proposal: IProposal) => (
                    <Collapse key={proposal.id}>
                        <Panel style={{
                            marginBottom: '10px'
                        }} header={panelHeader(proposal)} key={proposal.createdAt} showArrow={false} >
                            <ListSelector nomargin>
                                <p>
                                    {t('Proposal.recieved')}<strong>{proposal.createdAt.slice(0, 10)}</strong>
                                </p>
                            </ListSelector>

                            <ListSelector nomargin><NavLink to={`/profile/${proposal.user?.id}`}>
                                <Image
                                    style={{
                                        maxHeight: '100px',
                                        borderRadius: '50%',
                                        margin: '5px',
                                        width: '100px'
                                    }}
                                    preview={false}
                                    src={proposal.user?.photo}
                                    fallback={constants.PHOTO_PLACEHOLDER}
                                />
                            </NavLink> <Message>{proposal.coverLetter}</Message>
                            </ListSelector>
                            <div style={{ margin: '20px 12px 0 0' }}>
                                {proposal.status === ProposalStatus.Accepted ? <Button
                                    disabled
                                    block
                                    size='large'
                                    icon={<CheckOutlined />}
                                    type='ghost' style={{ borderRadius: '8px' }}>{t('Proposal.accepted')}
                                </Button> :
                                    <Button onClick={() => { acceptProposal(proposal.user.id, proposal.id); }}
                                        block
                                        size='large'
                                        type='ghost' style={{ borderRadius: '8px' }}>{t('Proposal.gotochat')}<ArrowRightOutlined />
                                    </Button>}
                            </div>
                        </Panel>
                    </Collapse>
                ))
            }
        </>
    );
}