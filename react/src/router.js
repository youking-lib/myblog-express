import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router'

// Home
import Home from './routes/Home'
import Login from './routes/Login'
import Posts from './routes/Posts'
import Article from './routes/Article'
import Archive from './routes/Archive'
import About from './routes/About'
import Resume from './routes/Resume'

// Admin
import Admin from './routes/Admin/Admin'
import AdminArticleList from './routes/Admin/ArticleList'
import AdminAddArticle from './routes/Admin/Add'
import AdminKeyword from './routes/Admin/keyword'

export default function({ history, app }) {

	const store = app._store
	

	function requireAdmin(nextState, replace, next) {
		store.dispatch({
			type: 'app/requireAdmin',
			next
		})
	}

	function handleLogout(nextState, replace, next) {
		store.dispatch({
			type: 'app/logout',
			next
		})
	}

	function autoLogin(nextState, replace, next) {
		store.dispatch({
			type: 'app/autoLogin',
			next
		})
	}

	function requireKeywords(nextState, replace, next) {
		store.dispatch({
			type: 'keyword/requireKeywords',
			next
		})
	}

	function requireArticles(nextState, replace, next) {
		store.dispatch({
			type: 'article/requireArticles',
			next
		})
	}

	return (
		<Router history={history}>
			<Route path="/logout" component={Home} onEnter={handleLogout} />
			<Route path="/admin" component={Admin} onEnter={requireAdmin}>
				<IndexRedirect to="article" />
				<Route path="article" component={AdminArticleList} onEnter={requireArticles} />
				<Route path="add" component={AdminAddArticle} onEnter={requireKeywords} />
				<Route path="keyword" component={AdminKeyword} onEnter={requireKeywords} />
			</Route>
			<Route path="/" component={Home} onEnter={autoLogin} >
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

