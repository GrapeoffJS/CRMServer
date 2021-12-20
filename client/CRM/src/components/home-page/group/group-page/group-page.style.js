import styled from "@emotion/styled";

const breakpoints = [767],
    mq = breakpoints.map(
        bp => `@media (max-width: ${bp}px)`
    );

const GroupPageStyle = styled.div({
    marginTop: '0px',
    margin: '0 auto',
    '.pad': {
        padding: '0px',
        paddingRight: '10px',
        [mq[0]]: {
            paddingRight: '0px'
        }
    },
    '.infoLog': {
        marginBottom: '10px',
        padding: '0',
        [mq[0]]: {
            paddingBottom: '10px'
        },
        '.calendar': {
            margin: '9px 0',
            marginRight: '10px',
            fontSize: '15px'
        }
    },
    '.group-name': {
        padding: '0',
        borderBottom: '1px solid #0dcaf0',
        [mq[0]]: {
            borderRight: 'none'
        }
    },
    '.time': {
        margin: '0',
        padding: '0',
        h5: {
            fontSize: '1.25rem'
        }
    },
    '.ulBox': {
        borderRadius: '15px',
        padding: '0px'
    },
    '.editing': {
        background: '#fff',
        borderRadius: '10px 10px 0 0',
        i: {
            marginLeft: '95%',
            cursor: 'pointer'
        }
    },
    li: {
        backgroundColor: 'none',
        span: {
            fontSize: '16px',
            margin: '0 5px 5px 0'
        }
    }
});

const TablePupils = styled.div({
    background: '#fff',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '15px',
    '& > h3': {
        fontSize: '22px'
    }
});

export {
    TablePupils,
    GroupPageStyle
}