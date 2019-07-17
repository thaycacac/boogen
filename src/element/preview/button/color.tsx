import variables from '../../../theme/variable'

const getColor = (variant: string) => {
  switch (variant) {
    case 'primary':
      return variables.colors.primary
    case 'secondary':
      return variables.colors.secondary
    case 'success':
      return variables.colors.success
    case 'info':
      return variables.colors.info
    case 'warning':
      return variables.colors.warning
    case 'danger':
      return variables.colors.danger
    case 'light':
      return variables.colors.light
    default:
      return variables.colors.primary
  }
}

const getColorEffect = (variant: string) => {
  switch (variant) {
    case 'primary':
      return '#0062cc'
    case 'secondary':
      return '#545b62'
    case 'success':
      return '#1e7e34'
    case 'info':
      return '#117a8b'
    case 'warning':
      return '#d39e00'
    case 'danger':
      return '#bd2130'
    case 'light':
      return '#dae0e5'
    default:
      return '#0062cc'
  }
}

export { getColor, getColorEffect }
