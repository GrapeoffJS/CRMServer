import styled from "@emotion/styled";

const breakpoints = [1020, 700],
    mq = breakpoints.map(
        bp => `@media (max-width: ${bp}px)`
    );
export const Table = styled.div({
    padding: '0 30px',
    [mq[1]]: {
        padding: '0 0',
    },
    '.table_user': {
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#17a2b8',
            borderRadius: '10px'
        },
    },
    '.log_h2': {},
    td: {
        paddingTop: '1px',
        paddingBottom: '4px'
    },
    'th, td': {
        whiteSpace: 'nowrap'
    }
});
export const Form = styled.form({
    '.addPUPILS': {
        '.input-group': {
            ul: {
                overflowY: 'scroll',
                height: '100px'
            },
            li: {
                cursor: 'pointer',
                padding: '5px',
                span: {
                    fontSize: '11px'
                }
            }
        }
    }
});