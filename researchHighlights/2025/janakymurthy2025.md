---

layout: research_highlight.html # Do not change this portion

title: Endogeny for the k-min Recursive Distributional Equation


speaker: Janaky Murthy

img: none
year: 2025

category: phd #should have either mtech or phd

report_video: UL_lti9qGgQ
permalink: "/highlights/janakymurthy2025/" 
---
<b>Background and Motivation</b><br>
Many large-scale combinatorial optimization problems can be solved using local message-passing algorithms.
One important example is the minimum-weight k-factor problem on a complete graph with random edge weights. A k-factor is a spanning subgraph in which every vertex has degree exactly k. The special case k = 1 corresponds to perfect matching, while k = 2 corresponds to a cycle cover or 2-factor. The algorithmic object of interest is belief propagation (BP), a local iterative method in which vertices exchange messages with their neighbors and update their decisions using adjusted local costs. For the k-factor problem, this means that each vertex repeatedly selects the k most favorable neighboring vertices according to the current messages. Belief propagation is attractive because it is local, parallelizable, and potentially scalable to large systems. The main theoretical question is whether this local algorithm converges to the global optimum. For random complete graphs, the local neighborhood around a typical vertex converges to an infinite random tree called the
Poisson Weighted Infinite Tree (PWIT). The limiting behavior of belief propagation and of the optimization
problem can then be described using a recursive distributional equation (RDE) on this infinite tree. Understanding the properties RDE on this limiting tree can be exploited to prove convergence of BP on finite graphs.
<br>
<b>Research Objective</b><br>
The objective of this project is to prove a structural property called endogeny for the k-min RDE associated
with the minimum-weight k-factor problem. Informally, endogeny means that the message at the root of the limiting infinite tree is determined entirely by the random edge weights of the tree. No additional randomness from the boundary at infinity is needed. This property is important because it is a key ingredient in the Salez–Shah framework for proving convergence of
belief propagation. The specific goal of the present work is to prove endogeny for all k ≥ 1. The case k = 1 was previously
known, but the earlier approach does not directly extend to k ≥ 2, where the fixed point equation is nonlinear.
<br>
<b>Main Result</b><br>
The main result obtained in this work is:
For every k ≥ 1, the recursive tree process associated with the k-min recursive distributional equation is endogenous.
This gives a proof that works uniformly across all values of k, including the previously understood case k = 1. The main contribution is that the argument does not rely on special features of the matching case and instead handles the nonlinear structure present for general k.
<br>
<b>Current Status and Planned Work</b><br>
For k = 1, Salez and Shah proved convergence of belief propagation by combining endogeny and the convergence of finite optimum to the infinite optimum. In the general k-factor setting, the present work supplies the 1 endogeny input needed for the infinite-tree part of this program. The remaining major gap is to establish the finite-graph transfer step for k ≥ 2: namely, to relate the canonical optimum on the Poisson Weighted Infinite Tree back to the finite optimum on the complete graph. Future work will focus on this step.
<br>