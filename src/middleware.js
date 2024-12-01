// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Definisi akses halaman
const ACCESS_LEVELS = {
  PUBLIC: 'public',
  USER: 'user',
  MANAGER: 'manager',
  ADMIN: 'admin'
};

const PAGE_ACCESS = {
  '/': ACCESS_LEVELS.PUBLIC,
  '/login': ACCESS_LEVELS.PUBLIC,
  '/register': ACCESS_LEVELS.PUBLIC,
  '/about': ACCESS_LEVELS.PUBLIC,
  '/contact': ACCESS_LEVELS.PUBLIC,
  
  '/dashboard': ACCESS_LEVELS.USER,
  '/profile': ACCESS_LEVELS.USER,
  '/settings': ACCESS_LEVELS.USER,
  '/transactions': ACCESS_LEVELS.USER,
  
  '/manager/dashboard': ACCESS_LEVELS.MANAGER,
  '/manager/reports': ACCESS_LEVELS.MANAGER,
  '/manager/team': ACCESS_LEVELS.MANAGER,
  '/manager/analytics': ACCESS_LEVELS.MANAGER,
  
  '/admin/dashboard': ACCESS_LEVELS.ADMIN,
  '/admin/users': ACCESS_LEVELS.ADMIN,
  '/admin/settings': ACCESS_LEVELS.ADMIN,
  '/admin/logs': ACCESS_LEVELS.ADMIN,
  '/admin/system-config': ACCESS_LEVELS.ADMIN
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;
  
  // Cek level akses halaman
  const requiredAccess = PAGE_ACCESS[pathname];
  
  // Halaman publik langsung diizinkan
  if (requiredAccess === ACCESS_LEVELS.PUBLIC) {
    return NextResponse.next();
  }
  
  // Jika halaman membutuhkan otentikasi tapi tidak ada token
  if (requiredAccess && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // Validasi token jika dibutuhkan
  if (requiredAccess && token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      // Cek otorisasi berdasarkan role
      switch(requiredAccess) {
        case ACCESS_LEVELS.USER:
          if (!['user', 'manager', 'admin'].includes(decoded.role)) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
          }
          break;
        
        case ACCESS_LEVELS.MANAGER:
          if (!['manager', 'admin'].includes(decoded.role)) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
          }
          break;
        
        case ACCESS_LEVELS.ADMIN:
          if (decoded.role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
          }
          break;
      }
    } catch (error) {
      // Token tidak valid
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  
  return NextResponse.next();
}

// Konfigurasi matcher untuk semua halaman yang membutuhkan otentikasi
export const config = {
  matcher: [
    '/dashboard',
    '/profile',
    '/settings',
    '/transactions',
    '/manager/:path*',
    '/admin/:path*'
  ]
};