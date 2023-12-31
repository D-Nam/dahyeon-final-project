import image from '../assets/aboutPage.jpg';
import styled from 'styled-components';

const About = () => {
  return (
    <Container>
      <Image src={image} />
      <TextWrapper>
        <Greeting>Welcome to THE LYRICS WORLD!</Greeting>
        <AboutDiv>
          <EachDiv>
            <Header>Get translated lyrics for your favorite songs.</Header>
            <Content>
              Search for a song by its title or artist. You would see the result
              if somebody added the translated lyrics ;)
            </Content>
          </EachDiv>
          <EachDiv>
            <Header> Add your lyrics.</Header>
            <Content>
              Do you speak more than two languages? Or do you want to let people
              know the meaning of your favorite songs? Then just simply sign in
              and add a lyrics in other languages.
            </Content>
          </EachDiv>
          <EachDiv>
            <Header>Leave a comment on the post.</Header>
            <Content>
              On lyrics page for each song, you can leave your comments and
              share your thoughts!
            </Content>
          </EachDiv>
          <div>This website is waiting for your help.</div>
        </AboutDiv>
      </TextWrapper>
    </Container>
  );
};

export default About;

const Container = styled.div`
  position: relative;
`;

const Image = styled.img`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;

  @media screen and (min-width: 425px) {
    width: 690px;
    height: 1000px;
  }

  @media screen and (min-width: 768px) {
    width: 100%;
    height: 1000px;
  }
`;

const TextWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 15%;
  left: 10%;
`;

const Greeting = styled.div`
  font-weight: bold;
  font-size: 50px;

  @media screen and (max-width: 425px) {
    text-align: center;
    font-size: 15px;
  }
`;

const AboutDiv = styled.div`
  margin-top: 30px;
`;

const EachDiv = styled.div`
  margin-bottom: 30px;

  @media screen and (max-width: 425px) {
    margin-bottom: 20px;
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 10px;

  @media screen and (max-width: 425px) {
    font-size: 13px;
  }
`;

const Content = styled.div`
  width: 600px;
  padding: 30px 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  color: black;
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 425px) {
    padding: 5px 5px;
    font-size: 10px;
    width: 80%;
  }
`;
