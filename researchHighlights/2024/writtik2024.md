---
layout: research_highlight.html # Do not change this portion

title: Report on A Comparison of Scheduling Algorithms for Packet Voice in a5G Cellular System and their Impact on Full Buffer eMBB Flows

speaker: Writtik Majumder

img: none
year: 2024

category: mtech #should have either mtech or phd

report_video: nMw7HMctmDo
permalink: "/highlights/writtik2024/" 
---
Abstract—Since the radio channel between the base-station and a User Equipment (UE) is stochastic, semi-persistent scheduling (SPS), commonly used for Voice over New Radio (VoNR), may be suboptimal in the utilisation of time-frequency resources, thus providing lower residual bit-rates for enhanced mobile broadband (eMBB) flows. We consider optimal scheduling of voice packets so that their resource utilisation is minimised, without violating their transmission deadlines. Assuming continuous time-frequency resources, we compare the performance of the following algorithms: SoA: Schedule on Arrival, which is one version of semi-persistent scheduling; RDR: Rate to(Residual) Deadline ratio based policy, a natural heuristic; OST: Optimal Stopping Time scheduling, which uses the finite horizon
backward dynamic programming approach. We compare the above policies with GAS: Genie-Aided Scheduling, a bounding approach, in which the scheduler, non-causally, gets the resource requirements in every slot up to the deadline of the packet. We emperically evaluate the impact of these scheduling policies on VoNR resource utilisation and packet loss, and on the eMBB
throughput region. We also study the effect of advancing the deadline for packet delivery, to reduce the downlink scheduling overhead and UE power consumption. For a 100 MHz system, i.i.d. channel over slots, independent across users, 100 VoNR calls, and call-by-call scheduling, we find that, for a packet deadline of 20 ms (40 slots), state dependent policies can provide up to 80% reduction in resource utilisation by packet-voice, whereas a deadline of 1.5 ms (3 slots) already yields a reduction of up to 60%. When there are slot-to-slot correlations in the channel, there is reduction in the above gains for coherence times 5 ms (10 slots) and 10 ms (20 slots), but there is still room for optimisation beyond SPS.

<b>SCHEDULING POLICIES</b>
<ul>
<li>Schedule on arrival (SOA) SOA schedules packets
immediately upon arrival, ignoring channel conditions.
While simple, it consumes excessive resources, reducing
eMBB throughput by up to 40</li>
<li>Genie-Aided Scheduling (GAS) GAS assumes perfect
future channel knowledge, serving as an impractical upper bound. It achieves the lowest resource usage but is
unimplementable.</li>
<li> Rate-to-Deadline Ratio (RDR) RDR balances channel
quality and urgency with the help of a heuristic index
(Rate to Deadline Ratio). Packets are scheduled when
the heuristic exceeds the threshold in a slot.</li>
<li> Optimal Stopping Time (OST) OST formulates
scheduling as a finite-horizon dynamic programming
problem. Recursive thresholds minimize expected resource usage. OST achieves near-GAS performance with
a 60–80% reduction in VoNR resource utilization (Fig.
2.4).</li>
</ul>
