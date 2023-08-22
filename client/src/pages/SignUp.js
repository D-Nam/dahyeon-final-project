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

    fetch('https://the-lyrics-world.onrender.com/api/signup', {
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
  height: 330px;
  width: 330px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (min-width: 426px) {
    height: 400px;
    width: 450px;
  }
`;

const GreetingMsgDiv = styled.div`
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #e1d8d6;

  @media screen and (min-width: 426px) {
    font-size: 25px;
  }
`;

const FillTheFormMsg = styled.p`
  font-size: 13px;
  color: white;

  @media screen and (min-width: 426px) {
    font-size: 15px;
  }
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
  text-align: center;
  font-size: 15px;

  @media screen and (min-width: 426px) {
    width: 300px;
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 260px;
  height: 25px;
  border: none;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  font-size: 18px;
  margin-top: 18px;

  &:focus {
    outline: 4px solid #e9967a;
  }

  @media screen and (min-width: 426px) {
    width: 300px;
    height: 30px;
    margin-top: 20px;
  }
`;

const Button = styled.button`
  font-size: 15px;
  width: 80px;
  height: 25px;
  margin-top: 25px;
  border: 2px solid white;
  border-radius: 20px;
  background-color: #add8e6;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media screen and (min-width: 426px) {
    font-size: 20px;
    width: 100px;
    height: 30px;
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
