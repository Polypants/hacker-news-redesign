import React from 'react'
import styled from 'styled-components'
import { rem, rgba } from 'polished'

import media from '../media'
import { ReactComponent as SearchIconSVG } from '../assets/search.svg'
import { ReactComponent as ClearSearchSVG } from '../assets/close.svg'

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.navbarHeight.xs};
  width: 100%;
  background: ${({ theme }) => theme.navbarBackground};
  border-bottom: ${({ theme }) => theme.border && `1px solid ${rgba(theme.border, 0.3)}`};
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 2;
  transition: box-shadow 0.2s;
  box-shadow: ${({ theme }) => theme.shadow && `0 0 6px ${theme.shadow}`};
  ${media.sm`
    height: ${({ theme }) => theme.navbarHeight.sm};
  `}
`

const MenuButton = styled.div`
  height: ${({ theme }) => theme.navbarHeight.xs};
  width: ${({ theme }) => theme.navbarHeight.xs};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 3;
  ${media.sm`
    height: ${({ theme }) => theme.navbarHeight.sm};
    width: ${({ theme }) => theme.navbarHeight.sm};
  `}
`

const MenuLine = styled.div`
  height: ${rem(3)};
  width: ${rem(25)};
  background: ${({ theme }) => theme.text};
  transition: transform 0.3s;
  transform-origin: 38% 50%;
  flex: 0 0 auto;
`

const MenuLine1 = styled(MenuLine)`
  ${({ isMenuOpen }) => isMenuOpen && `transform: rotate(45deg) translateX(${rem(2)});`}
`

const MenuLine2 = styled(MenuLine)`
  margin-top: ${rem(4)};
  ${({ isMenuOpen }) => isMenuOpen && `transform: rotate(-45deg) translateX(${rem(2)});`}
`

const Title = styled.p`
  margin: 0 0 0 ${rem(12.5)};
  font-size: ${rem(24)};
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  ${media.sm`
    font-size: ${rem(32)};
  `}
`

const MenuPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.menuPanelBackground};
  padding: ${({ theme }) => `${theme.navbarHeight.xs} ${theme.sideSpace.xs} 0`};
  transition: transform 0.3s;
  z-index: 2;
  ${({ isMenuOpen }) => !isMenuOpen && 'transform: translateX(100%);'}
  ${media.sm`
    box-shadow: ${({ theme }) => theme.shadow && `0 0 6px ${theme.shadow}`};
    border-left: ${({ theme }) => theme.border && `1px solid ${rgba(theme.border, 0.3)}`};
    padding: ${({ theme }) => `${theme.navbarHeight.sm} ${theme.sideSpace.sm} 0`};
    width: ${rem(400)};
    left: auto;
  `}
`

const RightSideContent = styled.div`
  display: flex;
  align-items: center;
  z-index: 3;
  position: fixed;
  top: 0;
  right: 0;
  & > * + * {
    margin-left: ${rem(10)};
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${rem(40)};
  background: ${({ theme }) => theme.menuPanelAccent};
  border-radius: ${rem(40)};
  padding: ${rem(10)};
  ${({ desktopOnly }) => desktopOnly && 'display: none;'}
  ${media.sm`
    width: ${rem(300)};
    ${({ desktopOnly }) => desktopOnly && 'display: flex;'}
    ${({ mobileOnly }) => mobileOnly && 'display: none;'}
  `}
`

const SearchIcon = styled(SearchIconSVG)`
  height: ${rem(20)};
  width: ${rem(20)};
  fill: ${({ theme }) => theme.text};
`

const ClearSearch = styled(ClearSearchSVG)`
  height: ${rem(12)};
  width: ${rem(12)};
  fill: ${({ theme }) => theme.text};
  margin-right: ${rem(4)};
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: ${({ isActive }) => isActive ? 1 : 0 };
`

const SearchField = styled.input.attrs({
  type: 'text',
  placeholder: 'Search top stories...'
})`
  height: 100%;
  flex-grow: 1;
  margin: 0 ${rem(10)};
  font-size: ${rem(16)};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) => rgba(theme.text, 0.3)};
  }
  &:focus {
    outline: none;
  }
`

const MenuPanelLine = styled.div`
  width: 10%;
  height: 1px;
  background: ${({ theme }) => rgba(theme.text, 0.1)};
  margin: ${rem(18)} 0 ${rem(10)};
  align-self: center;
  ${media.sm`
    ${({ mobileOnly }) => mobileOnly && 'display: none;'}
  `}
`

const MenuPanelTitle = styled.p`
  font-size: ${rem(18)};
  margin: 0 0 ${rem(6)} 0;
`

const EvenOddFiltersContainer = styled.div`
  display: flex;
  height: ${rem(40)};
  border-radius: ${rem(10)};
  overflow: hidden;
  & > :nth-child(2) {
    ${({ theme, isActive }) => !isActive && `border-left: 1px solid ${rgba(theme.text, 0.1)}`};
  }
`

const FilterButton = styled.button`
  width: 100%;
  border: none;
  background: ${({ theme, isActive }) => isActive ? theme.menuPanelAccentActive : theme.menuPanelAccent};
  color: ${({ theme }) => theme.text};
  font-size: ${rem(14)};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${rem(3)};
  height: ${rem(40)};
  background: ${({ theme }) => theme.menuPanelAccent};
  border-radius: ${rem(40)};
  width: ${rem(80)};
  cursor: pointer;
`

const ThemeToggleCircle = styled.div`
  height: ${rem(34)};
  width: ${rem(34)};
  border-radius: 50%;
  border: ${({ theme }) => `${rem(3)} solid ${rgba(theme.text, 0.5)}`};
  transition: transform 0.3s cubic-bezier(0.7, 0, 0.3, 1);
  transform: ${({ isDarkMode }) => isDarkMode && `translateX(${rem(40)})`};
`

const Navbar = ({
  toggleMenu,
  isMenuOpen,
  toggleDarkMode,
  isDarkMode,
  searchString,
  setSearchString,
  filter,
  setFilter
}) => {
  const onSearchChange = event => {
    setSearchString(event.target.value)
  }

  const onSearchClearClick = () => {
    setSearchString('')
  }

  const onEvenClick = () => {
    if (filter === 'even') setFilter(null)
    else setFilter('even')
  }

  const onOddClick = () => {
    if (filter === 'odd') setFilter(null)
    else setFilter('odd')
  }

  return (
    <Container>
      <Title>Hacker News</Title>
      <MenuPanel isMenuOpen={isMenuOpen}>
        <SearchContainer mobileOnly>
          <SearchIcon />
          <SearchField value={searchString} onChange={onSearchChange} />
          <ClearSearch isActive={searchString.length > 0} onClick={onSearchClearClick} />
        </SearchContainer>
        <MenuPanelLine mobileOnly />
        <MenuPanelTitle>Filters</MenuPanelTitle>
        <EvenOddFiltersContainer isActive={filter}>
          <FilterButton
            onClick={onEvenClick}
            isActive={filter === 'even'}
          >
            Even
          </FilterButton>
          <FilterButton
            onClick={onOddClick}
            isActive={filter === 'odd'}
          >
            Odd
          </FilterButton>
        </EvenOddFiltersContainer>
        <MenuPanelLine />
        <MenuPanelTitle>Dark Mode</MenuPanelTitle>
        <ThemeToggleContainer onClick={toggleDarkMode}>
          <ThemeToggleCircle isDarkMode={isDarkMode} />
        </ThemeToggleContainer>
      </MenuPanel>
      <RightSideContent>
        <SearchContainer desktopOnly>
          <SearchIcon />
          <SearchField value={searchString} onChange={onSearchChange} />
          <ClearSearch isActive={searchString.length > 0} onClick={onSearchClearClick} />
        </SearchContainer>
        <MenuButton onClick={toggleMenu} >
          <MenuLine1 isMenuOpen={isMenuOpen} />
          <MenuLine2 isMenuOpen={isMenuOpen} />
        </MenuButton>
      </RightSideContent>
    </Container>
  )
}

export default Navbar
