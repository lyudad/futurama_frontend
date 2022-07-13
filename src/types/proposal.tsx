export interface IProposal {
    id: number,
    coverLetter?: string,
    price?: number,
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
        owner?: {
            firstName: string;
            lastName: string;
            photo: string;
        };
        skills?: [];
    },
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        photo: string;
    };
    createdAt: string,
    updatedAt: string;
    status: string;
};

export enum ProposalStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Declined = 'Declined'
}