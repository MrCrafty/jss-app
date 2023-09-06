import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const url = 'https://square-termite-set.ngrok-free.app/api/contactform/contactformdata';
    const content = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Message: req.body.Message,
    };
    axios
      .post(url, content)
      .then((data) => {
        res.status(200).json({ data: data.data.message, success: data.data.success });
      })
      .catch(() => {
        res.status(500).send('Error in Sitecore Server');
      });
  }
}
