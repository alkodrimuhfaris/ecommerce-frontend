import React from 'react'
import {
  Spinner,
  Modal,
  ModalBody
} from 'reactstrap'
import '../Assets/style/Loading.css'

export default function Loading({
  openModal
}) {

  return (
    <>
      <div className="loading-background">
          <div className="loading-indicator">
            <Spinner color="success" />
          </div>
      </div>
    </>
  )
}