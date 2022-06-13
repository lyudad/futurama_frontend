import React, { Dispatch, SetStateAction } from 'react';
import {
    Modal,
    Form,   
    Select
} from "antd";
import { useTranslation } from 'react-i18next';
import { Button } from 'pages/vacancies/components/projectDetails/styles';
import { useGetMyJobsQuery } from 'store/api/proposalsApi';
import { IVacancy } from 'types/vacancy';
import { useAppSelector } from 'store/hooks';

interface IProps {
    modal: boolean;
    showModal: Dispatch<SetStateAction<boolean>>;
}

type Invite = {
    owner: number;
    job: number;
};

export function SendInvite({ modal, showModal }: IProps): JSX.Element {
    const owner = useAppSelector(state => state.auth.user?.id);
    const [form] = Form.useForm();
    //    const [setData] = useSendProposalMutation();

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

    function sending(values: Invite): void {
        // await setData(values);
        showModal(false);
        showMessage();
        console.log(values);
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
                    <Form.Item required name="job">
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
                        name="owner"
                        initialValue={owner}
                    />
                </Form>

            </Modal >
        );
    } return <div />;
};

