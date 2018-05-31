import * as constants from "../constants/index";

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText})
);

export const paragraphTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.PARAGRAPH_TEXT_CHANGED,
        id: widgetId,
        text: newText})
);

export const imageTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.IMAGE_TEXT_CHANGED,
        id: widgetId,
        text: newText})
);

export const listTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LIST_TEXT_CHANGED,
        id: widgetId,
        text: newText})
);
export const linkTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.LINK_TEXT_CHANGED,
        id: widgetId,
        text: newText})
);
export const linkChanged = (dispatch, widgetId, newLink) => (
    dispatch({
        type: constants.LINK_CHANGED,
        id: widgetId,
        link: newLink})
);
export const nameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.NAME_CHANGED,
        id: widgetId,
        name: newName})
);
export const listTypeChanged = (dispatch, widgetId, newType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType})
);

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        headingValue: newSize})
);

export const findAllWidgets = dispatch => {
    fetch('http://saluja-summer1-2018.herokuapp.com/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets }))
};

export const findAllWidgetsForTopic = (dispatch, topicId) => {
    fetch('http://saluja-summer1-2018.herokuapp.com/api/widget'+ topicId)
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets.sort(function (a,b) {return a.widgetOrder > b.widgetOrder})}))
};
export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);
export const save = (dispatch,topicId) => (
    dispatch({type: constants.SAVE, topicId})
);
export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);


