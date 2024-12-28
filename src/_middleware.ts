// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "@/services/auth";

// export async function middleware(request: NextRequest) {
//     const url = request.nextUrl;

//     // const session = await auth();

//     // const isAuthenticated = session ? true : false;
//     const isAuthenticated = true
    
//     if (url.pathname.startsWith("/dashboard/:path*") && !isAuthenticated) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return NextResponse.next();
// }

// // Apply middleware only to specific routes
// export const config = {
//     matcher: ["/dashboard/:path*", "/profile/:path*"],
// };

// import NextAuth from "next-auth"
// import { authConfig } from "@/services/auth"; 

// export const runtime = 'nodejs' // 'nodejs' (default) | 'edge'

// export const { auth: middleware } = NextAuth(authConfig)

