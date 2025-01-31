---
layout: base.html
title: ICS Security Testbed 
description: 
img: assets/img/projects/ICS Testbed.png
importance: 2
category: ""
---

<h1 align="center">ICS Security Testbed</h1>

<div class="container-fluid mx-auto mt-5 mb-5" style="max-width: 1000px;">
    <h2>Principal Investigators (PIs)</h2>
    <h4>Haresh Dagale, Chandramani Singh</h4>
    
    <h3>Project Overview</h3>
    <p>
        Modern Industrial Control Systems (ICS) have integrated physical systems with state-of-the-art computational 
        and networking systems to augment and boost the capabilities of existing industries. The traditional security 
        measure of air gapping is being traded for the convenience that networked technologies offer. Under this new paradigm, 
        the safety-critical services that ICS manage, such as power grids, become far more challenging to secure from 
        external threats. The sophisticated functionality of new protocols and controllers are exploited to perform 
        reconnaissance and to produce targeted malware. Networking and remote access allow attackers to assume direct 
        control of an entire process system.
    </p>
    <p>
        These advanced attacks, which are performed remotely, are referred to as Advanced Persistent Threats (APTs), 
        and they are customized to target specific ICS deployments. Many of the current security measures adopt IT solutions 
        that are inadequate to protect against APTs backed by nation-state actors. Understanding the risks that APTs pose 
        and the vulnerabilities that they exploit is vital for designing effective countermeasures and strategies against 
        them. Considering that the system can be compromised due to unforeseen vulnerabilities such as zero-day exploits, 
        security frameworks must be designed to be fail-safe to prevent damage to process systems.
    </p>
    
    <h3>Proposed Solution</h3>
    <p>
        Simplex architecture was developed to ensure safety and reliability in environments such as unmanned flight control, 
        path planning, and medical equipment. We propose to build a testbed based on Simplex Architecture for securing physical 
        systems against external threats by exploiting the key ICS attributes that are system specific. Figure 1 shows the 
        proposed testbed setup that consists of a feature-rich Exposed Controller and a fail-safe Baseline Controller. They 
        both can control the ICS end systems. However, the Decision Module decides who gets to control the ICS. The Decision 
        Module will monitor all ICS End-systems by collecting relevant data from the field-deployed agents and sensors. 
        Further, it will define a policy framework for ICS to operate in the normal range.
    </p>
    <p>
        The Decision Module will implement a classifier to detect a security breach in case the Exposed Controller gets 
        compromised and issues malicious commands that make ICS end-systems operate outside their normal range. Once the 
        Decision Module determines that the Exposed Controller is compromised, it hands over the control to the Baseline 
        Controller, isolating the Exposed Controller completely.
    </p>
    <p>
        Towards this project goal, we have set up an ICS security testbed that includes a Niryo Ned-2 robot with accessories 
        and a controller developed using open-source components.
    </p>
    
    <h3>Figures</h3>
    <div class="row">
        <div class="col">
            <img src="{{ site.url }}/assets/img/projects/icstestbedpcis (1).jpg" 
                alt="ICS Testbed Image 1 JPG" class="img-fluid rounded z-depth-1" width="100%">
            <img src="{{ site.url }}/assets/img/projects/icstestbedpcis (1).png" 
                alt="ICS Testbed Image 1 PNG" class="img-fluid rounded z-depth-1" width="100%">
        </div>
        <br>
        <div class="col">
            <img src="{{ site.url }}/assets/img/projects/icstestbedpcis (2).jpg" 
                alt="ICS Testbed Image 2 JPG" class="img-fluid rounded z-depth-1" width="100%">
            <img src="{{ site.url }}/assets/img/projects/icstestbedpcis (2).png" 
                alt="ICS Testbed Image 2 PNG" class="img-fluid rounded z-depth-1" width="100%">
        </div>
    </div>
</div>
