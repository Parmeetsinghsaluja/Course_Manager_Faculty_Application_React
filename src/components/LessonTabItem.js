import React from 'react';
import { Link } from 'react-router-dom';


export default class LessonTabItem
    extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.toggleClass= this.toggleClass.bind(this);
    //     this.state = {
    //         active: false,
    //     };
    //className = {this.state.active ? 'nav-item nav-link active': 'nav-item nav-link'} onClick={this.toggleClass()}
    // }

    // toggleClass() {
    //     let currentState = this.state.active;
    //     this.setState({active: !currentState});
    // };

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