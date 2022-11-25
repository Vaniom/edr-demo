import React, { Component } from 'react';
import axios from 'axios';
import Card from "./Card";
import Loader from './Loader';

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
            <Loader loading={this.state.loading} />
               {posts.map(post =>
               <div key={post.id} className="magazine-post"> 
                    <Card postId={ post.id } featured="true"/>
               </div>
               )}
           </div>
       );
   }
}
export default Magazine