import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePasswordResetMutation } from 'store/api/passwordResetApi';
import { constants } from 'constants/urls';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';
import { Container, Card, Header1, Header2 } from './styles';

export function PasswordMakeNew(): JSX.Element {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPasswordHide, setIsPasswordHide] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('email');

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const [passwordReset, { data, error, isLoading }] =
        usePasswordResetMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'password':
                setPassword(value);
                break;
            case 'passwordConfirm':
                setConfirmPassword(value);
                break;
            default:
        }
    };

    const onReset = (): void => {
        form.resetFields();
    };

    const openNotification = (): void => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button
                type="primary"
                size="small"
                onClick={() => notification.close(key)}
                style={{
                    background: colors.BUTTON_COLOR_BASE,
                    textTransform: 'uppercase',
                    fontStyle: fonts.FONT_FAMILY_BASE,
                }}
            >
                {t('passwordMakeNew.closeBtn')}
            </Button>
        );
        notification.open({
            message: 'Attention!',
            description: 'Passwords do not match',
            btn,
            key,
        });
    };

    const onFinish = (): void => {
        if (password === confirmPassword) {
            passwordReset({ password: confirmPassword, email: queryParam });
            navigate(constants.LOGIN);
        } else {
            openNotification();
        }
        onReset();
    };

    const showPassword = (): void => {
        setIsPasswordHide(!isPasswordHide);
    };

    return (
        <Container>
            <Card>
                <Header1>{t('HomePage.futuramaBrand')}</Header1>
                <Header2>{t('HomePage.futuramaSlogan')}</Header2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t('PasswordMakeNew.placeholder'),
                            },
                        ]}
                    >
                        <Input
                            name="password"
                            type={isPasswordHide ? 'password' : 'text'}
                            placeholder={t('PasswordMakeNew.placeholder')}
                            onChange={handleChange}
                            style={{
                                height: '75px',
                                width: '450px',
                                borderRadius: '10px',
                                border: '1px solid #808080',
                                marginBottom: '16px',
                                fontSize: fonts.FONT_SIZE_LABELS,
                            }}
                            pattern="[^\.]{8,}"
                            title={t('PasswordMakeNew.passwordPatternTitle')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="passwordConfirm"
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'PasswordMakeNew.placeholderConfirm'
                                ),
                            },
                        ]}
                    >
                        <Input
                            name="passwordConfirm"
                            type={isPasswordHide ? 'password' : 'text'}
                            placeholder={t(
                                'PasswordMakeNew.placeholderConfirm'
                            )}
                            onChange={handleChange}
                            style={{
                                height: '75px',
                                width: '450px',
                                borderRadius: '10px',
                                border: '1px solid #808080',
                                fontSize: fonts.FONT_SIZE_LABELS,
                                marginBottom: '16px',
                            }}
                            pattern="[^\.]{8,}"
                            title={t('PasswordMakeNew.passwordPatternTitle')}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="link"
                            onClick={showPassword}
                            style={{
                                width: '350px',
                                height: '30px',
                                borderRadius: '10px',
                                border: 'none',
                                display: 'block',
                                margin: '0 auto',
                                marginBottom: '20px',
                                fontSize: fonts.FONT_SIZE_BUTTONS,
                                textTransform: 'uppercase',
                            }}
                        >
                            {isPasswordHide
                                ? t('PasswordMakeNew.showPassword')
                                : t('PasswordMakeNew.hidePassword')}
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{
                                width: '350px',
                                height: '60px',
                                borderRadius: '10px',
                                border: 'none',
                                display: 'block',
                                margin: '0 auto',
                                marginBottom: '90px',
                                background: colors.BUTTON_COLOR_BASE,
                                fontSize: fonts.FONT_SIZE_BUTTONS,
                                textTransform: 'uppercase',
                            }}
                        >
                            {t('PasswordMakeNew.continueBtn')}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Container>
    );
}
