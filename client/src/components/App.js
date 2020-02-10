import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'
import Fuse from 'fuse.js'
import flatten from 'lodash/flatten'

import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'
import baseTheme from '../themes/base'
import Head from './Head'
import Navbar from './Navbar'
import CreateModal from './CreateModal'
import CreateModalToggle from './CreateModalToggle'
import Main from './Main'

export const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0/'
export const API_STORY_IDS = `${API_BASE_URL}topstories.json`
export const postsPerPage = 30

// options for fuzzy search library
const fuseOptions = {
  threshold: 0.2,
  keys: [
    { name: 'by', weight: 0.1 },
    { name: 'title', weight: 0.6 },
    { name: 'description', weight: 0.3 }
  ]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const App = () => {
  const [storyIDs, setStoryIDs] = useState([])
  const [stories, setStories] = useState([])
  const [pageNum, setPageNum] = useState(0)
  const [isLoadingPages, setIsLoadingPages] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [searchedStories, setSearchedStories] = useState([])
  const [filter, setFilter] = useState(null)
  const [isLoadingMeta, setIsLoadingMeta] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const getNextPageOfStories = async () => {
    setIsLoadingPages(true)
    // get the next page of stories from api
    const newStories = await Promise.all(
      storyIDs
        .slice(postsPerPage * pageNum, postsPerPage * (pageNum + 1))
        .map(id => axios.get(`${API_BASE_URL}item/${id}.json`))
    )
    setStories([...stories, newStories.map(({ data }) => data)])
    setIsLoadingPages(false)
    setIsLoadingMeta(true)
    // get meta data for the new stories
    const newStoriesWithImages = await Promise.all(newStories.map(async ({ data }) => {
      const { data: metaData } = await axios.get('/api/get-image', { params: { url: data.url } })
      return {
        ...data,
        imageURL: metaData.image || null,
        description: metaData.description || null,
        isMetaLoaded: true
      }
    }))
    setStories([...stories.slice(0, pageNum), newStoriesWithImages])
    setIsLoadingMeta(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen)
  }

  const onNextBlockVisibilityChange = isVisible => {
    // increment page number
    if (isVisible && !isLoadingPages) setPageNum(pageNum + 1)
  }

  useEffect(() => {
    // detect dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
    }
    // fetch story ID list
    axios.get(API_STORY_IDS).then(({ data }) => {
      setStoryIDs(data)
    })
  }, [])

  useEffect(() => {
    // when the story IDs have been fetched, increment the page number
    if (storyIDs.length > 0) setPageNum(pageNum + 1)
  }, [storyIDs])

  useEffect(() => {
    // when the page number is incremented, get the next page of stories
    if (storyIDs.length > 0) getNextPageOfStories()
  }, [pageNum])

  useEffect(() => {
    // when search string, fuzzy search for search string
    const fuse = new Fuse(flatten(stories), fuseOptions)
    const results = fuse.search(searchString)
    setSearchedStories(results)
  }, [searchString, pageNum])

  // calculate the final story array to render based on search query and filters
  const storiesToRender = (searchedStories.length > 0 ? searchedStories : flatten(stories))
    .filter((_e, i) => {
      if (filter === 'even') return i % 2 === 0
      if (filter === 'odd') return i % 2 === 1
      return true
    })

  return (
    <ThemeProvider theme={{ ...(isDarkMode ? darkTheme : lightTheme), ...baseTheme }}>
      <>
        <Head />
        <Container>
          <Navbar
            toggleMenu={toggleMenu}
            isMenuOpen={isMenuOpen}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            searchString={searchString}
            setSearchString={setSearchString}
            filter={filter}
            setFilter={setFilter}
          />
          <Main
            storiesToRender={storiesToRender}
            isLoadingMeta={isLoadingMeta}
            onNextBlockVisibilityChange={onNextBlockVisibilityChange}
            isLoadingPages={isLoadingPages}
            searchString={searchString}
          />
          <CreateModal isOpen={isCreateModalOpen} />
          <CreateModalToggle
            toggleCreateModal={toggleCreateModal}
            isCreateModalOpen={isCreateModalOpen}
          />
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App
