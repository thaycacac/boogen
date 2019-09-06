import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Transition from 'react-transition-group/Transition'
// @ts-ignore
import mapToCssModules from 'map-to-css-modules'
import omit from 'lodash.omit'
import { pick } from '../mixins/utils/tools'

export const propTypes = {
  // @ts-ignore
  ...Transition.propTypes, // eslint-disable-line react/forbid-foreign-prop-types
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tag: PropTypes.any,
  baseClass: PropTypes.string,
  baseClassActive: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
}

export const defaultProps = {
  // @ts-ignore
  ...Transition.defaultProps,
  tag: 'div',
  baseClass: 'fade',
  baseClassActive: 'show',
  timeout: 150,
  appear: true,
  enter: true,
  exit: true,
  in: true,
}

function Fade(props: any) {
  const {
    tag: Tag,
    baseClass,
    baseClassActive,
    className,
    cssModule,
    children,
    ...otherProps
  } = props

  const TransitionPropTypeKeys = [
    'in',
    'mountOnEnter',
    'unmountOnExit',
    'appear',
    'enter',
    'exit',
    'timeout',
    'onEnter',
    'onEntering',
    'onEntered',
    'onExit',
    'onExiting',
    'onExited',
  ]

  // In NODE_ENV=production the Transition.propTypes are wrapped which results in an
  // empty object "{}". This is the result of the `react-transition-group` babel
  // configuration settings. Therefore, to ensure that production builds work without
  // error, we can either explicitly define keys or use the Transition.defaultProps.
  // Using the Transition.defaultProps excludes any required props. Thus, the best
  // solution is to explicitly define required props in our utilities and reference these.
  // This also gives us moreisOpen flexibility in the future to remove the prop-types
  // dependency in distribution builds (Similar to how `react-transition-group` does).
  // Note: Without omitting the `react-transition-group` props, the resulting child
  // Tag component would inherit the Transition properties as attributes for the HTML
  // element which results in errors/warnings for non-valid attributes.
  const transitionProps = pick(otherProps, TransitionPropTypeKeys)
  const childProps = omit(otherProps, TransitionPropTypeKeys, 'ref')
  return (
    // @ts-ignore
    <Transition {...transitionProps}>
      {(status: any) => {
        const isActive = status === 'entered'
        return (
          <Tag
            className={mapToCssModules(
              cn(className, baseClass, isActive && baseClassActive),
              cssModule,
            )}
            {...childProps}
          >
            {children}
          </Tag>
        )
      }}
    </Transition>
  )
}

Fade.propTypes = propTypes
Fade.defaultProps = defaultProps

export default Fade
