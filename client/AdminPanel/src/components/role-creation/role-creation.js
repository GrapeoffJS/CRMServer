import React, { useState, useEffect } from "react"
import { Layout, Breadcrumb, Card, Col, Row, List, Skeleton } from "antd"
import styled from '@emotion/styled'
import {
	DeleteOutlined
} from '@ant-design/icons'

import Url from './../../url/url.js'
import ModalRoleCreation from './modal-role-creation/modal-role-creation.js'
import { getActionPermissions, getDataPermissions } from './get-permissions-list/get-permissions-list.js'

const RoleCreation = () => {
    const { Content } = Layout;
    const axios = require('axios'); // AJAX

    const [Role, setRole] = useState([])
    const [SkeletonShow, setSkeletonShow] = useState(false)

    const getRole = () => {

    	setSkeletonShow(true)

    	axios({
			method: 'get',
			url: `${Url}/AdminPanel/Roles`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
    	})
    	.then((res) => {
    		setSkeletonShow(false)
    		setRole(res.data)
    	})
    	.catch(error => {
    		if (error.response) {
    			setSkeletonShow(false)
    		}
    	})
    }

    const deleteRole = (_id) => {
    	setSkeletonShow(true)

    	axios({
    		method: 'Delete',
    		url: `${Url}/AdminPanel/Roles/${_id}`,
    		headers: {
    			'Content-Type': 'application/json;charset=utf-8'
    		}
    	})
    	.then(res => {
    		getRole()
    		// setSkeletonShow(false)
    	})
    	.catch(error => {
    		if (error.response) {
    			setSkeletonShow(false)
    		}
    	})
    }

    useEffect(() => {
    	getRole()
    }, [])

	let ColRole = Role.map((role, i) => {
		if (!SkeletonShow) {
			let {name, actionPermissions, dataPermissions, _id} = role

			let actionPermissionsItem = getActionPermissions(actionPermissions),
				dataPermissionsItem = getDataPermissions(dataPermissions)	

		    return (
		        <Col key={_id} span={8} style={{position: 'relative'}}>
		            <Card title={name} bordered={true}>
		            <DeleteOutlined style={{
		            		color: 'red', 
		            		fontSize: '20px', 
		            		position: 'absolute',
		            		top: '19px',
		            		right: '22px'
		            	}}
		            	onClick={() => {deleteRole(_id)}}
		            	/>
		                <List
		                    size="small"
		                    bordered
		                >
		                	<List.Item style={{ fontSize: "16px", fontWeight: "500" }}>
								Разрешённые действия:
							</List.Item>
							{actionPermissionsItem}
							<List.Item style={{ fontSize: "16px", fontWeight: "500" }}>
							    Можно видеть:
							</List.Item>
							{dataPermissionsItem}
		                </List>
		            </Card>
		        </Col>
		    )
		} else {
			return <Skeleton active />
		}
	})

    const Box = styled.div({
    	'.ant-col': {
    		padding: '10px'
    	},
    	'.Possibilities': {
		    fontWeight: '600',
		    fontSize: '15px'
    	},
    	'.ant-list-bordered': {
    		border: 'none'
    	},
    	'.ant-card-head': {
    		backgroundColor: '#e6696952'
    	}
    })

    return (
        <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Админ панель</Breadcrumb.Item>
                <Breadcrumb.Item>
                	Создание ролей
                	<ModalRoleCreation dataRole={Role} setDataRole={setRole} setSkeletonShow={setSkeletonShow}/>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Box className="site-layout-content">
				<div className="site-card-wrapper">
				    <Row gutter={16}>
				    	{ColRole}
				    </Row>
				</div>
            </Box>
        </Content>
    );
};

export default RoleCreation;