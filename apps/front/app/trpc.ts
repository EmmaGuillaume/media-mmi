import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from '../../back/src/trpc/trpc.router'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3001/trpc", // you should update this to use env variables
    }),
  ],
});
