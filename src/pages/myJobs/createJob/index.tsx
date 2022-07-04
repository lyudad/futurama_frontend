import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Heading } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import { useCreateJobMutation, useGetCategoriesQuery, useGetSkillsQuery } from 'store/api/vacanciesApi';

import {
    Form,
    Input,
    Select,
    Row,
    Col,
    InputNumber,
    message
} from 'antd';
import { useAppSelector } from 'store/hooks';
import TextArea from 'antd/lib/input/TextArea';

type IJob = {
    title: string;
    company: string;
    location: string;
    description: string;
    englishLevel: string;
    price: number;
    skills: [];
    timePerWeek: number;
    category: number;
    ownew: number;
};


function CreateJob(): JSX.Element {

    const myId = useAppSelector((state) => state.auth.user?.id);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { Option } = Select;
    const [form] = Form.useForm();
    const { data: categoriesData } = useGetCategoriesQuery('');
    const { data: skillsData } = useGetSkillsQuery('');

    const [sendJob] = useCreateJobMutation();

    const openMessage = (): void => {
        const key = 'updatable';
        message.loading({
            content: "Creating...",
            key,
            style: {
                marginTop: '130px',
            },
        });
        setTimeout(() => {
            message.success({
                content: "Job succesfully created!",
                key,
                duration: 2,
                style: {
                    marginTop: '130px',
                },
            });
        }, 1800);
    };

    async function sending(values: IJob): Promise<void> {
        await sendJob(values);
        openMessage();
        navigate('/myjobs');
    }


    return (
        <Container>
            <Heading>Create a job</Heading>
            <Form
                size='large'
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="title"
                    label="Vacancy title:"
                    rules={[
                        {
                            required: true
                        },
                    ]}>
                    <Input placeholder="Input vacancy name" />
                </Form.Item>

                <Form.Item name="category" label="Job category"
                    rules={[
                        {
                            required: true
                        },
                    ]}>
                    <Select placeholder="Select job category">
                        {categoriesData?.map((el: { id: number, category: string; }) => (
                            <Option value={el.id} key={el.category}>{el.category}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location:"
                    rules={[
                        {
                            required: true
                        },
                    ]}>
                    <Input placeholder="Input job's location" />
                </Form.Item>

                <Form.Item
                    name="company"
                    label="Name your company:"
                    rules={[
                        {
                            required: true
                        },
                    ]}>
                    <Input placeholder="Input company name" />
                </Form.Item>

                <Row>
                    <Col>
                        <Form.Item name="englishLevel" label="Select required english level:" rules={[
                            {
                                required: true
                            },
                        ]}>
                            <Select
                                placeholder={t('Vacancies.selectEnglishLevel')}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.children as unknown as string)
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }>
                                <Option value="Elementary">Elementary</Option>
                                <Option value="Pre-intermediate">
                                    Pre-Intermediate
                                </Option>
                                <Option value="Intermediate">Intermediate</Option>
                                <Option value="Upper-intermediate">
                                    Upper-Intermadiate
                                </Option>
                                <Option value="Advanced">Advanced</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col offset={3} >
                        <Form.Item
                            name="price"
                            label="Hourly&nbsp;rate:"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <InputNumber
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                step={5}
                                min={5}
                                max={500}
                            />
                        </Form.Item>
                    </Col>
                    <Col offset={3} >
                        <Form.Item
                            name="timePerWeek"
                            label="Duration (hours per week)"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <InputNumber
                                step={1}
                                min={5}
                                max={60}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="skills"
                    label="Select required skills:"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder={t('Vacancies.selectSkills')}
                    >
                        {skillsData?.map((el: { id: number, skill: string; }) => (
                            <Option value={el.id} key={el.skill}>{el.skill}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description of the job:"
                    rules={[
                        {
                            required: true
                        },
                    ]}>
                    <TextArea
                        showCount
                        rows={8}
                        maxLength={999}
                        placeholder="Input description"
                    />

                </Form.Item>

                <Form.Item noStyle
                    name="owner"
                    initialValue={myId}
                />

            </Form>

            <Button onClick={() => navigate(-1)}>{t('Invite.back')}</Button>
            <Button onClick={() => {
                form
                    .validateFields()
                    .then((values) => {
                        sending(values);
                    });
            }} key="submit">CREATE</Button>
        </Container>
    );
}

export default CreateJob;