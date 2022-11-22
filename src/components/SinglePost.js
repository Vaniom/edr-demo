import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Loader from "./Loader";
import FeaturedImage from "./FeaturedImage";

function SinglePost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
    
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

  return(
    post.date ? (
        <div>
        { post._links['wp:featuredmedia'][0].href && <FeaturedImage url={post._links['wp:featuredmedia'][0].href} /> }
        <div  className='metadata-container'>
        <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h4>
        <p className="post-date">{new Date(post.date).toUTCString()}</p>
        <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} ></p>
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