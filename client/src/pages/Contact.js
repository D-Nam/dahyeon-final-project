import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiLogoGithub } from 'react-icons/bi';
import { AiFillMail, AiFillLinkedin } from 'react-icons/ai';
import image from '../assets/contact.jpg';

const Contact = () => {
  return (
    <>
      <Container>
        <Image src={image} />
        <Message>
          <p>I'd like to hear your feedback or thoughts.</p>
          <p>Please feel free to contact me :)</p>
        </Message>

        <IconDiv>
          <Link to='mailto:dahyeon.futuredev@gmail.com'>
            <GmailIcon size={'3rem'} />
          </Link>

          <Link to='https://github.com/D-Nam'>
            <GithubIcon size={'3rem'} />
          </Link>

          <Link to='https://www.linkedin.com/in/dahyeon-nam'>
            <LinkedInIcon size={'3rem'} />
          </Link>
        </IconDiv>
      </Container>
    </>
  );
};

export default Contact;

const Container = styled.div`
  position: relative;
  text-align: center;
  color: white;
`;

const Image = styled.img`
  display: none;

  @media screen and (min-width: 426px) {
    display: block;
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
    opacity: 0.9;
  }
`;

const Message = styled.div`
  color: black;
  font-size: 15px;
  margin-top: 200px;

  @media screen and (min-width: 426px) {
    font-size: 16px;
    position: absolute;
    top: 16%;
    left: 44%;
    transform: translate(-50%, -50%);
  }

  @media screen and (min-width: 769px) {
    font-size: 20px;
  }

  @media screen and (min-width: 1025px) {
    top: 22%;
    font-size: 25px;
  }
`;

const IconDiv = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;
  gap: 17px;

  @media screen and (min-width: 426px) {
    margin-top: 0px;
    position: absolute;
    top: 66%;
    left: 44%;
    transform: translate(-50%, -50%);
  }
`;

const GmailIcon = styled(AiFillMail)`
  color: black;
`;

const GithubIcon = styled(BiLogoGithub)`
  color: black;
`;

const LinkedInIcon = styled(AiFillLinkedin)`
  color: black;
`;
