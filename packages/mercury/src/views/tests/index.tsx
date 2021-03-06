import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Map } from 'immutable'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { CHANGE_LANGUAGE } from '../../services/i18n/Actions'
import { LOGOUT } from '../login/Actions'

interface LoginProps extends WithNamespaces {
  language: string
  changeLanguage: (language: string) => {}
  logout: () => void
}

// https://gist.github.com/iamtmrobinson/d4bb6e9297300b787891337fe9e07c42
class Login extends React.Component<LoginProps> {
  constructor(props: LoginProps) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  public render() {
    const { language, changeLanguage, logout } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <span>{this.props.t('title')}</span>
        <button disabled={language === 'en'} onClick={() => changeLanguage('en')}>
          EN
        </button>
        <button disabled={language === 'es'} onClick={() => changeLanguage('es')}>
          ES
        </button>
        <button onClick={() => logout()}>logout</button>
      </React.Fragment>
    )
  }

  private onSubmit(values: Map<FormData, {}>) {
    // tslint:disable-next-line:no-console
    console.log(values.toObject())
    // https://redux-form.com/7.4.2/docs/faq/howtoclear.md/
  }
}

const mapStateToProps = ({ i18n }: any) => {
  return {
    language: i18n.language,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (language: string) => dispatch(CHANGE_LANGUAGE(language)),
    logout: () => dispatch(LOGOUT()),
  }
}

const loginWithTranslations = withNamespaces()(Login)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginWithTranslations)
