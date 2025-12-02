---

layout: research_highlight.html # Do not change this portion

title: Optimal Control of Interacting Agents on
Sparse Graphs


speaker: Janaky Murthy

img: none
year: 2024

category: phd #should have either mtech or phd

report_video: m0Ick5S4_5Q
permalink: "/highlights/janaky2024/" 
---

<b>Background and Motivation</b><br>
Many real-world systems involve a large number of interacting agents whose states evolve
over time based on local interactions. Examples include epidemics, biological signaling
networks, and distributed robotic systems. These interactions are often structured by
sparse networks: each agent typically communicates or interacts with only a small subset
of other agents. Designing scalable control strategies in such settings, while respecting
locality and privacy constraints, is an important challenge in modern systems engineering.
<br>
<b>Research Objectives</b><br>
This project aims to develop a rigorous framework for the optimal control of stochastic interacting agents connected by large sparse random graphs. We focus on two fundamental
questions:
<ol>
<li>Does the optimal control strategy for a finite network converge to a limiting policy
as the number of agents grows?</li>
<li>Can we exploit structural symmetries of the limiting graph (e.g., infinite trees) to
characterize this policy via recursive equations?</li>
</ol>
<br>
<b>Approach and Preliminary Insights</b><br>
We consider a population of stochastic agents evolving on a random graph, where each
agent’s dynamics depend on its state, the empirical distribution of its neighbors’ states,
and a control action drawn from a common, state-dependent policy. The central objective
is to minimize the expected long-term cost incurred by a uniformly chosen agent.
To analyze the large-population limit, we model the network as a sequence of sparse
random graphs (e.g., uniform k-regular graphs) and study their convergence in the local
weak sense to an infinite rooted tree. We have formally defined the control problem on
this limiting tree and expressed the cost functional in terms of the marginal law at the
root. We also proved a symmetry property of local distributions, showing that under i.i.d.
initial states and a shared policy, the distribution of the local neighborhood is invariant
across nodes.
Inspired by earlier results for uncontrolled dynamics, we have proposed a strategy
to lift the controlled process into trajectory space. This involves using the second-order
Markov random field (MRF) property to recover a Markov structure at the root and its
neighbors

<b>Planned Work</b><br>
Next, we aim to:
<ul>
<li>Rigorously prove that the trajectory process forms a second-order MRF under
shared control policies.</li>
<li> Use this to demonstrate that the process over the root and its neighbors is Markovian in the lifted (trajectory-valued) state space.</li>
<li>Formulate a Bellman-type recursion on this lifted space to characterize the optimal
control.</li>
<li>Analyze convergence of optimal value functions and policies from the finite-agent
system to the infinite-tree limit.</li>
<li>Extend the formulation to limits of more general sparse graphs, such as Unimodular
Galton–Watson trees.</li>
</ul>
