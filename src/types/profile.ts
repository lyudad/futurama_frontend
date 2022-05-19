export type ProfileState = {
    profile: UserProfile | null;
};

export type UserProfile = {
    id: number;
    englishLevel: NullableString;
    educations: NullableArray;
    workExperience: NullableArray;
    skills: NullableArray;
    position: NullableString;
    desirebleSalaryLevel: NullableNumber;
    availableAmountOfHours: NullableNumber;
    otherExperience?: NullableString;
    description?: NullableString;
};

type NullableArray = null | Array<object>;
type NullableString = null | string;
type NullableNumber = null | number;
