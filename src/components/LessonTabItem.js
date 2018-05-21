import React from 'react';
export default class LessonTabItem
    extends React.Component {
    render() {
        return (
            <div>
                <li className="nav-item">
                    <a className="nav-link active" >
                        {this.props.lesson.title}
                     <i onClick =  {() => {this.props.deleteLesson(this.props.lesson.id)}} className="fa fa-times"/>
                    </a>
                </li>
            </div>
        );
    }
}