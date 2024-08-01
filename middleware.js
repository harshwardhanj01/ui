import { NextResponse } from 'next/server'
import { parseCookies } from 'nookies';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // console.log(request);
  // tejas.....................................................................................................................................
  const path = request.nextUrl.pathname;


  const isPublic = path === '/login' || path === '/register' || path === '/forgot_password';
  const isRoot = path === '/';
  const isProtected = !isPublic && !isRoot;

  // Get the cookie header from the request headers
  const cookieHeader = request.headers.get('cookie');

  // Parse the cookies manually
  const cookies = cookieHeader
    ? Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')))
    : {};


  console.log("cook : " + JSON.stringify(cookies, null, 2));

  // Access a specific cookie
  const token = cookies.session_token;

  console.log("tk: " + token);

  if (!token && (isPublic || isRoot)) {
    return NextResponse.next();
  }

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user has a token and is trying to access a public route, redirect them to the dashboard
  if (token && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Verify the token on the server for protected routes and the root page
  if (token && (isProtected || isRoot)) {
    const response = await fetch('https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/verify_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log("Token verification response:", JSON.stringify(data, null, 2));

    const isValidToken = data.message === "Token is valid";

    if (!isValidToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();

}


// See "Matching Paths" below to learn more
export const config = { matcher: ["/", "/login", "/register", "/forgot_password", "/dashboard", "/journals", "/trading", "/manualtrade", "/assessment", "/learning", "/profile"] };
// tejas.....................................................................................................................................
