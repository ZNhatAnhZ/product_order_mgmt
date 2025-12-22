import styled from 'styled-components';

const PaginationDiv = styled.div`
    display: flex;
    margin: 0.5em 0.5em 0 0;
    justify-content: center;
`;

export default function Pagination({currentPage, totalPages, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage}) {
    return (
        <PaginationDiv>
            <button disabled={!hasPreviousPage} onClick={() => goToPreviousPage()}>&lt;</button>
            <div>{currentPage}/{totalPages}</div>
            <button disabled={!hasNextPage} onClick={() => goToNextPage()}>&gt;</button>
        </PaginationDiv>
    );
}
