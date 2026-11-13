import { useEffect } from 'react';

export const SITE_NAME = 'Admin';

/** "Page | Admin", or just the site name when there is no page title. */
export const formatTitle = (page?: string | null): string => (page ? `${page} | ${SITE_NAME}` : SITE_NAME);

/**
 * Sets the browser tab title for the current page. Pass a value that may be
 * undefined while data loads (e.g. a product name); the route default from
 * <RouteTitle /> stays until it is available.
 */
export default function usePageTitle(page?: string | null): void {
    useEffect(() => {
        if (page) document.title = formatTitle(page);
    }, [page]);
}
