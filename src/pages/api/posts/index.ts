import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const post = await getEntry("blog", id);
    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ msg: `Post ${id} not fount` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const post = await getCollection("blog");
  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
