import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import styled, { keyframes } from 'styled-components'
import { rem } from 'polished'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${rem(400)};
  width: 100%;
  transition: background 0.3s;
  text-align: center;
`

const Text = styled.p`
  margin-top: ${rem(100)};
`

const arrowAnimation = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 1;
  }
  70% {
    transform: scaleY(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Arrow = styled.div`
  width: ${rem(2)};
  height: ${rem(30)};
  background: ${({ theme }) => theme.text};
  transform-origin: 50% 0;
  animation: ${arrowAnimation} 1s cubic-bezier(0, 0.3, 0.3, 1) infinite;
`

const loaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  width: ${rem(2)};
  height: ${rem(30)};
  background: ${({ theme }) => theme.text};
  animation: ${loaderAnimation} 0.8s linear infinite;
`

const NextPageBlock = ({ onChange, isLoadingPages }) => (
  <VisibilitySensor onChange={onChange}>
    {({ isVisible }) => (
      <Container isVisible={isVisible}>
        <Text>{isLoadingPages ? 'Loading...' : 'Scroll for more stories'}</Text>
        {isLoadingPages ? <Loader /> : <Arrow />}
      </Container>
    )}
  </VisibilitySensor>
)

export default NextPageBlock
