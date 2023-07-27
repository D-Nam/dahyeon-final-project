import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

const CommentDetail = () => {
  const { songId, addedLyricsId, addedCommentId } = useParams();
  const [textValue, setTextValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const date = moment(currentDate).format('YYYY/MM/DD hh:mm:ss A');

  useEffect(() => {
    fetch(
      `https://the-lyrics-world.onrender.com/newLyrics/${songId}/${addedLyricsId}/comment/${addedCommentId}`
    )
      .then((res) => res.json())
      .then((parsed) => {
        setTextValue({ textValue: parsed.data.textValue });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://the-lyrics-world.onrender.com/newLyrics/${songId}/${addedLyricsId}/comment/${addedCommentId}/edit`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PATCH',

        body: JSON.stringify({
          textValue,
          date,
        }),
      }
    )
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.status === 400) {
          setErrorMessage(parsed.message);
        } else if (parsed.status === 200) {
          window.alert(parsed.message);
          navigate(`/newLyrics/${songId}/${addedLyricsId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteComment = () => {
    fetch(
      `https://the-lyrics-world.onrender.com/newLyrics/${songId}/${addedLyricsId}/${addedCommentId}/delete`,
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
        navigate(`/newLyrics/${songId}/${addedLyricsId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>
            Write comment
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Label>
          <CommentDiv>
            <Textarea
              type='text'
              value={textValue.textValue}
              onChange={handleChange}
            ></Textarea>
          </CommentDiv>
        </div>
        <ButtonsDiv>
          <EditButton type='submit' onClick={() => setCurrentDate(new Date())}>
            Edit comment
          </EditButton>
          <DeleteButton onClick={handleDeleteComment}>
            Delete comment
          </DeleteButton>
        </ButtonsDiv>
      </form>
    </Container>
  );
};

export default CommentDetail;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #afeeee;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const CommentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-left: 20px;
`;

const Textarea = styled.textarea`
  width: 500px;
  height: 80px;
  font-size: 20px;
  border: 3px solid #66cdaa;

  &:focus {
    outline: #00ffff;
  }
`;

const ButtonsDiv = styled.div`
  margin-top: 30px;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const EditButton = styled.button`
  background-color: #66cdaa;
  color: white;
  font-size: 17px;
  font-weight: bold;
  width: 100px;
  height: 57px;
  border: none;
  border-radius: 15px;
  margin-right: 40px;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  background-color: #66cdaa;
  color: white;
  font-size: 17px;
  font-weight: bold;
  width: 100px;
  height: 57px;
  border: none;
  border-radius: 15px;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;
