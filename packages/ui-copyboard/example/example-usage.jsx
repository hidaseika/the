'use strict'

import React from 'react'
import { TheCopyboard } from '@the-/ui-copyboard'
import { TheCopyboardStyle } from '@the-/ui-copyboard/styles'

const ExampleComponent = () => (
  <div>
    <TheCopyboardStyle />
    <TheCopyboard
      text='http://example.com/foo/bar?t=1234qwerasdfzxcv'
      tipText='Copied to your clip board'
    />
    <hr />
    <div style={{ width: 240 }}>
      <TheCopyboard
        text='http://example.com/long/long/long/long/long/long/long/long/long/long/long/long/long/long/long/bar?t=1234qwerasdfzxcv'
        tipText='Copied to your clip board'
      />
    </div>
  </div>
)

export default ExampleComponent
