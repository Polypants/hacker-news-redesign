import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { rem, rgba, em } from 'polished'
import { useDropzone } from 'react-dropzone'
import Typist from 'react-typist'

import media from '../media'

const titles = [
  'Say whaaaaat?',
  'Submit your story.',
  "What's the scoop?",
  'Spread the word.',
  'Hear any good ones lately?',
  "Paste that $!#% in.",
  "What'd they do this time?",
  'Tell mama.'
]

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.createModalBackground};
  z-index: 4;
  transition: opacity 0.3s;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  pointer-events: ${({ isOpen }) => !isOpen && 'none'};
  overflow: auto;
  ${media.sm`
    align-items: center;
  `}
  @media (max-height: ${em(650)}) {
    align-items: flex-start;
  }
`

const Content = styled.div`
  max-width: ${rem(700)};
  width: 100%;
  transition: opacity 0.3s 0.5s;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  padding: ${({ theme }) => `0 ${theme.sideSpace.xs}`};
  ${media.sm`
    margin: 0 ${rem(70)};
  `}
`

const Title = styled.h1`
  color: ${({ theme }) => theme.createTitle};
  font-size: ${rem(48)};
  margin: 0;
  ${media.md`
    font-size: ${rem(48)};
  `}
`

const TitleContainer = styled.div`
  height: ${rem(200)};
  display: flex;
  align-items: center;
  ${media.sm`
    height: ${rem(100)};
  `}
`

const Dropzone = styled.div`
  width: 100%;
  height: ${rem(150)};
  background: ${({ theme }) => theme.menuPanelAccent};
  border-radius: ${rem(15)};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => `${rem(4)} dashed ${rgba(theme.text, 0.3)}`};
  position: relative;
  cursor: pointer;
  margin-bottom: ${rem(26)};
  &:focus {
    outline: none;
  }
  ${media.sm`
    height: ${rem(300)};
  `}
`

const ImagePreview = styled.img`
  object-fit: contain;
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
`

const Input = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  border-bottom: ${({ theme }) => `1px solid ${theme.text}`};
  width: 100%;
  font-size: ${rem(36)};
  margin-bottom: ${rem(20)};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => rgba(theme.text, 0.3)};
  }
`

const Textarea = styled.textarea`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  border-bottom: ${({ theme }) => `1px solid ${theme.text}`};
  width: 100%;
  font-size: ${rem(24)};
  margin-bottom: ${rem(20)};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => rgba(theme.text, 0.3)};
  }
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${rem(3)};
  height: ${rem(40)};
  background: ${({ theme }) => theme.menuPanelAccent};
  border-radius: ${rem(40)};
  width: ${rem(80)};
`

const ToggleCircle = styled.div`
  height: ${rem(34)};
  width: ${rem(34)};
  border-radius: 50%;
  border: ${({ theme }) => `${rem(3)} solid ${rgba(theme.text, 0.5)}`};
  transition: transform 0.3s cubic-bezier(0.7, 0, 0.3, 1);
  transform: ${({ isActive }) => !isActive && `translateX(${rem(40)})`};
`

const ToggleOuter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: ${rem(30)};
`

const ToggleLabel = styled.label`
  margin-left: ${rem(15)};
  font-size: ${rem(12)};
  cursor: pointer;
`

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${rem(80)};
  ${media.sm`
    margin-bottom: 0;
  `}
`

const Submit = styled.button`
  height: ${rem(40)};
  width: ${rem(100)};
  border-radius: ${rem(10)};
  border: none;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.menuPanelAccent};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`

const CreateModal = ({ isOpen }) => {
  const [image, setImage] = useState()
  const [showTitle, setShowTitle] = useState(false)
  const [isURLInput, setIsURLInput] = useState(true)
  const [titleIndex, setTitleIndex] = useState(0)
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        console.log(e.target.result)
        setImage(e.target.result)
      }
      reader.readAsDataURL(file);
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const toggleURLInput = () => {
    setIsURLInput(!isURLInput)
  }
  useEffect(() => {
    if (isOpen) setShowTitle(true)
    else {
      setTitleIndex((titleIndex + 1) % titles.length)
      setTimeout(() => {
        setShowTitle(false)
      }, 300)
    }
  }, [isOpen])
  return (
    <Container isOpen={isOpen}>
      <Content isOpen={isOpen}>
        <TitleContainer>
          {(isOpen || showTitle) && (
            <Typist cursor={{ show: false }} avgTypingDelay={50} stdTypingDelay={5}>
              <Typist.Delay ms={500} />
              <Title>{titles[titleIndex]}</Title>
            </Typist>
          )}
        </TitleContainer>
        <Dropzone {...getRootProps()}>
          <ImagePreview src={image} alt="preview uploaded file" />
          <input {...getInputProps()} />
          <p>{isDragActive ? 'Drop the files here...' : 'Drag files in or Click to upload'}</p>
        </Dropzone>
        <Input placeholder="Title" />
        {isURLInput && <Input placeholder="URL" />}
        {!isURLInput && <Textarea placeholder="Text" />}
        <BottomSection>
          <ToggleOuter onClick={toggleURLInput}>
            <ToggleContainer>
              <ToggleCircle isActive={isURLInput} />
            </ToggleContainer>
            <ToggleLabel>Use text input</ToggleLabel>
          </ToggleOuter>
          <Submit>Submit</Submit>
        </BottomSection>
      </Content>
    </Container>
  )
}

export default CreateModal
