import React from 'react';
import { Link } from 'react-router-dom';

export default class TopicTabItem
    extends React.Component {
    render() {
        return (
            <div>
                <li className="nav-item">
                        <Link className="nav-link" to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
                            {this.props.topic.title}
                        </Link>
                        <i onClick =  {() => {this.props.deleteTopic(this.props.topic.id)}} className="fa fa-trash"/>
                </li>
            </div>
        );
    }
}