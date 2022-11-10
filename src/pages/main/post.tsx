import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { PostInterface } from './main';
import "./style.css";

interface Props {
    post: PostInterface
}

const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);
    const [likeCount, setLikeCount] = useState<number | null>(null);

    const likeRef = collection(db, "likes");

    const queryLikes = query(likeRef, where("postId", "==" , post.id));

    const getLikes = async () => {
        const data = await getDocs(queryLikes);
        setLikeCount(data.docs.length);
    }

    useEffect(() => {
        getLikes();
    },[])

    const onClickLike = async () => {
        await addDoc(likeRef,{
            userId: user?.uid,
            postId: post?.id
        });
    }

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
        <div className='post-like'>
            <a href='#' onClick={onClickLike}>&#128077;</a>
            {likeCount && <p> Likes {likeCount}</p>}
        </div>
    </div>
  )
}

export default Post