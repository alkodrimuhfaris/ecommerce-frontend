import React, { useEffect } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {useSelector, useDispatch} from 'react-redux'

export default function PrivateRoute(props) {
  const auth = useSelector(state => state.auth)
  return (
    <Route render={
      (props) => {
        const childWithProps = React.Children.map(this.props.children, child => {
          if(React.isValidElement(child)){
            return React.cloneElement(child, props)
          }
          return child
        })
        if(this.props.auth.isLogin){
          return childWithProps
        }else{
          return <Redirect to={{pathname: '/login', state: {alert: 'Login first!', color: 'danger'}}} />
        }
      }
    } />
  )
}