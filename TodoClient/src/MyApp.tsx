import React from 'react';
///
// Create interface for class component props
interface PropsInterface {
  heading: string;
}

// Create interface for class component state
interface StateInterface {
  firstName: string;
  lastName: string;
}

// Create new class
// use PropsInterface and StateInterface interfaces (<Props, State>)
class MyApp extends React.Component<PropsInterface, StateInterface> {
  // This state annotation is optional
  // it is for better type inference
  state: StateInterface = {
    firstName: 'Andrew',
    lastName: 'Coboll'
  }




  render() {
    return (
      <div>
        {this.props.heading} {this.state.firstName} {this.state.lastName}
      </div>
    )
  }
}

export default MyApp
