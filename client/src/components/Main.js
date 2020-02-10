import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import flatten from 'lodash/flatten'

import media from '../media'
import Story from './Story'
import NextPageBlock from './NextPageBlock'

const Container = styled.main`
  overflow: auto;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  & > :nth-child(2n) {
    background: ${({ theme }) => theme.evenArticleBackground};
  }
  ${media.sm`
    display: flex;
    flex-wrap: wrap;
    & > :nth-child(2n) {
      background: none;
    }
    & > :nth-child(2n) {
      border-left: ${({ theme }) => theme.border && `1px solid ${rgba(theme.border, 0.3)}`};
    }
    & > :nth-child(4n) {
      background: ${({ theme }) => theme.evenArticleBackground};
    }
    & > :nth-child(4n-3) {
      background: ${({ theme }) => theme.evenArticleBackground};
    }
  `}
  ${media.md`
    & > :nth-child(4n),
    & > :nth-child(4n-3) {
      background: none;
    }
    & > :nth-child(2n) {
      border-left: none;
      background: ${({ theme }) => theme.evenArticleBackground};
    }
    & > :nth-child(3n),
    & > :nth-child(3n-1) {
      border-left: ${({ theme }) => theme.border && `1px solid ${rgba(theme.border, 0.3)}`};
    }
  `}
`

const Main = ({
  storiesToRender,
  isLoadingMeta,
  isLoadingPages,
  onNextBlockVisibilityChange,
  searchString
}) => (
  <Container>
    {flatten(storiesToRender).map(story => (
      <Story isLoading={isLoadingMeta} story={story} />
    ))}
    {storiesToRender.length > 0 && searchString.length === 0 && (
      <NextPageBlock
        onChange={onNextBlockVisibilityChange}
        isLoadingPages={isLoadingPages}
      />
    )}
  </Container>
)

export default Main
