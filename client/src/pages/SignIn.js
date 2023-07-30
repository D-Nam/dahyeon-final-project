import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SignIn = () => {
  const { setSignedInUser_id } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({ userId: '', userPassword: '' });
  const { userId, userPassword } = inputs;
  const navigate = useNavigate();
  const inputRef = useRef();
  const location = useLocation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs({ ...inputs, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://the-lyrics-world.onrender.com/api/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, userPassword }),
    })
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.status === 400) {
          setErrorMessage(parsed.message);
        } else if (parsed.status === 404) {
          setErrorMessage(parsed.message);
        } else if (parsed.status === 200) {
          setSignedInUser_id(parsed.data);
          sessionStorage.setItem('user', JSON.stringify(parsed.data));
          window.alert(parsed.message);
          if (location.state === null) {
            navigate('/');
          } else {
            navigate(location.state.redirectedFrom.pathname);
          }
        } else {
          window.alert(parsed.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Background>
      <SignInFormDiv>
        <Form onSubmit={handleSubmit}>
          <GreetingMsgDiv>
            <p>Welcome back!</p>
            <GoodToSeeYouMsg>Good to see you again :)</GoodToSeeYouMsg>
          </GreetingMsgDiv>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Input
            type='text'
            ref={inputRef}
            id='userId'
            value={userId}
            onChange={handleChange}
            placeholder='User id'
          />
          <Input
            type='password'
            id='userPassword'
            value={userPassword}
            onChange={handleChange}
            placeholder='User password'
          />
          <Button type='submit'>Sign in</Button>
        </Form>
      </SignInFormDiv>
      <SignUpMessage>
        New to LyricsWorld?
        <LinkToSignUp to='/signUp'>create an account.</LinkToSignUp>
      </SignUpMessage>
    </Background>
  );
};

export default SignIn;

const Background = styled.div`
  position: relative;
  background: linear-gradient(white, #e9967a);
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
`;

const SignInFormDiv = styled.div`
  border: 4px solid white;
  background: rgba(95, 88, 85, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GreetingMsgDiv = styled.div`
  flex-direction: column;
  font-size: 30px;
  font-weight: bold;
  margin-top: 0px;
  text-align: center;
`;

const GoodToSeeYouMsg = styled.p`
  color: white;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  width: 300px;
  color: red;
  font-size: 20px;
  margin: 0px;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border: none;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  margin-top: 20px;

  &:focus {
    outline: 5px solid #e9967a;
  }
`;

const Button = styled.button`
  font-size: 20px;
  width: 100px;
  height: 30px;
  margin-top: 40px;
  margin-bottom: 40px;
  border: 2px solid white;
  border-radius: 20px;
  background-color: #add8e6;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const SignUpMessage = styled.p`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 17px;
`;

const LinkToSignUp = styled(Link)`
  color: white;
  margin-left: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
