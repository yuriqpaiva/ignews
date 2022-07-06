import { NextApiRequest, NextApiResponse } from "next";

// Serverless: Executed 
export default function Users(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const users = [
    { id: 1, name: "Yuri" },
    { id: 1, name: "Yuri" },
    { id: 1, name: "Yuri" },
  ];

  return response.status(200).json(users);
}

