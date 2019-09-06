import React from 'react'
import PropTypes, { any } from 'prop-types'
import cn from 'classnames'
import styled from 'styled-components'
import omit from 'lodash.omit'
// @ts-ignore
import mapToCssModules from 'map-to-css-modules'
import { alertVariant } from '../../mixins/alert'
import { borderRadius } from '../../mixins/utils/border-radius'
import { createChainedFunction } from '../../mixins/utils/tools'
import Fade, { defaultProps as FadeDefaultProps } from '../../modal/fade'
import Close from '../close'

export const defaultProps = {
  color: 'success',
  isOpen: true,
  tag: 'div',
  theme: {
    '$alert-padding-x': '1.25rem',
    '$alert-padding-y': '.75rem',
    '$alert-margin-bottom': '1rem',
    '$alert-border-radius': '.25rem',
    '$alert-link-font-weight': 'bold',
    '$alert-border-width': '1px',
    '$alert-success-bg': '#dff0d8',
    '$alert-success-text': '#3c763d',
    '$alert-success-border': '#3c763d',
    '$alert-info-bg': '#d9edf7',
    '$alert-info-text': '#31708f',
    '$alert-info-border': '#31708f',
    '$alert-warning-bg': '#fcf8e3',
    '$alert-warning-text': '#8a6d3b',
    '$alert-warning-border': '#8a6d3b',
    '$alert-danger-bg': '#f2dede',
    '$alert-danger-text': '#a94442',
    '$alert-danger-border': '#a94442',
    '$enable-rounded': true,
  },
  uncontrolled: false,
  autoHideDuration: null,
  transition: {
    ...FadeDefaultProps,
    unmountOnExit: true,
  },
}

export const propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /** Specified node element will be passed as children of `<Alert />` component. */
  children: PropTypes.node,
  /** Color variables. */
  color: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  /**
   * Toggles dismissal of an alert.
   */
  isOpen: PropTypes.bool,
  /**
   * @ignore
   * Used for Close component.
   */
  toggle: PropTypes.func,
  /**
   * Call specified function when `on click` event is triggered.
   */
  onClick: PropTypes.func,
  /**
   * Toggles onClick event.
   */
  initializeIsOpen: PropTypes.func,
  /**
   * Replace the default component tag by the one specified. Can be:
   */
  tag: PropTypes.any,
  /**
   * Transition used to dismiss alert.
   */
  transition: PropTypes.shape({
    FadeProptypes: PropTypes.object,
    unmountOnExit: PropTypes.bool,
  }),
  /**
   * Transition's duration used to dismiss alert automatically.
   */
  autoHideDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Theme variables. */
  theme: PropTypes.shape({
    '$alert-padding-x': PropTypes.string,
    '$alert-padding-y': PropTypes.string,
    '$alert-margin-bottom': PropTypes.string,
    '$alert-border-radius': PropTypes.string,
    '$alert-link-font-weight': PropTypes.string,
    '$alert-border-width': PropTypes.string,
    '$alert-success-bg': PropTypes.string,
    '$alert-success-text': PropTypes.string,
    '$alert-success-border': PropTypes.string,
    '$alert-info-bg': PropTypes.string,
    '$alert-info-text': PropTypes.string,
    '$alert-info-border': PropTypes.string,
    '$alert-warning-bg': PropTypes.string,
    '$alert-warning-text': PropTypes.string,
    '$alert-warning-border': PropTypes.string,
    '$alert-danger-bg': PropTypes.string,
    '$alert-danger-text': PropTypes.string,
    '$alert-danger-border': PropTypes.string,
    '$enable-rounded': PropTypes.bool,
  }),
  /**
   * Toggles inner alert state so that you don't have to write your own state or closing function.
   */
  uncontrolled: PropTypes.bool,
  /**
   * Replace or remove a className from the component.
   * See example <a href="https://www.npmjs.com/package/map-to-css-modules" target="_blank">here</a>.
   */
  cssModule: PropTypes.object,
}
interface IAlertUnstyled {
  uncontrolled?: any
  isOpen?: any
  autoHideDuration?: any
  className?: any
  cssModule?: any
  color?: any
  onClick?: any
  onExited?: any
  transition?: any
  tag?: any
}
class AlertUnstyled extends React.Component<IAlertUnstyled> {
  static propTypes: any = propTypes

  static defaultProps = defaultProps

  state = {
    uncontrolledOpen: true,
    exited: false,
  }

  componentWillMount() {
    this.initializeIsOpen(this.props)
    if (this.props.uncontrolled) {
      if (this.state.uncontrolledOpen) {
        this.setState({ exited: true })
      }
      return
    }
    if (!this.props.isOpen) {
      this.setState({ exited: true })
    }
  }

  /* eslint-disable no-console */
  componentDidMount() {
    if (this.props.autoHideDuration) {
      // @ts-ignore
      this.setAutoHideTimer()
    }
  }

  /* eslint-enable no-console */
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.isOpen) {
      this.setState({ exited: false })
    }
    if (nextProps.isOpen !== this.props.isOpen) {
      this.initializeIsOpen(nextProps)
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.isOpen !== this.props.isOpen) {
      // @ts-ignore
      if (this.props.isOpen) {
        // @ts-ignore
        this.setAutoHideTimer()
      } else {
        // @ts-ignore
        clearTimeout(this.timerAutoHide)
      }
    }
  }

  componentWillUnmount() {
    // @ts-ignore
    clearTimeout(this.timerAutoHide)
  }

  // Timer that controls delay before snackbar auto hides
  // @ts-ignore  setAutoHideTimer = autoHideDuration => {

  setAutoHideTimer = autoHideDuration => {
    if (!this.props.autoHideDuration) {
      return
    }
    // @ts-ignore
    clearTimeout(this.timerAutoHide)
    // @ts-ignore
    this.timerAutoHide = setTimeout(() => {
      if (this.props.autoHideDuration) {
        // @ts-ignore
        this.toggle()
      }
    }, autoHideDuration || this.props.autoHideDuration)
  }

  timerAutoHide = null
  // @ts-ignore  setAutoHideTimer = autoHideDuration => {

  initializeIsOpen = props => this.setState({ uncontrolledOpen: props.isOpen })
  // @ts-ignore  setAutoHideTimer = autoHideDuration => {

  toggle = e => {
    // @ts-ignore  setAutoHideTimer = autoHideDuration => {

    if (this.props.onClick) {
      // @ts-ignore  setAutoHideTimer = autoHideDuration => {

      this.props.onClick(e)
    } else {
      this.setState({ uncontrolledOpen: false })
    }
  }

  handleExited = () => {
    this.setState({ exited: true })
  }

  render() {
    const {
      className,
      cssModule,
      tag: Tag,
      color,
      isOpen,
      onClick,
      children,
      onExited,
      transition,
      uncontrolled,
      ...attributes
    } = omit(this.props, ['theme', 'autoHideDuration', 'toggle'])
    const classes = mapToCssModules(
      cn(className, 'alert', `alert-${color}`, { 'alert-dismissible': uncontrolled || onClick }),
      cssModule,
    )

    if (!isOpen && this.state.exited) {
      return null
    }

    const transitionProps = {
      in: uncontrolled ? this.state.uncontrolledOpen : isOpen,
      appear: true,
      onExited: createChainedFunction(this.handleExited, onExited),
    }

    return (
      <Fade
        tag={Tag}
        className={classes}
        in={uncontrolled ? this.state.uncontrolledOpen : isOpen}
        role="alert"
        {...attributes}
        {...transition}
        {...transitionProps}
      >
        {(uncontrolled || onClick) && (
          // @ts-ignore
          <Close onDismiss={this.toggle} />
        )}
        {children}
      </Fade>
    )
  }
}

/**
 * Alert component.
 */
const UIAlert = styled(AlertUnstyled)`
  ${props => `
    /*
    Base styles
    */

    &.alert {
      padding: ${defaultProps.theme['$alert-padding-y']} ${defaultProps.theme['$alert-padding-x']};
      margin-bottom: ${defaultProps.theme['$alert-margin-bottom']};
      border: ${defaultProps.theme['$alert-border-width']} solid transparent;
      ${borderRadius(
        defaultProps.theme['$enable-rounded'],
        defaultProps.theme['$alert-border-radius'],
      )}
    }

    /* Headings for larger alerts */
    &.alert-heading {
      /* Specified to prevent conflicts of changing $headings-color */
      color: inherit;
    }

    /* Provide class for links that match alerts */
    & .alert-link {
      font-weight: ${defaultProps.theme['$alert-link-font-weight']};
    }

    /* Dismissible alerts Expand the right padding and account for the close buttons positioning. */

    &.alert-dismissible {
      /* Adjust close link position */
      & .close {
        position: relative;
        top: -${defaultProps.theme['$alert-padding-y']};
        right: -${defaultProps.theme['$alert-padding-x']};
        padding: ${defaultProps.theme['$alert-padding-y']} ${
    defaultProps.theme['$alert-padding-x']
  };
        color: inherit;
      }
    }
    /* Alternate styles Generate contextual modifier classes for colorizing the alert. */
    &.alert-success {
      ${alertVariant(
        defaultProps.theme['$alert-success-bg'],
        defaultProps.theme['$alert-success-border'],
        defaultProps.theme['$alert-success-text'],
      )}
    }
    &.alert-info {
      ${alertVariant(
        defaultProps.theme['$alert-info-bg'],
        defaultProps.theme['$alert-info-border'],
        defaultProps.theme['$alert-info-text'],
      )}
    }
    &.alert-warning {
      ${alertVariant(
        defaultProps.theme['$alert-warning-bg'],
        defaultProps.theme['$alert-warning-border'],
        defaultProps.theme['$alert-warning-text'],
      )}
    }
    &.alert-danger {
      ${alertVariant(
        defaultProps.theme['$alert-danger-bg'],
        defaultProps.theme['$alert-danger-border'],
        defaultProps.theme['$alert-danger-text'],
      )}
    }
  `}
`
// @ts-ignore
UIAlert.propTypes = propTypes
UIAlert.defaultProps = defaultProps

export default UIAlert
