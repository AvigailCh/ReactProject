import React, { FC } from 'react';
import './my-modal.scss';

interface MyModalProps {}

const MyModal: FC<MyModalProps> = () => (
  <div className="my-modal">
    MyModal Component
  </div>
);

export default MyModal;
