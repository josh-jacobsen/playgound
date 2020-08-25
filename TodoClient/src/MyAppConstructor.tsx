import React from 'react';

interface PropsInterface {
    heading: string;
  }

interface StateInterface {
    firstName: string;
    lastName: string;
  }

class MyAppConstructor extends React.Component<PropsInterface, StateInterface> {
  // Declare state property and annotate it with StateInterface
  state: StateInterface

  // Add constructor and annotate props with PropsInterface
  constructor(props: PropsInterface) {
    super(props)
      this.state = {
        firstName: 'Andrew',
        lastName: 'Coboll'
    }
  }

  render() {
    return (
      <div>
        {this.props.heading} {this.state.firstName} {this.state.lastName}
      </div>
    )
  }
}

export default MyAppConstructor