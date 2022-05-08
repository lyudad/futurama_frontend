import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useAppDispatch } from 'store/hooks';
import { addEmail } from 'store/reducers/email';
import { useTranslation } from 'react-i18next';
import { useSendEmailMutation } from 'store/api/passwordResetApi';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';
import { GoSignIn } from './components/goSignIn';
import { Container, Card, Header1, Header2 } from './styles';

export function PasswordRecovery(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const [sendEmail, { data, error, isLoading }] = useSendEmailMutation();

    interface Ivalues {
        Email: string;
    }

    const onReset = (): void => {
        form.resetFields();
    };
    const onFinish = (values: Ivalues): void => {
        sendEmail({ email: values.Email });
        dispatch(addEmail(values.Email));
        navigate('/password/notification');
        onReset();
    };

    return (
        <Container>
            <Card>
                <Header1>{t('HomePage.futuramaBrand')}</Header1>
                <Header2>{t('HomePage.futuramaSlogan')}</Header2>
                <Form
                    name="basic"
                    form={form}
                    layout="vertical"
                    labelCol={{ span: 8 }}
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    autoComplete="on"
                >
                    <Form.Item
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: t('PasswordRecovery.placeholder'),
                            },
                        ]}
                    >
                        <Input
                            style={{
                                height: '75px',
                                width: '450px',
                                borderRadius: '10px',
                                border: '1px solid #808080',
                                marginBottom: '16px',
                                fontSize: fonts.FONT_SIZE_LABELS,
                                boxShadow:
                                    '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                            }}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            title={t('PasswordRecovery.emailPatternTitle')}
                            placeholder={t('PasswordRecovery.placeholder')}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '350px',
                                height: '60px',
                                borderRadius: '10px',
                                border: 'none',
                                display: 'block',
                                margin: '0 auto',
                                marginBottom: '7vh',
                                background: colors.BUTTON_COLOR_BASE,
                                fontSize: fonts.FONT_SIZE_BUTTONS,
                                textTransform: 'uppercase',
                                boxShadow:
                                    '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {t('PasswordRecovery.continueBtn')}
                        </Button>
                        <GoSignIn />
                    </Form.Item>
                </Form>
            </Card>
        </Container>
    );
}
