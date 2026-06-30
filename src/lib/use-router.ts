import { useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  hash: string;
  page: string; // 'home' | 'about' | 'directions' | 'direction-detail' | 'service-detail' | 'team' | 'founder' | 'reviews' | 'contacts' | 'thank-you' | 'admin' | 'admin-login'
  params: Record<string, string>;
}

function parseRoute(): RouteState {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  
  let page = 'home';
  const params: Record<string, string> = {};

  if (pathname === '/' || pathname === '') {
    page = 'home';
  } else if (pathname === '/about') {
    page = 'about';
  } else if (pathname === '/directions') {
    page = 'directions';
  } else if (pathname.startsWith('/directions/')) {
    page = 'direction-detail';
    params.slug = pathname.replace('/directions/', '');
  } else if (pathname.startsWith('/services/')) {
    page = 'service-detail';
    params.slug = pathname.replace('/services/', '');
  } else if (pathname === '/team') {
    page = 'team';
  } else if (pathname === '/founder') {
    page = 'founder';
  } else if (pathname === '/reviews') {
    page = 'reviews';
  } else if (pathname === '/contacts') {
    page = 'contacts';
  } else if (pathname === '/thank-you') {
    page = 'thank-you';
  } else if (pathname === '/admin/login') {
    page = 'admin-login';
  } else if (pathname.startsWith('/admin')) {
    page = 'admin';
  }

  return {
    path: pathname,
    hash,
    page,
    params
  };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(parseRoute());

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseRoute());
      // Scroll to top on page transition unless we have a hash
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        // If has hash, let's scroll to the target element if on home page
        const el = document.getElementById(window.location.hash.slice(1));
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    // Intercept all anchor clicks for smooth routing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          
          const pathname = url.pathname;
          const hash = url.hash;

          // If clicking an anchor link like "#philosophy"
          if (hash && (pathname === '/' || pathname === window.location.pathname)) {
            if (window.location.pathname !== '/') {
              // Redirect to home with hash
              window.history.pushState(null, '', `/${hash}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            } else {
              window.history.pushState(null, '', hash);
              const el = document.getElementById(hash.slice(1));
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          } else {
            // Normal page transition
            window.history.pushState(null, '', pathname + hash);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return {
    ...route,
    currentPath: route.path,
    navigate
  };
}
export default useRouter;
