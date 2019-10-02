import * as React from 'react'
import { History, Location } from 'history'
import { View } from 'react-native'
import styled from 'styled-components'
// import logo from '../../assets/images/logo-full.svg'
import TabBox, { Tabs } from './components/TabBox'
import { useUserContext } from '../../screens/Login/UserContext'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import LinkToOtherLogin from './components/LinkToOtherLogin'
import { useIsLandlord } from '../../utils/hooks'

const Wrapper = styled(View)`
  min-height: 100vh;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(50% 100%, var(--dark-blue) 0%, var(--very-dark-blue) 100%);
`

const LogoWrapper = styled(View)`
  position: absolute;
  top: 86px;
`

// const Logo = styled(Image)`
//   width: 180px;
//   height: 46px;
// `

export const ContentWrapper = styled(View)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

export const FormWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const FormRowWrapper = styled(View)`
  width: 90%;
  flex-direction: row;
  justify-content: space-around;
`

interface Props {
  history: History
  location: Location
}

const Login: React.FC<Props> = ({ history, location }) => {
  const isLandlord = useIsLandlord(location)
  const path = isLandlord
    ? location.pathname.substring('/landlord'.length)
    : location.pathname
  const { logIn, signUp } = useUserContext()
  const activeTab = path === Tabs.login ? Tabs.login : Tabs.signup
  
  return (
    <Wrapper>
      <LogoWrapper>{/* <Logo source={{ uri: logo }} /> */}</LogoWrapper>
      <View style={{ width: 600, height: 500 }}>
        <TabBox activeTab={activeTab} isLandlord={isLandlord}>
          {path === Tabs.login ? (
            <LoginForm
              onSubmit={async (email, password) => {
                await logIn(email, password, isLandlord)
                history.push('/')
              }}
            />
          ) : (
            <SignupForm
              onSubmit={async args => {
                await signUp({ ...args, isLandlord })
                history.push('/')
              }}
            />
          )}
        </TabBox>
      </View>
      <LinkToOtherLogin isLandlord={isLandlord} />
    </Wrapper>
  )
}

export default Login
