---

layout: research_highlight.html # Do not change this portion

title: Admission Control for Hierarchical Inference Offloading with a Single Server Queuing System


speaker: Srinivas Nomula

img: none
year: 2024

category: phd #should have either mtech or phd

report_video: 
permalink: "/highlights/srinivasNomula2024" 
---
We considered a system with edge devices such as mobile phones, 

laptops, and an edge server. Each edge device has an oƯload queue 

wirelessly connected to the server. We use the system to perform inference 

on the arriving tasks. To do so, we deploy each device with a pre-trained ML 

model. As the edge server operates remotely and has abundant resources 

such as power and computing, we deployed a powerful ML model, Large 

ML or L-ML. As the edge devices are resource-constrained, we deployed a 

smaller, less accurate ML model (S-ML), which consumes fewer resources. 

Such a setup is known as Hierarchical Inference. 

We use the system to perform image classification and aim to improve its 

overall inference accuracy by maintaining queue stability. 

The images arrive at the devices at random. As soon as a new task arrives, 

the device classifies the task as having arrived. The device, after 

classification, gives out the tasks' class with some confidence. As the 

task's ground truth is unknown and the S-ML deployed is not accurate, all 

the tasks processed might not be correct. Hence, an oƯloading strategy is 

essential to improve the overall system performance. 

Utilizing the prior works, we designed a strategy that utilizes the confidence 

values of tasks to perform inference. Our strategy significantly improved 

the system accuracy and maintained queue stability throughout. 

Compared with the state-of-the-art techniques, our strategy was more 
accurate than the rest.
