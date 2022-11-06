import React from 'react';
import { PostInterface } from './main';
import "./style.css";

interface Props {
    post: PostInterface
}

const Post = (props: Props) => {
  const {post} = props;
  return (
    <div className='post-container'>
        <div className='title'>
            <h1>{post.title}</h1>
            <span style={{float: "right"}}>{post.category}</span>
        </div>
        <div className='post-body'>
            <p>{post.description}</p>
        </div>
        <div className='username'>
            @{post.username}
        </div>
    </div>
  )
}

export default Post