import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List';
import Add from './Add';
import Update from './Update';

class Root extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {isListShow, isAddShow, isUpdateShow } = this.props;

        return (
            <div>
                {isListShow == 1 && <List />}
                {isAddShow == 1 && <Add />}
                {isUpdateShow == 1 && <Update />}
            </div>
        );
    }
}

export default connect(mapStateToProps, {})(Root);

function mapStateToProps(state){
    return {
        isListShow:state.curd.isListShow,
        isAddShow:state.curd.isAddShow,
        isUpdateShow:state.curd.isUpdateShow,
    };
}


