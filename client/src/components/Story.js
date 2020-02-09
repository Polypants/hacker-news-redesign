import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import moment from 'moment'
import VisibilitySensor from 'react-visibility-sensor'

const StoryContainer = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.text}`};
`

const StoryImage = styled.img`
  width: 100%;
  filter: ${({ isVisible }) => isVisible ? 'none' : 'grayscale(1)'};
  transition: filter 0.3s;
`

const StoryTitle = styled.h2`
  padding: ${({ theme }) => `0 ${theme.sideSpace}`};
  margin: ${rem(12)} 0;
`

const StoryDetails = styled.p`
  padding: ${({ theme }) => `0 ${theme.sideSpace}`};
  margin: 0 0 ${rem(6)} 0;
  font-size: ${rem(12)};
`

const StoryLink = styled.a.attrs({
  target: '_blank'
})`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
`

const Story = ({ story }) => {
  const timeAgo = moment.unix(story.time).fromNow()
  return (
    <StoryContainer>
      <StoryLink href={story.url} target="_blank">
        <StoryTitle>{story.title}</StoryTitle>
        <VisibilitySensor partialVisibility={true} offset={{ top: 200, bottom: 200 }}>
          {({ isVisible }) => (
            story.imageURL ? <StoryImage isVisible={isVisible} src={story.imageURL} /> : null
          )}
        </VisibilitySensor>
        <StoryDetails>{story.score} points - by {story.by} - {timeAgo}</StoryDetails>
      </StoryLink>
    </StoryContainer>
  )
}

export default Story
