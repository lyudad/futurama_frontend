import React from 'react';
import { Image } from 'antd';
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

export default function ProjectDetails(): JSX.Element {
    const skills: string[] = [
        'React.js',
        'Nest.js',
        'HTML5',
        'TypeScript',
        'MySQL',
        'JavaScript',
        'Vue.js',
        'GIT',
        'Адаптивная вёрстка',
        'Целеустремленность',
        'Ответственность',
    ];

    return (
        <Container>
            <Heading>JS developer</Heading>
            <Wrapper>
                <Info>
                    <div style={{ marginBottom: '20px' }}>
                        <Title>Hourly rate:</Title>
                        <InfoItem>400 KGS</InfoItem>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <Title>Duration:</Title>
                        <InfoItem>40 hour</InfoItem>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <Title>English level:</Title>
                        <InfoItem>Intermediate</InfoItem>
                    </div>
                </Info>
            </Wrapper>

            <div style={{ display: 'flex' }}>
                <div style={{ maxWidth: '70%' }}>
                    <SmallHeading>
                        Description:
                    </SmallHeading>
                    <p style={{ marginTop: '10px', fontSize: '17px' }}>
                        Знание CSS 2-3, HTML 4-5, Bootstrap 3-4; работа с REST
                        API, AJAX; Опыт работы с JS, jQuery; умения работать с
                        JS библиотеками; опыт использования GIT; работа с
                        популярными CMS; умение работать в команде; умение
                        разбираться в чужом коде; навык работы с Photoshop,
                        Figma; оперативное реагирование и разрешение инцидентов.
                    </p>
                    <SmallHeading>
                        Required skills:
                    </SmallHeading>

                    <div>
                        {skills.map((skill) => (
                            <Skill>{skill}</Skill>
                        ))}
                    </div>
                    <div>
                        <Date content="created at: ">13.05.22</Date>
                        <Date content="updated at: ">22.05.22</Date>
                    </div>
                </div>
                <CompanyInfo>
                    <Image
                        style={{ maxHeight: '120px', maxWidth: '120px' }}
                        preview={false}
                        src="http://placehold.jp/120x120.png"
                    />
                    <h4
                        style={{
                            marginTop: '20px',
                            fontSize: '20px',
                            fontWeight: '700',
                        }}
                    >
                        Эко Исламик Банк
                    </h4>
                    <span
                        style={{
                            marginTop: '10px',
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        г. Бишкек
                    </span>
                </CompanyInfo>
            </div>
            <Button>SEND PROPOSAL</Button>
            <Button>BACK TO RESULTS</Button>
        </Container>
    );
}

//   title: string;
//   company: string;
//   location: string;
//   description: string;
//   englishLevel: string;
//   price: number;
//   timePerWeek: number;
//   createdAt: Date;
//   updatedAt: Date;
