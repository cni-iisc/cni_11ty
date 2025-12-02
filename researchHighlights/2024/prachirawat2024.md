---
layout: research_highlight.html # Do not change this portion

title: Real-Time Image Processing with Oakestra Framework (Complete Theory)

speaker: Prachi Rawat

img: none
year: 2024

category: mtech #should have either mtech or phd

report_video: zYzyB3BC_xE
permalink: "/highlights/prachirawat2024/" 
---
This document explains how real-time image processing can be performed using the 
Oakestra orchestration framework, specifically using Raspberry Pi as an edge (worker) 
node. It includes complete theory, workflow, internal scheduler behavior, and expected 
monitoring outcomes without requiring actual implementation.Deploy an image processing 
service (e.g., object detection) at the edge using Oakestra, where:
- Images are captured on a Raspberry Pi
- Processing is done locally or on a close-by worker
- Workflow leverages the hierarchical scheduling of Oakestra Oakestra's architecture 
follows a three-tier model:
- Root Orchestrator: Manages cluster-level resource scheduling using Cloud_Scheduler
- Cluster Orchestrator: Manages node-level task placement using Cluster_Scheduler
- Worker Node (Raspberry Pi): Captures and processes images using an embedded runtime 
like TensorFlow Lite1. Image Captured: A camera on Raspberry Pi captures a frame.
2. Job Request Creation: The local software creates an SLA describing resource needs.
3. Root Scheduler (Cloud_Scheduler): Receives SLA, selects best-fit cluster using Celery + 
Redis + Resource Abstractor.
4. Cluster Scheduler (Cluster_Scheduler): Filters eligible nodes, scores them, and chooses 
the best one.
5. Service Deployment: Node Engine deploys the container to Raspberry Pi.
6. Inference and Output: Raspberry Pi processes the image and sends results to the system.
- REQUESTED: Job created and SLA sent to Root Scheduler
- SCHEDULED: Cluster and node are selected
- RUNNING: Container is deployed and service is active
- FAILED: SLA cannot be met, node failure, or model crash
- Avg Deployment Time: 2.4 seconds
- Network Overhead: 3.1%- Lightweight: Runs efficiently on Raspberry Pi and similar 
devices
- Modular: Uses REST APIs, Celery, Redis for clear component separation
- Hierarchical Scheduling: Improves scalability and reliability
- Semantic Networking: Services can auto-discover closest nodes
- Fault Tolerant: Auto-rescheduling if a node or cluster fails
Real-time image processing using Oakestra on edge devices like Raspberry Pi is highly 
feasible. The hierarchical design allows for scalable, resilient deployments with optimized 
service placement. Monitoring and scheduling are handled efficiently through modular 
microservices, enabling robust edge intelligence.

