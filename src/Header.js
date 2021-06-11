import React, { useState } from "react";
import "./Header.css";
import Modal from "@material-ui/core/Modal";

function Header({ favorites, total, onEvent }) {
    const [modalOpen, setModalOpen] = useState(false);

    const body = (
        <div className="my-modal">
            <h3 id="simple-modal-title">Favorites</h3>
            <div>
                {favorites.map((repo, index) => (
                    <div key={repo.id}>
                        <p>
                            {repo.name}
                        </p>
                        <button type="button" onClick={() => onEvent(repo.id)} className="glow-on-hover">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <p id="simple-modal-description">
                {favorites.length ? "" : "There is no Favorite Repo"}
            </p>
            <button type="button" onClick={() => setModalOpen(false)} className="glow-on-hover close-button">
                Close
            </button>
        </div>
    );

    return (
        <div className="Header">
            <h4>
                Total of Repositories: #{total}
                <br />
                Total of Favorites: #{favorites.length}
                <br />
                <button type="button" onClick={() => setModalOpen(true)} className="glow-on-hover see-favorite-button">
                    See Favorites
                </button>
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </h4>
        </div>
    )
}

export default Header
