import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from "react-router-dom";

import fetchSong from '../queries/fetchSong'
import deleteSong from '../queries/deleteSong'

const SongList = () => {
  const songsList = useQuery(fetchSong);
  const [deleteSongMutation] = useMutation(deleteSong);

  const onSongDelete = (id) => {
    deleteSongMutation({
      variables: { id },
      refetchQueries: [{ query: fetchSong }]
    })
  }


  return (
    <div className='container'>
      {songsList.data ?
        <div>
          <h3>Songs</h3>
          {(songsList.data.songs && songsList.data.songs.length) ?
            <div className="card box" >
              {songsList.data.songs.map(({ id, title }) => (
                <div key={id} className="card-action collection-item">
                  <Link to={`/songs/${id}`}>{title}</Link>
                  <i className="material-icons" onClick={() => onSongDelete(id)}>delete</i>
                </div>
              )
              )}
            </div>
            :
            <div className="container">
              <h6 className="center-align">Song list empty.Add your favourite songs and lyrics</h6>
            </div>}
          <Link
            className="btn-floating btn-large red right"
            to="/songs/new">
            <i className="material-icons">add</i>
          </Link>
        </div >

        :
        <div className="loader-container" >
          <div className="loader" >
            <div className="preloader-wrapper active">
              <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <h6 className="red-text">Loading</h6>
          </div>
        </div>
      }
    </div >
  )

}

export default SongList