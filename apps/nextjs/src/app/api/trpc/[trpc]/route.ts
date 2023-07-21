import type { NextApiRequest, NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter, createTRPCContext } from "@ideasphere/api";

export const runtime = "nodejs";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  setCorsHeaders(res);

  return createNextApiHandler({
    router: appRouter,
    createContext: (opts) => createTRPCContext(opts),
  })(req, res);
};

export default handler;
