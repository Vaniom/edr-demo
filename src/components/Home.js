import React from "react";
import Loader from "./Loader";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: true,
    };
  }

  handleChange() {
    this.setState({loading: !this.state.loading});
  }

  render() {
    return(
      <div>
        <button onClick={this.handleChange}>Toggle Loader</button>
        <Loader loading={this.state.loading}/>
      </div>
    )
  }
}
export default Home;