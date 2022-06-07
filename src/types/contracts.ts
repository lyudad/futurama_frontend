export interface IContract {
    id: number,
    title: string,
    hourlyRate: number,
    description: string,
    owner: {
        firstName: string,
        lastName: string,
        photo: string;
    };
    startDate: string;
    endDate: string;
};