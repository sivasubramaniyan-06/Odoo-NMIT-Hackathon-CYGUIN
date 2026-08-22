import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith("/admin") || path.startsWith("/employee");
  const isAuthRoute = path.startsWith("/login") || path.startsWith("/signup");

  // Check admin local session cookie
  const adminSessionCookie = request.cookies.get("admin-session")?.value;
  let isAdmin = false;
  if (adminSessionCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(adminSessionCookie));
      if (parsed && parsed.role === "admin" && parsed.loggedIn === true) {
        isAdmin = true;
      }
    } catch (_) {}
  }

  // If trying to access admin pages
  if (path.startsWith("/admin")) {
    if (isAdmin) {
      return supabaseResponse;
    }
    if (user && user.user_metadata?.role === "admin") {
      return supabaseResponse;
    }
    // Redirect to admin login page if not logged in
    const url = request.nextUrl.clone();
    url.pathname = "/login/admin";
    return NextResponse.redirect(url);
  }

  // If trying to access employee pages
  if (path.startsWith("/employee")) {
    if (user) {
      return supabaseResponse;
    }
    // Redirect to landing page /
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If logged in and trying to access login/signup pages
  if (isAuthRoute) {
    if (isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
    if (user) {
      const url = request.nextUrl.clone();
      const role = user.user_metadata?.role || "employee";
      url.pathname = role === "admin" ? "/admin/dashboard" : "/employee/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
