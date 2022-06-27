import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    useGetCategoriesQuery,
    useGetSkillsQuery,
    useGetVacanciesQuery,
    useGetvacancyWithMaxDurationQuery,
    useGetvacancyWithMaxPriceQuery,
    useGetvacancyWithMinDurationQuery,
    useGetvacancyWithMinPriceQuery,
} from 'store/api/vacanciesApi';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Slider,
    InputNumber,
    Pagination,
    PaginationProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import NoDataFound from 'assets/no_data_found.png';
import { IVacancy } from 'types/vacancy';
import { Spinner } from 'components/ui/Spinner';
import { Card } from './components/Card';
import { Button, ButtonsWrapper, Container, VacanciesContainer } from './styles';
import { IFilter } from './interfaces/filter';

export function Vacancies(): JSX.Element {
    const { t } = useTranslation();
    const { Option } = Select;
    const [form] = Form.useForm();
    const { data: categoriesData } = useGetCategoriesQuery('');
    const { data: skillsData } = useGetSkillsQuery('');
    const { data: vacancyWithMinPrice } = useGetvacancyWithMinPriceQuery('');
    const { data: vacancyWithMaxPrice } = useGetvacancyWithMaxPriceQuery('');
    const { data: vacancyWithMinDuration } =
        useGetvacancyWithMinDurationQuery('');
    const { data: vacancyWithMaxDuration } =
        useGetvacancyWithMaxDurationQuery('');
    const [pageValue, setPageValue] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [title, setTitle] = useState<string>('');
    const [categories, setCategories] = useState<[]>([]);
    const [skills, setSkills] = useState<[]>([]);
    const [englishLevel, setEnglishLevel] = useState<string>('');
    const [sliderMinPriceValue, setSliderMinPriceValue] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [sliderMaxPriceValue, setSliderMaxPriceValue] =
        useState<number>(20000);
    const [maxPrice, setMaxPrice] = useState<number>(20000);
    const [sliderMinTimePerWeekValue, setSliderMinTimePerWeekValue] =
        useState<number>(0);
    const [minTimePerWeek, setMinTimePerWeek] = useState<number>(0);
    const [sliderMaxTimePerWeekValue, setSliderMaxTimePerWeekValue] =
        useState<number>(80);
    const [maxTimePerWeek, setMaxTimePerWeek] = useState<number>(80);
    const { data: vacanciesData, isLoading } = useGetVacanciesQuery({
        title,
        categories,
        skills,
        englishLevel,
        minPrice,
        maxPrice,
        minTimePerWeek,
        maxTimePerWeek,
        pageValue,
    });
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({ page: pageValue.toString() });
    }, [pageValue]);

    useEffect(() => {
        setSliderMinPriceValue(vacancyWithMinPrice?.price);
        setSliderMaxPriceValue(vacancyWithMaxPrice?.price);
        setSliderMinTimePerWeekValue(vacancyWithMinDuration?.timePerWeek);
        setSliderMaxTimePerWeekValue(vacancyWithMaxDuration?.timePerWeek);
    }, [
        vacancyWithMinPrice,
        vacancyWithMaxPrice,
        vacancyWithMinDuration,
        vacancyWithMaxDuration,
    ]);

    const scroll = (): void => {
        window.scrollBy(0, -10000);
    };

    const onChange: PaginationProps['onChange'] = (page) => {
        setPageValue(page);
        setTimeout(scroll, 200);
    };

    const onChangeMinPrice = (newValue: number): void => {
        setSliderMinPriceValue(newValue);
    };

    const onChangeMaxPrice = (newValue: number): void => {
        setSliderMaxPriceValue(newValue);
    };

    const onChangeMinDuration = (newValue: number): void => {
        setSliderMinTimePerWeekValue(newValue);
    };

    const onChangeMaxDuration = (newValue: number): void => {
        setSliderMaxTimePerWeekValue(newValue);
    };

    const onFinish = async (values: IFilter): Promise<void> => {
        setTimeout(scroll, 200);
        setTitle(values.Search);
        setCategories(values.SelectCategories);
        setSkills(values.SelectSkills);
        setEnglishLevel(values.SelectEnglishLevel);
        setMinPrice(sliderMinPriceValue);
        setMaxPrice(sliderMaxPriceValue);
        setMinTimePerWeek(sliderMinTimePerWeekValue);
        setMaxTimePerWeek(sliderMaxTimePerWeekValue);
    };

    const clearAll = (): void => {
        form.setFieldsValue({
            Search: '',
            SelectCategories: [],
            SelectSkills: [],
            SelectEnglishLevel: null,
        });
        setSliderMinPriceValue(vacancyWithMinPrice?.price);
        setSliderMaxPriceValue(vacancyWithMaxPrice?.price);
        setSliderMinTimePerWeekValue(vacancyWithMinDuration?.timePerWeek);
        setSliderMaxTimePerWeekValue(vacancyWithMaxDuration?.timePerWeek);

        onFinish({
            Search: '',
            SelectCategories: [],
            SelectSkills: [],
            SelectEnglishLevel: '',
            SliderMinPrice: vacancyWithMinPrice?.price,
            SliderMaxPrice: vacancyWithMaxPrice?.price,
            SliderMinDuration: vacancyWithMinDuration?.timePerWeek,
            SliderMaxDuration: vacancyWithMaxDuration?.timePerWeek,
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div style={{ paddingBottom: '15px' }}>
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
                        marginRight: '20px',
                        padding: '1.5rem',
                        background: '#FFFFFF',
                        borderRadius: '15px',
                        width: '355px',
                        height: '562px',
                        position: 'sticky',
                        top: '10px',
                        boxShadow:
                            '10px 2px 6px rgb(0 0 0 / 12%), 0px 2px 6px rgb(0 0 0 / 14%), 0px 2px 6px rgb(0 0 0 / 20%)'
                    }}
                >
                    <Form.Item name="Search" style={{ marginBottom: '15px' }}>
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
                    <Form.Item
                        name="SelectCategories"
                        style={{ marginBottom: '15px' }}
                    >
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
                            {categoriesData?.map((el: { category: string; }) => (
                                <Option key={el.category}>{el.category}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="SelectSkills"
                        style={{ marginBottom: '15px' }}
                    >
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
                            {skillsData?.map((el: { skill: string; }) => (
                                <Option key={el.skill}>{el.skill}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="SelectEnglishLevel"
                        style={{ marginBottom: '15px' }}
                    >
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
                    <Form.Item
                        name="SliderMinPrice"
                        label="Min rate"
                        style={{ marginBottom: '2px' }}
                    >
                        <Row>
                            <Col span={15}>
                                <Slider
                                    min={vacancyWithMinPrice?.price}
                                    max={vacancyWithMaxPrice?.price}
                                    onChange={onChangeMinPrice}
                                    value={
                                        typeof sliderMinPriceValue === 'number'
                                            ? sliderMinPriceValue
                                            : 0
                                    }
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={vacancyWithMinPrice?.price}
                                    max={vacancyWithMaxPrice?.price}
                                    step={50}
                                    style={{
                                        margin: '0 32px',
                                        boxShadow:
                                            '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                                    }}
                                    value={sliderMinPriceValue}
                                    onChange={onChangeMinPrice}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="SliderMaxPrice"
                        label="Max rate"
                        style={{ marginBottom: '2px' }}
                    >
                        <Row>
                            <Col span={15}>
                                <Slider
                                    min={vacancyWithMinPrice?.price}
                                    max={vacancyWithMaxPrice?.price}
                                    onChange={onChangeMaxPrice}
                                    value={
                                        typeof sliderMaxPriceValue === 'number'
                                            ? sliderMaxPriceValue
                                            : 0
                                    }
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={vacancyWithMinPrice?.price}
                                    max={vacancyWithMaxPrice?.price}
                                    step={50}
                                    style={{
                                        margin: '0 32px',
                                        boxShadow:
                                            '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                                    }}
                                    value={sliderMaxPriceValue}
                                    onChange={onChangeMaxPrice}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="SliderMinDuration"
                        label="Min hrs/week"
                        style={{ marginBottom: '2px' }}
                    >
                        <Row>
                            <Col span={15}>
                                <Slider
                                    min={vacancyWithMinDuration?.timePerWeek}
                                    max={vacancyWithMaxDuration?.timePerWeek}
                                    onChange={onChangeMinDuration}
                                    value={
                                        typeof sliderMinTimePerWeekValue ===
                                            'number'
                                            ? sliderMinTimePerWeekValue
                                            : 0
                                    }
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={vacancyWithMinDuration?.timePerWeek}
                                    max={vacancyWithMaxDuration?.timePerWeek}
                                    step={5}
                                    style={{
                                        margin: '0 32px',
                                        boxShadow:
                                            '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                                    }}
                                    value={sliderMinTimePerWeekValue}
                                    onChange={onChangeMinDuration}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="SliderMaxDuration"
                        label="Max hrs/week"
                        style={{ marginBottom: '30px' }}
                    >
                        <Row>
                            <Col span={15}>
                                <Slider
                                    min={vacancyWithMinDuration?.timePerWeek}
                                    max={vacancyWithMaxDuration?.timePerWeek}
                                    onChange={onChangeMaxDuration}
                                    value={
                                        typeof sliderMaxTimePerWeekValue ===
                                            'number'
                                            ? sliderMaxTimePerWeekValue
                                            : 0
                                    }
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={vacancyWithMinDuration?.timePerWeek}
                                    max={vacancyWithMaxDuration?.timePerWeek}
                                    step={5}
                                    style={{
                                        margin: '0 32px',
                                        boxShadow:
                                            '0px 2px 6px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.14),0px 2px 6px rgba(0, 0, 0, 0.2)',
                                    }}
                                    value={sliderMaxTimePerWeekValue}
                                    onChange={onChangeMaxDuration}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <ButtonsWrapper>
                        <Form.Item>
                            <Button style={{ marginRight: '15px' }} type="submit">{t('Vacancies.searchBtn')}</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={clearAll}>{t('Vacancies.clearBtn')}</Button>
                        </Form.Item>
                    </ButtonsWrapper>
                </Form>
                <VacanciesContainer>
                    {vacanciesData?.length > 0 && !isLoading ? (
                        vacanciesData
                            ?.slice((pageValue - 1) * 10, limit * pageValue)
                            .map(
                                (el: IVacancy, idx: number) =>
                                    idx < limit && (
                                        <Card
                                            key={idx}
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
                                    )
                            )
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
            {vacanciesData?.length >= limit && (
                <Pagination
                    current={pageValue}
                    onChange={onChange}
                    total={vacanciesData?.length}
                />
            )}
        </div>
    );
}
