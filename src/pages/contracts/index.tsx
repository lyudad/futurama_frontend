import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetFreelancerContractsMutation, useGetJobOwnerContractsMutation, useUpdateContractMutation } from 'store/api/contractsApi';
import { useAppSelector } from 'store/hooks';
import { variables } from 'constants/variables';
import { IContract } from 'types/contracts';
import { message, Result } from 'antd';
import { Container, Heading } from 'pages/vacancies/components/projectDetails/styles';
import { ListSelector } from 'pages/myJobs/styles';
import { Contract } from './Contract';
import { Wrapper } from './Wrapper';
import { ContractsContainer } from './styles';

export function Contracts(): JSX.Element {
  const { t } = useTranslation();
  const [getFreelancerContract, freelancerContract] = useGetFreelancerContractsMutation();
  const [getJobOwnerContract, ownerContract] = useGetJobOwnerContractsMutation();
  const [updateContract] = useUpdateContractMutation();

  function showMessage(): void {
    const key = 'updatable';
    message.success({
      content: t('Contract.closedsucces'),
      key,
      duration: 2,
      style: {
        marginTop: '130px',
      },
    });
  }

  const [openContracts, setOpenContracts] = useState<boolean>(true);
  const [contracts, setContracts] = useState<{ open: IContract[] | [], closed: IContract[] | []; }>({ open: [], closed: [], });
  const role = useAppSelector((state) => state.auth.user?.role);
  const isOwner: boolean = role === variables.jobOwner;

  async function closeContract(id: number): Promise<void> {
    const [closed] = contracts.open.splice(id, 1);
    showMessage();
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
    <Container>
      <Heading>{t('Contract.title')}</Heading>
      <ListSelector>
        <Wrapper onClick={() => setOpenContracts(true)} text={t('Contract.open')} active={openContracts} />
        <Wrapper onClick={() => setOpenContracts(false)} text={t('Contract.closed')} active={!openContracts} />
      </ListSelector>

      <ContractsContainer>
        {openContracts ? <>
          {contracts.open.map((contract, index) => <Contract
            isOwner={isOwner}
            closeContract={() => closeContract(index)}
            key={contract.id}
            data={contract} />
          )}
          {!contracts.open.length && <Result
            style={{ position: 'absolute', top: '50%', left: '34%' }}
            title={t('Contract.noOpenContractsYet')} />}
        </>
          : <> {contracts.closed.map((contract) => <Contract isOwner={isOwner} key={contract.id} data={contract} />)}
            {!contracts.closed.length && <Result
              style={{ position: 'absolute', top: '50%', left: '33%' }}
              title={t('Contract.noClosedContractsYet')}
            />}
          </>}
      </ContractsContainer>
    </Container >
  );
}