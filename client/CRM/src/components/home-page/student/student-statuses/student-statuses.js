import React, {useEffect, useState} from "react";
import {Dropdown, Skeleton} from "antd";
import CreatingStatuses from "./creating-statuses";
import {DownOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {updateStatuses} from "./logic-statuses";

const StudentStatuses = ({studentStatusesGlobal, updateStudent}) => {

    const [globalStatuses, setGlobalStatuses] = useState(false)

    useEffect(() => {
        updateStatuses(setGlobalStatuses, () => {})
    }, [])

    if (!globalStatuses) {
        return (
            <div style={{padding: '12px 0'}}>
                <Skeleton.Button active={true} style={{height: 25}}/>
            </div>
        )
    }

    return (
        <Dropdown
            overlay={<CreatingStatuses updateStudent={updateStudent}
                                       studentStatuses={studentStatusesGlobal}
                                       globalStatuses={globalStatuses}/>}
            trigger={['click']}
            // visible={true}
        >
            <Link
                to={'#'}
                style={{
                    paddingLeft: '5px',
                    lineHeight: '47px',
                    overflow: 'hidden',
                    width: '127px'
                }}
            >
                Добавить статус <DownOutlined/>
            </Link>
        </Dropdown>
    )
}

export default StudentStatuses