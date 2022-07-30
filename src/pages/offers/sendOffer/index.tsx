import React, { Dispatch, SetStateAction } from 'react';
import {
    Modal,
    Form,
    InputNumber
} from "antd";
import { useTranslation } from 'react-i18next';
import { useSendProposalMutation } from 'store/api/proposalsApi';
import notification, { NotificationPlacement } from 'antd/lib/notification';
import { Button } from 'pages/vacancies/components/projectDetails/styles';

interface IProps {
    user: number;
    vacancy: number;
    modal: boolean;
    showModal: Dispatch<SetStateAction<boolean>>;
}

type Proposal = {
    user: number;
    vacancy: number;
    price: number;
    type: string;
    status: string;
};

function SendOffer({ user, vacancy, modal, showModal }: IProps): JSX.Element {
    const [form] = Form.useForm();
    const [setData] = useSendProposalMutation();
    const { t } = useTranslation();

    const openNotification = (placement: NotificationPlacement): void => {
        notification.success({
            message: t('Proposal.success'),
            description: t('Offers.sent'),
            placement,
        });
    };

    async function sending(values: Proposal): Promise<void> {
        await setData(values);
        showModal(false);
        openNotification('bottomRight');
    }

    return (
        <Modal
            onCancel={() => { showModal(false); }}
            bodyStyle={{ padding: '35px' }}
            width={535}
            visible={modal}
            title={<h2 style={{ margin: 9 }}>{t('Offers.sendYour')}</h2>}
            footer={[
                <Button style={{ margin: '15px 20px 20px 5px' }} onClick={() => {
                    showModal(false);
                }} key="back" >{t('Offers.cancel')}
                </Button>,
                <Button onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            sending(values);
                        });
                }} style={{ margin: '15px 20px 20px 5px' }} key="submit">
                    {t('Offers.send')}
                </Button>
            ]}>
            <Form
                form={form}
                layout="vertical"
                size='large'
            >
                <Form.Item
                    name="price"
                    label={t('Offers.finalrate')}
                    rules={[
                        {
                            required: true,
                            message: t('Offers.rateRequired')
                        },
                    ]}
                >
                    <InputNumber
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        min={5}
                        max={500}
                        step={1}
                    />
                </Form.Item>
                <Form.Item noStyle
                    name="vacancy"
                    initialValue={vacancy}
                />
                <Form.Item noStyle
                    name="user"
                    initialValue={user}
                />
                <Form.Item noStyle
                    name="type"
                    initialValue="Offer"
                />
                <Form.Item noStyle
                    name="status"
                    initialValue="Pending"
                />
            </Form>
        </Modal >
    );
};

export default SendOffer;