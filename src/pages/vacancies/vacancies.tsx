import React, { useEffect, useState } from 'react';
import { useGetAllVacanciesMutation } from 'store/api/vacanciesApi';
import { Button, Form, Input, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';
import { HeaderFreelancer } from 'components/header';
import { IVacancy } from 'types/vacancy';
import { Container, WorkField } from './styles';
import { Card } from './components/Card';
import { Container, WorkField } from './styles';

export function Vacancies(): JSX.Element {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    // eslint-disable-next-line no-unused-vars
    const [query, setQuery] = useState('');
    const [isData, setIsData] = useState(false);
    const [getAllVacancies, { data }] = useGetAllVacanciesMutation();

    useEffect(() => {
        const getData = async (): Promise<void> => {
            await getAllVacancies('');
            setIsData(true);
        };
        getData();
    }, [getAllVacancies]);

    const onReset = (): void => {
        form.resetFields();
    };

    interface Ivalues {
        Search: string;
    }

    const onFinish = async (values: Ivalues): Promise<void> => {
        setQuery(values.Search);

        onReset();
    };

    return (
        <Container>
            <WorkField>
                <Form
                    name="basic"
                    form={form}
                    layout="vertical"
                    labelCol={{ span: 8 }}
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    autoComplete="on"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '40px',
                    }}
                >
                    <Form.Item
                        name="Search"
                        rules={[
                            {
                                required: true,
                                message: t('Vacancies.placeholder'),
                            },
                        ]}
                    >
                        <Input
                            style={{
                                height: '50px',
                                width: '450px',
                                borderRadius: '20px',
                                border: '1px solid #808080',
                                marginRight: '16px',
                                fontSize: fonts.FONT_SIZE_LABELS,
                                boxShadow:
                                    '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                            }}
                            placeholder={t('Vacancies.searchField')}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '150px',
                                height: '50px',
                                borderRadius: '20px',
                                border: 'none',
                                background: colors.BUTTON_COLOR_BASE,
                                fontSize: fonts.FONT_SIZE_BUTTONS,
                                textTransform: 'uppercase',
                                boxShadow:
                                    '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {t('Vacancies.searchBtn')}
                        </Button>
                    </Form.Item>
                </Form>
                {!isData ? (
                    <Spin
                        size="large"
                        style={{ margin: '0 auto', display: 'block' }}
                    />
                ) : (
                    data.map((el: IVacancy) => (
                        <Card
                            key={el.id}
                            title={el.title}
                            company={el.company}
                            location={el.location}
                            description={el.description}
                            englishLevel={el.englishLevel}
                            price={el.price}
                            ownerId={el.ownerId}
                            timePerWeek={el.timePerWeek}
                            createdAt={el.createdAt}
                            updatedAt={el.updatedAt}
                            category={el.category}
                            skills={el.skills}
                        />
                    ))
                )}
            </WorkField>
        </Container>
    );
}
