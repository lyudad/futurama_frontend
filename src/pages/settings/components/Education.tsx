import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { IEducation } from 'types/profile';
import moment from 'moment';
import { CloseModal, EducationContainer } from '../style';

interface Props{
    data?: IEducation | null;
    closeModal?(): void;
    handleClick(values: IEducation): void;
    deleteEducation?(id?: number): void;
}

export function Education( {data = null, closeModal, handleClick, deleteEducation} : Props): JSX.Element {   
    const tempData = {...data};
    tempData.start = moment(tempData.start);
    tempData.end = moment(tempData.end);
    const { t } = useTranslation(); 
  return (
    <EducationContainer>
        <h3>
            {t('GeneralSettings.educationForm.title')} 
            {closeModal && <CloseModal><Button onClick={() => closeModal()}>&#10008;</Button></CloseModal>}
        </h3>
        <Form
        onFinish={(values: IEducation) => { 
            handleClick(values); closeModal?.();}}
        initialValues={tempData || undefined}>
            {tempData?.id && <Form.Item style={{display: 'none'}} name='id'><Input/></Form.Item>}
            <Form.Item   
            name='establishment' 
            label={t('GeneralSettings.educationForm.establishment')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.educationForm.inputEstablishment')
                },
            ]}
            >
                <Input />
            </Form.Item>
            <Form.Item 
            name='level' 
            label={t('GeneralSettings.educationForm.level')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.educationForm.inputLevel')
                },
            ]}
            >
                <Input  />
            </Form.Item>
            <Form.Item 
            name='start' 
            label={t('GeneralSettings.educationForm.start')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.educationForm.selectDate')
                },
            ]}
            >
                <DatePicker/>
            </Form.Item>
            <Form.Item 
            name='end' 
            label={t('GeneralSettings.educationForm.end')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.educationForm.selectDate')
                },
            ]}
            >
                <DatePicker />
            </Form.Item>
            <Button htmlType='submit'>{data? t('GeneralSettings.educationForm.edit') : t('GeneralSettings.educationForm.create')}</Button>
            {deleteEducation && <Button style={{marginLeft: '2rem'}} 
            onClick={() => tempData.id ? deleteEducation(tempData.id) : deleteEducation()}>
                {t('GeneralSettings.educationForm.delete')}
            </Button>}
        </Form>
    </EducationContainer>
  )
}