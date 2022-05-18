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
                            <strong>{key}</strong> :{' '}
                            <span>
                                {Array.isArray(value)
                                    ? value.map((val) => (
                                          <span key={val}>{val},</span>
                                      ))
                                    : value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </ProfileCard>
    );
}

export default Card;
