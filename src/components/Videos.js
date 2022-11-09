import React, { Component } from "react";
import Loader from "./Loader";

class Videos extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return(
      <div>
        <Loader loading={this.state.loading}/>
      </div>
    )
  }
}

export default Videos;