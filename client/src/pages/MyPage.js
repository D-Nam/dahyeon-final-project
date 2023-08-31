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
  margin-top: 90px;
  margin-bottom: 50px;
  width: 70vw;
  font-size: 20px;

  @media screen and (min-width: 426px) {
    width: 50vw;
    margin-top: 140px;
  }
`;

const UserInfoDiv = styled.div`
  color: white;
  background-color: #e9967a;
  border: 3px solid white;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 10px;

  @media screen and (min-width: 426px) {
    height: 60px;
    padding-left: 20px;
    font-size: 25px;
  }
`;

const PostWrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 30px;
  margin-bottom: 40px;

  @media screen and (min-width: 426px) {
    padding: 10px;
  }
`;

const EachDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 15px;
  font-size: 15px;

  &:hover {
    background-color: #f3e0de;
  }

  @media screen and (min-width: 426px) {
    padding: 20px;
    font-size: 20px;
  }
`;

const OrderDiv = styled.div`
  margin-right: 10px;

  @media screen and (min-width: 426px) {
    margin-right: 15px;
  }

  @media screen and (min-width: 769px) {
    margin-right: 30px;
  }
`;

const SongIdDiv = styled.div`
  @media screen and (min-width: 425px) {
    margin-right: 30px;
  }

  @media screen and (min-width: 768px) {
    margin-right: 0px;
  }
`;

const EditDeleteDiv = styled.div`
  color: #66cdaa;
  display: flex;
  align-items: center;

  @media screen and (min-width: 769px) {
    position: absolute;
    right: 20px;
  }
`;

const LinkToEdit = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 15px;
  background-color: #ffbf00;
  border-radius: 20px;
  padding: 3px 8px;

  &:hover {
    color: white;
  }

  @media screen and (min-width: 426px) {
    font-size: 21px;
    margin-left: 30px;
  }
`;

const DeleteButton = styled.button`
  color: black;
  font-size: 15px;
  background-color: #ffbf00;
  border: none;
  border-radius: 20px;
  padding: 4.5px 8px;
  margin-left: 5px;

  &:hover {
    color: white;
    cursor: pointer;
  }

  @media screen and (min-width: 426px) {
    font-size: 20px;
    margin-left: 10px;
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
