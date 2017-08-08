import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import { Button, Layout, Menu, Breadcrumb, Icon } from 'antd';
import moment from 'moment'


export default class Home2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgData:{
                
            },
            statics: {
                "123orgID": { //数字组成的字符串 组织机构
                    "DVR": { //类型
                        "456": { "camera": 1, "dvsOut": 2 },
                        "789": { "camera": 1, }
                    },
                    "DVR_camera": {
                        "4561": { "camera": 5, "dvsOut": 5 },
                        "7891": { "camera": 1, "dvsOut": 2 }
                    },
                },
            },


        }
    }
    getTotalDatas() {

    }
    deal(statics) {
        let orgObj = {total:0,datas:{}};
        let orgDIC={};

        for (let orgid in statics) { //  组织机构
            let sourceTypeDIC = {};
            let sourceTypeObj = {total:0,datas:{}};
            for (let sourceType in statics[orgid]) {//DVR
                let sourceDeviceIDC = {};
                let sourceDeviceObj = {total:0,datas:{}};
                for (let sourceDevice in statics[orgid][sourceType]) {//456
                    //---
                    let item = statics[orgid][sourceType][sourceDevice];
                    let cameraTotal = item.camera ? item.camera :0;
                    let dvsOutTotal = item.dvsOut ? item.dvsOut :0;

                    let linkDeviceObj = {total:0,datas:{}};
                    let linkDeviceDIC = {};
                    for (let linkDevice in statics[orgid][sourceType][sourceDevice]) {
                        if (linkDeviceDIC[linkDevice] == undefined) {
                            linkDeviceDIC[linkDevice] = statics[orgid][sourceType][sourceDevice][linkDevice];
                        }


                        linkDeviceObj.total = cameraTotal + dvsOutTotal;
                        linkDeviceObj.datas = linkDeviceDIC;
                    }
                    //--
                    sourceDeviceIDC[sourceDevice] = linkDeviceObj;
                    sourceDeviceObj.total = (sourceDeviceIDC[sourceDevice].total+sourceDeviceObj.total);
                    sourceDeviceObj.datas = sourceDeviceIDC;
                }
                sourceTypeDIC[sourceType] = sourceDeviceObj;
                sourceTypeObj.total = sourceTypeDIC[sourceType].total+ sourceTypeObj.total;
                sourceTypeObj.datas = sourceTypeDIC;
            }
            orgDIC[orgid] =sourceTypeObj;
            orgObj.total = orgDIC[orgid].total +orgObj.total;
            orgObj.datas = orgDIC;
        }//组织机构
        console.log(orgObj.datas["123orgID"].datas["DVR"].datas["456"].datas);

    }
    render() {

        return (
            <div>
                Home22222
                <hr />
                {this.deal(this.state.statics)}
            </div>


        );
    }
}

// App.propTypes = {
//   optionalArray: PropTypes.array,
// }

// App.defaultProps={
//     optionalArray:[],
// }

/*
        let m = 0;
        for (let i in statics) { // i 组织机构
            //console.log(statics[i]);
            for (let a in statics[i]) { //a 类型
                for (let b in statics[i][a]) { //b源设备
                    console.log(statics[i][a][b]);
                    let newRsource = { total: "", datas: {} }
                    //newRsource.total=
                    //    for(let c in statics[i][a][b]){// c 关联设备
                    //         console.log(statics[i][a][b][c]);
                    //    }

                }

            }
        }


*/