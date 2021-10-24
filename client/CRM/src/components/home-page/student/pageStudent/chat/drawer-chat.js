import React, {useState} from 'react'
import {Button, Drawer} from 'antd'
import styled from '@emotion/styled'

import ChatItem from './chat-item/chat.js'
import {CommentList} from "./chat-item/CommentList"
import {DivDrawerStyles} from "./styled";
import {Tasks} from "./task-item/Tasks";

const DrawerChat = ({notes, update, _id, fio, tasks}) => {

  // data
  let notesLocal = notes ? notes : []
  let notesGlobal = []
  // data

  // useState
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState(notesGlobal)
  // useState


  // methods
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    if (visible) {
      update()
    }
    setVisible(false);
  };
  const COMEN = styled.div({
    '.ant-comment-content-detail': {
      borderBottom: '1px solid #f0f0f0'
    }
  })
  // methods

  // util
  notesLocal.forEach(item => {

    let {author, date, text} = item

    notesGlobal.push(
      {
        author: author,
        content: <p>{text}</p>,
        datetime: date,
      }
    )
  })
  // util


  return (
    <React.Fragment>
        <Button type="primary" onClick={showDrawer}>
          Открыть коментарии
        </Button>
      <Drawer
        style={{padding: "0 24px 0 24px"}}
        width={'400px'}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <DivDrawerStyles>
          <div>
            {comments.length > 0 && <CommentList comments={comments}/>}
            <ChatItem commentsObj={{comments, setComments}} notesGlobal={notesGlobal} update={update} _id={_id}/>
          </div>
          <COMEN>
            <Tasks tasks={tasks} _id={_id} fio={fio}/>
          </COMEN>
        </DivDrawerStyles>
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerChat