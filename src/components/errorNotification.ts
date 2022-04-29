import { notification } from 'antd';

export const openErrorNotification = (string: string): void => {
    notification.error({
        message: string,
    });
};
