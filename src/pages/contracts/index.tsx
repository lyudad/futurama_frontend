import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetFreelancerContractsMutation, useGetJobOwnerContractsMutation, useUpdateContractMutation } from 'store/api/contractsApi';
import { useAppSelector } from 'store/hooks';
import { variables } from 'constants/variables';
import { IContract } from 'types/contracts';
import { Result } from 'antd';
import { Heading } from 'pages/vacancies/components/projectDetails/styles';
import { Contract } from './Contract';
import { Container, Navigation } from './styles';
import { Wrapper } from './Wrapper';

export function Contracts(): JSX.Element {
  const { t } = useTranslation();
  const [getFreelancerContract, freelancerContract] = useGetFreelancerContractsMutation();
  const [getJobOwnerContract, ownerContract] = useGetJobOwnerContractsMutation();
  const [updateContract] = useUpdateContractMutation();

  const [openContracts, setOpenContracts] = useState<boolean>(true);
  const [contracts, setContracts] = useState<{ open: IContract[] | [], closed: IContract[] | []; }>({ open: [], closed: [], });
  const role = useAppSelector((state) => state.auth.user?.role);
  const isOwner: boolean = role === variables.jobOwner;


  async function closeContract(id: number): Promise<void> {
    const [closed] = contracts.open.splice(id, 1);
    await updateContract({ ...closed, active: false, owner: closed.owner.id });
    if (role === variables.freelancer) {
      getFreelancerContract();
    } else {
      getJobOwnerContract();
    }
  }

  function sortContracts(data: IContract[]): void {
    const open = data.filter((contract: IContract) => contract.active);
    const closed = data.filter((contract: IContract) => !contract.active);
    setContracts({ open, closed });
  }


  useEffect(() => {
    if (freelancerContract.data) {
      sortContracts(freelancerContract.data);
    } else if (ownerContract.data) {
      sortContracts(ownerContract.data);
    } else if (role === variables.freelancer) {
      getFreelancerContract();
    } else {
      getJobOwnerContract();
    }
  }, [freelancerContract.data, ownerContract.data]);

  return (
    <Container style={{ minHeight: '700px' }}>
      <Heading style={{ textAlign: 'center' }}>{t('Contract.title')}</Heading>
      <Navigation>
        <Wrapper onClick={() => setOpenContracts(true)} text={t('Contract.open')} active={openContracts} />
        <Wrapper onClick={() => setOpenContracts(false)} text={t('Contract.closed')} active={!openContracts} />
      </Navigation>
      {openContracts ? <>
        {contracts.open.map((contract, index) => <Contract isOwner={isOwner} closeContract={() => closeContract(index)} key={contract.id} data={contract} />)}
        {!contracts.open.length && <Result
          style={{
            background: 'white',
            borderRadius: '15px'
          }}
          title={t('Contract.noOpenContractsYet')} />} </>
        : <> {contracts.closed.map((contract) => <Contract isOwner={isOwner} key={contract.id} data={contract} />)}
          {!contracts.closed.length && <Result
            style={{
              background: 'white',
              borderRadius: '15px'
            }}
            title={t('Contract.noClosedContractsYet')}
          />} </>}
    </Container >
  );
}
