import { createClient } from "contentful";

const STUB = {
  async getEntries() { return { items: [] }; },
  async getEntry() { return null; },
};

function build() {
  const space = process.env.SPACE_ID;
  const accessToken = process.env.ACCESS_TOKEN;
  if (!space || !accessToken) return STUB;
  try {
    return createClient({ space, accessToken });
  } catch {
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
