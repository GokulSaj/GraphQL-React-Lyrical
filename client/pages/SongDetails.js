import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import fetchSongDetails from '../queries/fetchSongDetails';
import addLyricsToSong from '../queries/addLyricsToSong';
import likeLyrics from '../queries/likeLyrics';
import LyricCreate from '../components/LyricCreate'
import LyricList from '../components/LyricList'


const SongDetails = (props) => {
  let { id } = useParams();
  const songDetails = useQuery(fetchSongDetails, {
    variables: { id: id },
  });
  const [addLyricsToSongMutation] = useMutation(addLyricsToSong);
  const [likeLyricsMutation] = useMutation(likeLyrics);
  const [lyrics, setLyrics] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    addLyricsToSongMutation({
      variables: { content: lyrics, songId: id }
    }).then(() => setLyrics(""))
  }
  const onLikeLyric = (lyricId, likes) => {
    likeLyricsMutation({
      variables: { id: lyricId },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: lyricId,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    })
  }


  return (
    <div className='container'>
      {!songDetails.data ?
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

        : <div>
          <Link to="/">
            Back
          </Link>
          <h3>{songDetails.data.song.title}</h3>
          <LyricList
            lyrics={songDetails.data.song.lyrics}
            onLikeLyric={onLikeLyric} />
          <LyricCreate
            onSubmit={onSubmit}
            lyrics={lyrics}
            onChangeLyrics={(text) => setLyrics(text)} />
        </div>}
    </div>
  )
}

export default SongDetails