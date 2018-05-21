import React from 'react';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
import NavBar from "../components/NavBar";

export default class CourseEditor
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '',moduleId: ''};
        this.selectCourse = this.selectCourse.bind(this);
        this.loadLessons = this.loadLessons.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);

    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    loadLessons(moduleId){
        console.log(moduleId);
        this.setState({moduleId:moduleId});
    }


    render() {
        return <div>
            <div>
            <NavBar title ={this.props.match.params.title}/>
            </div>
            <br/>
            <div className="row">
                <div className="col-4">
                    <ModuleList courseId={this.state.courseId}
                                loadLessons ={this.loadLessons}/>
                </div>
                <div className="col-8">
                    <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId}/>
                </div>
            </div>
        </div>;
    }
}