import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Nav from './Nav'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Signin from './Signin';
import Question from './Question';
import NotFound from './NotFound';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        {this.props.signedIn 
                        ?
                        <Nav authedUser={this.props.authedUser}/>
                        :
                        <div></div>
                        }
                        {this.props.signedIn === false
                        ?
                        <Signin />
                        :
                        <div>
                            <Route path='/' exact component={Dashboard} />
                            <Route path='/new' component={NewQuestion} />
                            <Route path='/questions/:id' component={Question}/>
                            <Route path='/leaderboard' component={Leaderboard} />
                            <Route path='/404' component={NotFound}/>
                        </div>
                        }
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        signedIn: authedUser !== null,
        users: users
    }
}

export default connect(mapStateToProps)(App)
