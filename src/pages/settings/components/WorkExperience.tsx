import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { CloseModal, Experience } from '../style';

interface Props{
    data?: Experience | null;
    closeModal?(): void;
}
interface Experience {
    company: string;
    position: string;
    start: moment.Moment;
    end: moment.Moment;
    description: string;
}
export function WorkExperience( {data = null, closeModal} : Props): JSX.Element {  
    const { t } = useTranslation();  
  return (
    <Experience>
        <h3>
            {t('GeneralSettings.workExperience.title')} 
            {closeModal && <CloseModal><Button onClick={() => closeModal()}>&#10008;</Button></CloseModal>}
            </h3>
        <Form initialValues={data || undefined}>
            <Form.Item   name='company' label={t('GeneralSettings.workExperience.company')}>
                <Input />
            </Form.Item>
            <Form.Item name='position' label={t('GeneralSettings.workExperience.position')}>
                <Input  />
            </Form.Item>
            <Form.Item name='start' label={t('GeneralSettings.workExperience.start')}>
                <DatePicker/>
            </Form.Item>
            <Form.Item name='end' label={t('GeneralSettings.workExperience.end')}>
                <DatePicker />
            </Form.Item>
            <Form.Item name='description' label={t('GeneralSettings.workExperience.description')}>
                <TextArea />
            </Form.Item>
            <Button>{data? t('GeneralSettings.workExperience.edit') : t('GeneralSettings.workExperience.create')}</Button>
        </Form>
    </Experience>
  )
}