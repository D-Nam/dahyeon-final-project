import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import moment from 'moment';
import styled from 'styled-components';

const CommentForm = () => {
  const { signedInUser_id } = useContext(UserContext);
  const { songId, addedLyricsId } = useParams();
  const [textValue, setTextValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const date = moment(currentDate).format('YYYY/MM/DD hh:mm:ss A');

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      signedInUser_id,
      textValue,
      date,
    };

    fetch(`/newLyrics/${songId}/${addedLyricsId}/comment`, {
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
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {signedInUser_id ? (
        <form onSubmit={handleSubmit}>
          <div>
            <Label>
              Write comment
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </Label>
            <CommentDiv>
              <Textarea
                type='text'
                value={textValue}
                onChange={handleChange}
              ></Textarea>
              <div>
                <AddButton
                  type='submit'
                  onClick={() => setCurrentDate(new Date())}
                >
                  Add
                </AddButton>
              </div>
            </CommentDiv>
          </div>
        </form>
      ) : (
        <p>Sign in to add your comments!</p>
      )}
    </>
  );
};

export default CommentForm;

const CommentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-left: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 47px;
  font-size: 20px;
  border: 3px solid #66cdaa;

  &:focus {
    outline: #00ffff;
  }
`;

const AddButton = styled.button`
  background-color: #66cdaa;
  color: white;
  font-size: 17px;
  font-weight: bold;
  width: 90px;
  height: 57px;
  border: 3px solid #66cdaa;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;
