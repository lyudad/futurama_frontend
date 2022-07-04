export type Chat = {
    id: number;
    createdAt: string,
    freelancer: {
        id: number,
        firstName: string,
        lastName: string,
        photo: string;
    };
    vacancy: {
        id: number,
        title: string,
        description: string,
        englishLevel: string,
        price: number,
        timePerWeek: number,
        owner: {
            id: number,
            firstName: string,
            lastName: string,
            photo: string;
        };
    };
};