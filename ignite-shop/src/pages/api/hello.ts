import { NextApiRequest, NextApiResponse } from "next";


export default function Handle(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ message: 'Hello world'})
}