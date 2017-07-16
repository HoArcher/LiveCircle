import React from 'react'
import { Popover, Button,Table,Col,Row } from 'antd';

export default class BasePopover extends React.Component{
    render(){

const columns=[
    {title:"姓名",width:100,dataIndex:'name',key:'1'},
    {title:"密码",width:100,dataIndex:'password',key:'2'},
];

const  dataSource=[
    {key:'1',name:'huhao',password:'123456'},
    {key:'2',name:'huhao2',password:'77777'},
];

const totall=11;        
const content = (
    <Table size="small"
        pagination={false}
        style={{fontSize:'12px',lineHeight:'12px'}}
        scroll={{y:150}}
        dataSource={dataSource}
        columns={columns}
        title={()=>
        <Row>
            <Col span={12} style={{textAlign:'right'}}><span>共{totall}条数据</span></Col>
        </Row>}
    />
);            
        return(
        <Popover content={content} title="指定名称">
            <Button type="primary">Hover me</Button>
        </Popover>
        );
    }
}

