import React from 'react';
import CourseRow from "../components/CourseRow";
import NavBar from "../components/NavBar";
import CourseServiceClient from "../services/CourseServiceClient";

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }
    componentDidMount() {
        this.findAllCourses();
    }
    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            })
    }
    renderCourseRows() {
        let courses = null;
        if(this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      course={course}/>
                }
            )
            courses = this.state.courses.map((course) => {
                return <CourseRow course={course}
                                  key={course.id}
                                  deleteCourse={this.deleteCourse}/>
            });
        }

        return (
            courses
        )
    }

    titleChanged(event) {
        this.setState({
            course: { title: event.target.value }
        });
    }
    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => { this.findAllCourses(); });
    }

    render() {
        return (
            <div>
                <div>
                <NavBar title ="Course Manager"/>
                </div>
                <br/>
                <div>
                        <form className="form-inline">
                            <input onChange={this.titleChanged}
                                   className="form-control"
                                   id="titleFld"
                                   placeholder="New Course Title"/>
                            <i className="fa-2x fa fa-plus"
                               onClick ={this.createCourse}/>
                        </form>
                    </div>
                <table className="table">
                    <thead>
                    <tr><th>Title</th>
                        <th>Owned By</th>
                        <th>Last modified by me</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;