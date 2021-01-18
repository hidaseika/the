'use strict'

import formatcoords from 'formatcoords'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import TheMap from './TheMap'

const hasVal = (v) => !!v || v === 0

const parseValue = (value) => {
  if (typeof value === 'string') {
    const [lat, lng, zoom] = value.split(',')
    return parseValue({ lat, lng, zoom })
  }

  const { lat, lng, zoom = 13 } = value
  return { lat: Number(lat), lng: Number(lng), zoom: Number(zoom) }
}

const TheMapPositionInput = (props) => {
  const {
    TileLayerClass,
    height,
    id,
    layers,
    name,
    onUpdate,
    value,
    width,
  } = props
  const handleChange = useCallback(
    ({ lat, lng, zoom }) => {
      const isStringBase = typeof value === 'string'
      onUpdate({
        [name]: isStringBase ? [lat, lng, zoom].join(',') : { lat, lng, zoom },
      })
    },
    [name, onUpdate, value],
  )

  if (!value) {
    return null
  }

  const { lat, lng, zoom } = parseValue(value)
  const hasLatLng = hasVal(lat) && hasVal(lng)
  return (
    <div className='the-map-position-input' id={id} style={{ height, width }}>
      <TheMap
        height={height}
        lat={Number(lat)}
        layerControlEnabled={false}
        layers={layers}
        lng={Number(lng)}
        onChange={handleChange}
        TileLayerClass={TileLayerClass}
        width={width}
        zoom={zoom}
      />
      <input
        className='the-map-position-input-input'
        type='hidden'
        value={`${lat},${lng}`}
      />
      <div className='the-map-position-input-display'>
        {hasLatLng && formatcoords(lat, lng).format('f')}
      </div>
      <div className='the-map-position-input-target'>
        <div className='the-map-position-input-target-dot' />
        <div className='the-map-position-input-target-bar1' />
        <div className='the-map-position-input-target-bar2' />
      </div>
    </div>
  )
}

TheMapPositionInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

TheMapPositionInput.defaultProps = {
  height: 150,
  layers: TheMap.defaultProps.layers || [],
  value: { lat: 35.6895, lng: 139.6917, zoom: 13 },
  width: 300,
}

export default TheMapPositionInput
