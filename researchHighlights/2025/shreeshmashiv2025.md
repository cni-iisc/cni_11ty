---

layout: research_highlight.html # Do not change this portion

title: Finite Time Analysis Of Gradient Scheduling With A Slow Time-scale Index-bias For Fair Scheduling With Rate Guarantees In 5g Cellular Networks


speaker: Shreeshma Shiv

img: none
year: 2025

category: phd #should have either mtech or phd

report_video: cbTx5jP02zA
permalink: "/highlights/shreeshmashiv2025/" 
---
Unlike many aspects of wireless communication systems that are standardised, scheduling decisions are implemented by vendors as proprietary algorithms. As a result, scheduling acts as an important service differentiator in the telecommunications industry. A well-designed scheduler can significantly improve network throughput, fairness, latency, reliability, and overall user experience. The design of efficient scheduling policies is therefore of significant practical and commercial importance. Over the years, a wide variety of scheduling problems have been studied. The growing diversity of wireless applications continues to motivate the development of new scheduling algorithms that can balance multiple performance objectives. Our work focuses on design and finite-time analysis of a scheduling algorithm to provide fair scheduling of elastic transfers with rate guarantees for some users. A practical application of rate-guaranteed scheduling is Fixed Wireless Access (FWA) networks. In such networks, a subset of users will be associated with residential or business gateways and require minimum throughput guarantees. The scheduler must ensure that these guarantees are satisfied while maximising the overall network performance. For the downlink scenario, we model this requirement as a non-linear convex optimization problem. We maximize a non-decreasing, concave utility function, with minimum rate constraints for selected users, over all the possible throughput vectors that can be provided by any ergodic scheduling policy; the rate region of the users. The algorithm and its asymptotic convergence is discussed in [1]. The scheduler computes an index for each flow in each slot, and schedules the flow with the maximum index. An exponentially weighted moving average (EWMA) updates the node throughputs. At a slow time-scale, a vector of “index-biases” is updated by a constant step-size stochastic approximation algorithm, with stepsize smaller than that of the EWMA. The index-biases are related to Lagrange multipliers, and positively bias the slot indices of the UEs with rate guarantees, promoting their more frequent scheduling. We perform finite-time analysis of this two step stochastic approximation algorithm. First, we study the error in the fast-timescale throughput update by adapting the proof technique of Neely in [2]. This yields a bound on the deviation of the time-averaged throughput iterates from their optimal values, where the bound depends on both the fast- and slow-timescale step sizes, as well as the utility function parameters. We then quantify the error in the index-bias estimates relative to the optimum, and get the total error. We then characterize the error in the index-bias estimates relative to their optimal values and combine the two results to obtain an overall error bound. The analysis provides insights into the choice of fastand slow-timescale step sizes, thereby guiding algorithm design based on performance requirements. The finite-time analysis is carried out separately for planar and strictly convex rate regions, and applies to an arbitrary number of rate-guaranteed users.
REFERENCES
[1] Anurag Kumar and Rajesh Sundaresan. Utility optimal scheduling with a slow time-scale index-bias for achieving rate guarantees in cellular networks, 2024.
[2] Michael J. Neely. Convergence and adaptation for utility optimal opportunistic scheduling. IEEE/ACM Transactions on Networking, 27(3):904–917, 2019