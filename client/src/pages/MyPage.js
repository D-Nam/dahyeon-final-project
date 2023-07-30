import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

const MyPage = () => {
  const { signedInUser_id } = useContext(UserContext);
  const [lyricsArray, setLyricsArray] = useState([]);

  useEffect(() => {
    fetch(
      `https://the-lyrics-world.onrender.com/api/myPage/${signedInUser_id._id}`
    )
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.data) {
          setLyricsArray(parsed.data);
        } else {
          setLyricsArray([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteLyrics = (songId, addedLyricsId) => {
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
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Background>
      <Container>
        <UserInfoDiv>My user id: {signedInUser_id._id}</UserInfoDiv>
        {lyricsArray.length === 0 ? (
          <NoResultMsg>
            There is no lyrics that you posted yet!{' '}
            <LinkToSearchSong to='/searchSongs'>
              Want to add your lyrics?
            </LinkToSearchSong>
          </NoResultMsg>
        ) : (
          <PostWrapper>
            {lyricsArray.map((info, index) => {
              return (
                <EachDiv key={index}>
                  <OrderDiv>{index + 1}.</OrderDiv>
                  <SongIdDiv>Song id: {info.songId}</SongIdDiv>
                  <EditDeleteDiv>
                    <LinkToEdit
                      to={`/newLyrics/${info.songId}/${info.addedLyricsId}/edit`}
                    >
                      Edit
                    </LinkToEdit>
                    <DeleteButton
                      onClick={() =>
                        handleDeleteLyrics(info.songId, info.addedLyricsId)
                      }
                    >
                      Delete
                    </DeleteButton>
                  </EditDeleteDiv>
                </EachDiv>
              );
            })}
          </PostWrapper>
        )}
      </Container>
    </Background>
  );
};

export default MyPage;

const Background = styled.div`
  background: rgba(123, 102, 96, 0.4);
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const Container = styled.div`
  flex-direction: column;
  margin: auto;
  margin-top: 140px;
  margin-bottom: 50px;
  width: 50vw;
  font-size: 20px;
`;

const UserInfoDiv = styled.div`
  color: white;
  background-color: #e9967a;
  border: 3px solid white;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 25px;
  font-weight: bold;
  border-radius: 10px;
`;

const PostWrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 30px;
  padding: 10px;
  margin-bottom: 40px;
`;

const EachDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px;
  font-size: 20px;

  &:hover {
    background-color: #f3e0de;
  }
`;

const OrderDiv = styled.div`
  margin-right: 30px;
`;

const SongIdDiv = styled.div`
  margin-right: 20px;
`;

const EditDeleteDiv = styled.div`
  font-size: 18px;
  color: #66cdaa;
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
`;

const LinkToEdit = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;
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
  padding: 4.5px 8px;
  margin-left: 20px;

  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const NoResultMsg = styled.div`
  margin-top: 100px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LinkToSearchSong = styled(Link)`
  color: #ff6337;
  margin-top: 20px;
`;
