export type IMessage = {
    id?: number;
    type: string;
    messageBody: string;
    createdAt: string;
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