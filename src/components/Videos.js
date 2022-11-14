import React, { Component, useState } from 'react';
import axios from 'axios';
import Loader from "./Loader";

export class Videos extends Component {
   state = {
       posts: [],
       isLoaded: false,
       loading: true
   }

 componentDidMount () {
 axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?_embed&categories=151')// 151 = videos
       .then(res => this.setState({
           posts: res.data,
           isLoaded: true,
           loading: false,
       }))
       .catch(err => console.log(err))
   }

   render() {
       const {posts, isLoaded} = this.state;
       return (
           <div className="posts-list">
            <Loader loading={this.state.loading}/>
               {posts.map(post =>
               <div key={post.id} className="post-preview">
                  <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h4>
                  <p className="post-date">{new Date(post.date).toUTCString()}</p>
                  <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} ></p>
               </div>
               )}
           </div>
       );
   }
}
export default Videos