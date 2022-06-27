export type IMessage = {
    id?: number;
    messageBody: string,
    createdAt: string,
    chatId?: number;
    author?:
    {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        photo: string;
    };
};