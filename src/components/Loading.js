import React from 'react';
import {Spinner} from 'reactstrap';
import '../Assets/style/Loading.css';

export default function Loading({openModal = true, bgTransparent = false}) {
  return openModal ? (
    <>
      <div
        className={
          bgTransparent
            ? 'loading-background'
            : 'loading-background-transparent'
        }>
        <div className="loading-indicator">
          <Spinner color="success" />
        </div>
      </div>
    </>
  ) : null;
}
