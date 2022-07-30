import React, { useEffect } from 'react';
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
    skills: number[];
    timePerWeek: number;
    category: number;
};

type Props = {
    jobId?: number;
    vacancy?: IJob;
};

function CreateJob({ jobId, vacancy }: Props): JSX.Element {

    const myId = useAppSelector((state) => state.auth.user?.id);
    const { data: categoriesData } = useGetCategoriesQuery('');
    const { data: skillsData } = useGetSkillsQuery('');
    const [sendJob] = useCreateJobMutation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { Option } = Select;
    const [form] = Form.useForm();

    const showMessage = (loading: string, success: string): void => {
        const key = 'updatable';
        message.loading({
            content: loading,
            key,
            style: {
                marginTop: '130px',
            },
        });
        setTimeout(() => {
            message.success({
                content: success,
                key,
                duration: 2,
                style: {
                    marginTop: '130px',
                },
            });
        }, 1000);
    };

    async function sending(values: IJob): Promise<void> {
        await sendJob(values);
        if (jobId) {
            showMessage(t('Contacts.updating'), t('Contacts.updated'));
        } else {
            showMessage(t('CreateJob.creating'), t('CreateJob.created'));
        }
        navigate('/myjobs');
    }

    useEffect(() => {
        form.setFieldsValue(vacancy);
    }, [vacancy]);

    return (
        <Container>
            <Heading>{jobId ? t('CreateJob.editing') : t('CreateJob.createajob')}</Heading>
            <Form
                size='large'
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="title"
                    label={t('CreateJob.title')}
                    rules={[
                        {
                            min: 5,
                            required: true,
                            message: t('CreateJob.titlemessage')
                        },
                    ]}>
                    <Input placeholder={t('CreateJob.titleplaceholder')} />
                </Form.Item>

                <Form.Item name="category" label={t('CreateJob.category')} initialValue={vacancy?.category}
                    rules={[
                        {
                            required: true,
                            message: t('CreateJob.categorymessage')
                        },
                    ]}>
                    <Select placeholder={t('CreateJob.categoryplaceholder')}>
                        {categoriesData?.map((el: { id: number, category: string; }) => (
                            <Option value={el.id} key={el.category}>{el.category}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="location"
                    label={t('CreateJob.location')}
                    rules={[
                        {
                            required: true,
                            message: t('CreateJob.locationmessage')
                        },
                    ]}>
                    <Input placeholder={t('CreateJob.locationplaceholder')} />
                </Form.Item>

                <Form.Item
                    name="company"
                    label={t('CreateJob.company')}
                    rules={[
                        {
                            required: true,
                            message: t('CreateJob.companymessage')
                        },
                    ]}>
                    <Input placeholder={t('CreateJob.companyplaceholder')} />
                </Form.Item>

                <Row>
                    <Col>
                        <Form.Item name="englishLevel" label={t('CreateJob.englishlevel')} rules={[
                            {
                                required: true,
                                message: t('CreateJob.englishlevelmessage')
                            },
                        ]}>
                            <Select placeholder={t('Vacancies.selectEnglishLevel')}>
                                <Option value="Elementary">{t('CreateJob.elementary')}</Option>
                                <Option value="Pre-intermediate">{t('CreateJob.preintermediate')}</Option>
                                <Option value="Intermediate">{t('CreateJob.intermediate')}</Option>
                                <Option value="Upper-intermediate">{t('CreateJob.upperintermediate')}</Option>
                                <Option value="Advanced">{t('CreateJob.advanced')}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col offset={3} >
                        <Form.Item
                            name="price"
                            label={t('CreateJob.hourlyrate')}
                            rules={[
                                {
                                    required: true,
                                    message: t('CreateJob.hourlyratemessage')
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
                            label={t('CreateJob.duration')}
                            rules={[
                                {
                                    required: true,
                                    message: t('CreateJob.durationmessage')
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
                    label={t('CreateJob.selectskills')}
                    rules={[
                        {
                            required: true,
                            message: t('CreateJob.selectskillsmessage')
                        },
                    ]}
                >
                    <Select
                        showArrow
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
                    label={t('CreateJob.description')}
                    rules={[
                        {
                            required: true,
                            min: 200,
                            message: t('CreateJob.descriptionmessage')
                        },
                    ]}>
                    <TextArea
                        showCount
                        rows={8}
                        maxLength={999}
                        placeholder={t('CreateJob.descriptionplaceholder')}
                    />
                </Form.Item>

                <Form.Item noStyle
                    name="owner"
                    initialValue={myId}
                />
                {jobId && <Form.Item noStyle
                    name="id"
                    initialValue={jobId}
                />}
            </Form>

            <Button onClick={() => navigate(-1)}>{t('Invite.back')}</Button>
            <Button onClick={() => {
                form
                    .validateFields()
                    .then((values) => {
                        sending(values);
                    });
            }} key="submit">{jobId ? t('CreateJob.save') : t('CreateJob.create')}</Button>
        </Container>
    );
}

export default CreateJob;