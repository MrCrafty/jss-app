import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = {
    Cookie: req.headers.cookie,
  };
  console.log('headers', headers);
  axios
    .post(
      process.env.SITECORE_API_PUBLIC_HOST + '/cart/addtocart',
      {
        productId: req.body.productId,
      },
      { headers }
    )
    .then((data) => {
      res.status(200).json({ data: data.data, success: true });
    })
    .catch((err) => {
      res.status(500).json({ data: err, success: false });
    });
}
