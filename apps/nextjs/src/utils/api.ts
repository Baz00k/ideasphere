import { createTRPCReact } from "@trpc/react-query"

import type { AppRouter } from "@ideasphere/api"

export const api = createTRPCReact<AppRouter>()

export { type RouterInputs, type RouterOutputs } from "@ideasphere/api"
