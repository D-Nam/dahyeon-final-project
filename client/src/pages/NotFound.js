import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <ErrorContainer>
      <h1>Oops! You seem to be lost.</h1>
      <h2>
        Here are some helpful links:
        <LinkElement to='/'>Home</LinkElement>
        <LinkElement to='/contact'>Contact</LinkElement>
      </h2>
    </ErrorContainer>
  );
};

export default NotFound;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const LinkElement = styled(Link)`
  text-decoration: none;
  color: brown;
  margin-left: 20px;

  &:hover {
    color: red;
  }
`;
