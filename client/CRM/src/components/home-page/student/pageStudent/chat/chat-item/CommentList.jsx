import {Comment, List} from "antd";
import moment from "moment";
import React from "react";

export const CommentList = ({comments}) => {
  return (
    <List
      dataSource={comments}
      header={`Всего сообщений: ${comments.length}`}
      itemLayout="horizontal"
      renderItem={props => {
        let body = {...props}
        body.datetime = moment(props.datetime).locale('ru').format("dddd, D MMMM YYYY г., HH:MM")
        if (body.datetime === 'Invalid date') {
          body.datetime = props.datetime
        }
        return <Comment {...body} />
      }}/>
  )
};