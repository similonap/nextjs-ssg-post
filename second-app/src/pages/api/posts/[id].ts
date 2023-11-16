import { Post } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {

    const id = parseInt(req.query.id as string);

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const posts: Post[] = await response.json();

    res.status(200).json(posts);
}

export default handler;