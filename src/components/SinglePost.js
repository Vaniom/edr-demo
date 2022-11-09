import React, { Component } from "react";
import Loader from "./Loader";

class SinglePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      post: {},
    }
  }
  render() {
    return(
      <div className="singlepost-container">
        SinglePost
        <Loader loading={this.state.loading} />
      </div>
    )
  }
}

export default SinglePost