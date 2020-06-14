import React, { useState } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

function Handle({ handle: { id, value, percent }, getHandleProps, handlePercentage, idx }) {
  // console.log(getHandleProps)
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: 'white',
      }}
      {...getHandleProps(id)}
     onMouseUp={e => handlePercentage(e, value)}
     id={idx}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 15, marginTop: -20 }}>
        {value}
      </div>
    </div>
  )
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}

function SliderBar({ handlePercentage, idx }) {
  const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '20rem',
    height: 80,
    // border: '1px solid steelblue',
    margin: '0 2rem 0 2rem'
  }

  const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6',
  }

  return (
    <Slider
      rootStyle={sliderStyle /* inline styles for the outer div. Can also use className prop. */}
      domain={[0, 100]}
      values={[0]}
      step={1}
    >
      <div style={railStyle /* Add a rail as a child.  Later we'll make it interactive. */} />
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map(handle => (
              <Handle
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
                handlePercentage={handlePercentage}
                idx={idx}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Tracks>
    </Slider>
  )
}

export default SliderBar
