import React, { useEffect } from 'react'
import NavBarClient from '../NavBarClient';
import { Container } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux'
import profileAction from '../../redux/actions/profile'


export default function Profile(props) {
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.profile)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(profileAction.getProfile(token))
  },[dispatch, token])
  console.log(props)
  return (
    <React.Fragment>
      {/* <NavBarClient /> */}
      <Container>
        <div>
          <div>{user}</div>
        </div>

      </Container>
    </React.Fragment>
  )
}
