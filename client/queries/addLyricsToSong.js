import { gql } from '@apollo/client';

export default gql`
mutation AddLyricsToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics{
        id
        content
        likes
      }
    }
  }
`;