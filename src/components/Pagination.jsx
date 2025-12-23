import styled from 'styled-components';

const PaginationDiv = styled.div`
    display: flex;
    margin: 0.5em 0.5em 0 0;
    justify-content: center;
`;

export default function Pagination({
                                       totalItems,
                                       currentFirstIndex,
                                       currentLastIndex,
                                       hasNextPage,
                                       hasPreviousPage,
                                       goToNextPage,
                                       goToPreviousPage
                                   }) {
    return (
        <PaginationDiv>
            <button disabled={!hasPreviousPage} onClick={() => goToPreviousPage()}>&lt;</button>
            <div>Showing {currentFirstIndex}-{currentLastIndex} of {totalItems}</div>
            <button disabled={!hasNextPage} onClick={() => goToNextPage()}>&gt;</button>
        </PaginationDiv>
    );
}
