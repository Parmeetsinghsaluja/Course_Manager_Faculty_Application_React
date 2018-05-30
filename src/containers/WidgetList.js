import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/Widget'

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgetsForTopic(this.props.topicId);
    }
    render() {
        return(
            <div>
                <br/>
                <div align ="right">
                <button className="btn btn-success" hidden={this.props.previewMode} onClick={() => this.props.save(this.props.topicId)}>
                    Save
                </button>
                 <button className="btn " onClick={this.props.preview}>
                    Preview
                 </button>
                </div>
                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
                                         key={widget.id}/>
                    ))}
                </ul>
                <div align="right">
                <i onClick={this.props.addWidget} className="fa fa-plus btn btn-danger "/>
                </div>

            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({widgets: state.widgets, previewMode: state.preview});
const dispatcherToPropsMapper = (dispatch) => ({
    findAllWidgetsForTopic: (topicId) => actions.findAllWidgetsForTopic(dispatch,topicId),
    addWidget: () => actions.addWidget(dispatch),
    save: (topicId) => actions.save(dispatch,topicId),
    preview: () => actions.preview(dispatch)
});
const App = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetList);
export default App