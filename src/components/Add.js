import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add, changeView } from '../actions/curdAction';

class Add extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            'username': '',
            'sex': '',
            'age': ''
        };
    }

    handleChange(e, str){
        let data = {};
        if(str == 'username'){
            data = {'username': e.target.value}
        }
        if(str == 'sex'){
            data = {'sex': e.target.value}
        }
        if(str == 'age'){
            data = {'age': e.target.value}
        }
        this.setState(data);
    }

    handleSubmit(){
        let data = this.state;
        data.sex = data.sex == '男'? 1: 2;
        this.props.add(data);
        this.props.changeView({isListShow:1,isAddShow:0});
    }

    render() {

        const handleSubmit = this.handleSubmit;
        const handleChange = this.handleChange;

        return(
            <form>
                <div className="form-group">
                    <label>username</label>
                    <input type="text" className="form-control" placeholder="username" onChange={(e) => handleChange(e, 'username')}/>
                </div>
                <div className="form-group">
                    <label>sex</label>
                    <input type="text" className="form-control" placeholder="sex" onChange={(e) => handleChange(e, 'sex')}/>
                </div>
                <div className="form-group">
                    <label>age</label>
                    <input type="text" className="form-control" placeholder="age" onChange={(e) => handleChange(e, 'age')}/>
                </div>
                <button type="button" className="btn btn-default" onClick={() => handleSubmit()}>Submit</button>
            </form>
        )
    }
}

export default connect(mapStateToProps, {add, changeView})(Add);

function mapStateToProps(state){
    return {
        data:state,
    };
}