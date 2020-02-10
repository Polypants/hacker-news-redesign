import { css } from 'styled-components'
import { em } from 'polished'

const sizes = {
  lg: 1440,
  md: 1024,
  sm: 768
}

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${em(sizes[label])}) {
      ${css(...args)};
    }
  `
  return acc
}, {})

export default media
