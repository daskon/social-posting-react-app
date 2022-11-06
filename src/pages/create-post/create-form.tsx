import React from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import "./style.css";

interface FormDataType{
    title: string,
    description: string,
    category: string
}

const CreateForm = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title Required"),
        description: yup.string().required("Description Required"),
        category: yup.string().required("Please select the category")
    });

    const {register, handleSubmit, formState: {errors}} = useForm<FormDataType>({
        resolver: yupResolver(schema)
    });

    const postData = collection(db, "posts");

    const onCreateForm = async (data: FormDataType) => {
        await addDoc(postData,{
            ...data,
            username: user?.displayName,
            userId: user?.uid
        });
        navigate('/');
    }

  return (
    <div className='container'>
        <form onSubmit={handleSubmit(onCreateForm)}>
            <input type="text" placeholder="Post Title" {...register("title")} className="title-field" />
             <p style={{color: 'red'}}>{errors.title?.message}</p>
            <select {...register("category")} className="category-field">
                <option>Select</option>
                <option>News</option>
                <option>Health</option>
                <option>Sport</option>
            </select>
            <p style={{color: 'red'}}>{errors.category?.message}</p>
            <textarea placeholder="Description" {...register("description")} className="description-field">
            </textarea>
            <p style={{color: 'red'}}>{errors.description?.message}</p>
            <input type="submit" className='submit-btn' />
        </form>
    </div>
  )
}

export default CreateForm