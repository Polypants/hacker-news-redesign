import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { rem } from 'polished'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import VisibilitySensor from 'react-visibility-sensor'

import lightTheme from './themes/light'
import darkTheme from './themes/dark'

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0/'
const TOP_STORY_IDS = `${API_BASE_URL}topstories.json`
const POSTS_PER_PAGE = 30

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.background};
    font-family: 'Nunito', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const Wow = styled.div`
  border: 2px solid black;
`

const Image = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  background-color: gray;
`

const NextPageBlock = styled.div`
  height: ${rem(400)};
  width: 100%;
  background: ${({ isVisible }) => isVisible ? 'orange' : 'green'};
  transition: background 0.3s;
  text-align: center;
`

const App = () => {
  const [theme, setTheme] = useState(lightTheme)
  const [storyIDs, setStoryIDs] = useState([])
  const [stories, setStories] = useState([])
  const [pageNum, setPageNum] = useState(0)

  if (storyIDs.length === 0) {
    axios.get(TOP_STORY_IDS).then(({ data }) => {
      setStoryIDs(data)
    })
  }

  const getNextPageOfStories = async () => {
    const storyIDsForPage = storyIDs.slice(POSTS_PER_PAGE * pageNum, POSTS_PER_PAGE * (pageNum + 1))

    const newStories = await Promise.all(storyIDsForPage.map(id => axios.get(`${API_BASE_URL}item/${id}.json`)))
    setStories([...stories, newStories.map(({ data }) => data)])

    // construct a new array, the replace the old one using slice inside setStories
    const newStoriesWithImages = await Promise.all(newStories.map(async ({ data }) => {
      const metaData = await axios.get('/api/get-image', { params: { url: data.url } })
      return { ...data, imageURL: metaData.data.image || null }
    }))
    setStories([...stories.slice(0, pageNum), newStoriesWithImages])
  }

  const onNextBlockVisibilityChange = isVisible => {
    if (isVisible) setPageNum(pageNum + 1)
  }

  useEffect(() => {
    if (storyIDs.length !== 0) {
      getNextPageOfStories()
    }
  }, [storyIDs])

  useEffect(() => {
    if (stories.length > 0) {
      getNextPageOfStories()
    }
  }, [pageNum])

  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <meta name="theme-color" content={theme.metaThemeColor} />
        </Helmet>
       <GlobalStyle />
       {stories.map(page => (
         page.map(story => (
          <Wow>
            <p>{story.by}</p>
            <h1>{story.title}</h1>
            <Image url={story.imageURL} />
            <a href={story.url} target="_blank">{story.url}</a>
          </Wow>
         ))
       ))}
       {stories.length > 0 && (
          <VisibilitySensor onChange={onNextBlockVisibilityChange}>
            {({ isVisible }) => (
              <NextPageBlock isVisible={isVisible}>
                scroll down for more stories
              </NextPageBlock>
            )}
          </VisibilitySensor>
       )}
      </>
    </ThemeProvider>
  )
}

export default App