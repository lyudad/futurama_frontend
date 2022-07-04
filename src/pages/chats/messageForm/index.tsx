import React from 'react';
import { Form } from 'antd';
import { IMessage } from 'types/message';
import { useAppSelector } from 'store/hooks';
import TextArea from 'antd/lib/input/TextArea';
import { useTranslation } from 'react-i18next';
import io from "socket.io-client";
import { Button, FlexColumn } from '../styles';
import { IProps } from '../messages';

function MessageForm({ selectedChat }: IProps): JSX.Element {

    const myId = useAppSelector((state) => state.auth.user?.id);

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
            <Button onClick={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        send({ ...values, chatId: selectedChat });
                    });
            }}>{t('Chats.send')}
            </Button>
        </FlexColumn>
    );
}

export default MessageForm;