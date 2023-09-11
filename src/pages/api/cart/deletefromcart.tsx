import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  axios
    .delete(
      process.env.SITECORE_API_PUBLIC_HOST + `/cart/deletefromcart?productId=${req.body.productId}`,

      {
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    )
    .then((data) => {
      res.status(200).json({ data: data.data, success: true });
    })
    .catch((err) => {
      res.status(500).json({ data: err, success: false });
    });
}
