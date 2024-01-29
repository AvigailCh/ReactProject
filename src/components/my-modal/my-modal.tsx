import React, { FC } from 'react';
import './my-modal.scss';
import { title } from 'process';

interface MyModalProps { 
  title:string,
  func:Function
}

const MyModal: FC<MyModalProps> = (props: MyModalProps) => {

const OkFunc = () => {
  props.func();
}

  return <div className="my-modal">
    {/* <!-- Button trigger modal --> */}
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      delete item
    </button>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="exampleModalCenter"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" onClick={OkFunc} className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default MyModal;
