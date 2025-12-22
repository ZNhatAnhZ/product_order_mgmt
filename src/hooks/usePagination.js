import { useState, useMemo } from 'react';

export default function usePagination(items, itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = items?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentItems = useMemo(() => {
        if (!items) return [];

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return items.slice(start, end);
    }, [items, currentPage, itemsPerPage]);

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    const goToNextPage = () => {
        if (hasNextPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (hasPreviousPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        totalItems,
        hasNextPage,
        hasPreviousPage,
        goToNextPage,
        goToPreviousPage,
    };
}
