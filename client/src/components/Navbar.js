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
  background: red;
`

const Navbar = () => {
  return (
    <Container>
      <h1>Hacker News</h1>
      <MenuButton>

      </MenuButton>
    </Container>
  )
}

export default Navbar
