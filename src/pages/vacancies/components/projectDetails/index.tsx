import React, { useState } from 'react';
import { Image, Spin } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetVacancyByIdQuery } from 'store/api/vacanciesApi';


import { IVacancy } from 'types/vacancy';
import { constants } from 'constants/urls';
import SendProposal from '../sendProposal/sendProposal';
import {
    Container,
    Heading,
    Button,
    Skill,
    CompanyInfo,
    Wrapper,
    Title,
    Info,
    InfoItem,
    Date,
    SmallHeading,
} from './styles';


type param = {
    id: string;
};

export default function ProjectDetails(): JSX.Element {

    const id = useParams<param>().id as string;
    const { data } = useGetVacancyByIdQuery(parseInt(id, 10));
    const vacancy: IVacancy = data;

    const { t } = useTranslation();

    const [modal, showModal] = useState(false);



    if (data) {
        const skills = vacancy.skills.map(
            (obj: { id: number; skill: string; }) => obj.skill
        );

        return (
            <Container>
                <Heading>{vacancy.title}</Heading>
                <Wrapper>
                    <Info>
                        <div style={{ marginBottom: '20px' }}>
                            <Title>{t('Vacancy.rate')}</Title>
                            <InfoItem>${vacancy.price}</InfoItem>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <Title>{t('Vacancy.duration')}</Title>
                            <InfoItem>{vacancy.timePerWeek} hour</InfoItem>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <Title>{t('Vacancy.englishlevel')}</Title>
                            <InfoItem>{vacancy.englishLevel}</InfoItem>
                        </div>
                    </Info>
                </Wrapper>
                <SendProposal vacancy={vacancy} modal={modal} showModal={showModal} />

                <div style={{ display: 'flex' }}>
                    <div style={{ maxWidth: '70%' }}>
                        <SmallHeading>{t('Vacancy.description')}</SmallHeading>
                        <p style={{ marginTop: '10px', fontSize: '17px' }}>
                            {vacancy.description}
                        </p>
                        <SmallHeading>{t('Vacancy.skills')}</SmallHeading>
                        <div>
                            {skills.map((skill) => (
                                <Skill key={skills.indexOf(skill)}>{skill}</Skill>
                            ))}
                        </div>
                        <div>
                            <Date content="created at: ">
                                {vacancy.createdAt.slice(0, 10)}
                            </Date>
                            <Date content="updated at: ">
                                {vacancy.updatedAt.slice(0, 10)}
                            </Date>
                        </div>
                    </div>
                    <CompanyInfo>
                        <Image
                            style={{ maxHeight: '120px', maxWidth: '120px' }}
                            preview={false}
                            src={constants.COMPANY_PLACEHOLDER}
                        />
                        <h4
                            style={{
                                marginTop: '20px',
                                fontSize: '20px',
                                fontWeight: '700',
                            }}
                        >
                            {vacancy.company}
                        </h4>
                        <span
                            style={{
                                marginTop: '10px',
                                fontSize: '18px',
                                fontWeight: '600',
                            }}
                        >
                            {vacancy.location}
                        </span>
                    </CompanyInfo>
                </div>

                <NavLink style={{ color: 'black' }} to="/vacancies">
                    <Button>{t('Vacancy.back')}</Button>
                </NavLink>
                <Button onClick={() => {
                    showModal(true);
                }}>{t('Vacancy.apply')}</Button>


            </Container>
        );
    }
    return <Spin
        size="large"
        style={{ margin: '200px auto', display: 'block' }}
    />;
}



