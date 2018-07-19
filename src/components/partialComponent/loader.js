import React from 'react'

export default class LoaderComponent extends React.Component {

  render () {
    return (
      <div className="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>
    )
  }
}