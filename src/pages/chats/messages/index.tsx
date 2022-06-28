import React from 'react';
import { Form, Image, Result } from 'antd';
import { IMessage } from 'types/message';
import { constants } from 'constants/urls';
import { FlexContainer } from 'pages/vacancies/components/projectDetails/styles';
import { useAppSelector } from 'store/hooks';
import TextArea from 'antd/lib/input/TextArea';
import { useGetMesagesByChatIdQuery, useSendMessageMutation } from 'store/api/chatsApi';
import { Spinner } from 'components/ui/Spinner';
import { useTranslation } from 'react-i18next';
import { Button, FlexColumn, Message, MessageContainer } from '../styles';

interface IProps {
    selectedChat: number;
}

function Messages({ selectedChat }: IProps): JSX.Element {

    const { data: messages, isLoading } = useGetMesagesByChatIdQuery(selectedChat);

    const id = useAppSelector((state) => state.auth.user?.id);
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [sendMessage] = useSendMessageMutation();

    async function sending(values: IMessage): Promise<void> {
        if (values.messageBody && values.messageBody.trim().length > 0)
            await sendMessage(values);
    }

    if (isLoading) return <MessageContainer><Spinner /></MessageContainer>;

    if (messages)
        return (
            <MessageContainer>
                {
                    messages.map((message: IMessage) => {
                        if (!message.author) {
                            return (
                                <FlexContainer key={message.createdAt} style={{ justifyContent: 'center' }}>
                                    <Message created={message.createdAt.slice(11, 19)} >
                                        {message.messageBody}
                                    </Message>
                                </FlexContainer>
                            );
                        }
                        if (id === message.author?.id) {
                            return (
                                <FlexContainer key={message.createdAt} style={{ flexDirection: 'row-reverse' }}>
                                    <Image
                                        style={{
                                            maxHeight: '60px',
                                            borderRadius: '50%',
                                            marginTop: '5px',
                                            marginLeft: '17px',
                                            width: '50px'
                                        }}
                                        preview={false}
                                        src={message.author?.photo}
                                        fallback={constants.PHOTO_PLACEHOLDER}
                                    />
                                    <Message created={message.createdAt.slice(11, 19)} author='me'>
                                        {message.messageBody}
                                    </Message>
                                </FlexContainer>);
                        } return (
                            <FlexContainer key={message.createdAt}>
                                <Image
                                    style={{
                                        maxHeight: '60px',
                                        borderRadius: '50%',
                                        marginTop: '5px',
                                        marginRight: '17px',
                                        width: '50px'
                                    }}
                                    preview={false}
                                    src={message.author?.photo}
                                    fallback={constants.PHOTO_PLACEHOLDER}
                                />
                                <Message created={message.createdAt.slice(11, 19)} author='notme'>
                                    {message.messageBody}
                                </Message>
                            </FlexContainer>

                        );
                    })
                }
                <FlexColumn>
                    <Form
                        form={form}
                        layout="vertical"
                        size='large'
                    >
                        <Form.Item
                            name="messageBody"
                        >
                            <TextArea
                                autoFocus
                                rows={4}
                                maxLength={500}
                                style={{ height: 130, marginTop: '30px', borderRadius: '10px' }}
                            />
                        </Form.Item>
                        <Form.Item noStyle
                            name="author"
                            initialValue={id}
                        />
                        <Form.Item noStyle
                            name="chatId"
                            initialValue={selectedChat}
                        />
                    </Form>
                    <Button onClick={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                sending(values);
                            });
                    }} key="submit">
                        {t('Chats.send')}
                    </Button>
                </FlexColumn>
            </MessageContainer>
        ); return <Result
            style={{
                background: 'white',
                borderRadius: '15px'
            }}
            title={t('Chats.nomessages')}
        />;
}

export default Messages;

