import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Header";

function Repositories() {
    const [repos, setRepos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        fetch("https://api.github.com/users/TarekHolanda/repos")
            .then(res => res.json())
            .then((result) => {
                setRepos(result);
            })
    }, [])

    const searchUser = () => {
        fetch("https://api.github.com/users/" + user + "/repos")
            .then(res => res.json())
            .then((result) => {
                if (result && result.length) {
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

    const onInputChanged = useCallback(({target: {value}}) => setUser(value), []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            searchUser();
        }
    }

    const setFavorite = (id) => {
        const repoToFavorite = repos.find(item => item.id === id);
        repoToFavorite.isFavorite = repoToFavorite.isFavorite ? false : true;
        setRepos([...repos]);

        if (repoToFavorite.isFavorite) {
            setFavorites([repoToFavorite, ...favorites]);
        } else {
            setFavorites([...favorites.filter(item => item.id !== id)]);
        }
    }

    return (
        <div>
            <Header
                favorites={favorites}
                total={repos.length}
                onEvent={(repoId) => { setFavorite(repoId) }}
            />
            <div className="search-bar">
                <input
                    type="text"
                    name="user"
                    value={user}
                    placeholder="GitHub User"
                    onChange={onInputChanged}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={() => searchUser()} className="glow-on-hover">
                    Search
                </button>
            </div>
            <div className="body-empty">
                {repos.length ? "" : "No repositories found."}
            </div>
            <div className="body-content">
                {repos.map((repo, index) => (
                    <div key={repo.id} className="body-card text-overflow">
                        {repo.name}
                        <div>
                            <div className="text-overflow">
                                {repo.description}
                            </div>
                            <div>
                                Stars: {repo.stargazers_count}
                            </div>
                            <div>
                                Forks: {repo.forks_count}
                            </div>
                        </div>
                        <button onClick={() => setFavorite(repo.id)} className="glow-on-hover favorite-button">
                            {repo.isFavorite ? "Remove" : "Add to Favorite"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(
    <Repositories />,
    document.getElementById("root")
);
