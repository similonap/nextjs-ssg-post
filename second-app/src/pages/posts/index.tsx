import { Post } from "@/types";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostsProps {
    posts: Post[]
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
    const response = await fetch("http://localhost:3001/posts");
    const posts: Post[] = await response.json();
    return {
        props: {
            posts: posts
        }
    }
}


const Posts = ({posts} : PostsProps) => {
    return (
        <>
            <Head>
                <title>Cool app - Posts</title>
                
            </Head>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => <li key={post.id}><Link href={`/posts/${post.id}`}>{post.title}</Link></li>)}
            </ul>
        </>
    )
}

export default Posts;