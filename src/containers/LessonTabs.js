import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LessonServiceClient from '../services/LessonServiceClient';
import LessonTabItem from '../components/LessonTabItem';
import LessonEditor from "./LessonEditor";


export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            lesson: { title: '' },
            lessons: [ ],
            showTopic:false
        };
        this.createLesson= this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonServiceClient.instance;

    }
    setLessons(lessons) {
        this.setState({lessons: lessons});
    }

    findAllLessonsForModule(courseId,moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId,moduleId)
            .then((lessons) => {this.setLessons(lessons)});
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
        this.setState({showTopic: false});
    }

    componentWillReceiveProps(newProps){
     this.setModuleId(newProps.moduleId);
     this.setCourseId(newProps.courseId);
     this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
    }

    createLesson() {
        this.lessonService
            .createLesson(this.props.courseId, this.props.moduleId, this.state.lesson)
            .then(() => { this.findAllLessonsForModule(this.props.courseId,this.props.moduleId); });
    }

    deleteLesson(lessonId) {
        let value= window.confirm(`Deleting the Lesson`);
        if(value) {
            this.lessonService
                .deleteLesson(lessonId)
                .then(() => {
                    this.findAllLessonsForModule(this.props.courseId, this.props.moduleId);
                });
        }
    }

    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
    }


    renderListOfLessons() {
        let lessons = null;
        if(this.state) {
            lessons= this.state.lessons.map((lesson) => {
                    return <LessonTabItem  key={lesson.id}
                                           lesson={lesson}
                                           courseId={this.props.courseId}
                                           moduleId={this.props.moduleId}
                                           lessonId ={this.state.lessonId}
                                           deleteLesson={this.deleteLesson}/>
                }
            );
        }
        return (
            lessons
        )
    }

    render() {
        return (<div>
                    <Router>
                        <div>
                            <div>
                                <ul className="nav nav-pills nav-justified" style={{backgroundColor: "#f6d8f2" }}>
                                    {this.renderListOfLessons()}
                                    <li className="nav-item">
                                            <input className ="form-control nav-link" type="text" placeholder="Lesson-Title"
                                                    onChange={this.titleChanged}
                                                    value={this.state.lesson.title}/>
                                            <i onClick =  {this.createLesson} className="fa fa-plus"/>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                                       component = {LessonEditor}/>
                            </div>
                        </div>
                    </Router>
        </div>)
    }
}
