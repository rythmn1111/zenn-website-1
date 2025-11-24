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
  // Central: The Three Proofs
  {
    id: "three-proofs",
    position: { x: 600, y: 200 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold text-lg mb-2">The Four Proofs</div>
          <div className="text-sm">Proof of Device Identity</div>
          <div className="text-sm">Proof of Execution</div>
          <div className="text-sm font-semibold">Proof of Freshness</div>
          <div className="text-sm">Proof of Origin</div>
        </div>
      ),
    },
    style: {
      padding: 20,
      borderRadius: 16,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "3px solid #4c1d95",
      minWidth: 200,
      textAlign: "center",
    },
  },

  // Device Side
  {
    id: "device",
    position: { x: 0, y: 100 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold">IoT Device</div>
          <div className="text-sm mt-1">Raspberry Pi</div>
          <div className="text-sm">Secure Element</div>
          <div className="text-sm">(ATECC608A)</div>
        </div>
      ),
    },
    type: "input",
    style: {
      padding: 15,
      borderRadius: 12,
      background: "#eff6ff",
      border: "2px solid #3b82f6",
      minWidth: 150,
    },
  },

  // HyperBEAM Attestation Engine
  {
    id: "attestation-engine",
    position: { x: 300, y: 0 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold">HyperBEAM</div>
          <div className="font-semibold text-sm mt-1">Attestation Engine</div>
          <div className="text-xs mt-1">AMD SEV-SNP TEE</div>
          <div className="text-xs">Decentralized Oracle</div>
        </div>
      ),
    },
    style: {
      padding: 15,
      borderRadius: 12,
      background: "#f0fdf4",
      border: "2px solid #22c55e",
      minWidth: 180,
    },
  },

  // Arweave Network
  {
    id: "arweave",
    position: { x: 300, y: 400 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold">Arweave</div>
          <div className="text-sm mt-1">Permanent Storage</div>
          <div className="text-xs mt-1">Immutable Records</div>
          <div className="text-xs">Blockchain Anchor</div>
        </div>
      ),
    },
    style: {
      padding: 15,
      borderRadius: 12,
      background: "#f9fafb",
      border: "2px dashed #6b7280",
      minWidth: 180,
    },
  },

  // Verifier Side
  {
    id: "verifier",
    position: { x: 1200, y: 100 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold">Verifier</div>
          <div className="text-sm mt-1">Anyone can verify</div>
          <div className="text-sm">Zero-trust</div>
          <div className="text-sm">Cryptographic checks</div>
        </div>
      ),
    },
    type: "output",
    style: {
      padding: 15,
      borderRadius: 12,
      background: "#fff7ed",
      border: "2px solid #f59e0b",
      minWidth: 150,
    },
  },

  // Data Flow Labels
  {
    id: "sensor-data",
    position: { x: 0, y: 300 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-semibold">Sensor Data</div>
          <div className="text-xs">RAW bytes</div>
          <div className="text-xs">Processed output</div>
        </div>
      ),
    },
    style: {
      padding: 10,
      borderRadius: 8,
      background: "#ffedd5",
      border: "1px solid #fb923c",
      minWidth: 120,
    },
  },

  // Challenge Flow
  {
    id: "challenge-flow",
    position: { x: 600, y: 0 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold text-sm">Freshness Challenge</div>
          <div className="text-xs mt-1">Unpredictable nonce</div>
          <div className="text-xs">TEE-generated</div>
          <div className="text-xs">Time-anchored</div>
        </div>
      ),
    },
    style: {
      padding: 12,
      borderRadius: 10,
      background: "#fef3c7",
      border: "2px solid #f59e0b",
      minWidth: 140,
    },
  },

  // Attestation Packet
  {
    id: "attestation-packet",
    position: { x: 600, y: 400 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-bold text-sm">Attestation Packet</div>
          <div className="text-xs mt-1">Device signature</div>
          <div className="text-xs">Challenge bound</div>
          <div className="text-xs">All proofs included</div>
        </div>
      ),
    },
    style: {
      padding: 12,
      borderRadius: 10,
      background: "#fce7f3",
      border: "2px solid #c026d3",
      minWidth: 140,
    },
  },
];

const edges: Edge[] = [
  // Device to Three Proofs
  {
    id: "device-proofs",
    source: "device",
    target: "three-proofs",
    label: "Generates",
    type: "smoothstep",
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    labelStyle: { fill: "#1e40af", fontWeight: 600 },
  },

  // Device to Sensor Data
  {
    id: "device-sensor",
    source: "device",
    target: "sensor-data",
    type: "smoothstep",
    style: { stroke: "#fb923c", strokeWidth: 2 },
  },

  // Sensor Data to Attestation Packet
  {
    id: "sensor-packet",
    source: "sensor-data",
    target: "attestation-packet",
    label: "Captured & Hashed",
    type: "smoothstep",
    style: { stroke: "#fb923c", strokeWidth: 2 },
    labelStyle: { fill: "#c2410c", fontWeight: 600 },
  },

  // Attestation Engine to Challenge Flow
  {
    id: "ae-challenge",
    source: "attestation-engine",
    target: "challenge-flow",
    label: "Issues",
    type: "smoothstep",
    style: { stroke: "#22c55e", strokeWidth: 2 },
    labelStyle: { fill: "#15803d", fontWeight: 600 },
  },

  // Challenge Flow to Three Proofs
  {
    id: "challenge-proofs",
    source: "challenge-flow",
    target: "three-proofs",
    label: "Binds to",
    type: "smoothstep",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
    labelStyle: { fill: "#d97706", fontWeight: 600 },
  },

  // Attestation Engine to Arweave
  {
    id: "ae-arweave",
    source: "attestation-engine",
    target: "arweave",
    label: "Anchors",
    type: "smoothstep",
    style: { stroke: "#6b7280", strokeWidth: 2, strokeDasharray: "5,5" },
    labelStyle: { fill: "#4b5563", fontWeight: 600 },
  },

  // Three Proofs to Attestation Packet
  {
    id: "proofs-packet",
    source: "three-proofs",
    target: "attestation-packet",
    label: "Combined into",
    type: "smoothstep",
    style: { stroke: "#764ba2", strokeWidth: 3 },
    labelStyle: { fill: "#6b21a8", fontWeight: 700 },
  },

  // Attestation Packet to Verifier
  {
    id: "packet-verifier",
    source: "attestation-packet",
    target: "verifier",
    label: "Verified by",
    type: "smoothstep",
    style: { stroke: "#c026d3", strokeWidth: 2 },
    labelStyle: { fill: "#a21caf", fontWeight: 600 },
  },

  // Verifier to Arweave
  {
    id: "verifier-arweave",
    source: "verifier",
    target: "arweave",
    label: "Queries",
    type: "smoothstep",
    style: { stroke: "#6b7280", strokeWidth: 2, strokeDasharray: "5,5" },
    labelStyle: { fill: "#4b5563", fontWeight: 600 },
  },

  // Verifier to Attestation Engine
  {
    id: "verifier-ae",
    source: "verifier",
    target: "attestation-engine",
    label: "Validates",
    type: "smoothstep",
    style: { stroke: "#22c55e", strokeWidth: 2, strokeDasharray: "5,5" },
    labelStyle: { fill: "#15803d", fontWeight: 600 },
  },
];

export const ProofOfFreshnessConceptualFlow: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView fitViewOptions={{ padding: 0.2 }}>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ProofOfFreshnessConceptualFlow;

