import React, { Component } from 'react'
import axios from 'axios';

export class Posts extends Component {
   state = {
       posts: [],
       isLoaded: false
   }

 componentDidMount () {
 axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts/')
       .then(res => this.setState({
           posts: res.data,
           isLoaded: true
       }))
       .catch(err => console.log(err))
   }

   render() {
       const {posts, isLoaded} = this.state;
       const sanitize = (el) => {
        return(JSON.parse(el))
      }
       return (
           <div>
               {posts.map(post =>
               <div key={post.id}>
               <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h4>
               <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
               </div>
               )}
           </div>
       );
   }
}
export default Posts