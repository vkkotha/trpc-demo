import fetch from "node-fetch";

if (globalThis.fetch === undefined) {
  globalThis.fetch = fetch as unknown as (url: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
}
