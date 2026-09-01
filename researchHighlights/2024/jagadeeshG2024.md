---

layout: research_highlight.html # Do not change this portion

title: Time Synchronization in Networks

speaker: Gaje Jagadeesh

img: none
year: 2024

category: mtech #should have either mtech or phd

report_video: 46Jgy97Meto
permalink: "/highlights/2024/jagadeeshG2024/" 
---
<b>Precision Time Synchronization in Distributed Networks Using a P4-Enabled Boundary Clock with PI Offset Servo on a Netronome SmartNIC</b>

<b>Abstract </b><br>
<p>Time synchronization is critical in distributed systems and modern networks. The IEEE 1588 Precision Time Protocol (PTP) enables sub-microsecond accuracy, vital for telecommunications, industrial automation, and data centers. This project implements a PTP boundary clock on a Netronome SmartNIC programmed with P4, integrating a Proportional-Integral (PI) servo controller entirely within the data plane to emulate LinuxPTP’s time correction logic. The approach ensures smooth, accurate offset correction without abrupt time changes. Validation using PTP packet exchanges, Wireshark analysis, and hardware timestamping demonstrates the feasibility of programmable, high-precision clock synchronization across heterogeneous network hardware. </p>
<b>Motivation </b><br>
<p>As networked systems grow increasingly distributed, maintaining accurate and consistent time synchronization becomes essential. Applications such as coordinated logging, financial transactions, and real-time control depend on precise timing to function reliably. However, independent clocks across network nodes can lead to timing discrepancies, causing unreliable data correlation and coordination failures. While traditional protocols like Network Time Protocol (NTP) offer millisecond-level accuracy, this is insufficient for modern, time-sensitive applications. The IEEE 1588 Precision Time Protocol (PTP) addresses this gap by enabling synchronization within microsecond or sub-microsecond precision through timestamped message exchanges. This project focuses on enhancing PTP-based synchronization across heterogeneous hardware by implementing a boundary clock on a programmable switch, reducing reliance on host-level software corrections and improving scalability and accuracy. </p>
<b>Functional Aspects </b><br>
<p>This project implements a Proportional-Integral (PI) Offset Servo for a Boundary Clock on a Netronome SmartNIC using P4 and MicroC to achieve precise synchronization in a distributed environment. The system features a linear topology: Host 1 (H1) acts as the PTP Grandmaster, Host 2 (H2) functions as the slave, and the Netronome SmartNIC (S1) operates as a boundary clock. The SmartNIC synchronizes as a slave to H1 while simultaneously serving as a master to H2. The P4 program on the SmartNIC handles parsing and processing essential PTP messages — Announce, Sync, Follow_Up, Delay_Req, and Delay_Resp — with hardware timestamping to ensure precision. A key thing is integration of the PI servo controller directly in the data plane using MicroC, replicating LinuxPTP’s time correction logic. This controller calculates clock offsets in real time and applies incremental corrections to the switch’s local clock, enabling smooth, stable synchronization without abrupt time jumps. </p>

<b>Results and Conclusion </b><br>
<p>The boundary clock software was successfully deployed on the SmartNIC, with ptp4l configured in master mode on H1 and slave mode on H2. Wireshark captures validated the exchange of PTP messages and synchronization behaviour. The programmable switch autonomously calculated clock offsets and applied proportional and integral corrections in real time, avoiding sudden time shifts and ensuring smooth convergence to the master clock. Hardware timestamping minimized software-induced delays, enhancing synchronization precision. Analysis confirmed accurate synchronization between heterogeneous network interfaces, demonstrating the feasibility and benefits of programmable hardware-based time synchronization. This work paves the way for scalable, hardware-accelerated solutions suitable for time-sensitive networking, industrial IoT, and similar applications.</p>