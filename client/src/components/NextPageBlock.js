import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import styled from 'styled-components'
import { rem } from 'polished'

const Container = styled.div`
  height: ${rem(400)};
  width: 100%;
  background: ${({ isVisible }) => isVisible ? 'orange' : 'green'};
  transition: background 0.3s;
  text-align: center;
`

const NextPageBlock = ({ onChange }) => (
  <VisibilitySensor onChange={onChange}>
    {({ isVisible }) => (
      <Container isVisible={isVisible}>
        scroll down for more stories
      </Container>
    )}
  </VisibilitySensor>
)

export default NextPageBlock
