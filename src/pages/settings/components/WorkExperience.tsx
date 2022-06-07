import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useTranslation } from 'react-i18next';
import { IWorkExperience } from 'types/profile';
import moment from 'moment';
import { CloseModal, Experience } from '../style';

interface Props{
    data?: IWorkExperience | null;
    closeModal?(): void;
    handleClick(values: IWorkExperience): void;
    deleteExperience?(id?: number): void;
}

export function WorkExperience( {data = null, closeModal, handleClick, deleteExperience} : Props): JSX.Element {  
    const tempData = {...data};
    tempData.start = moment(tempData.start);
    tempData.end = moment(tempData.end);
    const { t } = useTranslation();  
  return (
    <Experience>
        <h3>
            {t('GeneralSettings.workExperience.title')} 
            {closeModal && <CloseModal><Button onClick={() => closeModal()}>&#10008;</Button></CloseModal>}
            </h3>
        <Form 
        onFinish={(values) => { 
            handleClick(values); closeModal?.()}}
        initialValues={tempData || undefined}>
            {tempData?.id && <Form.Item style={{display: 'none'}} name='id'><Input/></Form.Item>}
            <Form.Item   
            name='company' 
            label={t('GeneralSettings.workExperience.company')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.workExperience.inputCompany')
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item 
            name='position' 
            label={t('GeneralSettings.workExperience.position')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.workExperience.inputPosition')
                },
            ]}>
                <Input  />
            </Form.Item>
            <Form.Item 
            name='start' 
            label={t('GeneralSettings.workExperience.start')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.workExperience.selectDate')
                },
            ]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item 
            name='end' 
            label={t('GeneralSettings.workExperience.end')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.workExperience.selectDate')
                },
            ]}>
                <DatePicker />
            </Form.Item>
            <Form.Item 
            name='description' 
            label={t('GeneralSettings.workExperience.description')}
            rules={[
                {
                    required: true,
                    message: t('GeneralSettings.workExperience.inputDescription')
                },
            ]}>
                <TextArea />
            </Form.Item>
            <Button htmlType="submit">{data? t('GeneralSettings.workExperience.edit') : t('GeneralSettings.workExperience.create')}</Button>
            {deleteExperience && <Button style={{marginLeft: '2rem'}} 
            onClick={() => tempData.id ? deleteExperience(tempData.id) : deleteExperience()}>
                {t('GeneralSettings.workExperience.delete')}</Button>}
        </Form>
    </Experience>
  )
}