import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/']
const publicRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get('token')?.value
  const path = request.nextUrl.pathname

  const isPublic = publicRoutes.includes(path)
  const isProtected = protectedRoutes.includes(path)

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()

}