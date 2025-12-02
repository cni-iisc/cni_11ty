---

layout: research_highlight.html # Do not change this portion

title: Class Imbalance in Deep Learning


speaker: Aakash Sunil Shedsale

img: none
year: 2024

category: phd #should have either mtech or phd

report_video: s6H1343V3wQ
permalink: "/highlights/Aakashsunilshedsale2024/" 
---
<p>Class imbalance refers to a situation in a dataset where the number of samples across different
classes is uneven, with some classes having significantly more samples than others. Class imbalance is a
common issue in real-world datasets, especially in fields like healthcare, fraud detection, and anomaly
detection, where rare events or conditions are often more critical to identify but are underrepresented
in the data. The main approaches to address class imbalance in deep learning include [1]:
Pre-processing techniques: These techniques involve modifying the dataset before training the
model. e.g. Random undersampling, Random oversampling, etc.
Post-processing techniques: These techniques are applied after model training and focus on
adjusting the model’s predictions to correct imbalances. For instance, adjusting the decision
threshold of the model to increase the sensitivity to the minority class.
Learning stage algorithms: These modify the model’s learning process to handle class imbalance. This can involve adjusting loss functions to assign higher penalties to misclassifications of
minority class samples.
Cross Entropy (CE) is not well-suited for imbalanced datasets as it treats all classes equally.
Weighted Cross Entropy (WCE) assigns different weights to different classes based on their frequency
in the dataset [2]. By assigning higher weights to minority classes, the model is encouraged to pay more
attention to these classes during training. Focal loss is a modification of CE loss that down-weighs
the loss assigned to well-classified samples, thereby focusing the model’s attention on hard-to-classify
samples, such as those from the minority class [3]. A novel framework for loss function design by
generalizing CE and focal loss as polynomial expansions is proposed in [4]. The paper emphasizes the
use of simple poly-1 loss which modifies the leading term of the polynomial expansion of CE loss.
Although these approaches have shown promise in addressing class imbalance in deep learning,
there is no one-size-fits-all solution, and the choice of method depends on the specific characteristics
of the dataset and the problem at hand. The loss functions like focal loss or polynomial loss require
careful tuning of hyperparameters to achieve optimal performance. In [4], the authors give a theoretical
explanation of the effectiveness of the polynomial loss by using gradients of the loss function and show
that making the leading polynomial term of CE loss to be zero can help in addressing the class
imbalance problem but also hypothesize that making the leading term to be positive can help in
increasing the model’s confidence in the predictions. Less research is available on explainable AI
for class imbalance in deep learning models [1]. The previous works in [5, 6] have given significant
contributions to reduce bias in logistic regression due to class imbalance. In future, these methods
will be explored in the context of deep learning models. The works in [7, 8, 9] have shown that robust
methods can be used to improve model performance in presence of outliers and noisy labels. These
methods will be explored in the context of robust learning in deep learning models.</p>
<img src="/assets/img/Research_highlight/2024/akash_shedsale table_2025.png" alt="akashresearch" width="752px"></img>
<img src="/assets/img/Research_highlight/2024/akash_shedsale_fig-2025.png" alt="akashresearch" width="752px"></img>

<b>Experimental Results</b><br>
Sampling techniques such as random oversampling and random undersampling have been performed on Biocon dataset to address class imbalance in binary classification task of classifying white
light oral cavity images into suspicious and non-suspicious classes for Oral cancer screening. The
dataset contains 2932 images in minority (suspicious) class and 14812 images in majority (nonsuspicious) class. WCE, focal loss and polynomial loss have been tested on the dataset to address
class imbalance. Table 1 shows the results of the experiments on the dataset. The experiments were
conducted on MobileViTv2 model with 50 epochs and a batch size of 64. A total of 10 model instances
were trained for each experiment and mean and standard deviation of sensitivity and specificity were
reported. The results show that random undersampling, WCE and focal loss outperform the baseline
CE loss in terms of sensitivity and specificity on considered dataset. The results indicate that addressing class imbalance using sampling techniques or weighted loss functions can improve the model’s
2
performance on imbalanced datasets. The hypothesis given in [4], that making the leading polynomial
term of CE loss positive can help in increasing the model’s confidence in predicting true class (Pt), is
tested on the Biocon dataset using poly-1 loss. The poly-1 loss (Lpoly−1) is defined as [4]:
Lpoly−1 = − log(Pt) + ε(1 − Pt)
= (1 + ε)(1 − Pt) + 1
2
(1 − Pt)
2 +
1
3
(1 − Pt)
3 + . . .
The mean Pt for class 0 and class 1 is calculated for poly-1 loss with leading term of CE loss set to 0
(ε = −1) and 2 (ε = 1). Mean Pt
is also calculated for CE, WCE and focal loss along with random
undersampling on the Biocon dataset. Class 0 is majority class and class 1 is minority class in the
dataset. The results are shown in Figure 1. The obtained results do not support the hypothesis that
making the leading polynomial term of the loss function positive can help in increasing the model’s
confidence in the predictions.<br>
<b>References</b><br>
<ol>
<li>Kushankur Ghosh, Colin Bellinger, Roberto Corizzo, Paula Branco, Bartosz Krawczyk, and
Nathalie Japkowicz. The class imbalance problem in deep learning. Machine Learning, 113(7):4845–
4901, 2024.</li>
<li> Yuri Sousa Aurelio, Gustavo Matheus De Almeida, Cristiano Leite de Castro, and Antonio Padua
Braga. Learning from imbalanced data sets with weighted cross-entropy function. Neural processing
letters, 50:1937–1949, 2019.</li>
<li>T-YLPG Ross and GKHP Doll´ar. Focal loss for dense object detection. In proceedings of the IEEE
conference on computer vision and pattern recognition, pages 2980–2988, 2017.</li>
<li>Zhaoqi Leng, Mingxing Tan, Chenxi Liu, Ekin Dogus Cubuk, Jay Shi, Shuyang Cheng, and
Dragomir Anguelov. Polyloss: A polynomial expansion perspective of classification loss functions.
In International Conference on Learning Representations.</li>
<li>Gary King and Langche Zeng. Logistic regression in rare events data. Political analysis, 9(2):137–
163, 2001.</li>
<li>David Firth. Bias reduction of maximum likelihood estimates. Biometrika, 80(1):27–38, 1993.</li>
<li>Ayanendranath Basu, Ian R Harris, Nils L Hjort, and MC Jones. Robust and efficient estimation
by minimising a density power divergence. Biometrika, 85(3):549–559, 1998.</li>
<li>MC Jones, Nils Lid Hjort, Ian R Harris, and Ayanendranath Basu. A comparison of related
density-based minimum divergence estimators. Biometrika, 88(3):865–873, 2001.</li>
<li>Shinto Eguchi and Shogo Kato. Entropy and divergence associated with power function and the
statistical application. Entropy, 12(2):262–274, 2010.</li>
</ol>
<b>Contribution to CNI activities</b> <br>
During the year I mainly worked as a web developer for the CNI website. I have also contributed to the
CNI by broadcasting and hosting a few CNI seminars. I helped in finding few early career professors
for CNI seminar series. Occasionally, I worked as a photographer to document eminent visitors to
CNI. I am involved in conducting IISc-IBM AI hackathon. My major activities as a web-developer
include the following:
<ul>
<li>Maintained the old jekyll-based CNI website and updated it with latest information.</li>
<li>Major contribution to old website was to show the list of all publications on the website. This
was done by removing a bug in CSS which was preventing the publication list to be shown
completely on the website.</li>
<li>The LATEX integration was added to the old jekyll-based CNI website. This allows users to write
LATEX equations in the website content and have them rendered correctly. The LATEX integration
is done using MathJax library.</li>
<li>Research highlights page was a given a more user-friendly look and feel.</li>
<li>Migrated the old jekyll-based CNI website to a modern eleventy-based website. This was done
to make the website more user-friendly and easier to maintain. The new website is hosted using
GitHub pages and is accessible at https://cni.iisc.ac.in/.</li>
<li>To help non-technical users to update the website, the website is empowered with Content
Management System (CMS) using Sveltia CMS. This allows users to update the website content
without needing to know how to code. The CMS is accessible at https://cni.iisc.ac.in/
admin/ and is hosted on the same GitHub repository as the website.</li>
<li>Added a javascript-based functionality to the website which lists upcoming seminars on the
webpage based on the current time.</li>
<li>The publications page has been given a new look and feel. The publications are now listed in
a more user-friendly way with the latest publications shown at the top. The publications are
also categorized based on the type of publication (e.g. journal, conference, book, etc.) and the
year of publication. A word-cloud based visualization of the publications is also added to the
publications page. The word-cloud is generated using the keywords from the publications and
shows the most frequently used keywords in the publications. This helps in understanding the
research areas of CNI.</li>
<li>Added outlook calendar integration to the CNI website. https://cni.iisc.ac.in/calendar/
This allows users to view the upcoming events and seminars at CNI in a calendar format. The
calendar is integrated with the CNI outreach outlook calendar.</li>
<li>A single link for covid-19 (aka bio-surveillance) project. The old website used to redirect to main
home page of the CNI website when clicked on the covid-19 project card on the projects page
and a separate link was needed to access the covid-19 project page. Now, the covid-19 project
page is accessible from the projects page with the same link as on the covid-19 project card and
that has been used in the past.</li>
<li>Newsletter archive page has been refurbished with a more user-friendly look and feel.</li>
<li>Refurbished CNI in news web-page.</li>
<li>Added LinkedIn/personal website links to all staff members and students on the CNI website.</li>
<li>A toggle button has been added to the CNI website to switch between light and dark mode.
This allows users to choose the mode they prefer while browsing the website.</li>
<li>The home page of the CNI website has been given a fresh look with recent updates and upcoming
events shown on the home page.</li>
</ul>

