import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCreateChatMutation } from 'store/api/chatsApi';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { useChangeProposalStatusMutation } from 'store/api/proposalsApi';
import { ProposalStatus } from 'types/proposal';

interface IProps {
    inviteId: number;
    vacancyId: number;
    status: string;
    chat?: boolean;
}

function Buttons({ inviteId, vacancyId, status, chat }: IProps): JSX.Element {
    const myId = useAppSelector((state) => state.auth.user?.id);
    const { t } = useTranslation();

    const [createChat] = useCreateChatMutation();
    const [changeStatus] = useChangeProposalStatusMutation();

    function acceptingInvite(vacancy: number, invite: number): void {
        changeStatus({ id: invite, status: ProposalStatus.Accepted });
        if (chat)
            createChat({ freelancer: myId, vacancy });
    }

    if (status === ProposalStatus.Pending)
        return (
            <>
                <Button onClick={() => { acceptingInvite(vacancyId, inviteId); }}
                    style={{ margin: '10px' }}
                    size='middle'
                    type='primary'
                    icon={<CheckOutlined />}
                >{t('Proposal.accept')}
                </Button>
                <Button onClick={() => { changeStatus({ id: inviteId, status: ProposalStatus.Declined }); }}
                    style={{ marginTop: '10px' }}
                    danger
                    size='middle'
                    type='dashed'
                    icon={<CloseOutlined />}
                >{t('Proposal.decline')}
                </Button>
            </>);
    if (status === ProposalStatus.Accepted)
        return (
            <>
                <Button
                    style={{ margin: '10px' }}
                    size='middle'
                    type='default'
                    disabled
                    icon={<CheckOutlined />}
                >{t('Invite.accepted')}</Button>
                <Button onClick={() => { changeStatus({ id: inviteId, status: ProposalStatus.Deleted }); }}
                    style={{ marginTop: '10px' }}
                    size='middle'
                    type='default'
                    icon={<CloseOutlined />}
                >{t('Invite.delete')}</Button>
            </>);
    return (
        <>
            <Button
                style={{ margin: '10px' }}
                size='middle'
                type='default'
                disabled
                icon={<CloseOutlined />}
            >{t('Invite.declined')}</Button>
            <Button onClick={() => { changeStatus({ id: inviteId, status: ProposalStatus.Deleted }); }}
                style={{ marginTop: '10px' }}
                size='middle'
                type='default'
                icon={<CloseOutlined />}
            >{t('Invite.delete')}</Button>
        </>);
}

export default Buttons;