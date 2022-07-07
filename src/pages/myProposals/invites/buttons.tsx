import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCreateChatMutation } from 'store/api/chatsApi';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { useChangeProposalStatusMutation } from 'store/api/proposalsApi';

interface IProps {
    inviteId: number;
    vacancyId: number;
    status: string;
}

function Buttons({ inviteId, vacancyId, status }: IProps): JSX.Element {
    const myId = useAppSelector((state) => state.auth.user?.id);
    const { t } = useTranslation();

    const [createChat] = useCreateChatMutation();
    const [changeStatus] = useChangeProposalStatusMutation();

    function acceptingInvite(vacancy: number, invite: number): void {
        createChat({ freelancer: myId, vacancy });
        changeStatus({ id: invite, status: 'Accepted' });
    }

    if (status === "Pending")
        return (
            <>
                <Button onClick={() => { acceptingInvite(vacancyId, inviteId); }}
                    style={{ margin: '10px' }}
                    size='middle'
                    type='primary'
                    icon={<CheckOutlined />}
                >{t('Proposal.accept')}
                </Button>
                <Button onClick={() => { changeStatus({ id: inviteId, status: "Declined" }); }}
                    style={{ marginTop: '10px' }}
                    danger
                    size='middle'
                    type='dashed'
                    icon={<CloseOutlined />}
                >{t('Proposal.decline')}
                </Button>
            </>);
    if (status === "Accepted")
        return (
            <>
                <Button
                    style={{ margin: '10px' }}
                    size='middle'
                    type='default'
                    disabled
                    icon={<CheckOutlined />}
                >{t('Invite.accepted')}</Button>
                <Button
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
            <Button
                style={{ marginTop: '10px' }}
                size='middle'
                type='default'
                icon={<CloseOutlined />}
            >{t('Invite.delete')}</Button>
        </>);
}

export default Buttons;