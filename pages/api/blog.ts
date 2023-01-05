// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  title: string;
  description: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  // @ts-ignore
  // await req.newrelic.addCustomAttributes({
  //   path: "api/blog",
  //   value: "12345",
  //   custom: "test",
  //   custom2: "test2",
  // });
  res.status(200).json([
    { id: 1, title: "Post 1", description: "Post 1" },
    { id: 2, title: "Post 2", description: "Post 2" },
    { id: 3, title: "Post 3", description: "Post 3" },
    { id: 4, title: "Post 4", description: "Post 4" },
  ]);
}
