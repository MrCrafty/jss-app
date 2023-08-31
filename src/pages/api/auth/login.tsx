import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const url = 'https://square-termite-set.ngrok-free.app/api/auth/login';
    const content = { email: req.body.email, password: req.body.password };
    axios.post(url, content).then((data) => {
      res.status(200).json({ data });
    });
  }
}
