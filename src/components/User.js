import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Repos from './Repos'

function User(props) {

  useEffect(() => {
      props.getUser(props.match.params.login)
      props.getUserRepos(props.match.params.login)
      // eslint-disable-next-line
  }, [])

  //console.log(props.singleUser)

  const {
    name, 
    avatar_url, 
    location, 
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
  } = props.singleUser

  return (
    <>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      <div className="card grid-2">
          <div className="all-center">
          <img src={avatar_url} className="round-img" alt='' style={{width: '150px'}} />
          <h1>{name}</h1>
          <p>Location : {location}</p>
        </div>

        <div>
          {bio && <><h3>Bio</h3><p>{bio}</p></>}
          <a href = {html_url} className="btn btn-dark my-1">Visit Github Profile</a>
          <ul>
            <li>{login && <><b>Username: </b>{login}</>}</li>
          </ul>
          <ul>
            <li>{login && <><b>Company: </b>{company}</>}</li>
          </ul>
          <ul>
            <li>{login && <><b>Website: </b>{blog}</>}</li>
          </ul>
        </div>
      </div>

      <div className="card text-center">
        <div className="badge badge-primary">
          Followers: {followers}
        </div>
        <div className="badge badge-success">
          Following: {following}
        </div>
        <div className="badge badge-light">
          Public Repos: {public_repos}
        </div>
        <div className="badge badge-dark">
          Public Gists: {public_gists}
        </div>
      </div>

      <Repos repos={props.repos} />
    </>
  )
}

export default User
