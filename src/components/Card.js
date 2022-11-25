import axios from "axios";
import React, {Component} from "react";
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

featured = this.props.featured;

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

      if (this.featured === "true") {
        return(
          <div>
            {this.state.featuredImage.date && (<img src={ this.state.featuredImage.source_url} alt="featured" className="video-featured-image" />)}
            <div  className='metadata-container'>
            {this.state.post.title && (<h4 dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }}></h4>)}
            <p className="post-date">{new Date(this.state.post.date).toUTCString()}</p>
            { this.state.post.content && (<p dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered }} ></p>)}
            <Link to={url} >
              <span className="material-symbols-outlined">more_horiz</span>
            </Link>
            </div>
          </div>
      )
      } else {
        return(
          <div>
            <div  className='metadata-container'>
            {this.state.post.title && (<h4 dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }}></h4>)}
            <p className="post-date">{new Date(this.state.post.date).toUTCString()}</p>
            { this.state.post.content && (<p dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered }} ></p>)}
            <Link to={url} >
              <span className="material-symbols-outlined">more_horiz</span>
            </Link>
            </div>
        </div>
        )
      }
    }
}

export default Card;