import type { NextApiRequest, NextApiResponse } from "next"
import { createNextApiHandler } from "@trpc/server/adapters/next"

import { appRouter, createTRPCContext } from "@ideasphere/api"

const getAllowedOrigins = () => {
  if (process.env.VERCEL_URL) {
    return [`https://${process.env.VERCEL_URL}`]
  }

  if (process.env.NODE_ENV === "development") {
    return ["*"]
  }

  return ["localhost:3000"]
}

function setCorsHeaders(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", getAllowedOrigins())
  res.setHeader("Access-Control-Allow-Methods", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  setCorsHeaders(res)

  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
          }
        : undefined,
  })(req, res)
}

export default handler
