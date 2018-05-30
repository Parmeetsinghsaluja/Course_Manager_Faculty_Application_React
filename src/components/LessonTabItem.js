import React from 'react';
import { Link } from 'react-router-dom';


export default class LessonTabItem
    extends React.Component {
    render() {
        return (
            <div>
                <li className ="nav-item">
                        <Link className="nav-link" to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                            {this.props.lesson.title}
                        </Link>
                    <i onClick =  {() => {this.props.deleteLesson(this.props.lesson.id)}} className="fa fa-trash "/>
                </li>
            </div>
        );
    }
}