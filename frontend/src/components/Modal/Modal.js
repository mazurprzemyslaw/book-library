import React from "react";

import "./Modal.scss";

const modal = props => (
  <div className="modal">
    <header>{props.title}</header>
    <section className="modal__content">{props.children}</section>
    <section className="modal__actions">
      {props.canCancel && (
        <button className="btn" onClick={props.onCancel}>
          Cancel
        </button>
      )}
      {props.canConfirm && (
        <button className="btn" onClick={props.onConfirm}>
          Confirm
        </button>
      )}
    </section>
  </div>
);

export default modal;
