import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'

import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'
import baseTheme from '../themes/base'
import { API_BASE_URL, TOP_STORY_IDS, POSTS_PER_PAGE } from '../constants'
import Head from './Head'
import Main from './Main'
import NextPageBlock from './NextPageBlock'
import Navbar from './Navbar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const ScrollingContent = styled.main`
  overflow: auto;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
`

const App = () => {
  const [theme, setTheme] = useState({ ...lightTheme, ...baseTheme })
  const [storyIDs, setStoryIDs] = useState([])
  const [stories, setStories] = useState([])
  const [pageNum, setPageNum] = useState(0)
  const [isLoadingPages, setIsLoadingPages] = useState(false)

  const getNextPageOfStories = async () => {
    setIsLoadingPages(true)
    const newStories = await Promise.all(
      storyIDs
        .slice(POSTS_PER_PAGE * pageNum, POSTS_PER_PAGE * (pageNum + 1))
        .map(id => axios.get(`${API_BASE_URL}item/${id}.json`))
    )
    setStories([...stories, newStories.map(({ data }) => data)])
    setIsLoadingPages(false)

    const newStoriesWithImages = await Promise.all(newStories.map(async ({ data }) => {
      const metaData = await axios.get('/api/get-image', { params: { url: data.url } })
      return { ...data, imageURL: metaData.data.image || null }
    }))
    setStories([...stories.slice(0, pageNum), newStoriesWithImages])
  }

  const onNextBlockVisibilityChange = isVisible => {
    if (isVisible && !isLoadingPages) setPageNum(pageNum + 1)
  }

  useEffect(() => {
    axios.get(TOP_STORY_IDS).then(({ data }) => {
      setStoryIDs(data)
    })
  }, [])

  useEffect(() => {
    if (storyIDs.length > 0) setPageNum(pageNum + 1)
  }, [storyIDs])

  useEffect(() => {
    if (storyIDs.length > 0) getNextPageOfStories()
  }, [pageNum])

  return (
    <ThemeProvider theme={theme}>
      <>
        <Head />
        <Container>
          <Navbar />
          <ScrollingContent>
            <Main stories={stories} />
            {stories.length > 0 && <NextPageBlock onChange={onNextBlockVisibilityChange} />}
          </ScrollingContent>
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App