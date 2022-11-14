import React, { Component } from 'react';
import axios from 'axios';
import Loader from "./Loader";

export class Magazine extends Component {
   state = {
       posts: [],
       isLoaded: false,
       loading: true
   }

 componentDidMount () {
 axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?_embed&categories=146')// 146 = show dailies
       .then(res => this.setState({
           posts: res.data,
           isLoaded: true,
           loading: false,
       }))
       .catch(err => console.log(err))
   }

   checkFeaturedImage = (el) => {
    if (el) { return (<img src= { el } alt="featured" className="video-featured-image" />)}
  }

   render() {
       const {posts} = this.state;
       return (
           <div className="magazine-posts-list">
            <Loader loading={this.state.loading}/>
               {posts.map(post =>
               <div key={post.id} className="magazine-post">
                  { this.checkFeaturedImage( post._embedded['wp:featuredmedia'][0].source_url ) }
                  <div className='metadata-container'>
                    <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h4>
                    <p className="post-date">{new Date(post.date).toUTCString()}</p>
                    <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} ></p>
                  </div>
               </div>
               )}
           </div>
       );
   }
}
export default Magazine