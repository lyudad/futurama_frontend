import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/ui/button';
import { Contract } from './Contract';
import { Container, Navigation } from './styles';

export function Contracts(): JSX.Element {
    const { t } = useTranslation();
    const [openContracts, setOpenContracts] = useState(true);

    const data = [
        {
            id: 1,
            title: "Android app",
            hourlyRate: 10,
            description: "Description of job Description of job Description of job Description of job Description of job",
            owner: {
                firstName: "Askabek",
                lastName: "Djanbolotov",
                photo: "https://avatars.githubusercontent.com/u/72981665?v=4"
            },
            startDate: "12.02.2022",
            endDate: "12.02.2022"
        },
        {
            id: 2,
            title: "Android app",
            hourlyRate: 10,
            description: "Description of job",
            owner: {
                firstName: "Askabek",
                lastName: "Djanbolotov",
                photo: "https://avatars.githubusercontent.com/u/72981665?v=4"
            },
            startDate: "12.02.2022",
            endDate: "12.02.2022"
        },
        {
            id: 3,
            title: "Android app",
            hourlyRate: 10,
            description: "Description of job",
            owner: {
                firstName: "Askabek",
                lastName: "Djanbolotov",
                photo: "https://avatars.githubusercontent.com/u/72981665?v=4"
            },
            startDate: "12.02.2022",
            endDate: "12.02.2022"
        },
        {
            id: 4,
            title: "Android app",
            hourlyRate: 10,
            description: "Description of job",
            owner: {
                firstName: "Askabek",
                lastName: "Djanbolotov",
                photo: "https://avatars.githubusercontent.com/u/72981665?v=4"
            },
            startDate: "12.02.2022",
            endDate: "12.02.2022"
        }
    ]

    return (
      <Container style={{ minHeight: '600px' }}>
        <h1>{t('Contract.title')}</h1>
        <Navigation>
              {openContracts
              ? <Button theme="#75CCD2" color="white" onClick={() => setOpenContracts(true)}>{t('Contract.open')}</Button> 
              : <Button onClick={() => setOpenContracts(true)}>{t('Contract.open')}</Button>}
              {!openContracts
              ? <Button theme="#75CCD2" color="white" onClick={() => setOpenContracts(false)}>{t('Contract.closed')}</Button> 
              : <Button onClick={() => setOpenContracts(false)}>{t('Contract.closed')}</Button>}
        </Navigation>
        {data.map((contract) => <Contract key={contract.id} data={contract}/>)}
      </Container >
    );
}
