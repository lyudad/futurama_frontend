export interface IContract {
    id: number,
    title: string,
    hourlyRate: number,
    description: string,
    owner: {
        id: number,
        firstName: string,
        lastName: string,
        photo: string;
    };
    start: string;
    end: string;
    active: boolean;
    freelancer: {
        id: number,
        firstName: string,
        lastName: string,
        photo: string;
    };
};