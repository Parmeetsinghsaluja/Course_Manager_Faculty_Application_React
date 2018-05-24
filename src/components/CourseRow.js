import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
    render() {
        return <tr>
                <td>
                    <i className="fa fa-folder"/>
                    &nbsp;
                    <Link to={`/course/${this.props.course.id}/${this.props.course.title}`}>
                            {this.props.course.title}
                     </Link>
                </td>
                <td>
                        me
                </td>
                <td>
                        {this.props.course.modified}
                 </td>
                <td>
                    <i className="fa fa-close"
                           onClick={() => {
                               this.props.deleteCourse(this.props.course.id)
                           }}/>
                </td>
        </tr>
    }
}
export default CourseRow;