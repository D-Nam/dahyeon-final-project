import { Link } from 'react-router-dom';
import image from '../assets/homePage.jpg';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Image src={image} />
      <MessageDiv>
        <Message>Enjoy your favorite songs with translated lyrics!</Message>
        <LinktoSearchSongs to='/searchSongs'>Get started!</LinktoSearchSongs>
      </MessageDiv>
    </Container>
  );
};

export default Home;

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
`;

const MessageDiv = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(95, 88, 85, 0.96);
  border-radius: 30px;
  padding: 50px;

  @media screen and (min-width: 768px) {
    padding: 70px;
  }
`;

const Message = styled.div`
  font-family: monospace;
  color: #ffffff;
  text-shadow: 3px 3px black;
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
    font-size: 35px;
  }
`;

const LinktoSearchSongs = styled(Link)`
  color: white;
  font-size: 20px;

  &:hover {
    color: #f08080;
  }
`;
