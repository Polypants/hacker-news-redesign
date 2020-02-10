import React from 'react'
import styled, { keyframes } from 'styled-components'
import { rem, rgba } from 'polished'
import moment from 'moment'
import VisibilitySensor from 'react-visibility-sensor'

import media from '../media'

const Container = styled.div`
  border-bottom: ${({ theme }) => theme.border && `1px solid ${rgba(theme.border, 0.3)}`};
  position: relative;
  overflow-wrap: break-word;
  ${media.sm`
    width: 50%;
  `}
  ${media.md`
    width: ${100 / 3}%;
  `}
`

const Image = styled.div`
  width: 100%;
  height: ${rem(220)};
  filter: ${({ isVisible }) => isVisible ? 'none' : 'grayscale(1)'};
  transition: filter 0.3s;
  background-image: ${({ src }) => `url(${src})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

const Title = styled.h2`
  padding: ${({ theme }) => `0 ${theme.sideSpace.xs}`};
  margin: ${rem(12)} 0 ${rem(6)} 0;
`

const Description = styled.p`
  padding: ${({ theme }) => `0 ${theme.sideSpace.xs}`};
  margin: 0 0 ${rem(8)} 0;
`

const Details = styled.p`
  padding: ${({ theme }) => `0 ${theme.sideSpace.xs}`};
  margin: 0 0 ${rem(6)} 0;
  font-size: ${rem(12)};
`

const Link = styled.a.attrs({
  target: '_blank'
})`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  &:hover ${Title} {
    text-decoration: underline;
  }
`

const loadingSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = styled.div`
  height: ${rem(2)};
  width: ${rem(10)};
  background: ${({ theme }) => rgba(theme.text, 0.3)};
  position: absolute;
  bottom: ${rem(12)};
  right: ${rem(8)};
  animation: ${loadingSpin} 0.8s linear infinite;
`

const Story = ({ story, isLoading }) => {
  const timeAgo = moment.unix(story.time).fromNow()
  const shortenedDescription = (story.description && story.description.length > 300)
    ? `${story.description.slice(0, 300)}...`
    : story.description
  return (
    <Container>
      <Link href={story.url} target="_blank">
        <Title>{story.title}</Title>
        {shortenedDescription && <Description>{shortenedDescription}</Description>}
        <Details>{story.score} points - by {story.by} - {timeAgo}</Details>
      </Link>
      <VisibilitySensor partialVisibility={true} offset={{ top: 200, bottom: 200 }}>
        {({ isVisible }) => story.imageURL ? <Image isVisible={isVisible} src={story.imageURL} /> : null}
      </VisibilitySensor>
      {isLoading && !story.isMetaLoaded && <LoadingSpinner />}
    </Container>
  )
}

export default Story
