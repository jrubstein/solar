import React from 'react'
import { Helmet } from 'react-helmet'
import { Map } from 'immutable'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { Dispatch } from 'redux'
import { WithStyles, StyleRules } from '@material-ui/core/styles'
import injectSheet from 'react-jss'
import { LoginForm } from './components/LoginForm'
import { connect } from 'react-redux'
import { LoginData, LOGIN } from './Actions'

const styles: StyleRules = {
  content: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'text-align': 'center',
  },
  error: {
    color: 'red',
  },
}

interface LoginProps extends WithNamespaces, WithStyles {
  submit: (data: LoginData) => void
  authError?: string
}

class LoginView extends React.Component<LoginProps> {
  constructor(props: LoginProps) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  public render() {
    const { authError, classes, t } = this.props
    return (
      <section className={classes.content}>
        <Helmet>
          <title>{t('login-title')}</title>
        </Helmet>
        <h1>{t('login-title')}</h1>
        {authError && <span className={classes.error}>{authError}</span>}
        <LoginForm onSubmit={this.onSubmit as any} />
      </section>
    )
  }

  private onSubmit(values: Map<string, string>) {
    this.props.submit(values.toObject() as LoginData)
  }
}

const mapStateToProps = ({ login: { authError } }) => {
  return {
    authError,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (loginData: LoginData) => dispatch(LOGIN(loginData)),
  }
}

const loginWithTranslations = withNamespaces()(injectSheet(styles)(LoginView))
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginWithTranslations)
