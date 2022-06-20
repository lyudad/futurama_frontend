import React from 'react';
import { Collapse, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { IProposal } from 'types/proposal';
import { constants } from 'constants/urls';
import { NavLink } from 'react-router-dom';
import { Message } from '../styles';

interface IProps {
    proposals: IProposal[];
}

export function ProposalsList({ proposals }: IProps): JSX.Element {

    const { Panel } = Collapse;
    const { t } = useTranslation();

    function panelHeader(proposal: IProposal): JSX.Element {
        return (<h4 style={{ marginTop: '4px' }}>
            {t('Proposal.proposalfrom')}
            <strong>{proposal.user?.firstName} {proposal.user?.lastName} </strong> ( {t('Proposal.hourlyrate')}
            <strong>{proposal.price}</strong> )
        </h4>);
    }

    return (
        <>
            {
                proposals.map((proposal: IProposal) => (
                    <Collapse accordion key={proposal.id}>
                        <Panel style={{
                            border: '1px solid rgba(25, 133, 179, 0.5)', marginBottom: '10px'
                        }} header={panelHeader(proposal)} key={proposal.createdAt} showArrow={false} >
                            <p>
                                {t('Proposal.recieved')}<strong>{proposal.createdAt.slice(0, 10)}</strong>
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}><NavLink to={`/profile/${proposal.user?.id}`}>
                                    <Image
                                        style={{
                                            maxHeight: '100px',
                                            borderRadius: '50%',
                                            margin: '5px',
                                            width: '100px'
                                        }}
                                        preview={false}
                                        src={proposal.user?.photo}
                                        fallback={constants.PHOTO_PLACEHOLDER}
                                    />
                                </NavLink> <Message>{proposal.coverLetter}</Message>
                            </div>
                        </Panel>
                    </Collapse>
                ))
            }
        </>
    );
}