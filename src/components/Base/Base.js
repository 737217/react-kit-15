import React from 'react';
import styled from 'styled-components';
// import FontAwesome from "react-fontawesome";

export const Text = styled.div`
  text-align: ${props => props.align || 'left'};
  padding: ${props => props.padding || undefined};
  font-size: ${props => props.size || '16px'};
  color: ${props => props.color || '#000'};
  margin: ${props => props.margin || '0'};
  line-height: ${props => props.lineHeight || 'unset'};
`;

export const Image = styled.div`
  background-image: ${props => (props.src ? `url(${props.src})` : undefined)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${props => props.height || 'unset'};
`;

export const BodyWrapper = styled.div`
  color: #333;
  width: 1116px;
  margin: 0 auto 0;
  position: relative;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
  &.map-view{
    padding: 0 16px;
  }
  @media (max-width: 1023px){
    max-width: 768px
  }
  @media (max-width: 767px){
    max-width: 425px
  }
  @media (max-width: 424px){
    width: 320px
  }
  @media (max-width: 320px){
  
  }
`;

// export const TimesIcon = (props) => <FontAwesome {...props} name='times' />;
// export const MagicIcon = (props) => <FontAwesome {...props} name='magic' />;
