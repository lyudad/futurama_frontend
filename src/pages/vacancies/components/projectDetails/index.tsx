import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetVacancyByIdQuery } from 'store/api/vacanciesApi';
import { useCheckProposalIsExistQuery } from 'store/api/proposalsApi';
import { CheckOutlined } from '@ant-design/icons';
import { Spinner } from 'components/ui/Spinner';
import { IVacancy } from 'types/vacancy';
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
    FlexContainer,
} from './styles';

type param = {
    id: string;
};


export default function ProjectDetails(): JSX.Element {
    const [modal, showModal] = useState(false);
    const id: number = useParams<param>().id as unknown as number;

    const vacancy: IVacancy = useGetVacancyByIdQuery(id).data;
    const proposalExist = useCheckProposalIsExistQuery(id).data;

    const { t } = useTranslation();

    if (vacancy) {
        const skills = vacancy.skills.map(
            (obj: { id: number; skill: string; }) => obj.skill
        );

        return (
            <Container>
                <Heading>{vacancy.title}</Heading>
                <Wrapper>
                    <CompanyInfo>
                        <span
                            style={{
                                fontSize: '18px',
                                fontWeight: '700',
                            }}
                        >
                            {vacancy.company}
                        </span>
                        <span
                            style={{
                                marginLeft: '30px',
                                fontSize: '18px',
                                fontWeight: '400',
                            }}
                        >
                            {vacancy.location}
                        </span>

                    </CompanyInfo>
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

                <FlexContainer>
                    <div>
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

                </FlexContainer>

                <NavLink style={{ color: 'black' }} to="/vacancies">
                    <Button>{t('Vacancy.back')}</Button>
                </NavLink>
                {proposalExist ? <Button disabled><CheckOutlined /> {t('Proposal.applied')}</Button> : <Button onClick={() => {
                    showModal(true);
                }}>{t('Vacancy.apply')}</Button>}
            </Container>
        );
    }
    return <Spinner />;
}
