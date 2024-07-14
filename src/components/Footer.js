import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 20px;
  background-color: #f1f1f1;
  position: relative; /* Ensure footer is not fixed */
  bottom: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 My App. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
