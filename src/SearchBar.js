import React from "react";

function SearchBar({ user, updateUser, keyWasPressed, onSearchClick }) {

    return (
        <div className="search-bar">
            <input
                type="text"
                name="user"
                value={user}
                placeholder="GitHub User"
                onChange={(user) => updateUser(user)}
                onKeyPress={(event) => keyWasPressed(event)}
            />
            <button onClick={() => onSearchClick()} className="glow-on-hover">
                Search
            </button>
        </div>
    )
}

export default SearchBar
