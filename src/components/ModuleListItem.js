import React from 'react';
import { Link } from 'react-router-dom'

export default class ModuleListItem
extends React.Component {
 render() {
  return (
  <div>
        <li className ="list-group-item" style={{backgroundColor: "#F6BB42" }}>
                    <a
                        onClick = {() => { this.props.loadLessons(this.props.module.id)}}>
                        {this.props.module.title}
                    </a>
                    <i onClick =  {() => {this.props.deleteModule(this.props.module.id)}}
                            className="btn btn-dark fa fa-times float-right"/>
        </li>
  </div>
    );
    }
    }
