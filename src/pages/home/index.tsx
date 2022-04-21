import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { decrement, increment } from 'store/reducers/counter';
import { RootState } from 'store';
import { Button } from './styles';

export function Home(): JSX.Element {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <h2>Example counter for redux toolkit.</h2>
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <span>{count}</span>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
            </div>
        </div>
    );
}
