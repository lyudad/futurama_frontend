import React, { Dispatch, SetStateAction } from 'react';
import {
    Modal,
    Form,
    Input,
    InputNumber
} from "antd";
import { IVacancy } from 'types/vacancy';
import { Button } from '../projectDetails/styles';
import { useSendProposalMutation } from 'store/api/proposalsApi';


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
};

function SendProposal({ vacancy, modal, showModal }: IProps): JSX.Element {
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const [setData] = useSendProposalMutation();

    const showMessage = () => {
        const modal = Modal.success({
            title: 'Success',
            content: 'Your proposal have been successfully sent!',
        });
        setTimeout(() => {
            modal.destroy();
        }, 4000);
    };

    async function sending(values: Proposal): Promise<void> {
        await setData(values);
        showModal(false);
        showMessage();
    }

    return (
        <Modal
            bodyStyle={{ padding: '35px' }}
            style={{ top: 30 }}
            width={900}
            visible={modal}
            title={<h2 style={{ margin: 9 }}>Send your proposal</h2>}
            onCancel={() => {
                showModal(false);
            }}

            footer={[
                <Button style={{ margin: '15px 20px 20px 5px' }} onClick={() => {
                    showModal(false);
                }} key="back" >
                    Back to description
                </Button>,
                <Button onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            sending(values);
                        });
                }} style={{ margin: '15px 20px 20px 5px' }} key="submit">
                    Send proposal
                </Button>
            ]}>
            <Form
                form={form}
                layout="vertical"
                size='large'
            >
                <Form.Item
                    name="coverLetter"
                    label="Cover letter:"
                    rules={[
                        {
                            required: true,
                            message: "Please input cover letter"
                        },
                    ]}
                >
                    <TextArea
                        showCount
                        rows={4}
                        maxLength={500}
                        style={{ height: 130 }}
                        placeholder="Input your cover letter here" />
                </Form.Item>

                <Form.Item
                    initialValue={vacancy.price}
                    name="price"
                    label="Rate hourly work:"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your horly rate"
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
            </Form>
            <p style={{
                marginTop: "15px",
                fontSize: "15px"
            }}>Client&apos;s budget: <strong>&#36;{vacancy.price}</strong></p>
        </Modal >
    );
};

export default SendProposal;