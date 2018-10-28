import React from 'react'
import { Helmet } from 'react-helmet'

export default class Container extends React.Component<any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Component</title>
                </Helmet>
                <span>This is the container</span>
            </React.Fragment>
        )
    }
}