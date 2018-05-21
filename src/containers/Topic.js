import React from 'react';
import TopicServiceClient from "../services/TopicServiceClient";


export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId:'',
            lessons: [],
        };
        this.topicService = TopicServiceClient.instance;
    }

    setTopics(topics) {
        this.setState({topics: topics})
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId,moduleId,lessonId)
            .then((topics) => {this.setTopics(topics)});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.setLessonId(this.props.lessonId);
    }
    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId,newProps.moduleId,newProps.lessonId)
    }
    render() {
        return <div className="tab-content" id="myTabContent">

            </div>

    }
}