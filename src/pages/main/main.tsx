import React, { useEffect, useState } from 'react'
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../config/firebase';
import Post from './post';

export interface PostInterface {
    userId: string,
    username: string,
    title: string,
    description: string,
    category: string
}

export const Main = () => {
    const [postList, setPostList] = useState<PostInterface[] | null>(null);
    const postData = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postData);
        setPostList(
            data.docs.map((doc) => ({ ...doc.data(), userId: doc.id })) as PostInterface[]
        );
    };

    useEffect(() => {
        getPosts();
    },[]);

  return (
    <div>
        {postList?.map((post) => <Post key={post.userId} post={post} />)}
    </div>
  )
}
