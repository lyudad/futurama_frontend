import React from 'react';
import { useAppSelector } from 'store/hooks';

export function Notification(): JSX.Element {
    const email = useAppSelector((state) => state.email.value);

    return (
        <p style={{ width: '300px', margin: '0 auto', padding: '10px' }}>
            The instructions were sent to {email} if there is a profile in UNIFI
            registered with it. If you didn`t get the email, check the spelling
            of the email address (make sure there are no typos) and ask to
            resend the instructions.
        </p>
    );
}
