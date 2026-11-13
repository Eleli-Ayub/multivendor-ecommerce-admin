import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { formatTitle } from '../hooks/usePageTitle';

/**
 * Default tab title for each admin route. Detail pages (ad, main ad, user)
 * refine it with usePageTitle() once the record has loaded.
 * Order matters: the first matching pattern wins.
 */
const ROUTE_TITLES: Array<[pattern: string, title: string]> = [
    ['/', 'Dashboard'],
    ['/login', 'Log in'],
    ['/register', 'Register admin'],
    ['/ads', 'Ads'],
    ['/details/:id', 'Ad details'],
    ['/main_ads', 'Main ads'],
    ['/main/:id', 'Main ad'],
    ['/users', 'Users'],
    ['/users/:id', 'User'],
    ['/all-users', 'All users'],
    ['/inquiries', 'Inquiries'],
    ['/categories', 'Categories'],
    ['/categories/:id', 'Edit category'],
    ['/new-category', 'New category'],
    ['/subcategories/:id', 'Edit subcategory'],
    ['/new-subcategory', 'New subcategory'],
    ['/messages', 'Messages'],
    ['/notifications', 'Notifications'],
    ['/packages', 'Packages'],
    ['/admin-packages', 'Packages'],
    ['/marketplace', 'Marketplace'],
    ['/vendors', 'Vendors'],
    ['/admin-products', 'Products'],
    ['/orders', 'Orders'],
    ['/reviews', 'Reviews'],
    ['/locations', 'Locations'],
    ['/invoices', 'Invoices'],
];

export const titleForPath = (pathname: string): string => {
    const match = ROUTE_TITLES.find(([pattern]) => matchPath({ path: pattern, caseSensitive: false, end: true }, pathname));
    return match ? match[1] : 'Page not found';
};

const RouteTitle = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = formatTitle(titleForPath(pathname));
    }, [pathname]);

    return null;
};

export default RouteTitle;
