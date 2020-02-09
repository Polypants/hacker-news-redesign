import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

const size = 50

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${rem(size)};
  width: 100%;
  background: ${({ theme }) => theme.navbarBackground};
  border-bottom: 1px solid gray;
  flex-shrink: 0;
  flex-grow: 0;
`

const MenuButton = styled.div`
  height: ${rem(size)};
  width: ${rem(size)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MenuLine = styled.div`
  height: ${rem(3)};
  width: ${rem(25)};
  background: ${({ theme }) => theme.text};
  & + & {
    margin-top: ${rem(4)};
  }
`

const Title = styled.h1`
  margin: 0 0 0 ${rem(12.5)};
  font-size: ${rem(24)};
`

const Navbar = () => (
  <Container>
    <Title>Hacker News</Title>
    <MenuButton>
      <MenuLine />
      <MenuLine />
    </MenuButton>
  </Container>
)

export default Navbar
