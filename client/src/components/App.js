import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'

import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'
import { API_BASE_URL, TOP_STORY_IDS, POSTS_PER_PAGE } from '../constants'
import Head from './Head'
import Main from './Main'
import NextPageBlock from './NextPageBlock'
import Navbar from './Navbar'

const ScrollingContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
  width: 100%;
`

const App = () => {
  const [theme, setTheme] = useState(lightTheme)
  const [storyIDs, setStoryIDs] = useState([])
  const [stories, setStories] = useState([])
  const [pageNum, setPageNum] = useState(0)

  const getNextPageOfStories = async () => {
    const newStories = await Promise.all(
      storyIDs
        .slice(POSTS_PER_PAGE * pageNum, POSTS_PER_PAGE * (pageNum + 1))
        .map(id => axios.get(`${API_BASE_URL}item/${id}.json`))
    )
    setStories([...stories, newStories.map(({ data }) => data)])

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
        <ScrollingContent>
          <Navbar />
          <Main stories={stories} />
          {stories.length > 0 && <NextPageBlock onChange={onNextBlockVisibilityChange} />}
        </ScrollingContent>
      </>
    </ThemeProvider>
  )
}

export default App