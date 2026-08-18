---

layout: research_highlight.html # Do not change this portion

title: Oral Cancer Screening using AI

speaker: Tejashree S

img: none
year: 2024

category: phd #should have either mtech or phd

report_video: mn0j3hvXN68
permalink: "/highlights/2024/tejashreeS2024/" 
---

<b>Report on research undertaken in the year 2024-25:</b><br>
<p>In the past year, we developed AI tools for oral cancer screening that can be 
embedded within a mobile phone to classify white light images of the oral cavity 
captured from smartphone cameras into ‘suspicious’ and ‘non-suspicious’ categories 
based on the presence of pre-cancerous or cancerous lesions, thereby developing a 
point of care, AI-assisted, phone-based diagnostic device, ensuring availability, 
accessibility and affordability.
From the rigorous experimental studies conducted in the previous year, on the 
architecture of the model, data cleaning, data augmentation, handling class 
imbalances, loss functions, and training strategies, we had learnt that the MobileViT-v2 
model trained with random horizontal-vertical flip and rotations with weighted crossentropy loss gave the best performance in terms of sensitivity and specificity on the test 
data. With this as the baseline, we then moved to testing the trained model on the field 
(external validation) data. We observed a domain shift between the training and the field
data, which led to a dip in the performance of the model. Additionally, the field images
had EXIF metadata flags such as ‘Orientation’, which were not present in the training 
data, affecting the way how images were read and processed. We resolved these issues 
by incorporating EXIF-based augmentations and white-balancing in the training and preprocessing phases, respectively, which improved the performance of the model on the 
field data. 
In the next phase of integrating the trained and traced AI model into mobile 
applications, we noticed that several functionalities that were available on the 
computer platform were not available on the mobile platform. We had to modify the 
processes on the computer platform as per the mobile platform to ensure a matched 
performance between the phone and the computer. With this, we were able to achieve 
good performance metrics on not only the source data but also the field data, across all 
platforms.</p>

<b>Report on contributions to CNI activities:</b><br>
<p>I was involved in content generation using AI for Random Process lectures 
delivered by Prof. Parimal Parag in earlier academic years. The LaTeX files of lecture 
notes were used to create Beamer presentations via Python code. The extracted 
content from the LaTeX files was used to generate a script for audio generation with the 
help of LLMs (Gemini). The generated scripts and Beamer presentations were reviewed
by a subject expert to ensure correctness. The reviewed scripts were fed to an AI text-tospeech converter (ElevenLabs AI) to generate voiceover for the lectures in Prof. 
Parimal’s voice. The Beamer presentation slides and AI-generated voiceovers were
synced using the ffmpeg package via Python code. In this manner, AI-assisted video 
lectures were created for all 28 lectures of the Random Process course. We plan to 
publish this work and make the videos available for free learning purposes.</p>

