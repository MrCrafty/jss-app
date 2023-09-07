import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const url = 'https://square-termite-set.ngrok-free.app/api/auth/CreateAccount';
    const content = {
      Username: req.body.Username,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      password: req.body.Password,
      EmailAddress: req.body.EmailAddress,
    };
    axios.post(url, content).then((data) => {
      res.status(200).json({ data: data.data.data, success: data.data.success });
    });
  }
}
