import React from 'react'

import Story from './Story'

const Main = ({ stories }) => (
  <>
    {stories.map(page => (
      page.map(story => (
        <Story story={story} />
      ))
    ))}
  </>
)

export default Main
