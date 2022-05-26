import React, { Dispatch, SetStateAction } from 'react';
import {
    Modal,
    Form,
    Input,
    InputNumber
} from "antd";
import { IVacancy } from 'types/vacancy';
import { Button } from '../projectDetails/styles';


interface IProps {
    vacancy: IVacancy;
    modal: boolean;
    showModal: Dispatch<SetStateAction<boolean>>;
}

function SendProposal({ vacancy, modal, showModal }: IProps): JSX.Element {
    const [form] = Form.useForm();
    const { TextArea } = Input;


    return (
        <Modal
            bodyStyle={{ padding: '35px' }}
            style={{ top: 30 }}
            width={900}
            visible={modal}
            title={<h2 style={{ margin: 9 }}>Send your proposal</h2>}
            //      okText={"Send proposal"}
            //      cancelText={"Back to description"}
            onCancel={() => {
                showModal(false);
            }}


            footer={[
                <Button style={{ margin: '15px 20px 20px 5px' }} onClick={() => {
                    showModal(false);
                }} key="back" >
                    Back to description
                </Button>,
                <Button style={{ margin: '15px 20px 20px 5px' }} key="submit">
                    Send proposal
                </Button>
            ]}

        // onOk={() => {
        //     form
        //         .validateFields()
        //         .then((values) => {
        //             form.resetFields();
        //         });
        // }}
        // forceRender
        >
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
                    required
                    name="price"
                    label="Rate hourly work:">&#36;
                    <InputNumber
                        style={{ margin: 10 }}
                        defaultValue={vacancy.price}
                        min={5}
                        max={500}
                        step={5}
                    />per hour
                </Form.Item>
                <Form.Item noStyle
                    name="user"
                    initialValue={17} />
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