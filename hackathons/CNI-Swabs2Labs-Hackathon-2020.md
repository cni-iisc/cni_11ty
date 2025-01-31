---
layout: project_page
title: CNI Swabs2Labs Hackathon 2020
description:
img: assets/img/hackathons/transfer_map_zoomed.png
importance: 3
category: ""
year: 2020
---

<h3 class="text-center"><a href="/cni-hackathon-2020/">Winners announced</a></h3>

### Swabs2Labs

Swabs2Labs is a project undertaken by the Centre for Networked Intelligence that deals with the allocation of collected test swabs to testing labs in an efficient manner. This project has been undertaken in conjunction with Ministry of Health and Family Welfare of the Karnataka State Government, and is part of the centre’s efforts to analyze, model and develop tools to tackle the COVID-19 epidemic.

In the absence of a medical cure to tackle COVID-19, test-contact trace-isolate has been the preferred strategy of health officials all over the world. In Karnataka, nearly one lakh samples are tested per day across its 30 districts, and there are more than hundred testing labs across the state. Efficient allocation of collected test swabs to various testing laboratories is a pressing operational requirement. In this context, can you design an efficient mechanism that can allocate test swabs to various labs in the state? The mechanism should take into account several operational requirements and constraints, such as:

<ul style="list-style-type: disc;">
  <li>Out of district transfers should be minimised.</li>
  <li>When transferring to more than one lab outside the source district, the labs should be close by, so that transportation costs are minimised.</li>
  <li>Cost of testing depends on the type of lab (government or private).</li>
</ul>

Put on your operations research and optimisation hats to solve this interesting and pressing problem.

<div class="container-fluid text-center">
<img src="{{ site.url }}{{ site.baseurl }}/assets/img/hackathons/transfer_map_zoomed.png" class="img-fluid">
</div>

### Challenges

#### Allocation Algorithm

Each day, the information about the number of swabs originating in a district along with location and capacities of labs across the state are provided. An allocation of swabs from collection centers (district collection centers) to testing labs needs to be generated keeping in account the following constraints and cost considerations.

#### Allocation Costs

The following are the cost and logistics constraints that need to be considered while generating the allocations:
<ol style="list-style-type: decimal;">
  <li>Cost of testing in a govt. lab is Rs 800 per sample.</li>
  <li>Cost of testing in a private lab is Rs 1600 per sample.</li>
  <li>Cost of transporting samples outside the source district is equal to Rs 1000 * distance in kilometers from district collection center to centroid of labs. Constraints on the location of labs are given in point 3 in the section below on allocation constraints.</li>
  <li>Labs in the same district can be overloaded up to a maximum of 100 samples (over and above a lab’s max capacity) for swabs from the same district. Each such overloaded sample will cost Rs 5000 per sample.</li>
  <li>Penalty for keeping samples at district headquarters as backlog is Rs 10,000 per sample.</li>
</ol>

#### Allocation Constraints

<ol style="list-style-type: decimal;">
  <li>Sum of allocated swabs to a lab shall not exceed the lab’s available capacity for the day (capacity – backlog), except under the condition given in constraint 2.</li>
  <li>A district can overload labs in its same district, up to a maximum of 100 excess swabs per lab. The cost of every such excess swab is given in point 4 of the section on allocation costs.</li>
  <li>Allocation of swabs to labs outside of the source district should be such that the maximum distance between any two such labs should be less than 40km.</li>
</ol>


#### Visualization

Can you design a user interface and visualisation solution for the health care professional? The interface should take as inputs the daily caseload at districts and daily capacities and backlogs at testing labs and render the output of the allocation solution in an user friendly and intuitive manner via infographics.

For guidance, we list a few features that can be incorporated as part of the interface design for rendering the output.

<img src="https://lh3.googleusercontent.com/DXGLGIEoVbFqPa-E9sFERzumIgyUiV-KXJwRzt9IANVHZ6PNQG9SBsSiXHeuX_cadNI5rb1MwqrgKdYBsLxm0BT82cppBXZiR42Z-KhFTbzms2Lyr-QnPItBiGGBEVvSTh2dBtCx" class="img-fluid">
<img src="https://lh5.googleusercontent.com/UkKxj2wtB2CSd879cQ8Yt3PMC6seuzyRaNJKaa-i9-IJv51pAO805E1hVkthiVJowaMqFdO2ucxJFv4peVIzABMljrjfAeU-vzwFPQgVT3eDTulM-aJ5gBRup5oGnn5Zl3U8d1qe" class="img-fluid">
<img src="https://lh3.googleusercontent.com/ywPtZeorkrKnD1QgMw-D1aZjwKyLbknF6pdKJNO1jJopJGjOpPcB7zh4vvfMFt0bCBFiSFMJqf2O0GQicBWCz9SUtpaemKOqs6xG7v4j_Xjk2C_8FU3LP7WtT6llanbhxx1Ihtt8" class="img-fluid">
<img src="https://lh6.googleusercontent.com/M-JlJIIPCa94a-uhJrUmFUfrkRrGK-jtdOhaG7rqtm1np4VYFr12FmNUEpJTS-goxTfv0CkwHZvhhHBIHv0c8u8ppjYRH0sna2c6Ni2Y21eyqKSwH_QNbaT8NamtA4LP23j_DHX6" class="img-fluid">

Note: These are only for guidance, and you are expected to develop even richer and informative UI features. 

### Prizes

The top two teams will have a chance to do an internship at the Centre for Networked Intelligence (a Cisco CSR initiative), IISc. Further exciting cash prizes await the top teams.

**Main Problem**
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Position</th>
        <th>Prize</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>First</td>
        <td>Rs. 50,000</td>
      </tr>
      <tr>
        <td>Second</td>
        <td>Rs. 30,000</td>
      </tr>
      <tr>
        <td>Third</td>
        <td>Rs. 20,000</td>
      </tr>
    </tbody>
  </table>
</div>

**Visualization/Web Interface**
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Position</th>
        <th>Prize</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>First</td>
        <td>Rs. 30,000</td>
      </tr>
      <tr>
        <td>Second</td>
        <td>Rs. 20,000</td>
      </tr>
    </tbody>
  </table>
</div>

### Participation

#### Important Dates

<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Event</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hackathon announcement</td>
        <td>23/11/2020</td>
      </tr>
      <tr>
        <td>Registration start</td>
        <td>30/11/2020</td>
      </tr>
      <tr>
        <td>Registration close</td>
        <td>09/12/2020</td>
      </tr>
      <tr>
        <td>Submission start</td>
        <td>07/12/2020</td>
      </tr>
      <tr>
        <td>Submission close</td>
        <td>13:00 hrs 14/12/2020</td>
      </tr>
      <tr>
        <td>Finalist presentation</td>
        <td>16/12/2020</td>
      </tr>
      <tr>
        <td>Winner announcements</td>
        <td>16/12/2020</td>
      </tr>
    </tbody>
  </table>
</div>



#### Team Formation and Eligibility Rules
The hackathon is open to all undergraduate (year 2, 3, and 4) and masters students in an engineering or science stream. A team can comprise up to 4 individuals, all belonging to the same institution.

All communications with the team will be made through a registered email of a representative or coordinator of the team.

#### Discussion Forum
For discussions and queries about the hackathon, please visit the [hackathon forum](https://discourse.cnihackathon.in/).

### Sponsors

<table>
<tr>
<td style="vertical-align:middle"><img src="{{ site.url }}{{ site.baseurl }}/assets/img/Logos/Cisco-CSR-Logos-horiz-300x78.jpg" height="100" class="img-fluid"></td>
<td style="vertical-align:middle"><img src="{{ site.url }}{{ site.baseurl }}/assets/img/Logos/IISc_logo.png" height="100" class="img-fluid"></td>
</tr>
</table>
