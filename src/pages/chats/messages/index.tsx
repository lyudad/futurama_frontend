import React, { useEffect, useState } from 'react';
import { IMessage } from 'types/message';
import { constants } from 'constants/urls';
import { FlexContainer } from 'pages/vacancies/components/projectDetails/styles';
import { useAppSelector } from 'store/hooks';
import io from "socket.io-client";
import axios from 'axios';
import { Avatar, Message, MessageContainer } from '../styles';
import MessageForm from '../messageForm';

export interface IProps {
    selectedChat: number;
}

function Messages({ selectedChat }: IProps): JSX.Element {
    const myId = useAppSelector((state) => state.auth.user?.id);

    const socket = io(`${process.env.REACT_APP_URL}`);

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState({} as IMessage);

    async function getOldMessages(): Promise<void> {
        await axios.get(`${process.env.REACT_APP_URL}${constants.GET_MESSAGES}${selectedChat}`)
            .then((response) =>
                setMessages(response.data)
            );
    };

    useEffect(() => {
        getOldMessages();
    }, [selectedChat]);

    useEffect(() => {
        socket.on('receive_message', (incomingMessage: IMessage) => {
            setNewMessage(incomingMessage);

        });
    }, []);

    useEffect(() => {
        if (newMessage) setMessages((old: IMessage[]) => [...old, newMessage]);
    }, [newMessage]);

    if (!messages.length) return <MessageContainer ><MessageForm selectedChat={selectedChat} />  </MessageContainer >;

    return (
        <MessageContainer className='messagesContainer'>
            {
                messages.map((message) => {
                    if (!message.author) {
                        return (
                            <FlexContainer key={message.createdAt} style={{ justifyContent: 'center' }}>
                                <Message key={messages.indexOf(message)} created={message.createdAt?.slice(11, 19) || ''} >
                                    {message.messageBody}
                                </Message>
                            </FlexContainer>
                        );
                    }
                    if (myId === message.author?.id) {
                        return (
                            <FlexContainer key={message.createdAt} style={{ flexDirection: 'row-reverse' }}>
                                <Avatar
                                    preview={false}
                                    src={message.author?.photo}
                                    fallback={constants.PHOTO_PLACEHOLDER}
                                />
                                <Message key={messages.indexOf(message)} created={message.createdAt?.slice(11, 19) || ''} author='me'>
                                    {message.messageBody}
                                </Message>
                            </FlexContainer>);
                    } return (
                        <FlexContainer key={message.createdAt}>
                            <Avatar
                                preview={false}
                                src={message.author?.photo}
                                fallback={constants.PHOTO_PLACEHOLDER}
                            />
                            <Message key={messages.indexOf(message)} created={message.createdAt?.slice(11, 19) || ''} author='notme'>
                                {message.messageBody}
                            </Message>
                        </FlexContainer>
                    );
                })
            }
            <MessageForm selectedChat={selectedChat} />

        </MessageContainer>
    );
}

export default Messages;

