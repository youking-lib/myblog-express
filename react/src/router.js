import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router'
import Home from './routes/Home'
import Login from './routes/Login'
import Admin from './routes/Admin'
import Posts from './routes/Posts'
import Article from './routes/Article'
import Archive from './routes/Archive'
import About from './routes/About'
import Resume from './routes/Resume'

export default function({ history, app }) {

	const store = app._store
	
	function requireAdmin(nextState, replace, next) {
		console.log(nextState)
		store.dispatch({
			type: 'app/requireAdmin',
			payload: {
				next
			}
		})
	}


	return (
		<Router history={history}>
			<Route path="/login" component={Home} />
			<Route path="/admin" component={Home} onEnter={requireAdmin}/>
			<Route path="/" component={Home} >
				<IndexRedirect to="posts" />
				<Route path="posts" component={Posts} />
				<Route path="article/:id" component={Article} isUsercardHidden={true} />
				<Route path="archive" component={Archive} />
				<Route path="about" component={About} />
				<Route path="resume" component={Resume} />
			</Route>
			<Route path="*" component={props => <h1>Not found!</h1>} />
		</Router>
	)
}

