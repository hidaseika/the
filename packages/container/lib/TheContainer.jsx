'use strict'

import c from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-component'
import TheContainerStyle from './TheContainerStyle'

/**
 * Container of the-components
 */
class TheContainer extends React.Component {
  render() {
    const { props } = this
    const { children, className } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        className={c('the-container', className)}
      >
        {children}
      </div>
    )
  }
}

TheContainer.Style = TheContainerStyle

TheContainer.propTypes = {}

TheContainer.defaultProps = {}

TheContainer.displayName = 'TheContainer'

export default TheContainer
