import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ReposList from "./ReposList";

function Repositories() {
    const [repos, setRepos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState("");

    /**
    * This was only created in order not to
    * show an empty list when we first load the App
    ***/
    useEffect(() => {
        fetch("https://api.github.com/users/TarekHolanda/repos")
            .then(res => res.json())
            .then((result) => {
                setRepos(result);
            })
    }, [])

    /**
    * Call the API sending the user as parameter to
    * get the repositories list owned by the user
    ***/
    const searchUser = () => {
        fetch("https://api.github.com/users/" + user + "/repos")
            .then(res => res.json())
            .then((result) => {
                if (result && result.length) {
                    /**
                    * Update list to make sure the Favorites are flagged
                    ***/
                    for (let i = 0; i < favorites.length; i++) {
                        const isRepoFavorite = result.find(item => item.id === favorites[i].id); 
                        if (isRepoFavorite) {
                            isRepoFavorite.isFavorite = true;
                        }
                    }
                    setRepos(result);
                } else {
                    setRepos([]);
                }
            })
    }

    /**
    * Update user state when the something is typed on the Search Bar
    ***/
    const onInputChanged = useCallback(({target: {value}}) => setUser(value), []);

    /**
    * Check when the Enter key is pressed to make the API call
    ***/
    const handleKeyPress = (event) => {
        if (event && event.key === "Enter") {
            searchUser();
        }
    }
    
    /**
    * Set or Unset a Repository clicked as Favorite
    ***/
    const setFavorite = (id) => {
        const repoToFavorite = repos.find(item => item.id === id);
        if (repoToFavorite) {
            repoToFavorite.isFavorite = repoToFavorite.isFavorite ? false : true;
            setRepos([...repos]);

            if (repoToFavorite.isFavorite) {
                setFavorites([repoToFavorite, ...favorites]);
            } else {
                setFavorites([...favorites.filter(item => item.id !== id)]);
            }
        } else {
            const repoToRemove = favorites.find(item => item.id === id);
            repoToRemove.isFavorite = false;
            setFavorites([...favorites.filter(item => item.id !== id)]);
        }
    }

    return (
        <div>
            <Header
                favorites={favorites}
                total={repos.length}
                removeFavorite={(repoId) => { setFavorite(repoId) }}
            />
            <SearchBar 
                user={user}
                updateUser={(user) => { onInputChanged(user) }}
                keyWasPressed={(event) => { handleKeyPress(event) }}
                onSearchClick={() => { searchUser() }}
            />
            <ReposList
                repos={repos}
                setFavorite={(repoId) => { setFavorite(repoId) }}
            />
        </div>
    );
}

ReactDOM.render(
    <Repositories />,
    document.getElementById("root")
);
