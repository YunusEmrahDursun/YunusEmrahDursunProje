import { EditOutlined,DeleteOutlined,SearchOutlined,ExclamationOutlined  } from '@ant-design/icons';
import React, {  useRef, useState } from 'react';
import { Col, Row,Input,Select,Button,Table,Space, Modal, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {task,Prioritys,PriorityColor} from '../models/task-model';
import styled from 'styled-components';
import { useSelector,useDispatch } from "react-redux";
import { editData ,deleteData} from "../store/tasks";
import 'antd/dist/antd.css';
const { Option } = Select;

const RefButton = styled.button`
  border:0px;
  padding: 6px;
  width: 100px;
  color:white;
  background-color:${props => PriorityColor[props.inputColor] };
  `;
const DangerArea = styled.div`
  text-align:center;
  svg{
    font-size:40px;
    color:red;
  }
  `

export default function CustomTable() {
  const dispatch=useDispatch();
  const deleteActionRowId = useRef(0) 

  const columns: ColumnsType<task> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      align:'left',
      render:(key)=>(
        <RefButton inputColor={Prioritys[key]}>
          {Prioritys[key]}
        </RefButton>
      ),
      sorter: (a, b) => a.priority - b.priority,
      defaultSortOrder: 'descend'
    },
    {
      title: 'Action',
      key: 'action',
      align:'left',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} 
          onClick={() => { 
            setIsEditModalOpen(true); 
            let selectedObj=data.find(x=> x.id==record.id);
            form.setFieldsValue({...selectedObj});
           }}></Button>
          <Button icon={<DeleteOutlined />}  onClick={()=>{ 
            deleteActionRowId.current=record.id;
            setIsDeleteModalOpen(true);
           }}></Button>
        </Space >
      ),
    }
  ];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const data=useSelector((state:any) => state.data.value);
  const [priority, setPriority] = useState(0);
  const [name, setName] = useState('');
  const [form] = Form.useForm();

  const handleSelectChange=(value) => {
    setPriority(value);
  };
  const handleNameChange=(e) => {
    setName(e.target.value);
  };
  const renderData=data.filter(x=>{ if(priority==0) return true; else{ return x.priority==priority } })
  .filter(x=>{ if(name.trim()=='') return true; else{ return x.name.indexOf(name) >-1   } })
  return (
      <>
        <h3>Job List</h3>
        <h5 style={{float:"right"}}>({renderData.length}/{data.length})</h5>
        <div style={{clear:"both"}}></div>
        <div style={{ marginBottom: -1, backgroundColor:"#91d5ff" }}>
        <Row justify="space-between" align="middle" >
          <Col xl={18} xs={12} style={{padding:"20px 5px 20px 10px"}}>
            <Input onChange={handleNameChange} prefix={<SearchOutlined />} placeholder="Job Name"/>
          </Col>
          <Col xl={6} xs={12} style={{padding:"20px 10px 20px 5px"}}>
            <Select onChange={handleSelectChange} defaultValue="0" style={{ width: "100%" }}>
                  <Option key="0" value="0" > Priority (all) </Option>
                  { Object.keys(Prioritys).filter((v)=> isNaN(Number(v))).map((key)=> (<Option key={key} value={Prioritys[key]}>{key}</Option>) )}
            </Select>
          </Col>
        </Row>
        </div>
        <Table  rowKey={record => record.id} bordered columns={columns} rowClassName={(_, index) => (index%2 ? "table-gray" : "table-white")} dataSource={renderData}  ></Table>
        <Modal title="Job Edit" 
          open={isEditModalOpen} 
          onOk={() => {
            const p=form.getFieldValue("priority")
            const id=form.getFieldValue("id")
            if( !(p > 0) ) return;
            dispatch(editData({
              id:id,
              priority:p
            }))
            setIsEditModalOpen(false);
          }}
          onCancel={ () => {
            setIsEditModalOpen(false);
          }}>
          <Form form={form}  labelCol={{ span: 4 }} >
            <Form.Item label="Job Name" name="name" >
                <Input name="name" disabled />
            </Form.Item>  
            <Form.Item label="Job Priority" name="priority" >
              <Select  defaultValue="0" style={{ width: 120 }} >
                <Option key="0" value="0" >Choose</Option>
                { Object.keys(Prioritys).filter((v)=> isNaN(Number(v))).map((key)=> (<Option key={key} value={Prioritys[key]}>{key}</Option>) )}
              </Select>
            </Form.Item> 
            <Form.Item name="id">
                <Input name="id" hidden />
            </Form.Item>  
          </Form>
        </Modal>
        <Modal  open={isDeleteModalOpen} onOk={() => {
            dispatch(deleteData(deleteActionRowId.current));
            setIsDeleteModalOpen(false);
          }} onCancel={() => { setIsDeleteModalOpen(false);  }}> <DangerArea><ExclamationOutlined />  <h3>Are you sure you want to delete it?</h3> </DangerArea></Modal>
      </>
  );
}


