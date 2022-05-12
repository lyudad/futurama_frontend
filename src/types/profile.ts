export type ProfileState = {
    profile: UserProfile | null;
};

type UserProfile = {
    firstName: NullableString;
    lastName: NullableString;
    profilePhoto: string;
    englishLevel: NullableString;
    education: NullableArray;
    workExperience: NullableArray;
    skills: NullableArray;
    email: NullableString;
    phoneNumber: NullableString;
    position: NullableString;
    desirebleSalaryLevel: NullableNumber;
    availableAmountOfHours: NullableNumber;
    otherExperience?: NullableString;
    description?: NullableString;
};

type NullableArray = null | Array<string>;
type NullableString = null | string;
type NullableNumber = null | number;
