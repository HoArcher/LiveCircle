import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import { Button, Layout, Menu, Breadcrumb, Icon } from 'antd';
import moment from 'moment'


export default class Home2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statics: {
                "123orgID": { //数字组成的字符串 组织机构
                    "DVR": { //类型
                        "456": { "camera": 1,"dvsOut":2 },
                        "789": { "camera": 1, }
                    },
                    "DVR_camera": {
                        "4561": { "camera": 1, },
                        "7891": { "camera": 1, }
                    },
                }
            }
        }
    }
    deal(statics){
        let m=0;
        for(let i in statics){ // i 组织机构
           //console.log(statics[i]);
           for(let a in statics[i]){ //a 类型
               for(let b in statics[i][a]){ //b源设备
                   console.log(statics[i][a][b]);
                   let newRsource={total:"",datas:{} }
                   //newRsource.total=
                //    for(let c in statics[i][a][b]){// c 关联设备
                //         console.log(statics[i][a][b][c]);
                //    }
                     
               }
               
           }
        }
    }
    render() {

        return (
            <div>
                Home22222
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
