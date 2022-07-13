import React, { useState } from 'react';
import { Form } from 'antd';
import { IMessage } from 'types/message';
import { useAppSelector } from 'store/hooks';
import TextArea from 'antd/lib/input/TextArea';
import { useTranslation } from 'react-i18next';
import io from "socket.io-client";
import { variables } from 'constants/variables';
import SendOffer from 'pages/offers/sendOffer';
import { useGetChatDataQuery } from 'store/api/chatsApi';
import { IProps } from '../messages';
import { Button, FlexColumn } from '../styles';

export type ChatData = {
    vacancy: {
        id: number;
    },
    freelancer: {
        id: number;
    };
};

function MessageForm({ selectedChat }: IProps): JSX.Element {
    const [modal, showModal] = useState<boolean>(false);
    const role = useAppSelector((state) => state.auth.user?.role);
    const myId = useAppSelector((state) => state.auth.user?.id);
    const data: ChatData = useGetChatDataQuery(selectedChat)?.data || { vacancy: { id: 0 }, freelancer: { id: 0 } };

    const [form] = Form.useForm();
    const socket = io(`${process.env.REACT_APP_URL}`);
    const { t } = useTranslation();

    async function send(values: IMessage): Promise<void> {
        if (values.messageBody && values.messageBody.trim().length > 0)
            socket.emit('send_message', values);
    };

    return (
        <FlexColumn>
            <Form
                form={form}
                layout="vertical"
                size='large'
            >
                <Form.Item name="messageBody">
                    <TextArea
                        placeholder={t('Chats.enter')}
                        autoFocus
                        rows={4}
                        maxLength={500}
                        style={{ height: 130, marginTop: '30px', borderRadius: '10px' }}
                    />
                </Form.Item>
                <Form.Item noStyle
                    name="author"
                    initialValue={myId}
                />
            </Form>

            {role === variables.jobOwner ? <div style={{ display: 'flex', justifyContent: 'space-between' }}><Button onClick={() => {
                showModal(true);
            }}>{t('Offers.send')}</Button>
                <Button onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            send({ ...values, chatId: selectedChat });
                        });
                }}>{t('Chats.send')}
                </Button>  </div> : <Button onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            send({ ...values, chatId: selectedChat });
                        });
                }}>{t('Chats.send')}
            </Button>}
            <SendOffer modal={modal} showModal={showModal} vacancy={data.vacancy.id} user={data.freelancer.id} />
        </FlexColumn>
    );
}

export default MessageForm;