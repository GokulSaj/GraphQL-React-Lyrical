import React from 'react';
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import addSong from '../queries/addSong'
import fetchSong from '../queries/fetchSong'

const SongCreate = () => {
    let history = useHistory();
    const [addSongMutation] = useMutation(addSong);
    const [title, setTitle] = React.useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        addSongMutation({
            variables: { title: title },
            refetchQueries: [{ query: fetchSong }]
        })
            .then(() => {
                history.push("/");
            })
    }

    return (
        <div className='container'>
            <Link to="/" >
                Back
            </Link>
            <br />
            <h3>Create a new song</h3>
            <form onSubmit={onSubmit}>
                <label>Song Title:</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                <button className="btn waves-effect red waves-light" type="submit" name="action">
                    Add
                    <i className="material-icons right">add</i>
                </button>
            </form>
        </div>
    )
}

export default SongCreate