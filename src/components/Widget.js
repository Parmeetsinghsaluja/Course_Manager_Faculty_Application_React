import React from 'react';
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'

const Heading = ({widget, preview, headingTextChanged, headingSizeChanged}) => {
    let selectElem;
    let inputElem;
    return(
        <div >
            <div hidden={preview}>
                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <br/>
                <select className="form-control" onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.headingValue}
                        ref={node => selectElem = node}>
                    <option value= '1'>Heading 1</option>
                    <option value= '2'>Heading 2</option>
                    <option value= '3'>Heading 3</option>
                </select>
                <b>Preview</b>
            </div>
            {parseInt(widget.headingValue) ===  1 && <h1>{widget.text}</h1>}
            {parseInt(widget.headingValue) ===  2 && <h2>{widget.text}</h2>}
            {parseInt(widget.headingValue) ===  3 && <h3>{widget.text}</h3>}
        </div>
    )
};

const Paragraph = ({widget, preview, paragraphTextChanged}) => {
    let inputElem;
    return(
    <div>
        <div hidden={preview}>
            <textarea className = "form-control" value={widget.text}
                      onChange={() => paragraphTextChanged(widget.id, inputElem.value)}
                          ref={node => inputElem = node}/>
            <b>Preview</b>
        </div>
        {widget.text}
    </div>
)};

const Image = ({widget, preview, imageTextChanged}) => {
    let inputElem;
    return(
        <div>
            <div hidden={preview}>
                <input className = "form-control" value={widget.text}
                          onChange={() => imageTextChanged(widget.id, inputElem.value)}
                          ref={node => inputElem = node}/>
                <b>Preview</b>
            </div>
            <img src={widget.text} height="100px" width="100px" />
        </div>
)};

const List = ({widget, preview, listTextChanged, listTypeChanged }) => {
    let inputElem;
    let selectElem;
    return(
        <div>
            <div hidden={preview}>
                <textarea className = "form-control" value={widget.text}
                          onChange={() => listTextChanged(widget.id, inputElem.value)}
                          ref={node => inputElem = node}/>
                <br/>
                <select className="form-control" onChange={() => listTypeChanged(widget.id, selectElem.value)}
                        value={widget.listType}
                        ref={node => selectElem = node}>
                    <option value="1">Unordered List</option>
                    <option value="2">Ordered List</option>
                </select>
                <b>Preview</b>
            </div>
            {widget.listType === "1" && <ul>{widget.text.split("\n")}</ul>}
            {widget.listType === "2" && <ol>{widget.text.split("\n")}</ol>}
        </div>
    )};

const Link = ({widget, preview, linkTextChanged, linkChanged }) => {
    let inputElem;
    let inputLinkElem;
    return(
        <div>
            <div hidden={preview}>
                <input className = "form-control" value={widget.text}
                          onChange={() => linkTextChanged(widget.id, inputElem.value)}
                          ref={node => inputElem = node}/>
                <br/>

                <input className = "form-control" value={widget.link}
                       onChange={() => linkChanged(widget.id, inputLinkElem.value)}
                       ref={node => inputLinkElem = node}/>
                <b>Preview</b>
            </div>
            <a href ={widget.link}>{widget.text}</a>
        </div>
    )};

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        actions.headingTextChanged(dispatch, widgetId, newText),
    paragraphTextChanged: (widgetId, newText) =>
        actions.paragraphTextChanged(dispatch, widgetId, newText),
    imageTextChanged: (widgetId, newText) =>
        actions.imageTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    listTextChanged: (widgetId, newText) =>
        actions.listTextChanged(dispatch, widgetId, newText),
    listTypeChanged: (widgetId, newType) =>
        actions.listTypeChanged(dispatch, widgetId, newType),
    linkTextChanged: (widgetId, newText) =>
        actions.linkTextChanged(dispatch, widgetId, newText),
    linkChanged: (widgetId, newLink) =>
        actions.linkChanged(dispatch, widgetId, newLink)
});
const stateToPropsMapper = state => ({
    preview: state.preview
});
const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);
const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph);
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image);
const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List);
const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link);

const Widget = ({widget, preview, dispatch}) => {
    let selectElement;
    return(
        <div className ="panel panel-default">
            <br/>
                    <div className ="panel-body">
                        <div hidden={preview}>
                            <div>
                                <b>{widget.widgetType} widget</b>
                                <div className="form-check-inline pull-right">
                                <i className="btn btn-warning fa fa-arrow-up" />
                                    &nbsp;
                                <i className="btn btn-warning fa fa-arrow-down" />
                                    &nbsp;
                                <select className="form-control" value={widget.widgetType}
                                        onChange={e =>
                                            dispatch({
                                                type: 'SELECT_WIDGET_TYPE',
                                                id: widget.id,
                                                widgetType: selectElement.value
                                            })} ref={node => selectElement = node}>
                                    <option className="dropdown-item">Heading</option>
                                    <option className="dropdown-item">Paragraph</option>
                                    <option className="dropdown-item">List</option>
                                    <option className="dropdown-item">Image</option>
                                    <option className="dropdown-item">Link</option>
                                </select>
                                    &nbsp;
                                <i className="btn btn-danger  fa fa-times" onClick={e => (
                                    dispatch({type: DELETE_WIDGET, id: widget.id})
                                )}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            {widget.widgetType==='Heading' && <HeadingContainer widget ={widget}/>}
                            {widget.widgetType==='Paragraph' && <ParagraphContainer widget ={widget}/>}
                            {widget.widgetType==='List' && <ListContainer widget = {widget}/>}
                            {widget.widgetType==='Image' && <ImageContainer widget ={widget}/>}
                            {widget.widgetType==='Link' && <LinkContainer widget ={widget}/>}
                        </div>
                    </div>
         </div>
    )
};
const WidgetContainer = connect(state => ({
    preview: state.preview
}))(Widget);
export default WidgetContainer