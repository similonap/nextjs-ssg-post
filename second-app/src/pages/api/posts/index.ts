import { Post } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await response.json();

    res.status(200).json(posts);
}

export default handler;