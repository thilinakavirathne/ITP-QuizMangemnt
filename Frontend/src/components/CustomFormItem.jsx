import React from 'react'
import { Form, Col, Input } from 'antd'




const CustomFormItem = ({ label, required, message, colspan, onChange,value }) => {
    return (
        <Col span={colspan ?? 11}>
            <Form.Item
            
                label={label}
                rules={[
                    {
                        required: { required },
                        whitespace: true,
                        message: { message }
                    },
                ]}
            >
                <Input onChange={(event) => { onChange(event) }} value={value}/>
            </Form.Item>
        </Col>
    )
}

export default CustomFormItem