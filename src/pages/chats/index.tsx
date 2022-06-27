import React from 'react';
import { IMessage } from 'types/message';
//      import { useTranslation } from 'react-i18next';
import { Container } from 'pages/vacancies/components/projectDetails/styles';
import Messages from './messages';

function Chats(): JSX.Element {

    //      const [selectedChat, setSelectedChat] = useState(null);
    //      const { t } = useTranslation();

    const messages: IMessage[] = [{
        "id": 3,
        "messageBody": "Hello!",
        "createdAt": "2022-06-22T14:50:21.422Z",
        "author": {
            "id": 12,
            "firstName": "Quan",
            "lastName": "Chan Lee",
            "email": "zxcv@ya.ru",
            "phone": "+79442244546",
            "photo": "https://futurama.cf:3011/upload/image (10)3842"
        }
    },
    {
        "id": 4,
        "messageBody": "How are you?",
        "createdAt": "2022-06-22T14:51:48.132Z",
        "author": {
            "id": 12,
            "firstName": "Quan",
            "lastName": "Chan Lee",
            "email": "zxcv@ya.ru",
            "phone": "+79442244546",
            "photo": "https://futurama.cf:3011/upload/image (10)3842"
        }
    },
    {
        "id": 5,
        "messageBody": "Hello, my dear friend!",
        "createdAt": "2022-06-22T14:52:59.896Z",
        "author": {
            "id": 14,
            "firstName": "Alex",
            "lastName": "Bronson",
            "email": "bronson@yandex.ru",
            "phone": "5558745",
            "photo": "https://futurama.cf:3011/upload/image6961"
        }
    },
    {
        "id": 6,
        "messageBody": "I'm fine",
        "createdAt": "2022-06-22T14:55:11.067Z",
        "author": {
            "id": 14,
            "firstName": "Alex",
            "lastName": "Bronson",
            "email": "bronson@yandex.ru",
            "phone": "5558745",
            "photo": "https://futurama.cf:3011/upload/image6961"
        }
    },
    {
        "id": 65,
        "messageBody": "SYSTEM_MESSAGE Control_Dispatch SYS_DYNAMIC_DEVICE_INIT, MYVXD_Dynamic_Init",
        "createdAt": "2022-06-22T14:55:09.067Z",
    },
    {
        "id": 7,
        "messageBody": "Go with me to mountains",
        "createdAt": "2022-06-22T14:57:27.979Z",
        "author": {
            "id": 14,
            "firstName": "Alex",
            "lastName": "Bronson",
            "email": "bronson@yandex.ru",
            "phone": "5558745",
            "photo": "https://futurama.cf:3011/upload/image6961"
        }
    },
    {
        "id": 8,
        "messageBody": "Nepremenno. The server listens for incoming socket connections using a regular TCP socket",
        "createdAt": "2022-06-22T14:58:37.112Z",
        "author": {
            "id": 12,
            "firstName": "Quan",
            "lastName": "Chan Lee",
            "email": "zxcv@ya.ru",
            "phone": "+79442244546",
            "photo": "https://futurama.cf:3011/upload/image (10)3842"
        }
    },
    {
        "id": 9,
        "messageBody": "With WebSockets, we can perform a two-way communication in real-time between the user and the server. Thanks to that, the browser",
        "createdAt": "2022-06-22T14:59:24.300Z",
        "author": {
            "id": 12,
            "firstName": "Quan",
            "lastName": "Chan Lee",
            "email": "zxcv@ya.ru",
            "phone": "+79442244546",
            "photo": "https://futurama.cf:3011/upload/image (10)3842"
        }
    }];


    return (
        <Container style={{ padding: '25px', display: 'flex' }}>
            <div style={{ borderRight: '1px solid grey', flex: '3 3 100%' }}>
                <div style={{ backgroundColor: 'rgba(65, 63, 101, 0.3)', marginTop: '5px', width: '92%', height: '55px' }} />
               
            </div>
            <Messages messages={messages} />

        </Container>
    );
}

export default Chats;
