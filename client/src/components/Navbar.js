import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BiSolidUserCircle } from 'react-icons/bi';
import styled from 'styled-components';

const Navbar = () => {
  const { signedInUser_id, setSignedInUser_id } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('user');
    setSignedInUser_id(null);
    window.alert('Signed out successfully!');
    navigate('/');
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <LogoLink to='/'>
            <Logo>
              <Logo1>The</Logo1>
              <Div>
                <Logo2>Lyrics</Logo2>
                <Logo3>World</Logo3>
              </Div>
            </Logo>
          </LogoLink>
          <NavUl>
            <li>
              <NavbarLink to='/'>Home</NavbarLink>
            </li>
            <li>
              <NavbarLink to='/about'>About</NavbarLink>
            </li>
            <li>
              <NavbarLink to='/searchSongs'>Search songs</NavbarLink>
            </li>
            <li>
              <NavbarLink to='/contact'>Contact</NavbarLink>
            </li>
          </NavUl>
          <SignInDiv>
            {signedInUser_id ? (
              <GreetUser>
                Hi, {signedInUser_id._id}
                <NavLink to={`/myPage/${signedInUser_id._id}`}>
                  <UserIcon size={'2em'} />
                </NavLink>
                <SignInUpOutLink to='/' onClick={handleClick}>
                  Sign out
                </SignInUpOutLink>
              </GreetUser>
            ) : (
              <div>
                <SignInUpOutLink to='/signIn'>Sign in</SignInUpOutLink>
                <SignInUpOutLink to='/signUp'>Sign up</SignInUpOutLink>
              </div>
            )}
          </SignInDiv>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

const Nav = styled.div`
  position: fixed;
  background-color: #988c87;
  height: 70px;
  top: 0px;
  width: 100%;
  z-index: 900;
`;

const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0px;
  height: 70px;
  font-size: 20px;
`;

const Logo = styled.div`
  margin-left: 30px;
  height: 60px;
  font-family: Arial Black;
`;

const Logo1 = styled.div`
  text-align: center;
  font-size: 17px;
  color: black;
`;

const Div = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  text-decoration: green wavy underline;
`;

const Logo2 = styled.div`
  font-style: italic;
  color: #ffa500;
  margin-right: 10px;
`;

const Logo3 = styled.div`
  font-style: italic;
  color: white;
`;

const LogoLink = styled(NavLink)`
  text-decoration: none;
`;

const NavUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const NavbarLink = styled(NavLink)`
  color: black;
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  margin-right: 50px;

  &:hover {
    color: white;
  }

  &.active {
    color: white;
    font-weight: bold;
    font-size: larger;
    text-shadow: 3px 3px black;
  }
`;

const SignInDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const GreetUser = styled.div`
  color: white;
  display: flex;
  align-items: center;
`;

const SignInUpOutLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-left: 15px;
  border: 2px solid white;
  border-radius: 5px;
  padding: 3px 10px;

  &:hover {
    border: 2px solid black;
    color: black;
  }
`;

const UserIcon = styled(BiSolidUserCircle)`
  padding-left: 5px;
  color: white;
  display: flex;
  align-items: center;

  &:hover {
    color: #514f4f;
  }
`;
