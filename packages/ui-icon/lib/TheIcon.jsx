'use strict'

import c from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-ui'
import TheIconStyle from './TheIconStyle'

/**
 * Icon of the-components
 */
class TheIcon extends React.Component {
  static Spin(props) {
    const { className, theme } = props
    const icon = TheIcon.SpinIconThemes[theme] || TheIcon.SPIN_ICON
    return (
      <TheIcon {...props} className={c('the-icon-spin', className, icon)} />
    )
  }

  render() {
    const {
      props,
      props: { children, className },
    } = this

    return (
      <i
        {...htmlAttributesFor(props, { except: ['className'] })}
        aria-hidden
        className={c('the-icon', className)}
      >
        {children}
      </i>
    )
  }
}

TheIcon.CDN_URL = 'https://use.fontawesome.com/releases/v5.0.3/css/all.css'

TheIcon.SpinIconThemes = {
  A: 'fas fa-spin fa-spinner',
  B: 'fas fa-spin fa-circle-notch',
  C: 'fas fa-spin fa-sync',
  D: 'fas fa-spin fa-cog',
  E: 'fas fa-spin fa-sun',
  F: 'fas fa-spin fa-snowflake',
}

TheIcon.SPIN_ICON = TheIcon.SpinIconThemes.A

TheIcon.CdnLink = ({ url = TheIcon.CDN_URL }) => (
  <link href={url} rel='stylesheet' />
)

TheIcon.Style = TheIconStyle

TheIcon.propTypes = {}

TheIcon.defaultProps = {
  type: null,
}

TheIcon.displayName = 'TheIcon'

export default TheIcon
