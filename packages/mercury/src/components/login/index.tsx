import React from 'react'
import { Helmet } from 'react-helmet'
import { Map } from 'immutable'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { Dispatch } from 'redux'
import { WithStyles, StyleRules } from "@material-ui/core/styles"
import injectSheet from 'react-jss'
import { LoginForm } from './LoginForm'
import { connect } from 'react-redux'
import { LOGIN, LoginData } from './Actions'

const styles: StyleRules = {
    content: {
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'text-align': 'center'
    }
}

interface LoginProps extends WithNamespaces, WithStyles {
    submit: (data: LoginData) => void
}

class LoginView extends React.Component<LoginProps> {

    constructor(props: LoginProps) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    private onSubmit(values: Map<string, string>) {
        this.props.submit(values.toObject() as LoginData)
    }

    render() {
        return (
            <section className={this.props.classes.content}>
                <Helmet>
                    <title>{this.props.t('login')}</title>
                </Helmet>
                <h1>{this.props.t('login-title')}</h1>
                <LoginForm onSubmit={this.onSubmit as any}/>
            </section>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        submit: (data: LoginData) => dispatch(LOGIN(data))
    }
}


const loginWithTranslations = withNamespaces()(injectSheet(styles)(LoginView))
export default connect(mapStateToProps, mapDispatchToProps)(loginWithTranslations)