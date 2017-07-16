import React from 'react';
import {Input,Table,Checkbox} from 'antd';
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const dataSource = [
    {label: '胡彦斌',value: '1',}, 
    {label: '胡彦祖',value: '2',},
    {label: '胡皓',value: '3',},
    {label: '陈丽君',value: '4',},
    {label: '陈烨',value: '5',},
    
    ];



export default  class InputSearch extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            defaultValue:[],
            checkedValues:[],
        }
    }
    handleSearch(SearchValue){

    }
    handleChange(checkedValues){

    }
    render(){
        var self = this;
        return(
        <div>
            <Search placeholder="input search text" onSearch={self.handleSearch.bind(this)} /> 
            <CheckboxGroup options={dataSource} defaultValue={this.state.defaultValue} onChange={self.handleChange.bind(this)}/>      
        
             <h2>{this.props.params.repoName}</h2>
        </div>

        );
    }
}
