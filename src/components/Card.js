import axios from "axios";
import React, {Component} from "react";
import Loader from "./Loader";
import {Link} from "react-router-dom";

class Card extends Component {
  state = {
    post: {},
    isLoaded: false,
    loading: true,
    featuredImage: {},
  }
postId = this.props.postId;
checkFeaturedImage = (el) => {
  if (el) { return (<img src= { el } alt="featured" className="video-featured-image" />)}
};

fetchFeaturedImage = () => {
  axios.get(this.state.post._links['wp:featuredmedia'][0].href)
        .then(res => this.setState({
           featuredImage: res.data,
           isLoaded: true,
           loading: false,
      })).then(console.log("query_OK"))
      .catch(err => console.log(err));
}
  componentDidMount() {
    axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts/' + this.postId )
        .then(res => this.setState({
            post: res.data,
        })).then(this.fetchFeaturedImage)
        .catch(err => console.log(err));
        
    }
    render(){
      const url = "/post/" + this.state.post.id;
      return(
          <div>
            <Loader loading={this.state.loading} />
            {this.state.featuredImage.date && (<img src={ this.state.featuredImage.source_url} alt="featured" className="video-featured-image" />)}
            <div  className='metadata-container'>
            {this.state.post.title && (<h4 dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }}></h4>)}
            <p className="post-date">{new Date(this.state.post.date).toUTCString()}</p>
            { this.state.post.content && (<p dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered }} ></p>)}
            <Link to={url} ><button>see</button></Link>
            </div>
          </div>
      )
    }
}

export default Card;