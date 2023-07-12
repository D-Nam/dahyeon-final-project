import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchSongs = () => {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    fetchMusicInfo();
  }, [value]);

  // using Deezer API for the 'search' endpoint.
  const fetchMusicInfo = () => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=+${value}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f3be9018b8msh960e5d3678ae378p1a544cjsn82d4efb2e7b0',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    })
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.data) {
          setDataArray(parsed.data);
        } else {
          setDataArray([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (songId) => {
    navigate(`/searchSongs/${songId}`);
  };

  return (
    <>
      <Background>
        <Container>
          <SearchBarDiv>
            <Input
              type='text'
              placeholder='Search for music Title / Artist'
              ref={inputRef}
              value={value}
              onChange={handleChange}
            />
            <Button
              onClick={() => {
                setValue('');
              }}
            >
              Clear
            </Button>
          </SearchBarDiv>

          {dataArray.length !== 0 && (
            <Wrapper>
              {dataArray.map((item, index) => {
                return (
                  <EachDiv key={index} onClick={() => handleClick(item.id)}>
                    <ImgDiv>
                      <AlbumImg src={item.album.cover} />
                    </ImgDiv>
                    <div>
                      <Title>
                        {index + 1}. {item.title}
                      </Title>
                      <Artist>{item.artist.name}</Artist>
                    </div>
                  </EachDiv>
                );
              })}
            </Wrapper>
          )}
        </Container>
      </Background>
    </>
  );
};

export default SearchSongs;

const Background = styled.div`
  background-color: #e0ffff;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const Container = styled.div`
  margin-top: 120px;
  margin-bottom: 70px;
`;

const SearchBarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: 2px solid gray;
  border-radius: 5px;
  width: 500px;
  height: 50px;
  margin-right: 20px;
  font-size: 20px;
  padding-left: 15px;

  &:focus {
    outline: 5px solid #e9967a;
  }
`;

const Button = styled.button`
  font-size: 20px;
  height: 50px;
  width: 100px;
  border: none;
  border-radius: 20px;
  background-color: #add8e6;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Wrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 60vw;
  margin: auto;
  margin-top: 30px;
  padding: 10px;
`;

const EachDiv = styled.div`
  display: flex;
  padding: 20px;
  font-size: 20px;

  &:hover {
    background-color: #f3e0de;
  }
`;

const ImgDiv = styled.div`
  margin-right: 30px;
`;

const AlbumImg = styled.img`
  width: 100px;
  height: 100px;
`;

const Title = styled.p`
  font-weight: bold;
`;

const Artist = styled.p`
  font-style: italic;
  color: #6d5f5d;
  font-size: 17px;
`;
