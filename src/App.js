import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import axios from 'axios'
import About from './components/pages/About'
import Users from './components/Users'
import User from './components/User';
import Alert from './components/Alert'
import Search from './components/Search'

function App() {

	const [users, setUsers] = useState([]) 	
	const [alert, setAlert] = useState({})
	const [singleUser, setSingleUser] = useState({})
	const [repos, setRepos] = useState([])

	//displaying first 30 users
	useEffect(() => {
		async function fetch () {
			const res = await axios.get('https://api.github.com/users')
			//console.log(res.data)
			setUsers(res.data)
		}
		fetch()
	}, [])


	//searching users
	const searchUsers = async (text) => {
		//console.log(text)
		const res = await axios.get(`https://api.github.com/search/users?q=${text}`)
		//console.log(res.data)

		setUsers(res.data.items)		//.items is for the search query only
	}

	//getting a single user data
	const	getUser = async (username)=> {
		const res = await axios.get(`https://api.github.com/users/${username}`)
		//console.log(res.data)
		setSingleUser(res.data)
	}

	// get User Repos
	const	getUserRepos = async (username)=> {
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
		console.log(res.data)
		setRepos(res.data)
	}


	//clearing users
	const clearUsers = () => {
		setUsers([])
	}

	const showAlert = (msg, type) => {
		setAlert({msg, type})
		setTimeout(() => {
			setAlert(null)
		}, 4000);
		
	}

	return (
		<>
		<Router>
			<Navbar title = "Github Finder" />
			<Route exact path='/' render= {props => (
				<>
					<div className="container">
					<Alert alert= {alert}/>
					<Search searchUsers={searchUsers} clearUsers={clearUsers} showAlert={showAlert} showClear={users.length > 0 ? true : false}/>
					<Users user={users}/>
				</div>
				</>
			)} />
				

			<Route exact path='/about' component={About} />
			
			{/* using params in url and getting to display a page on click of a button */}
			<Route exact path='/user/:login' render={props => (
				<User {...props} singleUser={singleUser} getUser={getUser} getUserRepos={getUserRepos} repos={repos} />
			)} />

		</Router>
    </>
		)
}

export default App;