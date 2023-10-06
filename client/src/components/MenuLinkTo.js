import { Link } from 'react-router-dom';

import styled from 'styled-components';

const MenuLinkTo = ({ path, title }) => {
  return (
    <>
      <SidebarLink to={path}>
        <div>
          <SidebarLabel>{title}</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default MenuLinkTo;

const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    color: white;
    border-left: 4px solid #e59b8a;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 18px;
`;
