import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetVacancyByIdQuery } from 'store/api/vacanciesApi';
import { useCheckProposalIsExistQuery } from 'store/api/proposalsApi';
import { CheckOutlined } from '@ant-design/icons';
import { Spinner } from 'components/ui/Spinner';
import { useAppSelector } from 'store/hooks';
import { variables } from 'constants/variables';
import { notification, Result } from 'antd';
import { ProjectDetails as VacancyDetails } from 'types/vacancy';
import type { NotificationPlacement } from 'antd/es/notification';
import CreateJob from 'pages/myJobs/createJob';
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

interface Props {
    proposalExist: boolean;
    showModal: Dispatch<SetStateAction<boolean>>;
}

function Buttons({ showModal, proposalExist }: Props): JSX.Element {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const openNotification = (placement: NotificationPlacement): void => {
        notification.error({
            message: t('Proposal.error'),
            description: t('Proposal.errormessage'),
            placement,
            onClick() {
                navigate('/settings');
            },
        });
    };

    const profileState = useAppSelector((state) => state.profile.profile);

    if (profileState?.englishLevel) {
        if (proposalExist) {
            return <Button disabled><CheckOutlined /> {t('Proposal.applied')}</Button>;
        } return <Button onClick={() => {
            showModal(true);
        }}>{t('Vacancy.apply')}</Button>;
    } return <Button onClick={() => {
        openNotification('bottomRight');
    }}>{t('Vacancy.apply')}</Button>;
}

export default function ProjectDetails(): JSX.Element {
    const [modal, showModal] = useState<boolean>(false);
    const id: number = useParams<param>().id as unknown as number;
    const role = useAppSelector((state) => state.auth.user?.role);
    const vacancy: VacancyDetails = useGetVacancyByIdQuery(id).data;
    const proposalExist = useCheckProposalIsExistQuery(id).data || false;
    const navigate = useNavigate();
    const myId = useAppSelector((state) => state.auth.user?.id);
    const [editing, setEditing] = useState<boolean>(false);

    const { t } = useTranslation();

    if (vacancy) {
        if (!vacancy.isActive && myId !== vacancy.owner?.id)
            return (<Container>
                <Result
                    style={{
                        background: 'white',
                        borderRadius: '15px'
                    }}
                    title={t('Vacancy.inarchive')}
                />
            </Container >
            );
        const skills = vacancy.skills.map(
            (obj: { id: number; skill: string; }) => obj.skill
        );

        if (editing) {
            return <CreateJob
                jobId={vacancy.id}
                vacancy={{
                    title: vacancy.title,
                    company: vacancy.company,
                    location: vacancy.location,
                    description: vacancy.description,
                    englishLevel: vacancy.englishLevel,
                    price: vacancy.price,
                    skills: vacancy.skills.map((skill: { id: number, skill: string; }) => (
                        skill.id
                    )),
                    timePerWeek: vacancy.timePerWeek,
                    category: vacancy.category.id
                }} />;
        }
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
                <Button onClick={() => navigate(-1)}>{t('Invite.back')}</Button>
                {myId === vacancy.owner?.id && <Button onClick={() => { setEditing(true); }}>{t('CreateJob.edit')}</Button>}
                {role === variables.freelancer && <Buttons showModal={showModal} proposalExist={proposalExist} />}
            </Container>
        );
    }
    return <Spinner />;
}
