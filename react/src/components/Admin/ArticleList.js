import React from 'react'
import { Table, Spin } from 'antd'



const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
};

const Article = ({articles, deleteArticle, loading}) => {
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '作者',
            dataIndex: 'author',
        }, {
            title: '创建时间',
            dataIndex: 'meta.createAt',
        }, {
            title: '修改时间',
            dataIndex: 'meta.updateAt',
        }, {
            title: '关键词',
            dataIndex: 'keywords',
            render(text, record, index){
                let keywords = record['keywords'] || []
                let titleArr = keywords.map(item => item.title)
                return (
                    <span>{titleArr.join(', ')}</span>
                    );
            }
        }, {
            title: '操作',
            render(text, record, index){
                return (
                    <span>
                        <a>Edit</a>
                        <span className="ant-divider" />
                        <a onClick={() => {deleteArticle(record._id)}}>Delete</a>
                    </span>
                    );
            }
        }
    ];

    return (
        <div>
            <Table loading={loading} rowSelection={rowSelection} columns={columns} dataSource={articles} />
        </div>
        )
}



module.exports = Article

