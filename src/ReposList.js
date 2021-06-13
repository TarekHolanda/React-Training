import React from "react";

function ReposList({ repos, updateUser, setFavorite, onSearchClick }) {

    return (
        <div>
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
    )
}

export default ReposList
