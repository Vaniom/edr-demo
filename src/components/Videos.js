import React, { Component } from 'react';
import axios from 'axios';
import Loader from "./Loader";
import Card from './Card';

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
       const {posts} = this.state;
       return (
           <div className="posts-list">
            <Loader loading={this.state.loading}/>
               {posts.map(post =>
               <div key={post.id} className="post-preview">
                <Card postId={ post.id } featured="false"></Card>
               </div>
               )}
           </div>
       );
   }
}
export default Videos