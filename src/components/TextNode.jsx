import { Handle, Position } from '@xyflow/react'
import React from 'react'
import MessageIcon from '../assets/message.svg?react';
import CallIcon from '../assets/call-icon.svg?react'

export default function TextNode({ data }) {
  return (
    <div className="text-node-container">
        <Handle className="text-node-handle" type="target" position={Position.Left} />
        <div className='text-node-header'>
          <div className='text-node-header-con'>
            <MessageIcon className='text-node-msg-icon'/> 
            <span className='text-node-title'>Send Message</span> 
          </div>     
          <div className='text-node-call-icon-con'>
            <CallIcon  className='text-node-call-icon'/>     
          </div>
        </div>
        <div className="text-node-body">{data.label}</div>
        <Handle className="text-node-handle" type="source" position={Position.Right} />
    </div>
  )
}
