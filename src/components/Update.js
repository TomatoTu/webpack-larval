import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update, changeView } from '../actions/curdAction';

class Update extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            'id': props.item.id,
            'username': props.item.username,
            'sex': props.item.sex,
            'age': props.item.age,
        };
    }

    handleChange(e, str){
        let data = {};
        if(str == 'username'){
            data = {'username': e.target.value}
        }
        if(str == 'sex'){
            if(e.target.value == '男'){
                data = {'sex': 1}
            }
            if(e.target.value == '女'){
                data = {'sex': 2}
            }
        }
        if(str == 'age'){
            data = {'age': e.target.value}
        }
        this.setState(data);
    }

    handleSubmit(){
        let data = this.state;
        this.props.update(data);
        this.props.changeView({isListShow:1,isUpdateShow:0});
    }

    render() {
        const handleSubmit = this.handleSubmit;
        const handleChange = this.handleChange;
        const state = this.state;

        return(
            <form>
                <div className="form-group">
                    <label>username</label>
                    <input type="text" className="form-control" placeholder="username" defaultValue={state.username} onChange={(e) => handleChange(e, 'username')}/>
                </div>
                <div className="form-group">
                    <label>sex</label>
                    <input type="text" className="form-control" placeholder="sex" defaultValue={state.sex==1?'男':'女'} onChange={(e) => handleChange(e, 'sex')}/>
                </div>
                <div className="form-group">
                    <label>age</label>
                    <input type="text" className="form-control" placeholder="age" defaultValue={state.age} onChange={(e) => handleChange(e, 'age')}/>
                </div>
                <button type="button" className="btn btn-default" onClick={() => handleSubmit()}>Submit</button>
            </form>
        )
    }
}

export default connect(mapStateToProps, {update, changeView})(Update);

function mapStateToProps(state){
    return {
        item:state.curd.item,
    };
}