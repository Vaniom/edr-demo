import React, { Component } from "react";
import Loader from "./Loader";
import axios from "axios";

class Home extends Component {
    state = {
      news_posts: [],
      news_isLoaded: false,
      news_loading: true,
      videos: [],
      video_isLoaded: false,
      video_loading: true,
      magazines: [],
      magazines_isLoaded: false,
      magazine_loading: true,
    };

    componentDidMount () {
      axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?per_page=2&_embed&categories_exclude=146,151')// categorie 146 = Show dailies 151 = videos
            .then(res => this.setState({
                news_posts: res.data,
                news_isLoaded: true,
                news_loading: false,
                readThePost: {},
                readMore: false,
            }))
            .catch(err => console.log(err));
      axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?per_page=1&_embed&categories=151')// 151 = videos
            .then(res => this.setState({
                videos: res.data,
                video_isLoaded: true,
                video_loading: false,
            }))
            .catch(err => console.log(err));
      axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts?per_page=1&_embed&categories=146')// 146 = show dailies
            .then(res => this.setState({
                magazines: res.data,
                magazine_isLoaded: true,
                magazine_loading: false,
            }))
            .catch(err => console.log(err));
        }

     
       checkFeaturedImage = (el) => {
         if (el) { return (<img src= { el } alt="featured" className="featured-image" />)}
       }
     
       handleClick = () => {
        this.setState({readMore: !this.state.readMore})
      }

  render() {
    const {news_posts} = this.state;
    const {videos} = this.state;
    const {magazines} = this.state;
    return(
      <div>
        <h3 className="latest-news">Latest News</h3>
        <Loader loading={this.state.news_loading}/>
        <div className="posts-list">
               {news_posts.map(news_post =>
               <div key={news_post.id} className="post-preview">
                  { this.checkFeaturedImage( news_post._embedded['wp:featuredmedia'][0].source_url ) }
                  <h4 dangerouslySetInnerHTML={{ __html: news_post.title.rendered }}></h4>
                  <p className="post-date">{new Date(news_post.date).toUTCString()}</p>
                  <p className={this.state.readMore === true ? "hide" : "show"} dangerouslySetInnerHTML={{ __html: news_post.excerpt.rendered }} ></p>
                  <p className={this.state.readMore === true ? "show" : "hide"} dangerouslySetInnerHTML={{ __html: news_post.content.rendered }} ></p>
                  <p className="readmore" onClick={ this.handleClick }>{this.state.readMore === false? "Read more" : "Show less"}</p>
               </div>
               )}
           </div>

        <h3 className="latest-video">Latest Video</h3>
        <Loader loading={this.state.video_loading}/>
        {videos.map(video =>
               <div key={video.id} className="post-preview">
                  <h4 dangerouslySetInnerHTML={{ __html: video.title.rendered }}></h4>
                  <p className="post-date">{new Date(video.date).toUTCString()}</p>
                  <p dangerouslySetInnerHTML={{ __html: video.content.rendered }} ></p>
               </div>
               )}

        <h3 classname="latest-issue">Latest Issue</h3>
        <Loader loading={this.state.magazine_loading}/>
        {magazines.map(post =>
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
    )
  }
}
export default Home;