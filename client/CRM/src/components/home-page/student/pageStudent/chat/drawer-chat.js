import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'

import ChatItem from './chat-item/chat.js'
import {CommentList} from "./chat-item/CommentList"
import {DivDrawerStyles} from "./styled";
import {Tasks} from "./task-item/Tasks";

const DrawerChat = React.memo(({notes, update, _id, fio, tasksObj}) => {

  const {relTasks, setRelTasks} = tasksObj
    const [comments, setComments] = useState([])
    let notesLocal = notes ? notes : []
    let notesGlobal = []

    useEffect(() => {
        let block = document.querySelector('.ant-list-items')
        if (block) {
            block.scrollTop = block.scrollHeight
        }
    })

    notesLocal.forEach((item, i) => {

        let {author, date, text} = item

        if (comments[0]) {
            if (author + text !== comments[0].author + comments[0].content.props.children) {
                notesGlobal.push(
                    {
                        author: author,
                        content: <p>{text}</p>,
                        datetime: date,
                    }
                )
            }
        } else {
            notesGlobal.push(
                {
                    author: author,
                    content: <p>{text}</p>,
                    datetime: date,
                }
            )
        }
    })


    const COMEN = styled.div({
        position: 'relative',
        '.ant-comment-content-detail': {
            borderBottom: '1px solid #f0f0f0'
        }
    })

    return (
        <DivDrawerStyles>
            <div
                style={{padding: 0}}
            >
                {<CommentList
                        comments={[...notesGlobal, ...comments]}
                    />}
                <ChatItem commentsObj={{comments, setComments}} notesGlobal={notesGlobal} update={update} _id={_id}/>
            </div>
            <COMEN>
                <Tasks tasksObj={{relTasks, setRelTasks}} _id={_id} fio={fio} setComments={setComments}/>
            </COMEN>
        </DivDrawerStyles>
    );
})

export default DrawerChat