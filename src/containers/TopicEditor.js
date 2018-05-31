import React from 'react';
import App from './WidgetList';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {widgetReducer} from "../reducers/widgetReducer";

let store = createStore(widgetReducer);

export default class TopicEditor
    extends React.Component {

    render() {
        return <div>
            <Provider store={store}>
                <App topicId = {this.props.match.params.topicId}/>
            </Provider>
        </div>
    }
}