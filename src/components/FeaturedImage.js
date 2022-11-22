import axios from "axios";
import React, { Component } from "react";
import Loader from "./Loader";

class FeaturedImage extends Component {
  state = {
    image: {},
    isLoaded: false,
    loading: true,
  }

  componentDidMount() {
    axios.get(this.props.url)
        .then(res => this.setState({image: res.data}))
        .then(console.log("Image_OK"))
        .then(this.setState({isLoaded: true}))
        .then(this.setState({loading: false}))
        .catch(err => console.log(err));
  }

  render() {
    return(
      <div style={{textAlign: 'center'}}>
        <Loader loading={this.state.loading}/>
        <img src={this.state.image.source_url} className="single_post_featured_image" alt="featured" />
    </div>
    )
  }
}

export default FeaturedImage