import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetVacanciesQuery } from 'store/api/vacanciesApi';
import { Form, Input, Spin, Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';
import NoDataFound from 'assets/no_data_found.png';
import { IVacancy } from 'types/vacancy';
import { Spinner } from 'components/ui/Spinner';
import { Card } from './components/Card';
import { ButtonsWrapper, Container, VacanciesContainer } from './styles';

export function Vacancies(): JSX.Element {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [title, setTitle] = useState<string>('');
    const [categoriesMiddlware, setCategoriesMiddlware] = useState<[]>([]);
    const [categories, setCategories] = useState<[]>([]);
    const [pageValue] = useState<string>('1');
    const { data, isLoading } = useGetVacanciesQuery({ title, categories });
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({ page: pageValue });
    }, [pageValue]);

    interface Ivalues {
        Search: string;
    }

    const categoriesList = ['JS', 'PHP', 'Java'];
    const { Option } = Select;
    const children: React.ReactNode[] = [];
    for (let i = 0; i < categoriesList.length; i += 1) {
        children.push(<Option key={i}>{categoriesList[i]}</Option>);
    }
    const handleChange = (value: []): void => {
        setCategoriesMiddlware(value);
    };

    const clearAll = (): void => {
        form.setFieldsValue({ Search: null, Select: [] });
    };

    const onFinish = async (values: Ivalues): Promise<void> => {
        setTitle(values.Search);
        setCategories(categoriesMiddlware);
    };

    if (isLoading) {
        return (
            <Spinner />
        );
    }

    return (
        <Container>
            <Form
                name="basic"
                form={form}
                layout="vertical"
                labelCol={{ span: 8 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                autoComplete="on"
                style={{
                    marginRight: '50px',
                    padding: '25px',
                    background: '#FFFFFF',
                    borderRadius: '15px',
                    width: '450px',
                    height: '250px',
                }}
            >
                <Form.Item name="Search">
                    <Input
                        style={{
                            width: '100%',
                            height: '42px',
                            fontSize: fonts.FONT_SIZE_LABELS,
                            textAlign: 'center',
                            boxShadow:
                                '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                        }}
                        placeholder={t('Vacancies.searchField')}
                    />
                </Form.Item>
                <Form.Item name="Select">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                            fontSize: fonts.FONT_SIZE_LABELS,
                            boxShadow:
                                '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                        }}
                        onChange={handleChange}
                        placeholder={t('Vacancies.categorySelect')}
                    >
                        {children}
                    </Select>
                </Form.Item>
                <ButtonsWrapper>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '150px',
                                height: '50px',
                                marginRight: '25px',
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
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="button"
                            onClick={clearAll}
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
                            {t('Vacancies.clearBtn')}
                        </Button>
                    </Form.Item>
                </ButtonsWrapper>
            </Form>
            <VacanciesContainer>
                {data?.length > 0 && !isLoading ? (
                    data.map((el: IVacancy) => (
                        <Card
                            key={el.id}
                            vacancyId={el.id}
                            title={el.title}
                            company={el.company}
                            location={el.location}
                            description={el.description}
                            englishLevel={el.englishLevel}
                            price={el.price}
                            skills={el.skills}
                            id={el.id}
                            timePerWeek={el.timePerWeek}
                            createdAt={el.createdAt}
                            updatedAt={el.updatedAt}
                            category={el.category}
                        />
                    ))
                ) : (
                    <img
                        src={NoDataFound}
                        alt="No data found"
                        style={{
                            width: '610px',
                            borderRadius: '10px',
                        }}
                    />
                )}
            </VacanciesContainer>
        </Container>
    );
}
