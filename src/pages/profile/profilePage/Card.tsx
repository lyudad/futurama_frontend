import React from 'react';
import { ProfileCard } from './style';

interface Props {
    description?: string;
    data: object;
    child?: boolean;
}
function Card({ description, data, child }: Props): JSX.Element {

    return (
        <ProfileCard child={child}>
            <div>
                <h2>{description}</h2>
            </div>
            <div>
                {Object.entries(data).map(([key, value]) => {
                    if (key === 'start' || key === 'end') {
                        value = value.slice(0, 10);
                    }
                    return (
                        <div key={key}>
                            {
                                key === "id" ? "" : <div>
                                    <strong>{key}</strong> :{' '}
                                    <span>
                                        {Array.isArray(value) ?
                                            value.map((val => {
                                                return Object.entries(val).map(([key2, value2], id) => {
                                                    return (<span key={id}>{
                                                        key2 === "id" ? "" : `${value2}, `
                                                    }</span>);
                                                }
                                                );
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
