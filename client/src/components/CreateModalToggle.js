import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

import { ReactComponent as PenSVG } from '../assets/pen.svg'
import { ReactComponent as CloseSVG } from '../assets/close.svg'

const CreateNewStroyCircle = styled.div`
  position: fixed;
  bottom: ${rem(10)};
  left: ${rem(10)};
  height: ${rem(60)};
  width: ${rem(60)};
  background: ${({ theme }) => theme.createNewStroyCircleBackground};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;
  transition: ${({ isCreateModalOpen }) => isCreateModalOpen ? 'opacity 0.5s 0.1s ease-in-out, transform 0.5s 0.1s ease-in-out' : 'all 0.1s'};
  transform: ${({ isCreateModalOpen }) => isCreateModalOpen && 'scale(40)'};
  opacity: ${({ isCreateModalOpen }) => isCreateModalOpen && 0};
  pointer-events: ${({ isCreateModalOpen }) => isCreateModalOpen && 'none'};
`

const CloseCreateModal = styled(CloseSVG)`
  position: fixed;
  bottom: ${rem(10)};
  left: ${rem(10)};
  height: ${rem(60)};
  width: ${rem(60)};
  padding: ${rem(18)};
  border-radius: 50%;
  fill: ${({ theme }) => theme.text};
  z-index: 2;
  cursor: pointer;
  background: ${({ theme }) => theme.menuPanelAccent};
`

const AddIcon = styled(PenSVG)`
  height: ${rem(25)};
  width: ${rem(25)};
  fill: ${({ theme }) => theme.createNewStroyCircleForeground};
  transition: opacity 0.1s;
  opacity: ${({ isCreateModalOpen }) => isCreateModalOpen && 0};
  transition: ${({ isCreateModalOpen }) => !isCreateModalOpen && 'opacity 0.1s 0.3s'};
`

const CreateModalToggle = ({ toggleCreateModal, isCreateModalOpen }) => (
  <>
    <CreateNewStroyCircle onClick={toggleCreateModal} isCreateModalOpen={isCreateModalOpen}>
      <AddIcon isCreateModalOpen={isCreateModalOpen} />
    </CreateNewStroyCircle>
    <CloseCreateModal onClick={toggleCreateModal} />
  </>
)

export default CreateModalToggle
