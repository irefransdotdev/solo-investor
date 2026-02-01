// Jest setup: add global test helpers here when needed
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
// Provide a minimal Request polyfill for Next.js route tests in node/jest environment
if (typeof (global as any).Request === "undefined") {
  // Minimal constructor that accepts either a URL string or an object with .url
  (global as any).Request = function (input: any, init?: any) {
    const url = typeof input === "string" ? input : input?.url;
    return { url, ...init } as any;
  } as any;
}

if (typeof (global as any).Response === "undefined") {
  (global as any).Response = function (body?: any, init?: any) {
    return { body, ...init } as any;
  } as any;
}
