import React from 'react'
import { Helmet } from 'react-helmet'
import { createGlobalStyle, ThemeConsumer } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
  }
  body {
    margin: 0;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.background};
    font-family: 'Nunito', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    box-sizing: border-box;
  }
`

const Head = () => (
  <>
    <ThemeConsumer>
      {theme => (
        <Helmet>
          <meta name="theme-color" content={theme.metaThemeColor} />
        </Helmet>
      )}
    </ThemeConsumer>
    <GlobalStyle />
  </>
)

export default Head
