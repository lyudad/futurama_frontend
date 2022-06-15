import React, { Fragment } from 'react';
import { Button } from 'components/ui/button';

interface Props{
    active: boolean;
    text: string;
    onClick(): void;
}
export function Wrapper({active, text, onClick}: Props): JSX.Element {    
        return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
                {active ? <Button theme="#75CCD2" color="white" onClick={onClick}>{text}</Button> 
                    : <Button onClick={onClick}>{text}</Button>}
            </>
         );
}
