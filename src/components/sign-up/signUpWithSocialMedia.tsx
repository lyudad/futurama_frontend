import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'antd';
import { ISignUpWithSocialMedia } from 'types/props.interface';

export function SignUpWithSocialMedia(
    props: ISignUpWithSocialMedia
): JSX.Element {
    const { text } = props;
    const navigate = useNavigate();
    return (
        <Form onFinish={() => navigate('/signup/role')}>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {text}
                </Button>
            </Form.Item>
        </Form>
    );
}
