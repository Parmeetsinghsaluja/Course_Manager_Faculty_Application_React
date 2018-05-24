import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from '../services/ModuleServiceClient';
import ModuleEditor from "./ModuleEditor";

export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: '' },
            modules: [

            ],
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
          this.findAllModulesForCourse(newProps.courseId);
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
            modules = this.state.modules.map((module) =>{
                    return <ModuleListItem key={module.id}
                                           module={module}
                                           courseId = {this.props.courseId}
                                           deleteModule={this.deleteModule}/>
                }
            );
        }
        return (
            modules
        )
    }
    loadLessons(moduleId){
        this.props.loadLessons(moduleId);
        this.setState({active: {moduleId: moduleId ,value:true}});
    }
    deleteModule(moduleId) {
        let value= window.confirm(`Deleting the module`);
        if(value) {
            this.moduleService
                .deleteModule(moduleId)
                .then(() => {
                    this.findAllModulesForCourse(this.props.courseId);
                });
        }
    }
    render() {
        return (<div>
                <Router>
                    <div className="row">
                        <div className="col-4">
                            <ul className="list-group ">
                                <li className="list-group-item" style={{backgroundColor: "#F6BB42" }}>
                                    <div className="form-group-inline">
                                        <div className="input-group">
                                            <input type="text" placeholder="Module Title" className="form-control"
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
                        </div>
                        <div className="col-8">
                            <Route path="/course/:courseId/module/:moduleId"
                                    component = {ModuleEditor}/>
                        </div>
                    </div>
                </Router>
        </div>);
    }
}