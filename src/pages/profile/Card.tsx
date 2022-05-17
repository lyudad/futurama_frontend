import React from 'react';
import { ProfileCard } from './style';

interface Props {
    description: string;
    data: object;
}
function Card({ description, data }: Props): JSX.Element {    
    return (
        <ProfileCard>
            <div>
                <h2>{description}</h2>
            </div>
            <div>
                {Object.entries(data).map(([key, value]) => {
                    return (
                        <div key={key}>
                            {
                                key === "id" ? "" : <div>
                                        <strong>{key}</strong> :{' '}
                                            <span>
                                                {Array.isArray(value) ?
                                                    value.map((val => {
                                                        return  Object.entries(val).map(([k, v], id) => {
                                                                return (<span key={id}>{
                                                                    k === "id" ? "" : `${v  }, `
                                                                    }</span>)
                                                            }
                                                        )
                                                    }))
                                                    : value}
                                            </span>
                                    </div>
                            }
                        </div>
                    );
                })}
            </div>
        </ProfileCard>
    );
}

export default Card;
