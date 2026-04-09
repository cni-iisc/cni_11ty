---
layout: project_page
title: "Future Communications and Networking Workshop"
img: assets/img/workshops/2026/CNI_TechnicalWorkshop_13April2026_Poster.png
importance: 10
category: ""
showcase: true
---

<div class="container-fluid mb-2 mt-2">
      <img class="img-fluid" src="/assets/img/workshops/2026/CNI_TechnicalWorkshop_13April2026_Poster.png"/>
</div>
<p>A CNI Technical Workshop on Future Communications and Networking, advancing research dialogue and Indo-UK collaboration. This workshop brings together researchers, practitioners, and students to explore emerging directions in communication systems, network science, and related interdisciplinary domains.</p>

#### 🗓️ Date

**April 13, 2026 (10:00am-05:00pm)**

#### 📍 Venue

**In-person participation: Golden Jubilee Hall, ECE Department, Indian Institute of Science, Bengaluru**<br>
([📌 Map location](https://maps.app.goo.gl/L2kXRtWeBeJLGQYLA))

**Online participation: Meeting link will be shared with registered participants**

#### Registration

<button><a href="https://forms.gle/Fy8CkGABxn6KLa3R6" target="_blank">Registration Link</a></button>

<p>Deadline:Last Date of Registration 09 April 2026, 12:00 PM</p>

#### Workshop Schedule: (Tentative)

<style>
/* Container */
.tab-content {
  max-width: 900px;
  margin: 40px auto;
  padding: 10px;
}

/* Schedule Card */
.schedule-item {
  display: flex;
  gap: 20px;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: all 0.25s ease;
}

.schedule-item:hover {
  transform: translateY(-2px);
  background: #b7bdd1;
}

.imageBox {
  text-align: center;
}

.imageBox img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}


/* Time */
.schedule-item time {
  min-width: 140px;
  font-weight: 600;
  color: #224b6f;
}

/* Content */
.schedule-content {
  flex: 1;
}

/* Speaker */
.speaker {
  font-weight: 600;
  color: #1f2937;
}

/* Org */
.org {
  font-size: 13px;
  color: #6b7280;
}

/* Title */
.talk-title {
  margin-top: 4px;
  font-size: 14px;
  color: #374151;
}

/* Break */
.break {
  background: #6084a3;
  justify-content: left;
  font-weight: 600;
  cursor: default;
}

/* Modal */
#modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none; /* controlled by JS */
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  padding: 20px; /* prevents edge sticking */
}

/* MODAL BOX */
.modal-content {
  background: #ffffff;
  color: #111827;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;   
  overflow-y: auto;   
  border-radius: 12px;
  padding: 25px;
  position: relative;
}


.modal-content h2 {
  margin-bottom: 10px;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 22px;
  cursor: pointer;
}

/* MODAL DARK MODE FIX */
.modal-content {
  background: #ffffff;
  color: #111827; /* VERY IMPORTANT */
}

#modal.dark #modal {
  background: rgba(0, 0, 0, 0.7);
}

#modal.dark .modal-content {
  background: #1f2937;
  color: #000000;
}

#modal.dark .modal-content h2,
#modal.dark .modal-content h4,
#modal.dark .modal-content p,
#modal.dark #modal-speaker {
  color: #000000;
}

body.dark #modal-link {
  color: #60a5fa;
}

body.dark .close-btn {
  color: #000000;
}
</style>

<div class="tab-content">

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/ayalvadi_ganesh.png"
       data-title="Prof. Ayalvadi Ganesh (University of Bristol)"
       data-talktitle="Gossiping on Random Graphs"
       data-abstract="Consider a set of agents, each of whom has a single message to convey to all other agents. The messages are all of the same length. Time is divided into rounds, and each agent may broadcast a single message. Agents are represented as nodes of a directed communication graph, and a broadcast is received error-free by all (out)-neighbours of the broadcasting node. The problem is to minimise the number of rounds until all agents have received all messages. We study this problem on directed Erdos-Renyi random graphs. "
       data-speakerbio="Ayalvadi Ganesh is Professor of Applied Probability at the University of Bristol. He received his B.Tech from IIT-Madras in 1988 and his PhD from Cornell in 1995. His research interests include large deviations, queueing theory, random graph dynamics, and decentralised algorithms. He won the INFORMS Best Publication Award in 2005 and the ACM Sigmetrics Best Paper Prize in 2010."
       data-link="https://people.maths.bris.ac.uk/~maajg/">   
    <time>10:00AM – 10:20AM</time>
    <div class="schedule-content">
      <div class="speaker">Talk-1 Prof. Ayalvadi Ganesh (University of Bristol)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/SteveHailes.png"
       data-title="Prof. Steve Hailes (University College London)"
       data-talktitle="Towards Trustworthy Wi-Fi Sensing: Systematic Evaluation of Deep Learning Model Robustness to Adversarial Attacks"
       data-abstract="This talk examines adversarial robustness in Wi-Fi Channel State Information (CSI)-based sensing for human activity recognition (HAR) and identification (HID). Using a unified evaluation framework that we develop to measure and compare robustness across five diverse architectures and four public datasets, it systematically evaluates white-box, black-box transfer, and universal attacks alongside defense strategies like Adversarial Training and Randomized Smoothing. The results show that model capacity does not guarantee resilience - simple architectures often outperform high-capacity ones - and that vulnerability is fundamentally task-dependent. Crucially, enforcing physics-guided signal constraints drastically reduces attack success rates compared to unconstrained perturbations, suggesting that standard digital attacks may overestimate real-world vulnerabilities. These findings, together with the framework itself, establish foundational design principles for secure and deployable edge-based wireless sensing systems. The work covered in this talk was conducted by Shreevanth Krishnaa Gopalakrishnan, a PhD student in the Department of Computer Science at UCL, and is under submission to MobiCom 2026."
       data-speakerbio="Stephen Hailes is Professor of Wireless Systems and was, until 18 months ago, Head of the Department of Computer Science at UCL. He has broad interests in sensing, communication and security but his main research foci at present are in AI and in cybersecurity, including the cybersecurity of OT systems.  He is a Director of the Centre for Doctoral Training in Cyber-Physical Risk. Shreevanth Gopalakrishnan is one of his PhD students from the CDT in Cybersecurity."
       data-link="https://profiles.ucl.ac.uk/11262-steve-hailes">   
    <time>10:20AM - 10:40AM</time>
    <div class="schedule-content">
      <div class="speaker">Talk-2 Prof. Steve Hailes (University College London) </div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/"
       data-title="Dr. Dilip Krishnaswamy (CDoT) "
       data-talktitle="TBD"
       data-abstract="TBD"
       data-speakerbio="TBD"
       data-link="">   
    <time>10:40AM - 11:00AM</time>
    <div class="schedule-content">
      <div class="speaker">Talk-3 Dilip Krishnaswamy (CDoT) </div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/prem_singh.JPG"
       data-title="Prof. Prem Singh (IIIT Bangalore)"
       data-talktitle="From Theory to Field: End-to-End Design, Testing, and Deployment of RIS Systems"
       data-abstract="Reconfigurable Intelligent Surfaces (RIS) are emerging as a key enabler for shaping wireless propagation environments in next-generation communication systems. While extensive research has focused on theoretical models and algorithms, translating these ideas into practical, deployable systems remains a significant challenge. This talk presents an end-to-end perspective on building RIS systems from scratch, encompassing design, prototyping, testing, and real-world deployment. We discuss critical aspects such as hardware-software co-design, control and reconfiguration strategies, calibration, and over-the-air validation. In addition, the talk highlights the associated challenges encountered in practice. "
       data-speakerbio=" Prem Singh (Senior Member, IEEE) received the M.Tech. and PhD degrees in electrical engineering from the Indian Institute of Technology Kanpur, India. He is currently a Faculty Member with IIIT Bangalore. He is the Co-Founder and the Director of Mantiswave Networks Pvt., Ltd., which received the Best Startup in Faculty 2025 award by TIDES Business Incubator, IIT Roorkee. He received the Faculty Award for Research Excellence at IIIT Bangalore for high-impact-factor journals and conference publications from 2022–2025. His two recent research articles on OTFS and Delay-Doppler signal processing are among the best readings of the IEEE Communications Society. His PhD thesis received the Best Thesis Award in IEEE CICT 2020, organised by IIIT Kancheepuram, India, and he was also one of the finalists (top two) for the Indian National Academy of Engineering (INAE) Innovative Student Project Award 2021. His current interests include embedded system design for 5G and beyond wireless systems, including FPGA-based hardware design, 3GPP-compliant firmware design, and testbed setup. His research interests include transceiver design for 5G and beyond wireless systems."
       data-link="">   
    <time>11:00AM - 11:20AM</time>
    <div class="schedule-content">
      <div class="speaker">Talk-4 Prof. Prem Singh (IIIT Bangalore)</div>
    </div>
  </div>

  <div class="schedule-item break">
    <time>11:20 – 11:40</time>
    ☕ Tea/Coffee Break
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/anurag-kumar.jpg"
       data-title=" Prof. Anurag Kumar (IISc) "
       data-talktitle="Applications-Aware Optimal Joint Scheduling Over Wireless Access "
       data-abstract="Emerging and future wireless access networks will have to support a variety of diverse applications, with various quality-of-service requirements, such as online edge-based control of robots, wireless audio for auditoria, and real-time surveillance video at scale. Despite the 10s of Gbps physical layer bit rates in both 5G/6G networks and Wi-Fi networks,  actual end-to-end performance guarantees are a challenge due to channel variability, cochannel interference, user mobility, the need for complex measurements for optimal operation, etc. In this setting,  efficient and dynamic resource sharing for the emerging applications over wireless access networks poses many challenges. We have been working on both the above technologies. For 5G, we will present our problem formulation and some results on optimal joint scheduling for multiple flow types, initially focusing on full-buffer elastic (FBE) flows and hard deadline real-time (HDR) flows. For WI-Fi, we have developed an overlay orchestration approach that can provide fairness among TCP flows, at the same time ensuring that downlink and uplink real-time UDP flows obtain their required performance guarantees. We will provide a quick overview of one of our experimental demonstrations."
       data-speakerbio="Prof. Anurag Kumar (B.Tech (1977) IIT Kanpur, PhD (1981) Cornell Univ.) was a Member of Technical Staff in AT&T Bell Laboratories (1981-1988), before returning to India and joining the Indian Institute of Science (IISc) as a faculty member in the ECE Department. He was the Director of IISc during 2014-2020.  Since 1st January, 2024, he is an Indian National Science Academy (INSA) Distinguished Professor. He has published about 200 peer reviewed papers in journals and conferences, in the area of performance analysis, optimisation, and control of communications networks and distributed systems, and has coauthored two major books that have been used around the world. He is a recipient of the J.C. Bose National Fellowship, awarded by the Department of Science Technology, for the period 2011-2021."
       data-link="https://eecs.iisc.ac.in/people/anurag-kumar/">   
    <time>11:40AM - 12:00PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-5  Prof. Anurag Kumar (IISc)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/AnindyaSaha.png"
       data-title="Anindya Saha (Tejas Networks) "
       data-talktitle="Discovery Block for Service-Aware and Energy-Efficient Networks "
       data-abstract="What if your device could 'peek' at 6G services before committing to a full connection? This talk unveils the Discovery Block, a lightweight physical-layer preamble that replaces 5G's 'blind searches' with intelligent, service-aware filtering. We explore architectures that slash energy waste and enable seamless spectrum sharing."
       data-speakerbio="Anindya Saha is a leader in wireless communications, currently serving as Vice President (Wireless Group) and CTO Office member at Tejas Networks. He spearheads advanced technology initiatives for 5G and 6G in this role, bringing his nearly 29 years of experience. He has held key roles at Texas Instruments, Broadcom, and Saankhya Labs (CTO). He specializes in semiconductor design, DSP architecture, and wireless systems, contributing to the development of 5G radios, Broadcast receivers, and Satellite IoT solutions. Saha holds several US and Indian patents, has authored more than 10 IEEE publications, and actively participates in 3GPP standards. Notable achievements include the TSDSI Hall of Fame Award (2022) and leading the IEEE Bangalore Chapter to receive the 2024 APAC Chapter Achievement Award. He is a Senior Member of IEEE and a Fellow of IETE and IEI. He holds an M.E. from IISc Bangalore and a B.Tech. from IIT-BHU (Gold Medal). "
       data-link="">   
    <time>12:00PM - 12:20PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-6 Anindya Saha (Tejas Networks)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/"
       data-title=" Prof. Huzur Saran (IITD) "
       data-talktitle="TBD"
       data-abstract="TBD"
       data-speakerbio="TBD"
       data-link="">   
    <time>12:20PM- 12:40PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-7  Prof. Huzur Saran (IITD)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/"
       data-title="Sheela Prabhakar (ArtPark)"
       data-talktitle="TBD"
       data-abstract="TBD"
       data-speakerbio="TBD"
       data-link="">   
    <time>12:40PM - 01:00PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-8 Sheela Prabhakar (ArtPark)</div>
    </div>
  </div>

  <div class="schedule-item break">
    <time> 01:00PM – 02:00PM</time>
    🍽 Lunch Break
  </div>

  
  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/GerardParr.jpg"
       data-title="Prof. Gerard Parr (University of East Anglia)  "
       data-talktitle="Threats to UK-India International Submarine Telecoms Cables from Natural/Adversary/Human Attack"
       data-abstract="Protection of Critical National Infrastructure has taken on increased importance and attention in recent years.  With recent world and geo-political events, the importance of maintaining our International Interconnectors has increased dramatically. Whilst there are many challenges in monitoring and protecting on-land infrastructure (water, electricity, oil, gas, telecoms), there are particular areas of risk and interest associated with the sub-sea digital network interconnects that service the UK and India.  Moreover, the UK and India serve as landing points for a number of strategically important communications interconnects for the rest of Europe and Asia.  The importance of this Critical Infrastructure to the economy of India and the UK cannot be overstated. This presentation will give a summary overview of the importance of Submarine Telecoms infrastructure and some of the challenges that exist to provide their resilience. It will also solicit some suggestions for addressing these challenges under the auspices of the UK-India Future Networks Initiative."
       data-speakerbio="Gerard is a Full Professor in Telecommunications Engineering and has been Head of School of Computing Sciences at the University of East Anglia (UEA) in Norwich, Norfolk, UK from 2016-2023.  His role involved a range of senior management responsibilities covering Teaching, Research, Innovation and Outreach.  He holds a PhD in Self-Stabilising Protocols from Ulster University in Northern Ireland, aspects of which were completed with UCL and one of the founding Fathers of the Internet (Professor Jon Postel) whilst a Visiting Research Scientist at the DARPA/University of Southern California Information Sciences Institute in Marina Del Rey, Los Angeles. Within his academic career, areas of research include Wireless Sensor Clouds, UAVs for Disaster Response Communications, ICT for the Rural Economy, delay-sensitive protocols, energy-aware autonomic networking and IoT-edge computing. He has attracted several £millions of external research and commercial funding and has advised governments on the allocation of funding to large-scale projects valued in total at approximately £4 billion. His industrial collaborations have included companies such as BT, Intel, IBM, Aviva, Ericsson, Siemens, InfoSys, Wipro, Tejas Networks, Vodafone, ARM and SAP.  Professor Parr is an invited member of the Peer Review College of the esteemed UK Government funding agency- the Engineering & Physical Sciences Research Council (EPSRC). His academic research collaborations include MIT, Georgia Institute of Technology, University of Arizona, UC Berkeley, UC San Diego, USC-ISI Los Angeles, University of Florida, University College London, Southampton, Surrey, QMUL, Otto von Guericke University Magdeburg, Oxford, St Andrews, Exeter, Lancaster , Cambridge, Beijing University of Posts & Telecommunications (BUPT), Tsinghua University, Peking University and Indian Institutes of Technology in Mumbai, Madras, Kanpur, Hyderabad, Delhi, Mandi and IISc Bangalore. He was previously appointed as a Visiting Professor to the Science Foundation Ireland/CTVR at Trinity College Dublin and to the Emirates-BT Innovation Centre (EBTIC) at Khalifa University in Abu Dhabi- UAE. He was previously Chief Scientific Advisor to Project Kelvin, an initiative led by UK and Irish governments.  This led to the installation of a submarine telecommunications cable connecting the north coast of Northern Ireland and Dublin to a transatlantic submarine cable linking North America with Southport in England, and onwards to continental Europe. He has been International Scientific Advisor to the UK EPSRC National Centre for Doctoral Training in Communications Engineering at the University of Bristol. He was appointed as Senior Guest Editor for prestigious IEEE Journal on Selected Areas of Communications (JSAC) for a Special Issue on Communications Challenges and Dynamics in UAVs. He has extensive experience of working with developing economies, in particular, India, where he was the UK Academic co-ordinator for the major EPSRC-DST India-UK Advanced Technology Centre in Next Generation Networks Systems and Services which was the largest collaboration of its kind between UK and India in the ICT sector attracting total investment of over £20 million and also helped establish a Virtual Graduate Research School for 67 PhD students under the UKIERI Programme. Gerard was awarded an MBE in Queens New Year Honours for 2018 for contributions to Telecommunications Infrastructure in Northern Ireland.  During January 2020 Prof Parr was elected to the Strategic Advisory Committee for the UK Government UK Research and Innovation (UKRI) – (EPSRC) ICT Programme to assist with strategic developments, funding panels and identification of funding priorities.  Most recently Gerard has been successful in attracting Co-I funding for a 5-year EPSRC Next Stage Digital Economy Hub called DIGIT (Digital-Innovation-Growth-Impact-Transformation) valued over £12 million which will explore methodologies and business impact of Digital Transformation in Large Organisations. During 2021 Gerard was also successful as PI to attract funding for the “UK-India Future Networks Initiative” with academic institutions IISc Bangalore, IIT Delhi, UCL, Kings College, Surrey, Southampton. Most recently in December 2022 he was successful as a Co-PI on a bid to UKRI-ESRC concerning Digital Technology in Teacher Agency. The £5.3 million fund will support a total of nine projects. He is also a Member of the UKRI-EPSRC Digital Security & Resilience Advisory Group. "
       data-link="https://research-portal.uea.ac.uk/en/persons/gerard-parr/">   
    <time>02:00PM - 02:20PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-9 Prof. Gerard Parr (University of East Anglia) </div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/SrivathsaAcharya.jpg"
       data-title="Srivathsa Acharya (IISc)"
       data-talktitle="Product-Code-Based Outer Coding at the PHY-MAC Layer for Reliable, Low-Latency, Cellular Communication"
       data-abstract="A novel outer-coding scheme, termed Product- Code-Based Outer Coding at PHY-MAC Layer (PROMAC) for 5G and beyond is presented, that enables reliable communication within a single transmission time interval in the presence of two or more datalink paths. It is shown through simulations that this scheme provides an improvement of 10dB over Packet Data Convergence Protocol (PDCP) duplication over a commonly employed 3GPP channel model. The proposed scheme employs a short binary code (SBC) to carry out outer coding at the Medium Access Control (MAC) layer. Innovative features of the proposed scheme that also lead to improved performance include: identifying packets with low-density-parity-check (LDPC) code blocks, architecting the system so that the combination of LDPC codewords and outer code form a product code that can be iteratively decoded, carrying out soft-decision decoding of this outer code and requiring the physical (PHY) layer to pass on all correctly-decoded code blocks to the MAC layer, even if the entire Transport Block has not been correctly decoded. Some further enhancements of this scheme are also presented."
       data-speakerbio="Srivathsa Acharya earned his B.Tech. from NITK, Surathkal in 2005 and his M.E. from IISc, Bangalore in 2007. He is currently a Senior Principal Communication Systems Technical Lead at MaxLinear, Bangalore, India, specializing in digital signal processing (DSP) for 5G radio-unit (RU) solutions. Simultaneously, he is pursuing his Ph.D. (ERP) at IISc Bangalore under the supervision of Prof. P. Vijay Kumar, researching codes for low-latency geo-distributed storage and packet-level erasure codes for 5G reliable low-latency communication."
       data-link="https://ece.iisc.ac.in/member/srivathsa-acharya/">   
    <time>02:20PM - 02:40PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-10 Srivathsa Acharya (IISc)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/"
       data-title="Prof. Neelesh Mehta (IISc) "
       data-talktitle="TBD"
       data-abstract="TBD"
       data-speakerbio="TBD"
       data-link="">   
    <time>02:40PM  - 03:00PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-11 Prof. Neelesh Mehta (IISc)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/"
       data-title="Prof. Deepa Venkitesh (IITM) "
       data-talktitle="TBD"
       data-abstract="TBD"
       data-speakerbio="TBD"
       data-link="">   
    <time>03:00PM - 03:20PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-12 Prof. Deepa Venkitesh (IITM)</div>
    </div>
  </div>

   <div class="schedule-item break">
    <time> 03:20PM – 03:40PM</time>
    ☕ Tea/Coffee Break
  </div>

   
  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/SrikrishnaBhashyam.png"
       data-title="Prof. Srikrishna Bhashyam (IITM)"
       data-talktitle="Clustering of Data Sequences"
       data-abstract="We consider the problem of clustering independent and identically distributed (i.i.d.) data sequences generated from unknown probability distributions. The data sequences have to be clustered according to the closeness of the underlying distributions. Clustering of data sequences has applications in several practical problems like network traffic monitoring, anomaly detection, and market segmentation. This problem has been studied in the fixed sample size, sequential and multi-armed bandit settings. We will present algorithms that achieve a fixed confidence level with as few samples as possible from the data sequences. This is joint work with G. Dhinesh Chandran and Kota Srinivas Reddy. "
       data-speakerbio="Srikrishna Bhashyam (Senior Member, IEEE) received the B.Tech. degree in electronics and communication engineering from IIT Madras, India, in 1996, and the M.S. and Ph.D. degrees in electrical and computer engineering from Rice University, Houston, TX, USA, in 1998 and 2001, respectively. He was a Senior Engineer with Qualcomm, Inc., Campbell, CA, USA, from 2001 to 2003, where he was involved in wideband code division multiple access modem design. Since 2003, he has been with IIT Madras. He is currently a Professor with the Department of Electrical Engineering. His research interests include wireless communication, statistical signal processing, and information theory. He served as an Editor for IEEE Transactions on Wireless Communications from 2009 to 2014, and IEEE Transactions on Communications from 2017 to 2024. "
       data-link="https://www.ee.iitm.ac.in/~skrishna/">   
    <time>03:40PM - 04:00PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-13 Prof. Srikrishna Bhashyam (IITM)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/SreenathRamanath.png"
       data-title="Dr. Sreenath Ramnath (Lekha Wireless) "
       data-talktitle="Mobility and Scheduling Strategies in Airborne Communication Systems"
       data-abstract="We consider a local area deployment of UAVs, tasked to deliver packages. We focus on mobility and scheduling strategies. Taking some examples, we provide an insight into the opportunities and challenges that arise in such a deployment."
       data-speakerbio="Sreenath has over three decades of R&D experience in the Wireless industry. He holds a Masters degree from the Indian Institute of Science (IISc), Bangalore, and a PhD in Computer Science & Control from INRIA, Sophia Antipolis, France. He has worked on technologies such as GPS, CDMA, Wireless LAN, WiMAX, LTE, and 5G, and has held technical and managerial roles at Accord, Ittiam, Philips, and Beceem (acquired by Broadcom). He is currently VP - Technology & Innovation at Lekha Wireless Solutions, Bangalore, where he leads the design and development of next-generation communication networks. He is also actively involved with TSDSI and B6GA, driving indigenous innovation and contributing to India’s 6G vision. In the past, he has served as an Adjunct Professor with the EE Dept., IIT Bombay, Associate Researcher with the Alcatel-Lucent Chair on Flexible-Radio at Supelec, Paris, France and as an associate member of the INRIA-Bell Labs joint research lab on Self Organizing Networks. He is a Senior Member of IEEE. He has co-authored 50+ IPRs and 30+ publications in reputed journals and conferences."
       data-link="">   
    <time>04:00PM - 04:20PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-14 Dr. Sreenath Ramnath (Lekha Wireless)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/"
       data-title="Prof. Radhakrishna Ganti (IITM) "
       data-talktitle=""
       data-abstract=""
       data-speakerbio=""
       data-link="">   
    <time>04:20PM - 04:40PM </time>
    <div class="schedule-content">
      <div class="speaker">Talk-15 Prof. Radhakrishna Ganti (IITM)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/David Koilpillai.jpg"
       data-title="Prof. David Koilpillai (IITM) "
       data-talktitle="India Roadmap to 6G – A Bharat 6G Alliance Perspective"
       data-abstract=" India has seen the fastest rollout of 5G systems in the world crossing 530,000 5G sites. With 98% of the India’s mobile Broadband users (~98 crores) using mobile access, India is truly a “Mobile First” county … and the rapid developments in 5G and evolution towards 6G are of high interest and impact in India. The three phase roadmap to 6G developed by Bharat 6G Alliance (B6GA) will be presented. The impact of the various technical aspects such as introduction of AI/ML, Integrated Sensing and Communication (ISAC), Non-Terrestrial Networks (NTN) and Delay-Doppler techniques based on Orthogonal Time Frequency Space (OTFS) Modulation will be mentioned. The role of academia and industry in the India 6G initiatives will be highlighted. The spectrum allocation in India for 5G Advanced and 6G is aligned with global trends. This India spectrum allocation will be briefly described. Together, this presentation will provide a comprehensive view of the roadmap to develop the 6G ecosystem in India, and the role of B6GA. "
       data-speakerbio="R. David Koilpillai is the Qualcomm Institute Chair Professor in Electrical Engineering at IIT Madras, with over three decades of experience in wireless and cellular technologies. He holds a B.Tech from IIT Madras and MS and PhD degrees from the California Institute of Technology, USA. At IIT Madras since 2002, he has served as Head of Department and Dean (Planning), contributing to infrastructure and strategic development. He currently chairs the Bharat 6G Alliance and has been actively involved in advancing research in 5G Advanced, 6G, and next-generation communication systems. Previously, he spent 12 years at Ericsson USA, where he led advanced research initiatives. A Fellow of the Indian National Academy of Engineering, he has received numerous awards, holds multiple international patents, and has authored over 100 publications. "
       data-link="https://www.ee.iitm.ac.in/~koilpillai/">   
    <time>04:40PM  - 05:00PM</time>
    <div class="schedule-content">
      <div class="speaker">Talk-16 Prof. David Koilpillai (IITM)</div>
    </div>
  </div>

  <div class="schedule-item"
       data-image="/assets/img/workshops/2026/A. Chockalingam.jpg"
       data-title="Prof. A. Chockalingam (IISc) "
       data-talktitle="Zak-OTFS: A Waveform for Radar Sensing "
       data-abstract=" In this talk, we consider waveforms for radar sensing. While orthogonality is the preferred attribute in communication waveforms to limit interference and achieve improved communication reliability, localization is the preferred attribute in radar sensing waveforms to achieve improved target detection and resolution. The goodness of a radar waveform is typically quantified through its ambiguity function. The range (delay) and velocity (Doppler) resolutions are primarily determined by the ambiguity function of the waveform used. Two candidate waveforms will be considered in this talk. One will be the widely used chirp waveform. The other will be the recent Zak transform-based orthogonal time frequency space (Zak-OTFS) waveform. We present their waveform characteristics and their achieved range/velocity estimation performance in multi-target scenarios. While the self-ambiguity function of a chirp is a line in the delay-Doppler (DD) domain, the self-ambiguity function of the Zak-OTFS waveform is a lattice that gives better DD domain localization and estimation performance. "
       data-speakerbio="A. Chockalingam is a professor in the department of ECE, IISc, Bangalore. He obtained a Ph.D. degree from the same department in 1993. He was a postdoctoral fellow and an assistant project scientist in the department of ECE, UC San Diego from 1993 to 1996. He was with Qualcomm, San Diego as a Staff Engineer/Manager from 1996 to 1998. Since 1998 he has been a faculty at IISc, Bangalore. He has served as an editor/associate editor of IEEE Trans. on Wireless Communications, IEEE Trans. Vehicular Technology, IEEE JSAC, and IEEE JSTSP. He is a recipient of the Swarnajayanti Fellowship and the J. C. Bose National Fellowship from the DST, Govt. of India. He is the author of the book “Large MIMO Systems” published by Cambridge University Press in 2014. He is also an author of the book “OTFS Modulation – Theory and Applications” published by IEEE Press-Wiley in 2024."
       data-link="https://ece.iisc.ac.in/~achockal/">   
    <time>05:00PM - 05:20PM</time>
    <div class="schedule-content">
      <div class="speaker">Talk-17 Prof. A. Chockalingam (IISc)</div>
    </div>
  </div>

 
</div>





<h4>Sponsor</h4>
<div class="container-fluid" align="center">
      <img src="/assets/img/Logos/Cisco CSR Logos-TM-vert.png" alt="Cisco CSR logo" class="img-fluid" style="height: 130px; object-fit: contain;"/> 
</div>

<h4>Supported by</h4>
<div class="container-fluid" align="center">
  <img class="img-fluid" src= "/assets/img/workshops/2026/IISc_Master_Seal_Transparent.png" style="height: 170px;"/>
  <img class="img-fluid" src= "/assets/img/workshops/2026/ECE LOGO svg.png" style="height: 100px;"/>
</div>

<div id="modal">
  <div class="modal-content">
    <span class="close-btn" onclick="closeModal1()">×</span>
    <div class="imageBox">
        <img id="modal-image" src="" alt="Speaker Image">
      </div>
    <h4 id="modal-title"></h4>
    <p><strong>Title:</strong> <span id="modal-talktitle"></span></p>
    <p><strong>Abstract:</strong> <span id="modal-abstract"></span></p>
    <p><strong>Speaker Bio:</strong> <span id="modal-speakerbio"></span></p>
    <a id="modal-link" target="_blank">More Info</a>
  </div>
</div>

<script>
const modal = document.getElementById("modal");

document.querySelectorAll(".schedule-item").forEach((item) => {
  if (!item.classList.contains("break")) {
    item.addEventListener("click", () => {
      document.getElementById("modal-title").textContent = item.dataset.title || "";
      document.getElementById("modal-talktitle").textContent = item.dataset.talktitle || "";
      document.getElementById("modal-abstract").textContent = item.dataset.abstract || "";
      document.getElementById("modal-speakerbio").textContent =item.dataset.speakerbio || "";
      document.getElementById("modal-link").href = item.dataset.link || "#";
      document.getElementById("modal-image").src =
        item.dataset.image || "/assets/img/default-speaker.png";

      modal.style.display = "flex";
    });
  }
});

function closeModal1() {
  modal.style.display = "none";
}

/* close on outside click */
window.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
</script>


