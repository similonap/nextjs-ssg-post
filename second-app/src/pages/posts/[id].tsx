import { Post } from "@/types";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

interface PostDetailProps {
    post: Post
}

interface Paths extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths : GetStaticPaths<Paths> = async () => {
    const response = await fetch("http://localhost:3001/posts");
    const posts: Post[] = await response.json();

    const paths = posts.map(post => {
        return { params: { id: post.id.toString() }}
    })

    return {
        paths: paths,
        fallback: false
    }

}


export const getStaticProps : GetStaticProps<PostDetailProps, Paths> = async(context) => {
    let id : number = parseInt(context.params?.id as string);

    const response = await fetch(`http://localhost:3001/posts/${id}`)
    const post : Post = await response.json();

    return {
        props: {
            post: post
        }
    }
}

const PostDetail = ({post} : PostDetailProps) => {
    return (
        <>
            <h1>Detail of {post.id}</h1>
            {post && (
                <>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                </>
            )}
        </>
    )
}

export default PostDetail;