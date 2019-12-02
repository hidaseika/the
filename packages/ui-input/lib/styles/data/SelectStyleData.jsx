'use strict'

import { asStyleData } from '@the-/util-ui'

function SelectStyleData({
  backgroundColor,
  contentPadding,
  contentWidth,
  dominantColor,
  inputBorderColor,
  lightBorderColor,
  lightTextColor,
  tappableHeight,
}) {
  return asStyleData({
    '.the-input-select': {
      boxSizing: 'border-box',
      display: 'inline-block',
      maxWidth: contentWidth,
      position: 'relative',
      verticalAlign: 'middle',
      width: '100%',
    },
    '.the-input-select-display': {
      alignItems: 'center',
      backgroundColor,
      border: `1px solid ${inputBorderColor}`,
      borderRadius: '2px',
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'pointer',
      display: 'inline-flex',
      fontSize: 'smaller',
      justifyContent: 'space-between',
      maxWidth: contentWidth,
      minHeight: '28px',
      overflow: 'hidden',
      padding: '4px 2px 4px 8px',
      textOverflow: 'ellipsis',
      verticalAlign: 'middle',
      width: '100%',
    },
    '.the-input-select-display-alt': {
      color: lightTextColor,
      display: 'block',
      textAlign: 'left',
      width: '100%',
    },
    '.the-input-select-display-value': {},
    '.the-input-select-option': {
      '&:hover': {
        backgroundColor: '#F8F8F8',
      },
      '&:last-child': {
        borderBottom: 'none',
      },
      '&.the-input-select-option-disabled': {
        opacity: 0.33,
        pointerEvents: 'none',
      },
      '&.the-input-select-option-selected': {
        backgroundColor: dominantColor,
      },
      alignItems: 'center',
      backgroundColor,
      borderBottom: `1px solid ${lightBorderColor}`,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-start',
      minHeight: tappableHeight,
      overflow: 'hidden',
      padding: `${contentPadding}px ${contentPadding * 2}px`,
      textOverflow: 'ellipsis',
    },
    '.the-input-select-options': {
      '.the-input-select-options-back': {
        display: 'none',
      },
      '&.the-input-select-options-full': {
        '.the-input-select-options-back': {
          bottom: 0,
          display: 'block',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 40,
        },
        '.the-input-select-options-list': {
          '.the-input-select-option': {
            '&:hover': {
              opacity: 0.8,
            },
            background: 'transparent',
            border: 'none',
            color: dominantColor,
            display: 'inline-block',
            flexGrow: '1',
            padding: '4px 8px',
            textAlign: 'center',
          },
          background: 'white',
          border: '1px solid #FAFAFA',
          borderRadius: '4px',
          boxShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          boxSizing: 'border-box',
          display: 'inline-flex',
          flexWrap: 'wrap',
          margin: '24px',
          maxHeight: 'calc(100% - 48px)',
          maxWidth: '480px',
          overflow: 'scroll',
          padding: '16px',
          position: 'relative',
          zIndex: 45,
        },
        alignItems: 'center',
        background: 'rgba(0,0,0,0.3)',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        maxHeight: '100vh',
        maxWidth: '100vw',
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 44,
      },
      backgroundColor,
      border: `1px solid ${lightBorderColor}`,
      borderRadius: '0 0 2px 2px',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
      boxSizing: 'border-box',
      left: 0,
      margin: '-1px 0 0',
      maxHeight: '50vh',
      overflow: 'auto',
      padding: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 8,
    },
    '.the-input-select-options-list': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    '.the-input-select-select,.the-input-select-input': {
      display: 'block',
      height: '1px !important',
      opacity: '0',
      overflow: 'hidden',
      pointerEvents: 'none',
      position: 'absolute',
      width: '1px !important',
      zIndex: '-99',
    },
  })
}

export default SelectStyleData
