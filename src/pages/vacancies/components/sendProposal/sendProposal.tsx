import React, { Dispatch, SetStateAction } from 'react';
import {
    Modal,
    Form,
    Input,
    InputNumber
} from "antd";
import { IVacancy } from 'types/vacancy';
import { useTranslation } from 'react-i18next';
import { useSendProposalMutation } from 'store/api/proposalsApi';
import { useAppSelector } from 'store/hooks';
import { Button } from '../projectDetails/styles';


interface IProps {
    vacancy: IVacancy;
    modal: boolean;
    showModal: Dispatch<SetStateAction<boolean>>;
}

type Proposal = {
    user: number;
    vacancy: number;
    price: number;
    coverLetter: string;
    type: string;
    status: string;
};

function SendProposal({ vacancy, modal, showModal }: IProps): JSX.Element {
    const [form] = Form.useForm();
    const [setData] = useSendProposalMutation();
    const user = useAppSelector(state => state.auth.user?.id);
    const { TextArea } = Input;
    const { t } = useTranslation();

    const showMessage = (): void => {
        const message = Modal.success({
            title: t('Proposal.success'),
            content: t('Proposal.sent'),
        });
        setTimeout(() => {
            message.destroy();
        }, 3500);
    };

    async function sending(values: Proposal): Promise<void> {
        await setData(values);
        showModal(false);
        showMessage();
    }

    return (
        <Modal
            onCancel={() => { showModal(false); }}
            bodyStyle={{ padding: '35px' }}
            style={{ top: 30 }}
            width={900}
            visible={modal}
            title={<h2 style={{ margin: 9 }}>{t('Proposal.send')}</h2>}
            footer={[
                <Button style={{ margin: '15px 20px 20px 5px' }} onClick={() => {
                    showModal(false);
                }} key="back" >
                    {t('Proposal.back')}
                </Button>,
                <Button onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            sending(values);
                        });
                }} style={{ margin: '15px 20px 20px 5px' }} key="submit">
                    {t('Proposal.sendproposal')}
                </Button>
            ]}>
            <Form
                form={form}
                layout="vertical"
                size='large'
            >
                <Form.Item
                    name="coverLetter"
                    label={t('Proposal.coverletter')}
                    rules={[
                        {
                            required: true,
                            message: t('Proposal.letterRequired')
                        },
                    ]}
                >
                    <TextArea
                        showCount
                        rows={4}
                        maxLength={500}
                        style={{ height: 130 }}
                        placeholder={t('Proposal.letterplaceholder')} />
                </Form.Item>

                <Form.Item
                    initialValue={vacancy.price}
                    name="price"
                    label={t('Proposal.rate')}
                    rules={[
                        {
                            required: true,
                            message: t('Proposal.rateRequired')
                        },
                    ]}
                >
                    <InputNumber
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        min={5}
                        max={500}
                        step={5}
                    />
                </Form.Item>

                <Form.Item noStyle
                    name="vacancy"
                    initialValue={vacancy.id}
                />
                <Form.Item noStyle
                    name="user"
                    initialValue={user}
                />
                <Form.Item noStyle
                    name="type"
                    initialValue="Proposal"
                />

                <Form.Item noStyle
                    name="status"
                    initialValue="Pending"
                />
            </Form>
            <p style={{
                marginTop: "15px",
                fontSize: "15px"
            }}>{t('Proposal.budget')}<strong>&#36;{vacancy.price}</strong></p>
        </Modal >
    );
};

export default SendProposal;