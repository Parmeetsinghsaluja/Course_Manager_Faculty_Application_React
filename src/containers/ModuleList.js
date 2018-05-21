import React, {Component} from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from '../services/ModuleServiceClient';


export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: '' },
            modules: [

            ]
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.loadLessons  = this.loadLessons.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.moduleService = ModuleServiceClient.instance;
    }
    setModules(modules) {
        this.setState({modules: modules})
    }
    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule() {
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(() => { this.findAllModulesForCourse(this.props.courseId); });
    }
    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }
    renderListOfModules() {
        let modules = null;
        if(this.state) {
            modules = this.state.modules.map(
                function (module) {
                    console.log(module);
                    return <ModuleListItem key={module.id}
                                           module={module}/>
                }
            )
            modules = this.state.modules.map((module) => {
                    return <ModuleListItem module={module}
                                           key={module.id}
                                           deleteModule={this.deleteModule}
                                           loadLessons ={this.loadLessons}/>
            });
        }

        return (
            modules
        )
    }
    loadLessons(moduleId){
        this.props.loadLessons(moduleId);
    }
    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(() => { this.findAllModulesForCourse(this.props.courseId); });
    }
    render() {
        return <div>
            <ul className="list-group ">
                <li className="list-group-item" style={{backgroundColor: "#F6BB42" }}>
                    <div className="form-group-inline">
                        <div className="input-group">
                            <input type="text" placeholder="Title" className="form-control"
                                       onChange={this.titleChanged}
                                       value={this.state.module.title}/>
                            <div className="input-group-btn">
                                <button type="button" className="btn btn-dark">
                                    <i className="fa fa-plus inline"
                                           onClick={this.createModule}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                {this.renderListOfModules()}
            </ul>
        </div>;
    }
}