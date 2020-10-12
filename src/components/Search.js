import React, { useState } from 'react'

const Search = (props) => {
  
  const [search, setSearch] = useState('')
  
  const onChange = (e)=> {
    setSearch(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(search===''){
      props.showAlert('Enter Something', 'light')
    } else {
      props.searchUsers(search)
      setSearch('')
    }
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input type='text' onChange={onChange} placeholder="Search users...." value={search} />
        <input type="submit" value="Search" className="btn btn-dark btn-block" />
      </form>
      {props.showClear && <button  className="btn btn-light btn-block" onClick={props.clearUsers}>Clear</button>}
      </div>
  )
}

export default Search
