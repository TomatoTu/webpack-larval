import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Root from './components/Root';

const initial = {
}
const store = configureStore(initial);

// 最上层组件root
render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('root')
);