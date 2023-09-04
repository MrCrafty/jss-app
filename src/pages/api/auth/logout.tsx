import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const cookieArray = Object.keys(req.cookies).map((item) => {
      return item;
    });

    const cookieStr = cookieArray.map((item) => {
      return `${item}=; Max-Age=0; Path=/`;
    });
    res.setHeader('Set-Cookie', cookieStr);
    res.status(200).json({ message: 'Removed' });
  }
}
