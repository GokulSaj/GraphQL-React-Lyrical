import React from "react";

const LyricsList = ({
    lyrics = [],
    onLikeLyric = () => { }
}) => {

    return (
        <div>
            <h5>Song Lyrics</h5>
            {lyrics && lyrics.length ?
                <div className="card box">
                    {lyrics.map(({ id, content, likes }) => (
                        <div key={id} className="card-action collection-item">
                            {content}
                            <div className="vote-box">
                                <i className="material-icons" onClick={() => onLikeLyric(id,likes)}>thumb_up</i>
                                {likes}
                            </div>
                        </div>
                    )
                    )}
                </div>
                :
                <div className="card box" >
                    <div className="card-action center-align">
                        <h6 >Lyrics list empty.Add lyrics of your songs.</h6>
                    </div>
                </div>
            }


        </div>
    )
}



export default LyricsList;