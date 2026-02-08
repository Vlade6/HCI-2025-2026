// webapp/app/lib/strapiAuth.ts
export const STRAPI_URL =
  (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");


export type StrapiUser = {
  id: number;
  username: string;
  email: string;
};

export async function strapiLogin(identifier: string, password: string) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ identifier, password }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || "Login failed");

  return json as { jwt: string; user: StrapiUser };
}

export async function strapiRegister(username: string, email: string, password: string) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ username, email, password }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || "Register failed");

  return json as { jwt: string; user: StrapiUser };
}

export async function strapiMe(jwt: string) {
  const res = await fetch(`${STRAPI_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok) throw new Error("Failed to fetch /users/me");

  return json as StrapiUser;
}
