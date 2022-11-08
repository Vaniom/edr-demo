import React, { Component } from 'react'
import axios from 'axios';

export class Posts extends Component {
   state = {
       posts: [],
       isLoaded: false
   }

 componentDidMount () {
 axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?_embed&categories_exclude=146')// categorie 146 = Show dailies
       .then(res => this.setState({
           posts: res.data,
           isLoaded: true
       }))
       .catch(err => console.log(err))
   }

  checkFeaturedImage = (el) => {
    if (el) { return (<img src= { el } alt="featured image" className="featured-image" />)}
  }

   render() {
       const {posts, isLoaded} = this.state;
       return (
           <div className="posts-list">
               {posts.map(post =>
               <div key={post.id} className="post-preview">
                { this.checkFeaturedImage( post._embedded['wp:featuredmedia'][0].source_url ) }
                <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h4>
                <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                <div className='read-more-btn'>Read more</div>
               </div>
               )}
           </div>
       );
   }
   
}
export default Posts