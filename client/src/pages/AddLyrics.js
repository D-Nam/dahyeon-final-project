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

    fetch(`/addLyrics/${songId}`, {
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
          <h1>- Add your Lyrics -</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <InputsDiv>
                <Label>
                  What language are you going to translate this song into?
                </Label>
                <Input
                  type='text'
                  id='language'
                  value={language}
                  onChange={handleChange}
                />
              </InputsDiv>
              <InputsDiv>
                <Label>Please write translated lyrics.</Label>
                <Textarea
                  type='text'
                  id='lyrics'
                  value={lyrics}
                  onChange={handleChange}
                ></Textarea>
              </InputsDiv>
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
  position: relative;
  background: #e0ffff;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
`;

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 30px;
`;

const InputsDiv = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 20px;
`;

const Input = styled.input`
  height: 30px;
  font-size: 20px;
`;

const Textarea = styled.textarea`
  height: 350px;
  font-size: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 17px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  font-size: 20px;
  color: white;
  border: none;
  border: none;
  border-radius: 20px;
  background-color: #66cdaa;
  padding: 5px 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
