import React, { Component } from 'react';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export class News extends Component {
   state = {
       posts: [],
       isLoaded: false,
       loading: true,
   }

 componentDidMount () {
 axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?_embed&categories_exclude=146')// categorie 146 = Show dailies
       .then(res => this.setState({
           posts: res.data,
           isLoaded: true,
           loading: false,
       }))
       .catch(err => console.log(err))
   }

  checkFeaturedImage = (el) => {
    if (el) { return (<img src= { el } alt="featured" className="featured-image" />)}
  }

   render() {
       const {posts, isLoaded} = this.state;
       return (
           <div className="posts-list">
            <Loader loading={this.state.loading}/>
               {posts.map(post =>
               <div key={post.id} className="post-preview">
                { this.checkFeaturedImage( post._embedded['wp:featuredmedia'][0].source_url ) }
                <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h4>
                <p className="post-date">{new Date(post.date).toUTCString()}</p>
                <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                <Link to="post">
                <div className='read-more-btn'>Read more</div>
                </Link>
               </div>
               )}
           </div>
       );
   }
}
export default News