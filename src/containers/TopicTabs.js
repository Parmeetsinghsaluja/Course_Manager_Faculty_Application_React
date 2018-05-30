import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TopicServiceClient from "../services/TopicServiceClient";
import TopicTabItem from '../components/TopicTabItem';
import TopicEditor from  './TopicEditor';

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId:'',
            topic:{title:''},
            topics: []
        };
        this.topicService = TopicServiceClient.instance;
        this.createTopic = this.createTopic.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
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
    deleteTopic(topicId) {
        let value= window.confirm(`Deleting the Topic`);
        if(value) {
            this.topicService
                .deleteTopic(topicId)
                .then(() => {
                    this.findAllTopicsForLesson(this.props.courseId, this.props.moduleId, this.props.lessonId);
                });
        }
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
    renderListOfTopic() {
        let topics = null;
        if(this.state) {
            topics = this.state.topics.map((topic)=> {
                    return <TopicTabItem  key = {topic.id}
                                          topic = {topic}
                                          courseId={this.props.courseId}
                                          moduleId={this.props.moduleId}
                                          lessonId ={this.state.lessonId}
                                          deleteTopic = {this.deleteTopic}/>
                }
            );
        }
        return (
            topics
        )
    }
    createTopic() {
        this.topicService
            .createTopic(this.props.courseId, this.props.moduleId, this.props.lessonId, this.state.topic)
            .then(() => { this.findAllTopicsForLesson(this.props.courseId,this.props.moduleId,this.props.lessonId); });
    }

    titleChanged(event) {
        this.setState({topic: {title: event.target.value}});
    }

    render() {return (<div>
        <Router>
            <div>
                <div>
                    <ul className="nav nav-pills nav-justified" style={{backgroundColor: "#f6f5ab" }}>
                        {this.renderListOfTopic()}
                        <li className="nav-item" >
                            <input type="text" className ="form-control nav-link" placeholder=" Topic Title"
                                               onChange={this.titleChanged}
                                               value={this.state.topic.title}/>
                            <i onClick =  {this.createTopic} className="fa fa-plus"/>
                        </li>
                    </ul>
                </div>
                <div>
                    <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"
                           component = {TopicEditor}/>
                </div>
            </div>
        </Router>
    </div>);
    }
}