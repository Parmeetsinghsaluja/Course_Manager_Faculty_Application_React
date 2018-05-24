import React from 'react';
import { Link } from 'react-router-dom'

export default class ModuleListItem
extends React.Component {
 render() {
  return (
  <div>
        <li className ="list-group-item" style={{backgroundColor: "#F6BB42"}}>
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                        {this.props.module.title}
                </Link>
                <i onClick =  {() => {this.props.deleteModule(this.props.module.id)}}
                   className="btn btn-dark fa fa-trash float-right"/>
        </li>
  </div>
    );
  }
}
