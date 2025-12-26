import styled from 'styled-components';
import {Button} from "@mui/material";

const PaginationDiv = styled.div`
    display: flex;
    margin: 0.5em 0.5em 0 0;
    justify-content: center;
    gap: 0.5em
`;

export default function Pagination({totalItems, currentFirstIndex, currentLastIndex, hasNextPage, hasPreviousPage,
                                       goToNextPage, goToPreviousPage}) {
    return (
        <PaginationDiv>
            <Button disabled={!hasPreviousPage} onClick={() => goToPreviousPage()}>&lt;</Button>
            <div>Showing {currentFirstIndex}-{currentLastIndex} of {totalItems}</div>
            <Button disabled={!hasNextPage} onClick={() => goToNextPage()}>&gt;</Button>
        </PaginationDiv>
    );
}
