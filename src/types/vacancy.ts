export interface IVacancy {
    id?: number;
    vacancyId?: number;
    title: string;
    company: string;
    location: string;
    description: string;
    englishLevel: string;
    price: number;
    skills: [];
    timePerWeek: number;
    createdAt: string;
    updatedAt: string;
    category: [];
}