---
layout: research_highlight.html # Do not change this portion

title: Evaluation of Dual Stack and Dual Connectivity Research 

speaker: Venkatesan D

img: none
year: 2025

category: mtech #should have either mtech or phd

report_video: YdkmXss2t_k
permalink: "/highlights/venkatesan2025/" 
---
<b>Objective</b><br>
This research establishes a rigorous empirical and mathematical methodology to quantify the “dead space” during Multipath TCP (MPTCP) subflow failures. The focus is on isolating the precise chronological gap between a physical link failure and the protocol’s active packet re-injection onto a healthy subflow.
<br>
<b>Algorithmic Detection & Script Logic</b><br>
An automated Python detection algorithm was developed using index bisecting to parse millions of packets and dynamically adapt to varying loss regimes (e.g., 50%, 75%, 100%).
• Cycle Preservation: The parsing logic is strictly calibrated to ensure that high-speed network responses are accurately captured, explicitly preventing the omission of any cycles where re-injection times fall below the 0.5-second threshold.
• Loss Regime Adaptation: For severe (100%) loss, the script identifies logarithmic TCP Slow Start recovery behavior and applies an active timer penalty of 208 ms. For partial (50%) loss, it identifies linear Congestion Avoidance baselines and applies a 40 ms penalty.
<br>
<b>Stochastic Mathematical Modeling</b><br>
The empirical extraction is paired with a mathematical hybrid model that defines the total recovery time as a continuous Queue Drain phase subject to discrete Retransmission Timeout (RTO) steps:<br>
<br>
Treinjection = ϕ + k × RTO (1)<br><br>
Trecovery = Tdrain + nloss × RTO (2)
<br>
To account for the asynchronous nature of the Linux kernel’s MPTCP scheduler, the exact moment of subflow failure is modeled independently of the kernel’s internal timer. This random phase offset (Φ) is defined as a continuous uniform random variable:
<br>
Φ ∼ U(0, RTO) (3)
<br>
This mathematically establishes an expected baseline penalty of exactly half an RTO cycle (104 ms) before the kernel evaluates the connection state.
<br>
<b>Conclusion of Methodological Impact</b><br>
By enforcing strict baseline anchors and outlier pruning, the generated stochastic model successfully aligns with the empirical data, achieving a median error margin (∆P50) of just 1.9 ms. This methodology provides a highly precise, mathematically grounded framework for evaluating and tuning MPTCP penalty timers in future transport layer research.
<br>