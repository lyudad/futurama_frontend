export interface IVacancy {
    id?: number;
    ownerId: number;
    title: string;
    company: string;
    location: string;
    description: string;
    englishLevel: string;
    price: number;
    timePerWeek: number;
    createdAt: string;
    updatedAt: string;
    category: [];
    skills: [];
}