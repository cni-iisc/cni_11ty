---
layout: research_highlight.html # Do not change this portion

title: MPCC-Based Real-Time Autonomous Racing on the F1TENTH Car 

speaker: Archana Kulkarni

img: none
year: 2025

category: mtech #should have either mtech or phd

report_video: -TEilJnBBLI
permalink: "/highlights/archanakulkarni2025/" 
---

My work during the academic year 2025–2026 focused on autonomous racing using the F1TENTH platform. The project focused on implementing and evaluating an optimization-based autonomous racing framework that could be validated in both simulation and hardware environments. I began by studying existing autonomous racing approaches, including classical path-tracking methods, learning-based approaches, and optimization-based controllers. This study highlighted the limitations of conventional trajectory tracking techniques, particularly their inability to jointly optimize vehicle motion and lap-time performance. This motivated me to adopt Model Predictive Contouring Control (MPCC), an optimization-based framework that simultaneously performs trajectory generation and control by maximizing progress along the track while minimizing tracking errors.
I initially implemented the MPCC framework as a standalone setup to understand the optimization problem and validate its behaviour. The formulation was first tested using CVXPY along with optimization solvers such as MOSEK. While this helped verify the overall structure and constraints of the controller, the computational latency was too high for real-time applications, motivating the need for a faster implementation.
I subsequently integrated the controller into a ROS 2-based pipeline and evaluated it in the F1TENTH Gym simulation environment. To achieve real-time performance, I migrated the implementation to the ACADOS optimization framework, which significantly reduced solver execution times and enabled stable closed-loop operation at higher speeds.
The framework was then deployed on the physical F1TENTH platform, which required building a complete autonomous racing pipeline involving SLAM-based map generation, track extraction and synchronization, AMCL-based localization, and Extended Kalman Filter (EKF) based sensor fusion. In parallel, I explored obstacle-aware autonomous racing as a step towards multi-agent racing by implementing and evaluating different obstacle avoidance strategies in the GymROS simulation environment, eventually integrating a dynamic corridor-based approach within the MPCC framework. These efforts enabled stable real-time operation, accurate path tracking, and reliable constraint satisfaction across both simulation and hardware platforms.
A significant part of this work also involved system-level integration and debugging, including ROS 2 integration, solver tuning, simulation-to-hardware transfer, localization challenges, and handling computational constraints on embedded platforms. These experiences provided valuable insights into deploying optimization-based control algorithms on real robotic systems.
I participated in the 26th RoboRacer Autonomous Racing Competition (Techfest IIT Bombay, December 2025), where the implemented autonomous racing framework secured third place in the time-trial category.
Overall, this work provided practical exposure to various aspects of autonomous systems development, including optimal control, robotics middleware, state estimation, localization, simulation, and hardware deployment. It also strengthened my understanding of integrating perception, planning, and control in autonomous systems.
