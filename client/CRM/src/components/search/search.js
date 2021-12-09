import React, {useState, useEffect} from 'react';
import {serverRequest} from './server-request'

import {Link} from "react-router-dom";

import {Input, AutoComplete} from 'antd';

import styled from '@emotion/styled';

const Box = styled.div({
    height: '30px',
    input: {
        height: '30px'
    },
    '.ant-input-search-button': {
        paddingBottom: 'none'
    }
})

const renderItem = (title, obj) => {

    let url

    if (obj.type === 'pupil') {
        url = `/student/${obj.id}`
    } else {
        url = `/group/${obj.id}`
    }

    return ({
        value: title,
        key: obj.id,
        label: (
            <Link
                className="link-info"
                to={url}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>

                {title}
            </Link>
        ),
    })
};

const SearchAll = ({tutorid = ''}) => {

    const [Data, setData] = useState([])
    const [Value, setValue] = useState('')

    useEffect(() => {
        document.getElementById('Search').focus();
    });

    const onSearch = (value) => {

        let localUrl = encodeURI(value)

        serverRequest(setData, localUrl, tutorid, [() => {
            setValue(value)
        }])
    }

    const renderTitle = (title) => (
        <span>
      {title}
    </span>
    );

    let options = [
        {
            label: renderTitle('Ученики'),
            options: [],
        },
        {
            label: renderTitle('Группы'),
            options: [],
        }
    ];

    Data.forEach(item => {
        if (item._index === 'pupils') {

            let {surname, name, midname} = item._source
            options[0].options.push(renderItem(`${surname} ${name} ${midname}`, item._source))
        } else if (item._index === 'groups') {

            let {group_name} = item._source
            options[1].options.push(renderItem(group_name, item._source))
        }
    })

    let typingTimer                //timer identifier
    let doneTypingInterval = 500  //time in ms (5 seconds)

    const onSearchInput = (text) => {
        clearTimeout(typingTimer)
        if (text) {
            typingTimer = setTimeout(() => {
                onSearch(text)
            }, doneTypingInterval);

        } else {
            setValue('')
            setData([])
        }
    }

    return (
        <Box>
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                options={options}
                defaultOpen={() => {
                    return !!Value;
                }}
                defaultValue={`${Value}`}
                onSearch={(text) => {
                    onSearchInput(text)
                }}
                id='Search'>

                <Input size="large" placeholder="Поиск по CRM"/>
            </AutoComplete>
        </Box>
    );
}

export default SearchAll