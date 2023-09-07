import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies: string = req.cookies.email ?? '';
  if (cookies != '') {
    res.status(200).json({ IsLogin: true });
  } else {
    res.status(200).json({ IsLogin: false });
  }
}
