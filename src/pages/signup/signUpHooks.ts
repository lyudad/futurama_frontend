import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/user.interface';

import { openErrorNotification } from '../../components/errorNotification';

export const onFinish = createAsyncThunk(
    'user/setUser',
    async (formData: User) => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/register`, formData)
            .then((response) => {
                return response;
            })
            .catch((error) => openErrorNotification(error));
    }
);
