import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from 'pages/vacancies/components/projectDetails/styles';
import { useGetMyChatsQuery } from 'store/api/chatsApi';
import { Spinner } from 'components/ui/Spinner';
import { Result } from 'antd';
import { Chat } from 'types/chat';
import { useAppSelector } from 'store/hooks';
import { variables } from 'constants/variables';
import { ChatsContainer, ChatWrapper, Container, MessageContainer } from './styles';
import Messages from './messages';

function Chats(): JSX.Element {

    const [selectedChat, setSelectedChat] = useState<number>(0);
    const { t } = useTranslation();
    const isOwner = useAppSelector((state) => state.auth.user?.role) === variables.jobOwner;
    const { data: chats, isLoading } = useGetMyChatsQuery();

    if (isLoading) return <Spinner />;

    if (chats)
        return (
            <Container>
                <ChatsContainer>
                    <Heading style={{ paddingLeft: '15px' }}>{t('Chats.chats')}</Heading>

                    {chats?.map((chat: Chat) => (
                        <ChatWrapper onClick={() => { setSelectedChat(chat.id); }} key={chat.id}>
                            <h3>{chat.vacancy.title}</h3>
                            {!isOwner ? <h4>{chat.vacancy.owner.firstName} {chat.vacancy.owner.lastName}</h4> :
                                <h4>{chat.freelancer.firstName} {chat.freelancer.lastName}</h4>}
                        </ChatWrapper>
                    ))}
                </ChatsContainer>
                {selectedChat ? <Messages selectedChat={selectedChat}/> :
                    <MessageContainer>
                        <Result title={t('Chats.choose')} />
                    </MessageContainer>}
            </Container>
        );
    return <Result
        style={{
            background: 'white',
            borderRadius: '15px'
        }}
        title={t('Chats.nochats')}
    />;
}

export default Chats;
