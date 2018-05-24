import React from 'react';
import ModuleList from './ModuleList';
import NavBar from "../components/NavBar";


export default class CourseEditor
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '',moduleId:''};
        this.selectCourse = this.selectCourse.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.courseId);
    }


    render() {
        return <div>
                    <div>
                        <NavBar title ={this.props.match.params.title}/>
                    </div>
                    <br/>
                    <div>
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
            </div>

    }
}