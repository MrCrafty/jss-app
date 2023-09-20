import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    axios
      .post(
        process.env.GRAPH_QL_ENDPOINT as string,
        {
          query: `query {
  item(path: "{FE47B74A-9F4E-4296-A08F-0A3180F7B9D6}", language: "en") {
    children {
      results {
        ProductId: field(name: "ProductId") {
          value
        }
        Title: field(name: "Title") {
          value
        }
        Price: field(name: "Price") {
          value
        }
        Image: field(name: "Image") {
          jsonValue
        }
      }
    }
  }
}

    `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            sc_apikey: '{02F45175-364E-42AF-B76E-2E0C8463E07A}',
          },
        }
      )
      .then((data) => {
        res.status(200).json({ data: data.data.data });
      });
  }
}
