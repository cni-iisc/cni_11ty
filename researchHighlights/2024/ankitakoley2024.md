---

layout: research_highlight.html # Do not change this portion

title: Fresh Caching and Delivery of Dynamic Contents using Restless Multi-armed Bandits


speaker: Ankita Koley

img: none
year: 2024

category: phd #should have either mtech or phd

report_video: T-MZTlbHgIA
permalink: "/highlights/2024/ankitakoley2024/" 
---
We consider a dynamic content caching problem wherein the contents get updated at a 
central server, and local copies of a subset of contents are cached at a local cache associated 
with a Base station (BS). When a content request arrives, based on whether the content is in 
the local cache, the BS can decide whether to fetch the content from the central server or 
serve the cached version from the local cache. Fetching a content incurs a fixed fetching 
cost, and serving the cached version incurs an ageing cost proportional to the age-of-version 
(AoV) of the content.
The BS has only partial information regarding AoVs of the contents. We formulate an 
optimal content fetching and caching problem to minimize the average cost subject to cache 
capacity constraints. The problem suffers from the curse of dimensionality and is provably 
hard to solve. We formulate this problem as a continuous time restless multi-armed bandit 
process (RMAB), where a single content problem of the corresponding RMAB is a partially 
observable Markov decision process. We prove the indexability of the single content 
problem, and provide a Whittle index based solution to this problem. Finally, we compare 
the performance with recent work and show that our proposed policy is optimal via 
simulations. We demonstrate that in Fig 1, how the policy performs better than the existing 
works and also performs close to the optimal.
We further introduce “wait” option for the BS. In particular, the BS either can serve the local 
version if available or can fetch a fresh version or can wait for additional requests before 
fetching and serving a fresh version. In addition to fetching and ageing costs, waiting costs 
can incur for each waiting requests. We focus on the optimal actions subject to the cache 
capacity constraint at each decision epoch, aiming at minimizing the long term average cost.
Allowing “wait” option adds the queue lengths, to the system’s state. It also substantially 
changes the state dynamics, the analysis and the caching policy. We again propose Whittle 
index based policy as a heuristic to this problem. We show that having a “wait” option 
improves the average cost. We demonstrate this in In Fig 2.
<img src="/assets/img/Research_highlight/2024/ankitakoley-researchhighlight.png" alt="ankitaresearch" width="752px"></img>
