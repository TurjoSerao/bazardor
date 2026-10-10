import { auth, connectMongo } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export async function GET(request) {
  await connectMongo();
  return handlers.GET(request);
}

export async function POST(request) {
  await connectMongo();
  return handlers.POST(request);
}
