import Layout from '@components/layout';
import React from 'react';
import 'antd/dist/antd.css';
import Table from '@components/table';
import Method from '@components/method';
import {task} from '../../models/task-model';
import { connect } from "react-redux";
import { setData } from "../../store/tasks";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

class Home extends React.Component<{data:any,setData:Function}, {data: task[]}> {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(): void {
    this.saveData();
  }
  componentDidMount(): void {
    this.loadData();
  }
  saveData() {
    console.log("store saved!");
    localStorage.setItem('store',JSON.stringify(this.props.data.value));
  }
  loadData(){
    let tmp;
    try {  
      tmp=JSON.parse(localStorage.getItem("store"));
    } catch (error) {  }
    if(!tmp || tmp.length==0){
      this.getData();
    }else{
      this.props.setData(tmp)
      console.log("loaded from store!");
    }
  }
  async getData(){
    const url = "/api/tasks";
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.props.setData(json)
      console.log("loaded from server!");
    } catch (error) { }
  }
  render() {
    return (
      <Layout>
        <Method />
        <Table />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = {
  setData
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);