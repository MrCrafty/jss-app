import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  axios
    .get('https://square-termite-set.ngrok-free.app/api/cart/getcart', {
      headers: { Cookie: req.headers.cookie },
    })
    .then((data) => {
      res.json({ data: data.data });
    })
    .catch((err) => {
      res.json({ data: err });
      console.log('err', err);
    });
}
