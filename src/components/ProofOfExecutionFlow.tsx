"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";

const nodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "(1) User Program\n(developer code)" },
    type: "input",
    style: { padding: 10, borderRadius: 8 },
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: { label: "(2) TSEL Library\n(trusted execution wrapper)" },
    style: { padding: 10, borderRadius: 8, background: "#f3e8ff" },
  },
  {
    id: "3",
    position: { x: 500, y: 0 },
    data: { label: "(3) Compute code_hash\nSHA256(user_program)" },
    style: { padding: 10, borderRadius: 8, background: "#e0f2fe" },
  },
  {
    id: "4",
    position: { x: 750, y: 0 },
    data: { label: "(4) Capture RAW\n(read hardware sensor bytes)" },
    style: { padding: 10, borderRadius: 8, background: "#ffedd5" },
  },
  {
    id: "5",
    position: { x: 1000, y: 0 },
    data: { label: "(5) Compute raw_hash + data_hash\nSHA256(RAW), SHA256(output)" },
    style: { padding: 10, borderRadius: 8, background: "#e5e7eb" },
  },
  {
    id: "6",
    position: { x: 1250, y: 0 },
    data: { label: "(6) Prevent synthetic input\n(no files, no fake RAW)" },
    style: { padding: 10, borderRadius: 8, background: "#fee2e2" },
  },
  {
    id: "7",
    position: { x: 1500, y: 0 },
    data: { label: "(7) Batching enabled?" },
    type: "default",
    style: {
      padding: 10,
      borderRadius: 999,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: "#0f766e",
      background: "#ecfeff",
      textAlign: "center",
    },
  },
  // No-batching path
  {
    id: "11",
    position: { x: 1750, y: -120 },
    data: { label: "(11) Secure Element (ATECC608A)\nSparkFun Qwiic module" },
    style: { padding: 10, borderRadius: 8, background: "#f9fafb" },
  },
  {
    id: "12",
    position: { x: 2000, y: -120 },
    data: { label: "(12) Sign all hashes\n+ challenge + timestamp" },
    style: { padding: 10, borderRadius: 8, background: "#fefce8" },
  },
  {
    id: "13",
    position: { x: 2250, y: -120 },
    data: { label: "(13) Final Attestation Packet\n(pubkey, hashes, challenge, SIG_DEV)" },
    type: "output",
    style: { padding: 10, borderRadius: 8, background: "#dcfce7" },
  },
  // Batching path
  {
    id: "8",
    position: { x: 1750, y: 150 },
    data: { label: "(8) Batch Buffer\n(store N readings)" },
    style: { padding: 10, borderRadius: 8, background: "#e0f2fe" },
  },
  {
    id: "9",
    position: { x: 2000, y: 150 },
    data: { label: "(9) Append reading\n(raw_hash, data_hash, data)" },
    style: { padding: 10, borderRadius: 8, background: "#ede9fe" },
  },
  {
    id: "10",
    position: { x: 2250, y: 150 },
    data: { label: "(10) Buffer full?" },
    style: {
      padding: 10,
      borderRadius: 999,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: "#22c55e",
      background: "#f0fdf4",
      textAlign: "center",
    },
  },
];

const edges: Edge[] = [
  // Main path (blue)
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Call TSEL_result()",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    label: "Compute code_hash",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    label: "Trigger sensor",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "Hash RAW + output",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    label: "Enforce real-input only",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    label: "Next step",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  // No-batching path (red)
  {
    id: "e7-11",
    source: "7",
    target: "11",
    label: "No batching",
    type: "smoothstep",
    style: { stroke: "#ef4444" },
    animated: true,
  },
  {
    id: "e11-12",
    source: "11",
    target: "12",
    label: "SIGN(PRIV_DEV, ...)",
    type: "smoothstep",
    style: { stroke: "#ef4444" },
  },
  {
    id: "e12-13",
    source: "12",
    target: "13",
    label: "Emit attestation",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
  // Batching path (green)
  {
    id: "e7-8",
    source: "7",
    target: "8",
    label: "Batching enabled",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
    animated: true,
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    label: "Append reading",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
  {
    id: "e9-10",
    source: "9",
    target: "10",
    label: "Check size == N?",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
  {
    id: "e10-1",
    source: "10",
    target: "1",
    label: "No → wait for more readings",
    type: "smoothstep",
    style: { stroke: "#a3a3a3" },
  },
  {
    id: "e10-11",
    source: "10",
    target: "11",
    label: "Yes → sign batch_hash",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
];

export const ProofOfExecutionFlow: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ProofOfExecutionFlow;

