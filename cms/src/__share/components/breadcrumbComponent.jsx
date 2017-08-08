import React, { Component } from 'react';
import { Breadcrumb } from 'antd';



export default class BreadcrumbComponent extends Component {

    render() {
        const breadcrumbNameMap = {
            '/apps': 'Application List',
            '/apps/1': 'Application1',
            '/apps/2': 'Application2',
            '/apps/1/detail': 'Detail',
            '/apps/2/detail': 'Detail',
        };
        const { location } = props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);
        return (
            <div>
                <Breadcrumb>
                    {breadcrumbItems}
                </Breadcrumb>
            </div>
        );
    }
}