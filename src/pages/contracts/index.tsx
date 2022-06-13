import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/ui/button';
import { useGetFreelancerContractsMutation, useGetJobOwnerContractsMutation, useUpdateContractMutation } from 'store/api/contractsApi';
import { useAppSelector } from 'store/hooks';
import { variables } from 'constants/variables';
import { IContract } from 'types/contracts';
import { Contract } from './Contract';
import { Container, Navigation } from './styles';

export function Contracts(): JSX.Element {
    const { t } = useTranslation();
    const [getFreelancerContract, freelancerContract ]= useGetFreelancerContractsMutation();
    const [getJobOwnerContract, ownerContract ] = useGetJobOwnerContractsMutation();
    const [updateContract] = useUpdateContractMutation();

    const [openContracts, setOpenContracts] = useState<boolean>(true);
    const [contracts, setContracts] = useState<{open: IContract[] | [], closed: IContract[] | []}>({open: [],closed: [],});
    const role = useAppSelector((state) => state.auth.user?.role);


    function closeContract(id: number): void {
      const tempOpen = [...contracts.open];
      const tempClosed = [...contracts.closed];
      const closed = tempOpen.splice(id, 1);
      tempClosed.push({...closed[0], active: false})
      setContracts({closed: tempClosed, open: tempOpen})
      updateContract({...closed[0], active: false, owner: closed[0].owner.id});
    }
    
    
    useEffect(() => {
      if(!contracts.open.length && !contracts.closed.length){
        if(freelancerContract.data) {
            const open = freelancerContract.data.filter((contract) => contract.active);
            const closed = freelancerContract.data.filter((contract) => !contract.active);
            setContracts({open, closed});
        } else if(ownerContract.data){
            const open = ownerContract.data.filter((contract) => contract.active);
            const closed = ownerContract.data.filter((contract) => !contract.active);
            setContracts({open, closed});
        } else if(role === variables.freelancer){
                getFreelancerContract();
            }else {
                getJobOwnerContract();
            }
      }          
    }, [freelancerContract.data, ownerContract.data])
    
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
              {openContracts ? <>
              {contracts.open.map((contract, index) => <Contract closeContract={() => closeContract(index)} key={contract.id} data={contract}/>)}
              <h2>{!contracts.open.length && t('Contract.noContractsYet')}</h2> </>
              : <> {contracts.closed.map((contract) => <Contract key={contract.id} data={contract}/>)}
              <h2>{!contracts.closed.length && t('Contract.noContractsYet')}</h2> </>}
            </Container >
          );
}
