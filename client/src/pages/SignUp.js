import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/signUp.jpg';
import styled from 'styled-components';

const SignUp = () => {
  const [inputs, setInputs] = useState({ userId: '', userPassword: '' });
  const { userId, userPassword } = inputs;
  const inputRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setInputs((currentData) => {
      currentData[id] = value;
      return { ...currentData };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/signup', {
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
        } else if (parsed.status === 200) {
          window.alert('Account was created successfully! Please sign in.');
          navigate('/signIn');
        } else {
          window.alert(parsed.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Image src={image} />
      <SignInFormDiv>
        <Form onSubmit={handleSubmit}>
          <GreetingMsgDiv>
            <p>Welcome to The Lyrics World!</p>
            <FillTheFormMsg>
              Please fill in this form to create an account.
            </FillTheFormMsg>
          </GreetingMsgDiv>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Input
            ref={inputRef}
            type='text'
            id='userId'
            value={userId}
            onChange={handleChange}
            placeholder='User id (5-15 char)'
          />
          <Input
            type='password'
            id='userPassword'
            value={userPassword}
            onChange={handleChange}
            placeholder='User password (6-15 char)'
          />
          <Button type='submit'>Submit</Button>{' '}
          <SignInMessage>
            Already have an account?
            <LinkToSignIn to='/signIn'>sign in.</LinkToSignIn>
          </SignInMessage>
        </Form>
      </SignInFormDiv>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  position: relative;
`;

const Image = styled.img`
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  opacity: 0.8;
`;

const SignInFormDiv = styled.div`
  border: 4px solid white;
  background: rgba(95, 88, 85, 0.94);
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
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: #e1d8d6;
`;

const FillTheFormMsg = styled.p`
  font-size: 15px;
  color: white;
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
  border: 2px solid white;
  border-radius: 20px;
  background-color: #add8e6;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const SignInMessage = styled.p`
  margin-top: 25px;
  font-size: 17px;
  color: #e1d8d6;
`;

const LinkToSignIn = styled(Link)`
  color: white;
  margin-left: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
