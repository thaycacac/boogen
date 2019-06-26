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

export {
  getColor
}