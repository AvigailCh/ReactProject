import React, { FC } from 'react';
import './loadder.scss';

interface LoadderProps {
  title:string
}

const Loadder: FC<LoadderProps> = (props:LoadderProps) => (
  <div className='loader-container'>
    <span>{props.title}</span>
    <div className='my-loadder'>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
);

export default Loadder;
