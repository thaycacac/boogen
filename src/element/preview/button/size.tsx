import { css } from 'styled-components'

const getSize = (size: string) => {
  switch(size) {
    case 'medium':
      return sizeMedium
    case 'small':
      return sizeSmall
    case 'large':
      return sizeLarge
  }
}

const sizeSmall = css`
  font-size: .875rem;
  padding: .25rem .5rem;
  border-radius: .2rem;
`

const sizeMedium = css`
  font-size: 1rem;
  padding: .375rem .75rem;
  border-radius: .25rem;
`

const sizeLarge = css`
  font-size: 1.25rem;
  padding: .5rem 1rem;
  border-radius: .3rem;
`

export {
  getSize,
  sizeSmall,
  sizeMedium,
  sizeLarge
}
