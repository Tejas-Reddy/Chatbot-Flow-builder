import { ReactFlowProvider } from '@xyflow/react';
import './App.css'
import ChatbotBuilder from './ChatbotBuilder';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="chatbot-builder-main-container">
      <div className='chatbot-builder-title'>Chatbot Flow Builder</div>
      <div className="chatbot-builder-container">
        <ReactFlowProvider>
          {/* The Flow of chatbot builder */}
          <ChatbotBuilder />
          {/* Used react-toastify for showing save and error messages */}
          <ToastContainer position="top-right" autoClose={3000} />
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default App
