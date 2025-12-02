---

layout: research_highlight.html # Do not change this portion

title: Time Synchronization in Networks

speaker: Medapureddy Kalyan Ram

img: none
year: 2024

category: mtech #should have either mtech or phd

report_video: SKHeIq4vWUg
permalink: "/highlights/medapureddyKR2024/" 
---
<p>Time synchronization in networks is critical for enabling coordination and consistency across distributed systems, especially in industrial control, autonomous systems, and high-frequency trading. This project explores the use of P4-programmable data planes to enhance time synchronization accuracy using the Precision Time Protocol (PTP).  
 <br>
Traditionally, synchronization is managed in software running on control planes. However, the rising demand for nanosecond-level precision necessitates offloading time-critical computations to the data plane itself. In this project, we implemented a P4-based PTP Sync message parser that processes synchronization packets directly in the switch pipeline. A custom extern written in MicroC was used to implement servo computation logic inside the data plane, enabling real-time clock correction. 
 <br>
The approach includes timestamp extraction, clock offset calculation, and slope estimation for skew correction. By using registers to store timestamps and compute delay and offset metrics in-flight, our method significantly reduces jitter and processing delay. The MicroC extern plays a vital role in implementing the linear regression-based servo algorithm, making it efficient and hardware-compatible. 
 <br>
This integration of computation and packet processing in the switch demonstrates a scalable and accurate model for distributed clock synchronization. Compared to software-based implementations, this approach improves determinism and minimizes packet processing delay. 
 <br>
In conclusion, implementing the computation in the data plane using extern MicroC helps increase both the accuracy and precision of clock synchronization, making it a powerful method for next-generation time-sensitive networked systems. </p>
