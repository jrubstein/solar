import React from "react";
import { Field, reduxForm } from "redux-form/immutable";
import { InjectedFormProps } from "redux-form";
import {Map} from 'immutable'
import injectSheet from 'react-jss'
import { WithStyles, StyleRules } from "@material-ui/core/styles";
import { withNamespaces, WithNamespaces } from 'react-i18next'
export const LoginFormName: string = 'LoginForm'

const styles: StyleRules = {
}

type LoginFields = {
    user?: string,
    password?: string,
}

const validate = (data: Map<string, string>) => {
    const errors: LoginFields = {}
    if (!data.get('user')) {
      errors.user = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.get('user'))) {
      errors.user = 'Invalid user'
    }
    if (!data.get('password')) {
      errors.password = 'Required'
    }

    return errors
  }

  const renderField = ({
    input,
    type,
    placeholder,
    meta: { touched, error, warning, }
  }: any) => (
    <div>
      <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

const form = (props: InjectedFormProps<{}, {}> & WithStyles & WithNamespaces) => {
    const { handleSubmit, reset,pristine , submitting, invalid, t } = props
    return (
        <form onSubmit={handleSubmit} className={props.classes.form}>
            <div>
                <label htmlFor="user">{t('login-form-user')}</label>
                <Field name="user" component={renderField} type="email" placeholder="User" />
            </div>
            <div>
                <label htmlFor="password">{t('login-form-password')}</label>
                <Field name="password" component={renderField} type="password" />
            </div>
            <button type="submit" disabled={submitting || invalid}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
        </form>
    )
}

const translatedForm = withNamespaces()(injectSheet(styles)(form))
export const LoginForm = reduxForm<{}, {}>({
    form: LoginFormName,
    validate
  })(translatedForm)