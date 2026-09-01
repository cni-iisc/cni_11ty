---
layout: research_highlight.html # Do not change this portion

title: Implementation and Study of Bluetooth Low Energy Channel Sounding  

speaker: Sumedha Govindappagari

img: none
year: 2025

category: mtech #should have either mtech or phd

report_video: rHhomhf0Y4A
permalink: "/highlights/sumedhagovindappagari2025/" 
---
This project investigates Bluetooth Low Energy (BLE) Channel Sounding, a recently introduced ranging framework that enables accurate distance estimation between wireless devices. The work focuses on the study, implementation, and performance evaluation of the two primary BLE Channel Sounding techniques, namely Round-Trip Time (RTT) ranging and Phase-Based Ranging (PBR).
The hierarchical structure of BLE Channel Sounding procedures, events, subevents, and steps was studied in detail. Different Channel Sounding modes, including Mode-0 (frequency offset calibration), Mode-1 (RTT), Mode-2 (PBR), and Mode-3 (combined RTT and PBR), were analyzed to understand their ranging principles and practical applications.
A complete MATLAB-based simulation framework was developed using the Bluetooth Toolbox. Mathematical models were derived for both RTT and PBR distance estimation. For PBR, signal modeling was performed from CS tone generation, wireless propagation, reception, coherent correlation, phase estimation, and final distance computation. For RTT, ranging was implemented using CS Sync packet exchanges and time-of-arrival estimation techniques.
The performance of BLE Channel Sounding was evaluated under several practical wireless impairments, including Additive White Gaussian Noise (AWGN), carrier frequency offset, oscillator phase noise, free-space path loss, and Rician multipath fading. Analytical RMSE expressions were derived and validated through Monte Carlo simulations. The effects of signal-to-noise ratio, packet averaging, oscillator impairments, and multipath propagation on ranging accuracy were investigated.
Simulation results demonstrated that Phase-Based Ranging provides significantly higher ranging accuracy than RTT due to the fine resolution offered by carrier phase measurements. RTT-based ranging was observed to be more sensitive to synchronization errors and channel impairments, while PBR achieved lower RMSE under most operating conditions. The study also highlighted the impact of multipath fading and oscillator non-idealities on BLE ranging performance.
Overall, this work presents a comprehensive study of BLE Channel Sounding, including theoretical modeling, simulation-based validation, impairment analysis, and performance comparison of RTT and PBR techniques. The developed framework provides a basis for future work involving Mode-0 frequency offset calibration, Mode-3 combined ranging, interference mitigation, and hardware implementation of BLE Channel Sounding systems.