import React from 'react'
import styled from 'styled-components'

const Container = styled.main`
  overflow: auto;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 100%;
`

const Main = ({ stories }) => (
  <Container>
    {stories.map(page => (
      page.map(story => (
        <div>
          <p>{story.by}</p>
          <h1>{story.title}</h1>
          <img src={story.imageURL} width="300" />
          <a href={story.url} target="_blank">link</a>
        </div>
      ))
    ))}
  </Container>
)

export default Main
