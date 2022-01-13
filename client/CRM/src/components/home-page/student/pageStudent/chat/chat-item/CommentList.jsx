import {Comment, List} from "antd";
import moment from "moment";
import React from "react";
import axios from "axios";

export const CommentList = ({comments}) => {
    return (
        <List
            dataSource={comments}
            header={`Всего сообщений: ${comments.length}`}
            itemLayout="horizontal"
            renderItem={(props, idx) => {
                let body = {...props}
                body.datetime = moment(props.datetime).locale('ru').format("dddd, D MMMM YYYY г., HH:mm")
                if (body.datetime === 'Invalid date') {
                    body.datetime = props.datetime
                }
                body.key = idx
                body.content = <>
                  <p style={{color: body.color ? body.color : "black"}}>{body.content.props.children.split("\n")[0] ? body.content.props.children.split("\n")[0] : body.content}</p>
                  <p>{body.content.props.children.split("\n")[1] ? body.content.props.children.split("\n")[1] : body.content}</p>
                </>

                return <Comment key={body.key} content={body.content} datetime={body.datetime} author={body.author} />
            }}/>
    )
};