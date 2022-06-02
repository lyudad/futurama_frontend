import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    useGetCategoriesQuery,
    useGetSkillsQuery,
    useGetVacanciesQuery,
} from 'store/api/vacanciesApi';
import { Form, Input, Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';
import NoDataFound from 'assets/no_data_found.png';
import { IVacancy } from 'types/vacancy';
import { Spinner } from 'components/ui/Spinner';
import { Card } from './components/Card';
import { ButtonsWrapper, Container, VacanciesContainer } from './styles';
import { IFilter } from './interfaces/filter';

export function Vacancies(): JSX.Element {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [pageValue] = useState<number>(1);
    const [title, setTitle] = useState<string>('');
    const [categories, setCategories] = useState<[]>([]);
    const [skills, setSkills] = useState<[]>([]);
    const [englishLevel, setEnglishLevel] = useState<string>('');
    const { data: vacanciesData, isLoading } = useGetVacanciesQuery({
        title,
        categories,
        skills,
        englishLevel,
    });
    const { data: categoriesData } = useGetCategoriesQuery('');
    const { data: skillsData } = useGetSkillsQuery('');
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({ page: pageValue.toString() });
    }, [pageValue]);

    const { Option } = Select;
    const categoriesChildren: React.ReactNode[] = [];
    if (categoriesData) {
        categoriesData.map((el: { category: string }) =>
            categoriesChildren.push(
                <Option key={el.category}>{el.category}</Option>
            )
        );
    }

    const skillsChildren: React.ReactNode[] = [];
    if (skillsData) {
        skillsData.map((el: { skill: string }) =>
            skillsChildren.push(<Option key={el.skill}>{el.skill}</Option>)
        );
    }

    const onFinish = async (values: IFilter): Promise<void> => {
        const scroll = (): void => {
            window.scrollBy(0, -10000);
        };
        setTimeout(scroll, 200);
        setTitle(values.Search);
        setCategories(values.SelectCategories);
        setSkills(values.SelectSkills);
        setEnglishLevel(values.SelectEnglishLevel);
    };

    const clearAll = (): void => {
        form.setFieldsValue({
            Search: null,
            SelectCategories: [],
            SelectSkills: [],
            SelectEnglishLevel: null,
        });
        onFinish({
            Search: '',
            SelectCategories: [],
            SelectSkills: [],
            SelectEnglishLevel: '',
        });
    };

    if (isLoading) {
        return <Spinner />;
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
                    width: '375px',
                    height: '550px',
                    position: 'sticky',
                    top: '10px',
                    boxShadow:
                        '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Form.Item name="Search">
                    <Input
                        style={{
                            width: '100%',
                            height: '32px',
                            textAlign: 'center',
                            boxShadow:
                                '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                        }}
                        placeholder={t('Vacancies.searchField')}
                    />
                </Form.Item>
                <Form.Item name="SelectCategories">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                            boxShadow:
                                '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                        }}
                        placeholder={t('Vacancies.selectCategories')}
                    >
                        {categoriesChildren}
                    </Select>
                </Form.Item>
                <Form.Item name="SelectSkills">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                            boxShadow:
                                '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                        }}
                        placeholder={t('Vacancies.selectSkills')}
                    >
                        {skillsChildren}
                    </Select>
                </Form.Item>
                <Form.Item name="SelectEnglishLevel">
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                            boxShadow:
                                '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                        }}
                        placeholder={t('Vacancies.selectEnglishLevel')}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.children as unknown as string)
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    >
                        <Option value="Elementary">Elementary</Option>
                        <Option value="Pre-Intermediate">
                            Pre-Intermediate
                        </Option>
                        <Option value="Intermediate">Intermediate</Option>
                        <Option value="Apper-Intermadiate">
                            Upper-Intermadiate
                        </Option>
                        <Option value="Advanced">Advanced</Option>
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
                {vacanciesData?.length > 0 && !isLoading ? (
                    vacanciesData.map((el: IVacancy) => (
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
