import React, { Dispatch, SetStateAction } from 'react';
import {
    Modal,
    Form,
    Select
} from "antd";
import { useTranslation } from 'react-i18next';
import { Button } from 'pages/vacancies/components/projectDetails/styles';
import { useGetMyJobsQuery, useSendProposalMutation } from 'store/api/proposalsApi';
import { IVacancy } from 'types/vacancy';

interface IProps {
    modal: boolean;
    showModal: Dispatch<SetStateAction<boolean>>;
    id: number;
}

type Invite = {
    user: number;
    vacancy: number;
    status: string;
    type: string;
};

export function SendInvite({ modal, showModal, id }: IProps): JSX.Element {

    const [form] = Form.useForm();
    const [setData] = useSendProposalMutation();

    const { data } = useGetMyJobsQuery();
    const { t } = useTranslation();
    const { Option } = Select;

    const showMessage = (): void => {
        const message = Modal.success({
            title: t('Proposal.success'),
            content: t('Invite.sent'),
            width: 600,
        });
        setTimeout(() => {
            message.destroy();
        }, 3500);
    };

    async function sending(values: Invite): Promise<void> {
        await setData(values);
        showModal(false);
        showMessage();
    }

    if (data) {
        const jobs: IVacancy[] | [] = data;

        return (
            <Modal
                onCancel={() => { showModal(false); }}
                bodyStyle={{ padding: '35px' }}
                style={{ top: 60 }}
                width={600}
                visible={modal}
                title={<h2 style={{ margin: 9 }}>{t('Invite.sendTitle')}</h2>}
                footer={[
                    <Button style={{ margin: '15px 20px 20px 5px' }} onClick={() => {
                        showModal(false);
                    }} key="back" >
                        {t('Invite.backto')}
                    </Button>,
                    <Button onClick={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                sending(values);
                            });
                    }} style={{ margin: '15px 20px 20px 5px' }} key="submit">
                        {t('Invite.sendinvitation')}
                    </Button>
                ]}>

                <Form
                    form={form}
                    layout="vertical"
                    size='large'
                >
                    <Form.Item rules={[{ required: true, message: t('Invite.requiredmessage') }]} name="vacancy">
                        <Select style={{
                            width: '100%'
                        }}
                            placeholder={t('Invite.selectjob')}
                        >
                            {jobs?.map((el: IVacancy) => (
                                <Option value={el.id} key={el.id}>{el.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item noStyle
                        name="user"
                        initialValue={id}
                    />
                    <Form.Item noStyle
                        name="status"
                        initialValue="Pending"
                    />
                    <Form.Item noStyle
                        name="type"
                        initialValue="Invite"
                    />
                </Form>
            </Modal >
        );
    } return <div />;
};

