import React from 'react';
import LessonServiceClient from '../services/LessonServiceClient';
import LessonTabItem from '../components/LessonTabItem'


export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lesson: { title: '' },
            lessons: [ ]
        };
        this.createLesson= this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonServiceClient.instance;
    }
    setLessons(lessons) {
        this.setState({lessons: lessons})
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
    }
    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.courseId,newProps.moduleId)
    }

    createLesson() {
        this.lessonService
            .createLesson(this.props.courseId, this.props.moduleId, this.state.lesson)
            .then(() => { this.findAllLessonsForModule(this.props.courseId,this.props.moduleId); });
    }

    deleteLesson(lessonId) {
        this.lessonService
            .deleteLesson(lessonId)
            .then(() => { this.findAllLessonsForModule(this.props.courseId,this.props.moduleId); });
    }

    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    renderListOfLessons() {
        let lessons = null;
        if(this.state) {
            lessons= this.state.lessons.map(
                function (lesson) {
                    return <LessonTabItem  key={lesson.id}
                                           lesson={lesson}/>
                }
            )
            lessons = this.state.lessons.map((lesson) => {
                return <LessonTabItem  lesson ={lesson}
                                       key={lesson.id}
                                       deleteLesson={this.deleteLesson}/>
            });
        }

        return (
            lessons
        )
    }

    render() {
        return <ul className="nav nav-tabs">
            {this.renderListOfLessons()}
            <li className="nav-item" >
                <a className="nav-link active">
                    <input type="text" placeholder="Title"
                           onChange={this.titleChanged}
                           value={this.state.lesson.title}/>
                    <i onClick =  {this.createLesson} className="fa fa-plus"/>
                </a>
            </li>
        </ul>;
    }
}
