import React from 'react'
import MessageIcon from '../assets/message.svg?react';
import BackArrow from '../assets/back-arrow.svg?react';

export default function NodeSidePanel({ selectedNode, setSelectedMessageNodeId, tempLabel, setTempLabel }) {
    const handleDrag = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    }

    if (selectedNode) {
        return (
          <div className="setting-panel">
            <div className='update-text-container'>
              <div
                className='back-arrow'
                onClick={() => setSelectedMessageNodeId(null)}
              >
                <BackArrow />
              </div>
              <span className='update-msg-title'>Message</span>
            </div>
            <div className='update-msg-input'>
              <span className='update-msg-inp-title'>Text</span>
              <textarea
                className='update-textarea'
                value={tempLabel}
                onChange={(e) => setTempLabel(e.target.value)}
              />
            </div>
          </div>
        );
    }

    return (
        <div className="side-panel-container">
        <div
          className="node"
          onDragStart={(e) => handleDrag(e, "textNode")}
          draggable
        >
          <MessageIcon className='message-icon'/>
          <span>Message</span>
        </div>
      </div>
    )
}
