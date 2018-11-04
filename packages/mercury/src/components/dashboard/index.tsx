import React from 'react'
import { Helmet } from 'react-helmet'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { Dispatch } from 'redux'
import { WithStyles, StyleRules } from '@material-ui/core/styles'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { GET_LOGGED_USER } from '../../services/user/Actions'

const styles: StyleRules = {
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
}

interface DashboardProps extends WithNamespaces, WithStyles {
  requestLoggedUser: () => void
}

class DashboardView extends React.Component<DashboardProps> {
  constructor(props: DashboardProps) {
    super(props)
  }

  render() {
    const { classes, t, requestLoggedUser } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <title>{t('dashboard-title')}</title>
        </Helmet>
        <section className={classes.content}>
          <button onClick={requestLoggedUser}>{t('dashbord-request-user')}</button>
        </section>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    requestLoggedUser: () => dispatch(GET_LOGGED_USER()),
  }
}

const dashboardWithTranslations = withNamespaces()(injectSheet(styles)(DashboardView))
export default connect(
  null,
  mapDispatchToProps
)(dashboardWithTranslations)
