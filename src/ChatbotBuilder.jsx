import { addEdge, ReactFlow, useReactFlow, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useEffect, useState } from 'react'
import NodeSidePanel from './components/NodeSidePanel';
import TextNode from './components/TextNode';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ChatbotBuilder() {

    // States for the flow
    const [messageNodes, setMessageNodes] = useState([]);
    const [messageEdges, setMessageEdges] = useState([]);
    const [selectedMessageNodeId, setSelectedMessageNodeId] = useState(null);
    const [saved, setSaved] = useState(false);
    const [tempLabel, setTempLabel] = useState("");


    const nodeTypes = { textNode: TextNode };
    const { screenToFlowPosition: flowPosition } = useReactFlow();

    //Function to Handle edge connection
    const handleNodeConnect = (params) => {
        const nodeExist = messageEdges.find((e) => e.source === params.source);
        if (nodeExist) return;
        setMessageEdges((edge) =>
            addEdge(
                {
                    ...params,
                    style: { stroke: "#dcdcdc" },
                    markerEnd: {
                        type: "arrowclosed",
                        width: 10,
                        height: 10,
                        color: "#dcdcdc",
                    },
                },
                edge
            )
        );
    }

    // function to handle node dropping
    const handleNodeDrop = (e) => {
        e.preventDefault();
        const nodeType = e.dataTransfer.getData("application/reactflow");
        if (!nodeType) return;

        const nodePosition = flowPosition({
            x: e.clientX,
            y: e.clientY
        });

        const newNode = {
            id: String(+new Date()),
            type: nodeType,
            position: nodePosition,
            data: { label: "Message" }
        }

        setMessageNodes((msgNode) => [...msgNode, newNode]);
    }

    //function to handle drag
    const handleNodeDrag = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    }


    //function to handle save

    const handleSave = () => {
        if (selectedMessageNodeId) {
            setMessageNodes((nodes) =>
                nodes.map((n) =>
                    n.id === selectedMessageNodeId
                        ? { ...n, data: { ...n.data, label: tempLabel } }
                        : n
                )
            );
        }
        const nodeWithNoTargets = messageNodes.filter((nd) => !messageEdges.some((e) => e.target === nd.id));

        if (messageNodes.length > 1 && nodeWithNoTargets.length > 1) {
            toast.error("Cannot save changes");
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 1000);
            toast.success("Saved Changes");
        }
    }

    const selectedNode = messageNodes.find(node => node.id === selectedMessageNodeId);
    useEffect(() => {
        const selectedNode = messageNodes.find(node => node.id === selectedMessageNodeId);
        if (selectedNode) setTempLabel(selectedNode.data.label);
    }, [selectedMessageNodeId, messageNodes]);

    return (
        <>
            <div className="header-container">
                <button
                    className='save-btn'
                    onClick={handleSave}
                >
                    {saved ? 'Saved Changes' : 'Save Changes'}
                </button>
            </div>

            <div className='chatbot-flow-builder-container'>
                <div className='flow-builder-container'>
                    <ReactFlow
                        nodes={messageNodes}
                        edges={messageEdges}
                        nodeTypes={nodeTypes}
                        onNodesChange={(chg) => setMessageNodes((nds) => applyNodeChanges(chg, nds))}
                        onEdgesChange={(chg) => setMessageEdges((eds) => applyEdgeChanges(chg, eds))}
                        onConnect={handleNodeConnect}
                        onDrop={handleNodeDrop}
                        onDragOver={handleNodeDrag}
                        onNodeClick={(event, node) => setSelectedMessageNodeId(node.id)}
                        fitView
                    />
                </div>

                <NodeSidePanel
                    selectedNode={selectedNode}
                    setSelectedMessageNodeId={setSelectedMessageNodeId}
                    setMessageNodes={setMessageNodes}
                    tempLabel={tempLabel}
                    setTempLabel={setTempLabel}
                />

            </div>
        </>
    )
}
