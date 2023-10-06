import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { BiSolidUserCircle } from 'react-icons/bi';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import MenuLinkTo from './MenuLinkTo';
import styled from 'styled-components';

const Navbar = () => {
  const { signedInUser_id, setSignedInUser_id } = useContext(UserContext);

  useEffect(() => {
    console.log(signedInUser_id);
  }, [signedInUser_id]);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('user');
    setSignedInUser_id(null);
    window.alert('Signed out successfully!');
    navigate('/');
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
                <Link to={`/myPage/${signedInUser_id._id}`}>
                  <UserIcon size={'2em'} />
                </Link>
                <SignInUpOutLink to='/' onClick={handleClick}>
                  Sign out
                </SignInUpOutLink>
              </GreetUser>
            ) : (
              <AccountDiv>
                <SignInUpOutLink to='/signIn'>Sign in</SignInUpOutLink>
                <SignInUpOutLink to='/signUp'>Sign up</SignInUpOutLink>
              </AccountDiv>
            )}
          </SignInDiv>

          {!sidebar ? (
            <MenuBtn>
              <MenuIcon size={'2rem'} onClick={showSidebar} />
            </MenuBtn>
          ) : (
            <CloseIcon size={'2rem'} onClick={showSidebar} />
          )}
        </NavbarContainer>
      </Nav>

      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <MenuLinkTo path='/' title='Home' />
          <MenuLinkTo path='/about' title='About' />
          <MenuLinkTo path='/searchSongs' title='Search Songs' />
          <MenuLinkTo path='/contact' title='Contact' />
          {signedInUser_id && (
            <>
              {' '}
              <MenuLinkTo
                path={`/myPage/${signedInUser_id._id}`}
                title='My Page'
              />
              <SignOutDiv>
                <SideBarSignOutLink to='/' onClick={handleClick}>
                  Sign out
                </SideBarSignOutLink>
              </SignOutDiv>
            </>
          )}

          {!signedInUser_id && (
            <>
              <MenuLinkTo path='/signIn' title='Sign In' />
              <MenuLinkTo path='/signUp' title='Sign Up' />
            </>
          )}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  position: fixed;
  background-color: #433e3d;
  height: 50px;
  width: 100%;
  top: 0px;
  z-index: 900;

  @media screen and (min-width: 425px) {
    height: 55px;
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    height: 70px;
    width: 100%;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  font-size: 20px;

  @media screen and (min-width: 425px) {
    height: 55px;
  }

  @media screen and (min-width: 768px) {
    height: 70px;
  }
`;

const Logo = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-left: 20px;
  font-family: Arial Black;

  @media screen and (min-width: 425px) {
    font-size: 13px;
    height: 50px;
    margin-left: 20px;
    margin-top: 10px;
  }

  @media screen and (min-width: 768px) {
    font-size: 17px;
    margin-left: 30px;
    height: 60px;
  }
`;

const Logo1 = styled.div`
  text-align: center;
  color: white;
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

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const NavUl = styled.ul`
  display: none;

  @media screen and (min-width: 769px) {
    display: flex;
    align-items: center;
    list-style: none;
  }
`;

const NavbarLink = styled(Link)`
  color: #e8dede;
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  margin: 20px;

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
  display: none;

  @media screen and (min-width: 769px) {
    display: block;
    color: white;
    display: flex;
    align-items: center;
  }
`;

const AccountDiv = styled.div`
  display: none;

  @media screen and (min-width: 769px) {
    display: block;
  }
`;

const SignInUpOutLink = styled(Link)`
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
    color: #e59b8a;
  }
`;

const MenuBtn = styled.button`
  display: block;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 15px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const MenuIcon = styled(BiMenu)`
  display: block;
  color: white;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  background: #f3edeb;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50px;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;

  @media screen and (min-width: 426px) {
    top: 55px;
  }

  @media screen and (min-width: 768px) {
    top: 70px;
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const CloseIcon = styled(AiOutlineClose)`
  display: block;
  color: white;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 15px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const SignOutDiv = styled.div`
  margin-top: 20px;
  margin-left: 18px;
`;

const SideBarSignOutLink = styled(Link)`
  color: black;
`;
