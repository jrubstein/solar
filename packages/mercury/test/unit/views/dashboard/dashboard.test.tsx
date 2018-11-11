import renderer from 'react-test-renderer'
import React from 'react'
import { DashboardView } from '../../../../src/views/dashboard'
import { WithNamespaces } from 'react-i18next'
import { i18n } from 'i18next'
import { shallow } from 'enzyme'

const mockI18NProps: WithNamespaces = {
  defaultNS: '',
  i18nOptions: {},
  t: code => code,
  tReady: true,
  i18n: {} as i18n,
}

describe('DashboardView Test', () => {
  const requestLoggedUser = jest.fn()

  beforeEach(() => {
    requestLoggedUser.mockReset()
  })

  describe('render', () => {
    it('should render the dashboard', () => {
      const component = renderer.create(
        <DashboardView requestLoggedUser={requestLoggedUser} {...mockI18NProps} classes={{}} />
      )
      expect(component).toMatchSnapshot()
    })
  })

  describe('requestLoggedUser', () => {
    it('should call requestLoggedUser when the button is clicked', () => {
      const component = shallow(<DashboardView requestLoggedUser={requestLoggedUser} {...mockI18NProps} classes={{}} />)
      component.find('button').simulate('click')
      expect(requestLoggedUser.mock.calls).toHaveLength(1)
    })
  })
})
