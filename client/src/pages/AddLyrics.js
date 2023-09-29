import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AddLyrics = () => {
  const { signedInUser_id } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({ language: '', lyrics: '' });
  const { language, lyrics } = inputs;
  const { songId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs({ ...inputs, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      signedInUser_id,
      language,
      lyrics,
    };

    fetch(`https://the-lyrics-world.onrender.com/api/addLyrics/${songId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.status === 400) {
          setErrorMessage(parsed.message);
        } else if (parsed.status === 200) {
          window.alert(parsed.message);
          navigate(`/searchSongs/${songId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Background>
        <FormDiv>
          <Header>- Add your Lyrics -</Header>
          <div>
            <form onSubmit={handleSubmit}>
              <TextareaDiv>
                <Label>
                  What language are you going to translate this song into?
                </Label>
                <LanguageTextarea
                  type='text'
                  id='language'
                  value={language}
                  onChange={handleChange}
                />
              </TextareaDiv>
              <TextareaDiv>
                <Label>Please write translated lyrics.</Label>
                <Textarea
                  type='text'
                  id='lyrics'
                  value={lyrics}
                  onChange={handleChange}
                ></Textarea>
              </TextareaDiv>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <Button type='submit'>Add lyrics</Button>
            </form>
          </div>
        </FormDiv>
      </Background>
    </>
  );
};

export default AddLyrics;

const Background = styled.div`
  background: #dcd2cf;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin: 80px 30px 50px 30px;
`;

const Header = styled.p`
  font-weight: bold;
  font-size: 20px;

  @media screen and (min-width: 426px) {
    font-size: 30px;
  }
`;

const TextareaDiv = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 15px;

  @media screen and (min-width: 426px) {
    font-size: 20px;
  }
`;

const LanguageTextarea = styled.textarea`
  font-size: 15px;
  padding: 5px 10px;

  @media screen and (min-width: 426px) {
    font-size: 20px;
  }
`;

const Textarea = styled.textarea`
  height: 350px;
  font-size: 15px;
  padding: 5px 10px;

  @media screen and (min-width: 426px) {
    font-size: 20px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 17px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  font-size: 15px;
  color: white;
  border: none;
  border-radius: 20px;
  background-color: #66cdaa;
  padding: 5px 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media screen and (min-width: 426px) {
    font-size: 20px;
  }
`;
