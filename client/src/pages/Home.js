import { Link } from 'react-router-dom';
import image1 from '../assets/homePage.jpg';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Container1>
        <Image1 src={image1} />
        <MessageDiv>
          <Message>Enjoy your favorite songs with translated lyrics!</Message>
          <LinktoSearchSongs to='/searchSongs'>Get started!</LinktoSearchSongs>
        </MessageDiv>
      </Container1>

      <Container2>
        <TextWrapper>
          <Greeting>Welcome to THE LYRICS WORLD!</Greeting>
          <AboutDiv>
            <EachDiv>
              <Header>Get translated lyrics for your favorite songs.</Header>
              <Content>
                Search for a song by its title or artist. You would see the
                result if somebody added the translated lyrics ;)
              </Content>
            </EachDiv>
            <EachDiv>
              <Header> Add your lyrics.</Header>
              <Content>
                Do you speak more than two languages? Or do you want to let
                people know the meaning of your favorite songs? Then just simply
                sign in and add a lyrics in other languages.
              </Content>
            </EachDiv>
            <EachDiv>
              <Header>Leave a comment on the post.</Header>
              <Content>
                On lyrics page for each song, you can leave your comments and
                share your thoughts!
              </Content>
            </EachDiv>
            <Footer>This website is waiting for your help.</Footer>
          </AboutDiv>
        </TextWrapper>
      </Container2>
    </>
  );
};

export default Home;

const Container1 = styled.div`
  position: relative;
  text-align: center;
  color: white;
`;

const Image1 = styled.img`
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
`;

const MessageDiv = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(232, 230, 230, 0.96);
  border-radius: 30px;
  padding: 50px;

  @media screen and (min-width: 768px) {
    padding: 70px;
  }
`;

const Message = styled.div`
  color: black;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  animation-name: mymove;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  margin-bottom: 20px;

  @keyframes mymove {
    from {
      top: -100px;
    }
    to {
      top: 0px;
    }
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const LinktoSearchSongs = styled(Link)`
  color: #f08080;
  font-size: 18px;
`;

const Container2 = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const TextWrapper = styled.div`
  color: black;
  margin-left: 30px;
  margin-right: 30px;

  @media screen and (min-width: 769px) {
    padding: 80px;
    margin-left: 80px;
    margin-right: 80px;
  }
`;

const Greeting = styled.div`
  font-weight: bold;
  font-size: 19px;

  @media screen and (min-width: 425px) {
    font-size: 30px;
  }

  @media screen and (min-width: 768px) {
    font-size: 45px;
    margin-left: 70px;
  }
`;

const AboutDiv = styled.div`
  margin-top: 30px;

  @media screen and (min-width: 426px) {
    margin-left: 70px;
    margin-right: 70px;
  }
`;

const EachDiv = styled.div`
  margin-bottom: 20px;

  @media screen and (min-width: 426px) {
    margin-bottom: 30px;
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 10px;

  @media screen and (min-width: 426px) {
    font-size: 25px;
  }

  @media screen and (min-width: 769px) {
    font-size: 30px;
  }
`;

const Content = styled.div`
  border-radius: 5px;
  background: #a8a0a0;
  color: white;
  font-size: 20px;
  padding: 15px 15px;
  font-size: 14px;

  @media screen and (min-width: 426px) {
    font-size: 20px;
    padding: 30px 20px;
  }
`;

const Footer = styled.div`
  font-size: 15px;

  @media screen and (min-width: 426px) {
    font-size: 20px;
  }
`;
