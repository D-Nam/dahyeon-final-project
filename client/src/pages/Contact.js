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
        <GmailDiv>
          <Link to='mailto:dahyeon.futuredev@gmail.com'>
            <GmailIcon size={'3rem'} />
          </Link>
        </GmailDiv>

        <GithubDiv>
          <Link to='https://github.com/D-Nam'>
            <GithubIcon size={'3rem'} />
          </Link>
        </GithubDiv>

        <LinkedInDiv>
          <Link to='https://www.linkedin.com/in/dahyeon-nam'>
            <LinkedInIcon size={'3rem'} />
          </Link>
        </LinkedInDiv>
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
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  opacity: 0.9;
`;

const Message = styled.div`
  color: black;
  font-size: 20px;
  position: absolute;
  top: 47%;
  left: 44%;
  transform: translate(-50%, -50%);
`;

const GmailDiv = styled.div`
  position: absolute;
  top: 60%;
  left: 36%;
`;

const GmailIcon = styled(AiFillMail)`
  color: black;
`;

const GithubDiv = styled.div`
  position: absolute;
  top: 60%;
  left: 42%;
`;

const GithubIcon = styled(BiLogoGithub)`
  color: black;
`;

const LinkedInDiv = styled.div`
  position: absolute;
  top: 60%;
  left: 48%;
`;

const LinkedInIcon = styled(AiFillLinkedin)`
  color: black;
`;
