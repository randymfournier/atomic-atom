---
title: How to Set Up an Apache Web Server on AWS EC2 Using the AWS CLI
description: Easily deploy an Apache web server on a t2.micro EC2 instance and create a custom Amazon Machine Image (AMI) for quick launches.
pubDate: 11/12/2024
author: Randy Fournier
tags: 
  - AWS
  - AWS CLI
  - AWS AMI
imgUrl: '../../assets/ssh.webp'
layout: ../../layouts/ProjectPost.astro
draft: true
featured: true
---

# How to Set Up an Apache Web Server on AWS EC2 Using the AWS CLI

## Headline
Easily deploy an Apache web server on a t2.micro EC2 instance and create a custom Amazon Machine Image (AMI) for quick launches.

## Story Image
*Cover image of AWS EC2 instance or cloud server setup*

## Introduction
Setting up an Apache web server on AWS is a fundamental task for web hosting and development. This guide walks you through using the AWS CLI to create a t2.micro EC2 instance, set up an Apache server through user data, and create an Amazon Machine Image (AMI) for easy future deployments.

## Benefits
By following this guide, you will:
- Gain experience with AWS CLI for server management
- Learn how to automate instance setup with user data scripts
- Understand the process of creating reusable AMIs

---

## Baseline
Familiarity with AWS EC2, basic Linux commands, and having the AWS CLI installed and configured on your local machine.

## Scope
This guide will cover the setup of an EC2 instance with Apache, verification of the server setup, creation of a reusable AMI, and all operations performed through the AWS CLI.

---

## Section 1: Create a t2.micro EC2 Instance with Apache

### Step 1: Launch the EC2 Instance
Use the AWS CLI to create a t2.micro EC2 instance with a script in the user data field. This script will:
- Update all packages
- Install Apache
- Start the Apache service

### Step 2: User Data Script
Include the following script in the user data field:

```bash
#!/bin/bash
yum update -y
yum install httpd -y
systemctl start httpd
systemctl enable httpd
```

### Additional Tips
Ensure that your security group allows HTTP traffic (port 80) to make Apache accessible.

---

## Section 2: Verify the Apache Installation

### Step 1: Find the Public IP
Use the AWS CLI or AWS Console to find the public IP of your new instance.

### Step 2: Verify Apache
Open the public IP in a browser to confirm that Apache is running and displaying the default Apache test page.

---

## Section 3: Create an Amazon Machine Image (AMI)

### Step 1: Create an AMI from the Instance
Using the AWS CLI, create an AMI of the configured instance. This AMI will serve as a reusable template for future instances with Apache pre-installed.

### Step 2: Verify the AMI Creation
Check that the AMI is listed in the AWS Console under Images.

---

## Section 4: Launch a New Instance Using the AMI

### Step 1: Launch an Instance from the AMI
Use the AWS CLI to create a new EC2 instance using the AMI created earlier.

### Step 2: Verify Web Server Accessibility
Verify that the Apache web server is running by accessing the new instance’s public IP.

---

## Conclusion
With these steps, you’ve set up an Apache web server, created a reusable AMI, and launched a new instance from it. This process is ideal for developers needing a consistent server setup without manual configuration each time.

---

### Thanks for reading!
Please share some feedback or continue reading more stories from me.

### Related Stories
- [How to Install and Setup Apache Webserver on Amazon Linux 2 EC2 Instance](https://medium.com/@randy.m.fournier/how-to-install-and-setup-apache-webserver-on-amazon-linux-2-ec2-instance-ff13c8422004)  
- [How to Remotely Manage Servers on AWS Using SSH, RDP & SSM](https://medium.com/@randy.m.fournier/how-to-remotely-manage-servers-on-aws-using-ssh-rdp-ssm-f55bfea066cd)  
- [How to Host a Static Website Using Amazon S3 Step by Step](https://medium.com/@randy.m.fournier/how-to-host-a-static-website-using-amazon-s3-step-by-step-ca9b19ccebd2)  

### Follow me on LinkedIn
[Randy Fournier](https://www.linkedin.com/in/randymfournier/)
