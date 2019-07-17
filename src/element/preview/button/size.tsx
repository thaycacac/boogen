import { css } from 'styled-components'

const getSize = (size: string) => {
  switch (size) {
    case 'medium':
      return sizeMedium
    case 'small':
      return sizeSmall
    case 'large':
      return sizeLarge
  }
}

const sizeSmall = css`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.2rem;
`

const sizeMedium = css`
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
`

const sizeLarge = css`
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
`

export { getSize, sizeSmall, sizeMedium, sizeLarge }
