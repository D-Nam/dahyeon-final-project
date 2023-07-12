import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

const ShowComments = () => {
  const { signedInUser_id } = useContext(UserContext);
  const { songId, addedLyricsId } = useParams();
  const [commentArray, setCommentArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/newLyrics/${songId}/${addedLyricsId}/comment`)
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.data) {
          setCommentArray(parsed.data);
        } else {
          setCommentArray([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDetailBtn = (addedCommentId) => {
    navigate(`/newLyrics/${songId}/${addedLyricsId}/comment/${addedCommentId}`);
  };

  return (
    <>
      <Container>
        {commentArray.length === 0 ? (
          <NoResultMsg>
            No comments yet. Share your thoughts with others!
          </NoResultMsg>
        ) : (
          <CommentWrapper>
            {commentArray.map((info, index) => {
              return (
                <EachDiv key={index}>
                  <OrderDiv>{index + 1}.</OrderDiv>
                  <CommentDiv>{info.textValue}</CommentDiv>
                  <UserIdDateDiv>
                    <div>from {info.userId}</div>
                    <Date>{info.date}</Date>
                    {signedInUser_id && info.userId === signedInUser_id._id && (
                      <EditDeleteDiv>
                        <EditDeleteButton
                          onClick={() => handleDetailBtn(info.addedCommentId)}
                        >
                          Edit & Delete
                        </EditDeleteButton>
                      </EditDeleteDiv>
                    )}
                  </UserIdDateDiv>
                </EachDiv>
              );
            })}
          </CommentWrapper>
        )}
      </Container>
    </>
  );
};

export default ShowComments;

const Container = styled.div``;

const CommentWrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 20px;
  padding: 10px;
`;

const EachDiv = styled.div`
  display: grid;
  grid-template-columns: 10% 55% 35%;
  align-items: center;
  position: relative;
  padding: 30px 20px;
  font-size: 20px;
  border-bottom: 2px solid gray;
`;

const OrderDiv = styled.div`
  font-weight: bold;
`;

const CommentDiv = styled.div`
  margin-right: 20px;
  overflow: auto;
`;

const UserIdDateDiv = styled.div`
  font-style: italic;
  font-size: 18px;
  color: #66cdaa;
  position: absolute;
  right: 20px;
`;

const Date = styled.div`
  font-style: normal;
  font-size: 15px;
  color: gray;
`;

const EditDeleteDiv = styled.div`
  display: flex;
  font-style: normal;
  font-size: 15px;
  margin-top: 5px;
`;

const EditDeleteButton = styled.button`
  color: black;
  border-width: 1px;
  border-radius: 20px;
  background-color: white;

  &:hover {
    background-color: #ffbf00;
    cursor: pointer;
  }
`;

const NoResultMsg = styled.div`
  margin-top: 12px;
  font-size: 20px;
`;
