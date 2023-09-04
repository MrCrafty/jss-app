import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const url = 'https://square-termite-set.ngrok-free.app/api/auth/CreateAccount';
    const content = { email: req.body.email, password: req.body.password };
    axios.post(url, content).then((data) => {
      const cookie =
        data?.headers['set-cookie']?.concat([
          `email=${req.body.email}; path=/; secure; HttpOnly; SameSite=None`,
        ]) ?? '';
      res.setHeader('set-cookie', cookie);
      res.status(200).json({ data: data.data.message, success: data.data.success });
    });
  }
}
