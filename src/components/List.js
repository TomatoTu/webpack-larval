import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeView, init, del, updateData } from '../actions/curdAction';

class List extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillMount(){
        this.props.init();
    }

    handleUpdate(item){
        this.props.updateData(item);
        this.props.changeView({isListShow:0,isUpdateShow:1});
    }

    handleDelete(id){
        this.props.del(id);
    }


    render() {
        const list = this.props.list;
        const changeView = this.props.changeView;
        const handleDelete = this.handleDelete;
        const handleUpdate = this.handleUpdate;
        let listView = [];
        if(list[0]){
            listView = list.map(function(item){
               return(
                   <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.sex == 1 ?'男' : '女'}</td>
                    <td>{item.age}</td>
                    <td>
                        <button className="btn btn-default" onClick={()=>handleUpdate(item)}>update</button>
                        <button className="btn btn-default" onClick={()=>handleDelete(item.id)}>delete</button>
                    </td>
                </tr>
               )
            })
        }


        return(
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th colSpan="5">
                            <button className="btn btn-default" onClick={()=>changeView({isListShow:0,isAddShow:1})}>addUser</button>
                        </th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>username</th>
                        <th>sex</th>
                        <th>age</th>
                        <th width='200'>operation</th>
                    </tr>
                </thead>
                <tbody>
                    {listView}
                </tbody>
            </table>
        )
    }
}

export default connect(mapStateToProps, {changeView,init, del, updateData })(List);

function mapStateToProps(state){
    return {
        list:state.curd.list,
    };
}