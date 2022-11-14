import React, { Component } from 'react';
import axios from 'axios';
import Loader from "./Loader";

/*const ReadMore = ({ children }) => {
  const text = children[1];
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 200) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};*/

export class News extends Component {
   state = {
       posts: [],
       isLoaded: false,
       loading: true,
   }

 componentDidMount () {
 axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?_embed&categories_exclude=146,151')// categorie 146 = Show dailies 151 = videos
       .then(res => this.setState({
           posts: res.data,
           isLoaded: true,
           loading: false,
           readThePost: {},
           readMore: false,
       }))
       .catch(err => console.log(err))
   }

  checkFeaturedImage = (el) => {
    if (el) { return (<img src= { el } alt="featured" className="featured-image" />)}
  }

  sendPostObject = (e) => {
    console.log( e );
    this.setState({ readThePost: e});
  }

  handleClick = () => {
    this.setState({readMore: !this.state.readMore})
  }

   render() {
       const {posts} = this.state;
       return (
           <div className="posts-list">
            <Loader loading={this.state.loading}/>
               {posts.map(post =>
               <div key={post.id} className="post-preview">
                  { this.checkFeaturedImage( post._embedded['wp:featuredmedia'][0].source_url ) }
                  <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h4>
                  <p className="post-date">{new Date(post.date).toUTCString()}</p>
                  <p className={this.state.readMore === true ? "hide" : "show"} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} ></p>
                  <p className={this.state.readMore === true ? "show" : "hide"} dangerouslySetInnerHTML={{ __html: post.content.rendered }} ></p>
                  <p className="readmore" onClick={ this.handleClick }>{this.state.readMore === false? "Read more" : "Show less"}</p>
               </div>
               )}
           </div>
       );
   }
}
export default News