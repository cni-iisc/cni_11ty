---

layout: research_highlight.html # Do not change this portion

title: Rate - Guaranteed Fair Scheduling

speaker: Sreeshma Shiv

img: none
year: 2024

category: phd #should have either mtech or phd

report_video: l-4D7Ju25S4
permalink: "/highlights/2024/SreeshmaShiv2024/" 
---
<b>FINITE TIME ANALYSIS OF GRADIENT SCHEDULING WITH A SLOW TIME-SCALE INDEX-BIAS FOR
ACCURATE GBR SLICING IN 5G CELLULAR NETWORKS</b>
<p>In 5G network slicing, one key requirement is to perform RAN (Radio Access Network) scheduling that
can meet guaranteed bitrate (GBR) demands for a subset of the enhanced mobile broadband (eMBB) user
equipments (UEs). For the downlink scenario, we model this requirement as a utility-optimal scheduling
problem with minimum rate constraints for selected UEs. We work on analysing the performance of a
two-time-scale scheduling algorithm over a finite time horizon for this problem. The algorithm introduces
a bias (called index bias) to the gradient scheduling indices for users with guaranteed rates, adjusting
them in a proportionally fair manner relative to the utility gradient. Index-bias values are updated over
time using a stochastic approximation method that operates on a slower time scale.
We perform finite-time analysis by substituting the simultaneous fast and slow updates in the original
two-time-scale stochastic approximation with a periodic update scheme. In this approach, the index biases
are updated at appropriately spaced regular intervals, while slot-level scheduling is carried out between
updates using fixed values of the index biases. Simulations show that the sample paths of the processes
in the two models are closely aligned.
Then, we study the evolution of the scheduling and rate update SA for fixed index-biases by adopting
the proof technique of Neely in [1]. This approach yields a bound on the deviation of the time-averaged
iterates from the optimal value, with the bound being a function of the chosen step sizes of both fast and
slow iterations, along with utility function parameters. This finite-time analysis of the gradient scheduler
under fixed index-biases offers guidance on selecting the fast and slow-timescale step size. Leveraging
these bounds, we then quantify the error in the index-bias estimates relative to the optimal Lagrange
multipliers, focusing on the expected ℓ2 norm of the error after a finite number of updates. The index-bias
update is studied by analysing the differentiability of the GBR users’ optimal throughput with respect to
the bias values and properties of the average rate region.
</p>

<b>OTHER CONTRIBUTIONS TO CNI</b>
<ul>
<li>Organized and conducted weekly CNI seminars during a 2-month period in 2024.</li>
<li>Took responsibility for the Seminar Series from January to July 2025, along with Srinivas -managed
identifying speakers, sending invitations, handling logistics, and hosting.</li>
<li> Responsibility for managing logistics and overall requirements of Summer School 2025.</li>
</ul>
<b>REFERENCES</b>
<p> Michael J. Neely. Convergence and adaptation for utility optimal opportunistic scheduling. IEEE/ACM Transactions on Networking,
27(3):904–917, 2019.</p>





