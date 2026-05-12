import { createClient } from "contentful";

const STUB = {
  async getEntries() { return { items: [] }; },
  async getEntry() { return null; },
};

function build() {
  const space =
    process.env.SPACE_ID ||
    process.env.CONTENTFUL_SPACE_ID ||
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken =
    process.env.ACCESS_TOKEN ||
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN ||
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) {
    if (typeof window === 'undefined') {
      console.warn(
        '[contentful] missing env. Set SPACE_ID + ACCESS_TOKEN (or CONTENTFUL_SPACE_ID + CONTENTFUL_ACCESS_TOKEN). Returning stub.'
      );
    }
    return STUB;
  }
  try {
    return createClient({ space, accessToken });
  } catch (err) {
    if (typeof window === 'undefined') {
      console.warn('[contentful] createClient failed:', err?.message || err);
    }
    return STUB;
  }
}

let _client;
export const client = new Proxy({}, {
  get(_t, prop) {
    if (!_client) _client = build();
    return _client[prop];
  },
});
