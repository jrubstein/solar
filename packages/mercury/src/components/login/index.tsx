import React from 'react'
import { Helmet } from 'react-helmet'
import { LoginForm } from './LoginForm';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InjectedFormProps } from 'redux-form';
import {Map} from 'immutable'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { CHANGE_LANGUAGE } from '../i18n/Actions'

interface LoginProps extends WithNamespaces, InjectedFormProps<{}, {}> {
    language: string,
    changeLanguage: (language: string) => {}
}


//https://gist.github.com/iamtmrobinson/d4bb6e9297300b787891337fe9e07c42
class Login extends React.Component<LoginProps> {
    constructor(props: LoginProps) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    private onSubmit(values: Map<FormData, {}>) {
        console.log(values.toObject())
        // https://redux-form.com/7.4.2/docs/faq/howtoclear.md/
    }

    render() {
        const {language, changeLanguage} = this.props
        return (
            <React.Fragment>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <span>{this.props.t('title')}</span>
                <button disabled={language === 'en'} onClick={() => changeLanguage('en')}>EN</button>
                <button disabled={language === 'es'} onClick={() => changeLanguage('es')}>ES</button>
                {/* The typing are incorrect for / */}
                <LoginForm onSubmit={this.onSubmit as any}/>
            </React.Fragment>
        )
    }
}


const mapStateToProps = ({i18n} : any) => {
    return {
        language: i18n.language
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeLanguage: (language: string) => dispatch(CHANGE_LANGUAGE(language))
    }
}

const loginWithTranslations = withNamespaces()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(loginWithTranslations)
