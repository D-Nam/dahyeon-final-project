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
  margin-top: 80px;
  margin-bottom: 70px;

  @media screen and (min-width: 426px) {
    margin-top: 120px;
  }
`;

const SearchBarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: 3px solid #add8e6;
  border-radius: 5px;
  width: 200px;
  height: 35px;
  margin-right: 10px;
  font-size: 15px;
  padding-left: 10px;

  &:focus {
    outline: 4px solid #e9967a;
  }

  @media screen and (min-width: 426px) {
    width: 500px;
    height: 50px;
    font-size: 20px;
    margin-right: 20px;
  }
`;

const Button = styled.button`
  font-size: 15px;
  height: 35px;
  width: 60px;
  border: none;
  border-radius: 20px;
  background-color: #add8e6;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media screen and (min-width: 426px) {
    font-size: 20px;
    width: 80px;
    height: 40px;
  }
`;

const Wrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 75vw;
  margin: auto;
  margin-top: 30px;
  padding: 10px;

  @media screen and (min-width: 426px) {
    width: 60vw;
  }
`;

const EachDiv = styled.div`
  padding: 10px;
  font-size: 15px;
  text-align: center;

  &:hover {
    background-color: #f3e0de;
  }

  @media screen and (min-width: 426px) {
    display: flex;
    padding: 20px;
    font-size: 20px;
    text-align: start;
  }
`;

const ImgDiv = styled.div`
  @media screen and (min-width: 426px) {
    margin-right: 30px;
  }
`;

const AlbumImg = styled.img`
  width: 90px;
  height: 90px;

  @media screen and (min-width: 426px) {
    width: 100px;
    height: 100px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const Artist = styled.div`
  font-style: italic;
  color: #6d5f5d;
  font-size: 15px;

  @media screen and (min-width: 426px) {
    font-size: 17px;
  }
`;
