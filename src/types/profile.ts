import moment from "moment";

export type ProfileState = {
    profile: UserProfile | null;
};

export type UserProfile = {
    id: number;
    englishLevel: NullableString;
    educations: [IEducation] | null;
    workExperience: [IWorkExperience] | null;
    skills: [Skill] | null;
    position: Position;
    desirebleSalaryLevel: NullableNumber;
    availableAmountOfHours: NullableNumber;
    otherExperience?: NullableString;
    description?: NullableString;
};

export interface Settings {
    skills: Array<Skill> | null,
    positions: Array<Position> | null,
    educations: Array<IEducation> | [],
    experiences: Array<IWorkExperience> | [],
}

export interface Position {
    category: string;
    id: number;
}

export interface Skill {
    skill: string;
    id: number;
}

export interface IWorkExperience {
    id?: number;
    profile?: number;
    company: string;
    position: string;
    start: moment.Moment;
    end: moment.Moment;
    description: string;
}

export interface IEducation {
    id?: number;
    profile?: number;
    establishment: string;
    level: string;
    start: moment.Moment;
    end: moment.Moment;
}

type NullableString = null | string;
type NullableNumber = null | number;
