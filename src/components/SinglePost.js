import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "./Loader";
import FeaturedImage from "./FeaturedImage";
import { LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share';
import { BsLinkedin, BsTwitter, BsFacebook} from 'react-icons/bs';

function SinglePost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    
  const { id } = useParams();
  const postId = id;
  console.log("ID= " + postId);

  useEffect (() => {
    const fetchData = async () => {
      await axios.get('https://headless-wp.florentpia.net/wp-json/wp/v2/posts/' + postId)
      .then(await (res => setPost(res.data)))
    }
    fetchData()
      .then(setLoading(false))
      .then(console.log("Query_OK"))
      .catch(err => console.log(err));
    }, [])

    const handleClick = () => {
      let message = document.getElementById("share-msg");
      let container = document.getElementById("share-container");
      message.classList.toggle("visible");
      container.classList.toggle("visible");
    }

  return(
    post.date ? (
      <div>
        <div className="closeBtn" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">cancel</span>
        </div>
        { post._links['wp:featuredmedia'] && <FeaturedImage url={post._links['wp:featuredmedia'][0].href} /> }
        <div  className='metadata-container'>
          <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="post-title"></h4>
          <p className="post-date">{new Date(post.date).toUTCString()}</p>
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} ></p>
        </div>
        <div className="share">
          <span className="material-symbols-outlined share-generic-btn" onClick={handleClick}>share</span>
          <span className="share-message visible" id="share-msg">Share this post</span>
          <div className="social-share-container" id="share-container">
            <LinkedinShareButton 
              url={'https://florentpia.net'}
              title="Check out this new post on Showdailies.com ">
              <BsLinkedin className="social-share-icon"/>
          </LinkedinShareButton>
          <TwitterShareButton
            url={'http://localhost:3000/post/' + postId}
            title={post.title.rendered}
            >
            <BsTwitter className="social-share-icon"/>
          </TwitterShareButton>
          <FacebookShareButton
            url={'https://florentpia.net'}>
            <BsFacebook className="social-share-icon"/>
          </FacebookShareButton>
        </div>
        </div>
      </div>)
      : (
        <div>
          <Loader loading={loading} />
        </div>

      )
  )
}

export default SinglePost;