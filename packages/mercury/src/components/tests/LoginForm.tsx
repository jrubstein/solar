import React, { InputHTMLAttributes } from "react";
import { Field, reduxForm } from "redux-form/immutable";
import { WrappedFieldProps, InjectedFormProps } from "redux-form";
import {Map} from 'immutable'
import injectSheet from 'react-jss'
import { WithStyles, StyleRules } from "@material-ui/core/styles";

export const LoginFormName: string = 'LoginForm'


const styles: StyleRules = {
    button: {
        color: 'orange'
    },
    form: {
        '& button': {
            color: 'red',
            '&:disabled' : {
                color: 'blue'
            }
        }
    }
}

type TextInputProps = {
    // label: string,
    className?: string
} & WrappedFieldProps

type LoginFields = {
    firstName?: string,
    email?: string,
    lastName?: string
}

const validate = (data: Map<string, string>) => {
    const errors: LoginFields = {}
    if (!data.get('firstName')) {
      errors.firstName = 'Required'
    } else if (data.get('firstName').length > 15) {
      errors.firstName = 'Must be 15 characters or less'
    }

    if (!data.get('email')) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.get('email'))) {
      errors.email = 'Invalid email address'
    }
    if (!data.get('lastName')) {
      errors.lastName = 'Required'
    }

    return errors
  }

  const renderField = ({
    input,
    type,
    placeholder,
    meta: { touched, error, warning, }
  }: TextInputProps & InputHTMLAttributes<{label: string}>) => (
    <div>
      <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

const form = (props: InjectedFormProps<{}, {}> & WithStyles) => {
    const { handleSubmit, reset,pristine , submitting, invalid } = props
    return (
        <form onSubmit={handleSubmit} className={props.classes.form}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" component={renderField} type="text" placeholder="Place holder" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component={renderField} type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component={renderField} type="email" />
            </div>
            <button type="submit" disabled={submitting || invalid}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
        </form>
    )
}

export const LoginForm = reduxForm<{}, {}>({
    form: LoginFormName,
    validate
  })(injectSheet(styles)(form))