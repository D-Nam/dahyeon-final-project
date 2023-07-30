import { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import CommentForm from '../components/CommentForm';
import ShowComments from '../components/ShowComments';
import styled from 'styled-components';

const ShowLyricsPost = () => {
  const { signedInUser_id } = useContext(UserContext);
  const [lyricsArray, setLyricsArray] = useState([]);
  const { songId, addedLyricsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://the-lyrics-world.onrender.com/api/newLyrics/${songId}/${addedLyricsId}`
    )
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.data.lyrics) {
          setLyricsArray(parsed.data.lyrics);
        } else {
          setLyricsArray([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteLyrics = () => {
    fetch(
      `https://the-lyrics-world.onrender.com/api/newLyrics/${songId}/${addedLyricsId}/delete`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((parsed) => {
        window.alert(parsed.message);
        navigate(`/searchSongs/${songId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {lyricsArray.map((info, index) => {
        return (
          <Background key={index}>
            <Container>
              <LyricsSection>
                <UserIdDiv>
                  Translated by: {info.userId}
                  {signedInUser_id && signedInUser_id._id === info.userId && (
                    <EditDeleteDiv>
                      <LinkToEdit
                        to={`/newLyrics/${songId}/${addedLyricsId}/edit`}
                      >
                        Edit
                      </LinkToEdit>
                      <DeleteButton onClick={handleDeleteLyrics}>
                        Delete
                      </DeleteButton>
                    </EditDeleteDiv>
                  )}
                </UserIdDiv>
                <LanguageDiv>
                  <Label>Translated into</Label>
                  <LanguageBox>{info.language}</LanguageBox>
                </LanguageDiv>
                <LyricsDiv>
                  <Label>Translated lyrics</Label>
                  <LyricsBox>{info.lyrics}</LyricsBox>
                </LyricsDiv>
                <LinkDiv>
                  <LinkToSearchSongsPage to={`/searchSongs/${songId}`}>
                    All lyrics for this song.
                  </LinkToSearchSongsPage>
                </LinkDiv>
              </LyricsSection>

              <CommentSection>
                <CommentForm />
                <ShowComments />
              </CommentSection>
            </Container>
          </Background>
        );
      })}
    </>
  );
};

export default ShowLyricsPost;

const Background = styled.div`
  background-color: #e0ffff;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const LyricsSection = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  grid-column-gap: 50px;
  margin: auto;
  margin-top: 140px;
  margin-bottom: 50px;
  width: 75vw;
  font-size: 20px;
`;

const UserIdDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: italic;
  font-size: 25px;
  font-weight: bold;
  color: #66cdaa;
  margin-bottom: 30px;
`;

const EditDeleteDiv = styled.div`
  display: flex;
`;

const LinkToEdit = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  background-color: #ffbf00;
  border-radius: 20px;
  padding: 3px 8px;
  margin-left: 30px;

  &:hover {
    color: white;
  }
`;

const DeleteButton = styled.button`
  color: black;
  font-size: 20px;
  background-color: #ffbf00;
  border: none;
  border-radius: 20px;
  padding: 3px 8px;
  margin-left: 30px;

  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const LanguageDiv = styled.div`
  margin-bottom: 30px;
`;

const LanguageBox = styled.div`
  overflow: visible;
  overflow-wrap: anywhere;
  box-sizing: border-box;
  width: auto;
  height: auto;
  border-width: 4px;
  border-style: solid;
  border-color: #e59b8a;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: white;
`;

const LyricsDiv = styled.div`
  margin-bottom: 30px;
`;

const LyricsBox = styled.div`
  overflow: visible;
  overflow-wrap: anywhere;
  box-sizing: border-box;
  width: auto;
  height: auto;
  border-width: 4px;
  border-style: solid;
  border-color: #e59b8a;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const CommentSection = styled.div`
  margin-top: 70px;
`;

const LinkDiv = styled.div``;

const LinkToSearchSongsPage = styled(Link)`
  color: black;
  &:hover {
    color: red;
  }
`;

const Label = styled.div`
  margin-bottom: 10px;
`;
