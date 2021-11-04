import styled from "@emotion/styled";

const breakpoints = [767],
    mq = breakpoints.map(
        bp => `@media (max-width: ${bp}px)`
    );

export const StudentPage = styled.div({
    marginTop: '0px',
    margin: '0 auto',
    padding: '0',
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
            margin: 'auto 0',
            marginRight: '10px',
            fontSize: '20px',
            span: {
                paddingLeft: '6px'
            }
        }
    },
    '.group-name': {
        borderBottom: '1px solid #0dcaf0',
        padding: '0px',
        [mq[0]]: {
            borderRight: 'none'
        }
    },
    '.Button-Drawer': {
        position: 'absolute',
        right: '0',
        top: '8px'
    },
    '.ulBox': {
        borderRadius: '15px',
        padding: '0px',
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
            fontSize: '14px',
            margin: '0 5px 5px 0'
        }
    }
});

export const TablePupils = styled.div({
    background: '#fff',
    margin: '10px 0',
    padding: '0 10px',
    borderRadius: '15px',
    '& > h3': {
        fontSize: '22px'
    },
    '.ant-tabs-nav': {
        margin: 0
    }
});