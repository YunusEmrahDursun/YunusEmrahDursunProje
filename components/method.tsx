import { PlusOutlined  } from '@ant-design/icons';
import React from 'react';
import { Col, Row,Input,Select,Button,Form,Space } from 'antd';
import {Prioritys} from '../models/task-model';
import { useDispatch } from "react-redux";
import 'antd/dist/antd.css';
import { addData } from "../store/tasks";
const { Option } = Select;



export default function Method() {

  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const priority = Form.useWatch('priority', form);
  const dispatch=useDispatch();
  function create() {
    if(name.length>255 || name.length<5 ||  !(priority > 0) ) return;
    dispatch(addData({name,priority}))
    form.setFieldValue('name',"")
    form.setFieldValue('priority',"0")
    
  }
  return (
      <>
        <Form layout="vertical" form={form}>
          <h3>Create New Job</h3>
          <Row justify="start" align="middle">
            <Col xl={18} md={16} xs={24} style={{margin:"5px"}}>
              <Form.Item label="Job Name" name="name" rules={[{ required: true, message: 'Please input your Job Name!' },{ min: 5, message: 'Job Name must be minimum 5 characters.' },{ max: 255, message: 'Job Name must be maximum 255 characters.' }]}>
                <Input name="name" />
              </Form.Item>  
            </Col>
            <Col xl={4} md={8} xs={6} style={{margin:"5px"}}>
              <Space>
                <Form.Item label="Job Priority" name="priority"  rules={[{ required: true, message: 'Please select your Job Priority!' }]}>
                  <Select  defaultValue="0" style={{ width: 120 }} >
                    <Option key="0" value="0" >Choose</Option>
                    { Object.keys(Prioritys).filter((v)=> isNaN(Number(v))).map((key)=> (<Option key={key} value={Prioritys[key]}>{key}</Option>) )}
                  </Select>
                </Form.Item>  
                <Button type="primary" icon={<PlusOutlined />} style={{marginBottom:"-5px"}} onClick={create}> Create</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </>
  );
}


