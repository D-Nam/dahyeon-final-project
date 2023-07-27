import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SongDetail = () => {
  const { songId } = useParams();
  const [detail, setDetail] = useState('');
  const [lyricsArray, setLyricsArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    eachMusicInfo();
    getAllLyrics();
  }, []);

  // using Deezer API for the 'track' endpoint.
  const eachMusicInfo = () => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f3be9018b8msh960e5d3678ae378p1a544cjsn82d4efb2e7b0',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    })
      .then((res) => res.json())
      .then((parsed) => {
        setDetail(parsed);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAllLyrics = () => {
    fetch(`/searchSongs/${songId}`)
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
  };

  const handleButtonClick = () => {
    navigate(`/addLyrics/${songId}`);
  };

  const handleEachLyricsClick = (songId, addedLyricsId) => {
    navigate(`/newLyrics/${songId}/${addedLyricsId}`);
  };

  return (
    <>
      {detail === '' ? (
        <LoadingMsg>Loading...</LoadingMsg>
      ) : (
        <>
          <Background>
            <Container>
              <SongDetailDiv>
                <ImgDiv>
                  <AlbumImg src={detail.album.cover} />
                </ImgDiv>
                <TextDiv>
                  <Title>{detail.title}</Title>
                  <Artist>{detail.artist.name}</Artist>
                </TextDiv>
                <ButtonDiv>
                  <Button onClick={handleButtonClick}>Add your lyrics!</Button>
                </ButtonDiv>
              </SongDetailDiv>
              {lyricsArray.length === 0 ? (
                <NoResultMsg>
                  No one added the lyrics for this song yet! Click the button to
                  add your lyrics!
                </NoResultMsg>
              ) : (
                <LyricsWrapper>
                  {lyricsArray.map((info, index) => {
                    return (
                      <EachDiv
                        key={index}
                        onClick={() =>
                          handleEachLyricsClick(songId, info.addedLyricsId)
                        }
                      >
                        <OrderDiv>{index + 1}.</OrderDiv>
                        <LanguageDiv>
                          Language: {info.lyrics[0].language}
                        </LanguageDiv>
                        <UserIdDiv>
                          translated by {info.lyrics[0].userId}
                        </UserIdDiv>
                      </EachDiv>
                    );
                  })}
                </LyricsWrapper>
              )}
            </Container>
          </Background>
        </>
      )}
    </>
  );
};

export default SongDetail;

const LoadingMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 30px;
`;

const Background = styled.div`
  background-color: #e0ffff;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const Container = styled.div`
  flex-direction: column;
  margin: auto;
  margin-top: 150px;
  width: 60vw;
`;

const SongDetailDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ImgDiv = styled.div`
  margin-right: 40px;
`;

const AlbumImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 25px;
`;

const TextDiv = styled.div`
  margin-right: 50px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 25px;
`;

const Artist = styled.p`
  font-style: italic;
  color: #6d5f5d;
  font-size: 17px;
`;

const ButtonDiv = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Button = styled.button`
  background-color: #66cdaa;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 30px;
  font-size: 25px;
  padding: 5px 20px;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const LyricsWrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 40px;
  padding: 10px;
  margin-bottom: 40px;
`;

const EachDiv = styled.div`
  display: grid;
  grid-template-columns: 5% 70% 2%;
  align-items: center;
  position: relative;
  padding: 20px;
  font-size: 20px;

  &:hover {
    background-color: #f3e0de;
    cursor: pointer;
  }
`;

const OrderDiv = styled.div`
  /* margin-right: 30px; */
`;

const LanguageDiv = styled.div`
  width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const UserIdDiv = styled.div`
  font-style: italic;
  font-size: 18px;
  color: #66cdaa;
  position: absolute;
  right: 20px;
`;

const NoResultMsg = styled.div`
  margin-top: 100px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
