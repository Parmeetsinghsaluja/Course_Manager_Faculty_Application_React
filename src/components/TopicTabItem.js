import React from 'react';
export default class TopicTabItem
    extends React.Component {
    render() {
        return (
            <div>
                <li className="nav-item">
                    <a className="nav-link">
                        {this.props.topic.title}
                        </a>
                        <i onClick =  {() => {this.props.deleteTopic(this.props.topic.id)}} className="fa fa-trash"/>
                </li>
            </div>
        );
    }
}