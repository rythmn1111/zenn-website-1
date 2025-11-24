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
  // Challenge Request Flow (Top Row)
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "(1) IoT Device (Pi)\nSecure Element (ATECC608A)\nPRIV_DEV (sealed)\nPUB_DEV (public)" },
    type: "input",
    style: { padding: 10, borderRadius: 8, background: "#eff6ff" },
  },
  {
    id: "2",
    position: { x: 280, y: 0 },
    data: { label: "(2) Request Challenge\nPOST /<AE_ID>~process@1.0/schedule\nwallet_address\ncode_hash" },
    style: { padding: 10, borderRadius: 8, background: "#f3e8ff" },
  },
  {
    id: "3",
    position: { x: 560, y: 0 },
    data: { label: "(3) ~scheduler@1.0\nAssigns Slot Number\nslot: 42" },
    style: { padding: 10, borderRadius: 8, background: "#e0f2fe" },
  },
  {
    id: "4",
    position: { x: 840, y: 0 },
    data: { label: "(4) ~snp@1.0\nTEE Attestation\nSIG_TEE\nTEE_Report" },
    style: { padding: 10, borderRadius: 8, background: "#ecfeff" },
  },
  {
    id: "5",
    position: { x: 1120, y: 0 },
    data: { label: "(5) ~lua@5.3a\nGenerate Challenge\nTEE_RNG(32 bytes)\nSHA256(entropy)\nchallenge = C" },
    style: { padding: 10, borderRadius: 8, background: "#f0fdf4" },
  },
  {
    id: "6",
    position: { x: 1400, y: 0 },
    data: { label: "(6) HashPath Calculator\nHP₄₂ = Hash(HP₄₁ || M₄₂)\nMerkle Proof" },
    style: { padding: 10, borderRadius: 8, background: "#fef3c7" },
  },
  {
    id: "7",
    position: { x: 1680, y: 0 },
    data: { label: "(7) Storage & Anchor\nhb_store_lmdb\nArweave (permanent)\nblock_height" },
    style: { padding: 10, borderRadius: 8, background: "#dcfce7" },
  },
  {
    id: "8",
    position: { x: 1960, y: 0 },
    data: { label: "(8) Challenge Response\nchallenge: C\ntimestamp: T\nslot: 42\nSIG_TEE\nTEE_Report\nhashpath" },
    type: "output",
    style: { padding: 10, borderRadius: 8, background: "#ede9fe" },
  },

  // Data Capture & Attestation (Middle Row)
  {
    id: "9",
    position: { x: 0, y: 200 },
    data: { label: "(9) Sensor/Camera Capture\nRAW data\nraw_hash\ndata_hash" },
    style: { padding: 10, borderRadius: 8, background: "#ffedd5" },
  },
  {
    id: "10",
    position: { x: 280, y: 200 },
    data: { label: "(10) Create Transcript\nraw_hash\ndata_hash\ncode_hash\nchallenge: C\ntimestamp_device" },
    style: { padding: 10, borderRadius: 8, background: "#e5e7eb" },
  },
  {
    id: "11",
    position: { x: 560, y: 200 },
    data: { label: "(11) ATECC608A Sign\nSIG_DEV = Sign(PRIV_DEV, transcript)\nDevice Signature" },
    style: { padding: 10, borderRadius: 8, background: "#fee2e2" },
  },
  {
    id: "12",
    position: { x: 840, y: 200 },
    data: { label: "(12) Final Attestation Packet\nAll transcript data\nSIG_DEV\nPUB_DEV\nAE reference (slot: 42)" },
    type: "output",
    style: { padding: 10, borderRadius: 8, background: "#fce7f3" },
  },

  // Verification Flow (Bottom Row)
  {
    id: "13",
    position: { x: 0, y: 400 },
    data: { label: "(13) Verifier\nAnyone can verify" },
    type: "input",
    style: { padding: 10, borderRadius: 8, background: "#fff7ed" },
  },
  {
    id: "14",
    position: { x: 280, y: 400 },
    data: { label: "(14) Query AE\nGET /<AE_ID>~process@1.0/compute/slot/42\nChallenge record\nHashPath" },
    style: { padding: 10, borderRadius: 8, background: "#fef3c7" },
  },
  {
    id: "15",
    position: { x: 560, y: 400 },
    data: { label: "(15) Verify TEE\nVerify AMD SEV-SNP attestation\nSIG_TEE valid?" },
    style: { padding: 10, borderRadius: 8, background: "#fde68a" },
  },
  {
    id: "16",
    position: { x: 840, y: 400 },
    data: { label: "(16) Verify HashPath\nReconstruct HP₀ → HP₄₂\nMerkle proof valid?" },
    style: { padding: 10, borderRadius: 8, background: "#fcd34d" },
  },
  {
    id: "17",
    position: { x: 1120, y: 400 },
    data: { label: "(17) Verify Challenge\nC_device == C_AE?\ncode_hash matches?" },
    style: { padding: 10, borderRadius: 8, background: "#fbbf24" },
  },
  {
    id: "18",
    position: { x: 1400, y: 400 },
    data: { label: "(18) Verify Device Sig\nVerify with PUB_DEV\nSIG_DEV valid?" },
    style: { padding: 10, borderRadius: 8, background: "#f59e0b" },
  },
  {
    id: "19",
    position: { x: 1680, y: 400 },
    data: { label: "(19) Verify Timestamps\nQuery Arweave block\nT_device ≥ T_challenge?" },
    style: { padding: 10, borderRadius: 8, background: "#d97706" },
  },
  {
    id: "20",
    position: { x: 1960, y: 400 },
    data: { label: "(20) ✓ VERIFIED FRESH\nData produced after challenge\nCannot be replayed" },
    type: "output",
    style: { padding: 10, borderRadius: 8, background: "#bbf7d0", border: "2px solid #22c55e" },
  },

  // Arweave Network (Side Node)
  {
    id: "arweave",
    position: { x: 2240, y: 100 },
    data: { label: "Arweave Network\nPermanent immutable storage" },
    style: {
      padding: 10,
      borderRadius: 8,
      background: "#f9fafb",
      border: "2px dashed #9ca3af",
    },
  },
];

const edges: Edge[] = [
  // Challenge Request Flow (Top Row)
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Request challenge",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    label: "HTTP POST",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    label: "slot assigned",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "TEE attestation",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    label: "challenge generated",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    label: "Merkle proof",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    label: "Response",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e8-1",
    source: "8",
    target: "1",
    label: "Challenge received",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeDasharray: "5,5" },
  },

  // Data Capture & Attestation (Middle Row)
  {
    id: "e1-9",
    source: "1",
    target: "9",
    label: "Capture data",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e9-10",
    source: "9",
    target: "10",
    label: "Hashes",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e10-11",
    source: "10",
    target: "11",
    label: "Transcript",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },
  {
    id: "e11-12",
    source: "11",
    target: "12",
    label: "Signed",
    type: "smoothstep",
    style: { stroke: "#3b82f6" },
  },

  // Verification Flow (Bottom Row)
  {
    id: "e13-14",
    source: "13",
    target: "14",
    label: "Start verification",
    type: "smoothstep",
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e14-15",
    source: "14",
    target: "15",
    label: "Next",
    type: "smoothstep",
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e15-16",
    source: "15",
    target: "16",
    label: "Next",
    type: "smoothstep",
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e16-17",
    source: "16",
    target: "17",
    label: "Next",
    type: "smoothstep",
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e17-18",
    source: "17",
    target: "18",
    label: "Next",
    type: "smoothstep",
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e18-19",
    source: "18",
    target: "19",
    label: "Next",
    type: "smoothstep",
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e19-20",
    source: "19",
    target: "20",
    label: "All verified",
    type: "smoothstep",
    style: { stroke: "#22c55e", strokeWidth: 3 },
  },

  // Cross-connections
  {
    id: "e12-17",
    source: "12",
    target: "17",
    label: "Verify",
    type: "smoothstep",
    style: { stroke: "#7c3aed", strokeDasharray: "5,5" },
  },
  {
    id: "e7-arweave",
    source: "7",
    target: "arweave",
    label: "Stored on",
    type: "smoothstep",
    style: { stroke: "#9ca3af", strokeDasharray: "5,5" },
  },
  {
    id: "e14-arweave",
    source: "14",
    target: "arweave",
    label: "Query from",
    type: "smoothstep",
    style: { stroke: "#9ca3af", strokeDasharray: "5,5" },
  },
];

export const ProofOfFreshnessFlow: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ProofOfFreshnessFlow;
