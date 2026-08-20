---
layout: research_highlight.html # Do not change this portion

title: Adversarial and Natural Corruption Robustness of Self-Supervised Vision Transformers

speaker: Parmar Purva Maheshkumar

img: none
year: 2025

category: mtech #should have either mtech or phd

report_video: bXVaaVxkm1o
permalink: "/highlights/parmarpurva2025/" 
---
During my tenure as a CNI MTech Fellow, I worked on evaluating the robustness of modern self-supervised Vision Transformer (ViT) models. Self-supervised learning has become an important paradigm for training large vision models without manual annotation, but comparatively little is known about how robust the resulting representations are to adversarial perturbations and natural corruptions.
The objective of this project was to compare the robustness characteristics of different self-supervised learning approaches. I studied three Vision Transformer backbones: DINOv2-Large, DINOv2-Giant, and MoCo v3-Large, under a common linear-probing framework on ImageNet-1k. The evaluation included adversarial attacks (FGSM, PGD, and AutoAttack), feature-space similarity analysis using Centered Kernel Alignment (CKA), adversarial transferability studies, and evaluations on the ImageNet-C natural corruption benchmark.
The principal findings of the study are summarized below:
1.Consistent robustness within the DINOv2 family: DINOv2-Large and DINOv2-Giant exhibited highly consistent behaviour across adversarial, corruption, and representation-level analyses. The two models achieved the highest feature-space similarity (CKA = 0.71) and consistently outperformed MoCo v3 under single-step and corruption evaluations.
2.MoCo’s adversarial weakness is partly a classifier-head effect: Under PGD attacks with ε = 1/255, MoCo achieved only 5.98% robust accuracy. However, removing a single Batch Normalization layer from the classifier head increased robustness to 11.32% while reducing clean accuracy by only 1.78 percentage points. This effect tracked the mean BN scale (which is > 1 for MoCo). Conversely, removing BN harmed the robustness of DINOv2 models (where the BN scale is < 1). This result indicates that a substantial fraction of the observed robustness gap originates from the downstream classifier rather than the representation itself.
3.Natural corruption versus adversarial robustness: My evaluation on ImageNet-C demonstrated that the natural-corruption leader differs fundamentally from the small-ε adversarial leader. DINOv2-Giant strongly dominated ImageNet-C with an overall robust top-1 accuracy of 78.73%, far surpassing MoCo v3-Large (48.81%). However, under the full AutoAttack ensemble at ε = 1/255, MoCo v3-Large emerged as the most robust. This suggests that adversarial and natural corruption robustness behave as partially independent axes.
4.Robustness rankings depend strongly on attack methodology: Models that performed best under singlestep attacks did not necessarily remain superior under stronger iterative attacks. For example, under PGD1/255, DINOv2-Giant achieved 12.12% robust accuracy, easily outperforming MoCo’s 5.98%. However, under the stronger AutoAttack at the same perturbation budget, this ordering reversed: MoCo became more robust than DINOv2-Giant (3.88% for MoCo vs. 3.28% for DINOv2-Giant). This advantage widened further after removing the classifier’s BatchNorm layer, leaving MoCo at 6.26% against DINOv2-Giant’s 3.08%. This highlights the importance of evaluating robustness using multiple complementary attack settings.
Overall, this work provides a systematic comparison of robustness properties across prominent self-supervised Vision Transformer families and demonstrates that both representation-learning objectives and classifier design choices can substantially influence robustness measurements. Future work may extend these analyses to additional selfsupervised learning paradigms and robustness-aware representation learning methods.
I gratefully acknowledge the support of the Cisco Centre for Networked Intelligence (CNI), Indian Institute of Science, through the MTech Fellowship programme, which enabled me to carry out this research project.
