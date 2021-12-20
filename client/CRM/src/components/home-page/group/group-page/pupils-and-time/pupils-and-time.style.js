import styled from "@emotion/styled";

let Span = styled.div({ // День из расписания ученика.
    margin: '0 3px 0 0',
    position: 'initial',
    button: {
        fontSize: '15px',
        fontWeight: '600',
        padding: '1px 7px',
        width: '100px'
    },
    '.btnAbic': {
        width: '100%'
    },
    ul: {
        border: 'none',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '6px'
    },
    '.li': {
        border: 'none',
        background: 'rgba(0, 0, 0, 0)',
        span: {
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer'
        },
        '.input-group-text': {
            margin: '0',
            borderRadius: '6px 0 0 6px'
        },
        textarea: {
            padding: '2px 7px',
            fontWeight: '500'
        }
    }
});

const breakpoints = [780, 1380, 2002], // 619, 1238, 1857, > 2476
    mq = breakpoints.map(
        bp => `@media (max-width: ${bp}px)`
    )
const Div_box = styled.div({
    borderBottom: '1px solid #91A8B0',
    paddingBottom: '5px',
    marginBottom: '5px',
    i: {
        color: '#17a2b8',
        fontSize: '26px',
        cursor: 'pointer',
        paddingTop: '10px'
    },
    '.global-fon3000': {
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '99',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.6)',
        overflowY: 'scroll',
        i: {
            position: 'fixed',
            top: '3px',
            left: '7px',
            color: '#fff'
        },
        '.bi-trash': {
            display: 'none'
        }
    },
    h4: {
        display: 'inline-block',
        marginRight: '10px',
        marginBottom: '19px'
    },
    '.fixedSchedule-H': {
        maxHeight: '81px',
        overflow: 'hidden'
    },

    '.scheblueFixet': {
        margin: '0 auto',
        marginTop: '50px',
        width: '86%'
    },
    '.fixedSchedule-H, .scheblueFixet': {
        overflow: 'hidden',
        width: '2476px',
        [mq[2]]: {
            width: '1857px'
        },
        [mq[1]]: {
            width: '1238px'
        },
        [mq[0]]: {
            width: '619px'
        },
    },
    '.boxDay': {
        overflowX: 'auto',
        padding: '0 0 10px 0',
        '&::-webkit-scrollbar': {
            height: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#17a2b8',
            borderRadius: '10px'
        }
    }
});

export {
    Div_box,
    Span
}