import React, { Component } from "react";


const LyricCreate = ({
    onSubmit =()=>{},
    lyrics ="",
    onChangeLyrics=()=>{},
}) => {
    return (
        <form onSubmit={onSubmit}>
            <label>Add a Lyric</label>
            <input
                value={lyrics}
                onChange={e => onChangeLyrics(e.target.value)} />
            <button className="btn waves-effect red waves-light" type="submit" name="action">
                Add
                <i className="material-icons right">add</i>
            </button>
        </form>
    )
}


export default LyricCreate;