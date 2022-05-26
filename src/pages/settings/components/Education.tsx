import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { CloseModal, EducationContainer } from '../style';

interface Props{
    data?: Education | null;
    closeModal?(): void;
}
interface Education {
    establishment: string;
    level: string;
    start: moment.Moment;
    end: moment.Moment;
}
export function Education( {data = null, closeModal} : Props): JSX.Element {   
    const { t } = useTranslation(); 
  return (
    <EducationContainer>
        <h3>
            {t('GeneralSettings.educationForm.title')} 
            {closeModal && <CloseModal><Button onClick={() => closeModal()}>&#10008;</Button></CloseModal>}
        </h3>
        <Form initialValues={data || undefined}>
            <Form.Item   name='establishment' label={t('GeneralSettings.educationForm.establishment')}>
                <Input />
            </Form.Item>
            <Form.Item name='level' label={t('GeneralSettings.educationForm.level')}>
                <Input  />
            </Form.Item>
            <Form.Item name='start' label={t('GeneralSettings.educationForm.start')}>
                <DatePicker/>
            </Form.Item>
            <Form.Item name='end' label={t('GeneralSettings.educationForm.end')}>
                <DatePicker />
            </Form.Item>
            <Button>{data? t('GeneralSettings.educationForm.edit') : t('GeneralSettings.educationForm.create')}</Button>
        </Form>
    </EducationContainer>
  )
}