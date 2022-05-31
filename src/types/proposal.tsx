export interface IProposal {
    id: number,
    coverLetter: string,
    price: number,
    vacancy: {
        id: number,
        title: string,
        company: string,
        location: string,
        description: string,
        englishLevel: string,
        price: number,
        timePerWeek: number,
        createdAt: string,
        updatedAt: string;
    };
};