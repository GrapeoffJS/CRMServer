import styled from "@emotion/styled";

const breakpoints = [1020, 700],
    mq = breakpoints.map(
        bp => `@media (max-width: ${bp}px)`
    )

export const TableL = styled.div({
    padding: '0 30px',
    [mq[1]]: {
        padding: '0 0',
    },
    '.log_h2': {},
    td: {
        paddingTop: '1px',
        paddingBottom: '4px'
    },
    'th, td': {
        whiteSpace: 'nowrap'
    }
})

export const BoxButtom = styled.div({
    marginTop: "10px",
    svg: {
        marginBottom: "3px",
    },
});