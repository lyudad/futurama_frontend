export interface IVacancy {
    id: number;
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
    proposals?: [];
    isActive?: boolean;
    owner?: { id: number; };
}

export interface IvacancyQuery {
    title?: string,
    categories?: [],
    englishLevel?: string,
    minPrice?: number,
    maxPrice?: number,
    minTimePerWeek?: number,
    maxTimePerWeek?: number,
    skills?: [];
    pageValue?: number;
}

export interface ProjectDetails {
    id: number;
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
    category: { id: number; };
    proposals?: [];
    isActive?: boolean;
    owner?: { id: number; };
}