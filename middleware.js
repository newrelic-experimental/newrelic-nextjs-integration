"use strict";
import { NextResponse } from "next/server";

module.exports.middleware = async function middleware(request) {
  if (request.nextUrl.pathname === "/") {
    // This logic is only applied to /about
    const response = NextResponse.next();
    await new Promise((resolve) => {
      setTimeout(resolve, 25);
    });
    response.headers.set("x-custom", "another-header");
    return response;
  }

  if (request.nextUrl.pathname === "/api") {
    const response = NextResponse.next();
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/blog")) {
    const response = NextResponse.next();
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    return response;
  }
};
