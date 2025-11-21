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
    data: { label: "(1) Device with Secure Element Chip\n(Raspberry Pi + SparkFun ATECC608A Qwiic)" },
    type: "input",
    style: { padding: 10, borderRadius: 8, background: "#eff6ff" },
  },
  {
    id: "2",
    position: { x: 280, y: 0 },
    data: { label: "(2) Generate Keypair Inside SE\nPRIV_DEV (sealed), PUB_DEV (exported)" },
    style: { padding: 10, borderRadius: 8, background: "#e0f2fe" },
  },
  {
    id: "3",
    position: { x: 560, y: 0 },
    data: { label: "(3) Export PUB_DEV\n(private key never leaves chip)" },
    style: { padding: 10, borderRadius: 8, background: "#ecfeff" },
  },
  {
    id: "4",
    position: { x: 840, y: -80 },
    data: { label: "(4) Owner Arweave Wallet\n(signs device identity record)" },
    style: { padding: 10, borderRadius: 8, background: "#fef9c3" },
  },
  {
    id: "5",
    position: { x: 1120, y: -80 },
    data: { label: "(5) AO Attestation Process\n(verify wallet, build identity record)" },
    style: { padding: 10, borderRadius: 8, background: "#f5f3ff" },
  },
  {
    id: "6",
    position: { x: 1400, y: -80 },
    data: {
      label:
        "(6) Identity Anchored on Arweave\n{ PUB_DEV, metadata, owner_wallet, timestamp }",
    },
    style: { padding: 10, borderRadius: 8, background: "#dcfce7" },
  },
  {
    id: "7",
    position: { x: 840, y: 140 },
    data: {
      label:
        "(7) Device Produces Attestation\nmessage = (hashes + challenge + timestamp)",
    },
    style: { padding: 10, borderRadius: 8, background: "#fee2e2" },
  },
  {
    id: "8",
    position: { x: 1120, y: 140 },
    data: {
      label:
        "(8) Secure Element Signs Message\nSIG_DEV = SIGN(PRIV_DEV, message)",
    },
    style: { padding: 10, borderRadius: 8, background: "#f9fafb" },
  },
  {
    id: "9",
    position: { x: 1400, y: 140 },
    data: {
      label:
        "(9) Verifier Fetches PUB_DEV from Arweave via AO\n(using owner_wallet / device ID)",
    },
    style: { padding: 10, borderRadius: 8, background: "#e5e7eb" },
  },
  {
    id: "10",
    position: { x: 1680, y: 140 },
    data: {
      label:
        "(10) Verify Signature\nVERIFY(PUB_DEV, message, SIG_DEV) == true",
    },
    style: { padding: 10, borderRadius: 8, background: "#fefce8" },
  },
  {
    id: "11",
    position: { x: 1960, y: 140 },
    data: {
      label:
        "(11) Proof of Device Identity\nOnly this physical device could sign this attestation",
    },
    type: "output",
    style: { padding: 10, borderRadius: 8, background: "#bbf7d0" },
  },
];

const edges: Edge[] = [
  // Provisioning / identity anchoring path (blue)
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Provisioning: power on / setup",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    label: "Generate keypair inside SE",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    label: "Send PUB_DEV to owner",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "Owner signs identity\nwith Arweave wallet",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    label: "AO writes record to Arweave",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  // Runtime attestation path (green)
  {
    id: "e2-7",
    source: "2",
    target: "7",
    label: "Later: during sensing / attestation",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    label: "Pass message into SE",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    label: "Verifier obtains PUB_DEV\nfrom Arweave via AO",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
  {
    id: "e9-10",
    source: "9",
    target: "10",
    label: "Use PUB_DEV to verify SIG_DEV",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
  {
    id: "e10-11",
    source: "10",
    target: "11",
    label: "Identity confirmed",
    type: "smoothstep",
    style: { stroke: "#22c55e" },
  },
];

export const ProofOfDeviceIdentityFlow: React.FC = () => {
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

export default ProofOfDeviceIdentityFlow;

