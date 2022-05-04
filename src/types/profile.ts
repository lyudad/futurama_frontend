export interface UserProfile {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    englishLevel: string;
    education: Education;
    workExperience: WorkExperience;
    skills: Array<string>;
    email: string;
    phoneNumber: string;
    position: string;
    desirebleSalaryLevel: number;
    availableAmountOfHours: string;
    otherExperience?: string;
    description?: string;
}

interface Education {
    establishment: string;
    level: string;
    start: Date;
    end: Date;
}

interface WorkExperience {
    company: string;
    position: string;
    start: Date;
    end: Date;
    description: string;
}
