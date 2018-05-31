import React ,{Component} from 'react';

export default class NavBar
    extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ''};
    }

    setTitle(title) {
        this.setState({title: title})
    }
    componentDidMount() {
        this.setTitle(this.props.title);
    }
    componentWillReceiveProps(newProps){
        this.setTitle(newProps.title);
    }

    render() {
        return <nav className="navbar navbar-lg navbar-dark bg-dark nav-fill">
            <a href="http://http://saluja-react-course-manager.herokuapp.com/courses">
            <i className="fa-2x fa fa-book" style={{color:'green'}}>
                &nbsp;
                Course Manager
            </i>
                </a>
            <a id ="navbar-text" className="navbar-brand" href="http://localhost:3000/course">
                {this.props.title}
            </a>

            </nav>

    }
}
