---
title: How to Remotely Manage Servers on AWS Using SSH, RDP & SSM
description: Administering and maintaining servers is a core responsibility of the average person in IT. It’s not so bad when you are only in charge of a couple of servers, it’s actually quite fun if that’s your thing.
pubDate: 09/28/2024
author: Randy Fournier
tags: 
  - AWS
  - SSH
  - EC2
imgUrl: '../../assets/ssh.webp'
layout: ../../layouts/ProjectPost.astro
draft: true
featured: true
---

![alt text](../../assets/ssh.webp "Logo Title Text 1")

Administering and maintaining servers is a core responsibility of the average person in IT. It’s not so bad when you are only in charge of a couple of servers, it’s actually quite fun if that’s your thing.

## Managing A Massive Fleet

But what about when you have hundreds or more to manage on a daily basis. This would definitely require a large IT team to be on top of it especially with all the vulnerabilities and patches popping up constantly.

![alt text](https://tenor.com/view/trucks-omw-lets-ride-technische-unie-gif-9915603.gif "Fleet of Trucks on a Racetrack")

There are some tools that definitely aid in this regard such as SSH for UNIX-based systems and RDP for Windows-based systems. While this is great and makes life easier for the most part there is an even better solution SSM developed by Amazon.

## Level Up Corporation

A mid-sized tech company leveraging the power of AWS’ EC2 to host both it’s Linux and Windows applications.

The company has 100+ EC2 instances running simultaneously and has a dedicated IT team located globally to handle the administering and maintenance of these instances.

Due to the absence of a reliable, secure and direct remote administration tool. The IT team faces significant challenges in efficiently managing, troubleshooting and maintaining these servers, leading to prolonged downtime, decreased productivity and potential security risks.

## Proposed Solution

Lets implement SSH for the Linux EC2 instances and RDP for the Windows EC2 instances. Both of these methods provide secure and encrypted channels for remote administration allowing the IT team to effectively manage and troubleshoot servers regardless of the geographical location.

I will also cover how to setup and use SSM and cover why this tool is an absolute gamechanger for this type of scenario as well.

## Benefits

- Improved Productivity and Efficiency: SSH and RDP provide direct access to EC2 instances. This enables the IT team to respond to server issues promptly and reduce the downtime, improving overall efficiency
- Enhanced Security: Both SSH and RDP provide secure, encrypted channels for communication. This helps to prevent unauthorized access and data breaches
- Cost Savings: By reducing server downtime and enhancing IT team efficiency, the company can decrease operational costs.
- Easier Administration and Troubleshooting: SSH and RDP enable the execution of commands and access server resources simplifying server management.
- Scalability: As the company expands and the number of EC2 instances increase. Having a robust secure remote access tool is crucial (This is where SSM will shine) for managing a larger server infrastructure

---

## What we will cover in this guide:
-> What SSH is

-> What RDP is

-> What SSM is

-> What an EC2 Instance is

-> How to create a security group to allow SSH / RDP

-> How to deploy a Linux and Windows EC2 instance

-> How to setup and utilize all 3 tools to access EC2 instances

## Requirements:
- AWS Account ☁️
- EC2 Windows Instance 🪟
- EC2 Linux Instance 🐧
- A Cup of Coffee ☕

---

*Lets get started!*

>NOTE: I assume you have some familiarity with AWS and can navigate around The company would already have instances but I need to create some for my example. This way you can follow along if you don’t have any or skip the parts you already have.

*What is SSH*

SSH stands for Secure Shell and is a network protocol that enables secure remote access to devices over an unsecured network such as servers, routers and switches.

*What is RDP*

RDP stands for Remote Desktop Protocol and is a Microsoft proprietary protocol. It allows users to securely connect to remote computers over an encrypted channel.

*What is SSM*

SSM stands for Simple Systems Manager but is almost always referred to as AWS Systems Manager. It allows you to securely manage your resources on AWS and in a multi-cloud and hybrid environment. (Yes On-Premise as well)

*What is an EC2 Instance*

EC2 stands for Elastic Compute Cloud (2 for the 2 Cs) and is an Amazon Web Service through which a user can boot an Amazon Machine Image (AMI). If you are familiar with VMs this is the same concept.

---

Now that we know what everything is, lets get our hands dirty with the setup. I will go over everything in detail but here is what we will do at a high level:

1 — Create AWS EC2 Windows Instance

2 — Create AWS EC2 Linux Instance

3 — Create a Security Group to allow SSH

4 — Connect to our Linux Instance with SSH

5 — Connect to our Windows Instance with RDP

6 — Setup and cover SSM

## 1. Create AWS EC2 Windows Instance
First lets log into AWS Console: https://console.aws.amazon.com

Next, lets go to the EC2 Dashboard and select “Launch instance”


Give your instance a name (I’m making 2 so I have some instances to work with)
Select Windows AMI
Select your instance type
Select or Create Key Pair (optional, but I’d recommend to be secure)
Create security group and allow RDP traffic
I will leave the rest default and click on “Launch instance”





2. Create AWS EC2 Linux Instance
This is almost identical to the last section with only a few differences:

Give your instance a name (I’m making 2 again so I have some more instances to work with)
Select Amazon Linux AMI
Select your instance type
Select or Create Key Pair (again optional, but just make one please :))
Create security group and allow SSH traffic
I will leave the rest default and click on “Launch instance”





3. Create a Security Group to allow SSH / RDP
I created this section on the off chance you have an instance but you don’t have a security group.

I will show you how to create just a security group and apply it to your already existing instance. I will select SSH in my example but its exactly the same for RDP

From your EC2 Dashboard, select “Security Groups” from the sidebar menu
Select “Create security group”
Specify Security group name
Specify Security group description
Click “Add rule” under Inbound Rules
Select SSH / RDP from the “Type” dropdown menu
Select your source (I did my IP so I can be the only one to access)
Enter a description if you’d like
Click “Create security group”
Lets go back to our EC2 Dashboard and select “Instances” from the sidebar menu and let’s apply our new security group!

Check off the instance to apply the security group to
Select from the “Actions” dropdown menu -> Security -> Change security groups
Search and select the security group you created
Click on “Add security group”
Click on “Save”


Okay! now that we have the setup for SSH and RDP out of the way let’s actually connect to our instances.

Let me just take a sip of coffee . . .


4. Connect to our Linux Instance with SSH
We need to use an SSH client and gather some information from our instance in order to connect via SSH. I will be using PowerShell for this example.

Open your instance summary by clicking on the “Instance ID” of the instance you want to SSH into.
Copy down your Public IPv4 DNS entry
Open PowerShell or your SSH client of choice
Run the following command:
(If you used a key pair):
ssh -i “full/path/to/keypair.pem” ec2_user@your_public_ipv4_dns_entry
(If you didn’t use a key pair):
ssh ec2_user@your_public_ipv4_dns_entry
You will be asked if you are sure you want to connect, type “yes” to add connection
We’re in!



5. Connect to our Windows Instance with RDP
Okay now lets RDP into a windows EC2 instance!

Check the box next to the instance you want to RDP to
Click Connect
Click on the “RDP client” tab
This will have a shortcut you can download to connect to your instance via RDP
See your username and Click “Get password” to get the login password
IF you were awesome and generated a key pair, you will have to upload your .pem file from that step to actually decrypt the password.
Run the file you downloaded
Accept the security warning and connect anyway (we can trust the connection)
login with your username and password
Accept the security warning: trust the certificate and click “Yes”
We’re In!






6. Setup and cover SSM
We’ve learned how to use some new tools to aid in remote administration. Still the fact that we have over 100+ instances to manage, is daunting.

Just thinking about logging in to all these instances and applying patches gives me nightmares.

That’s where SSM comes in, it has many features some of which incur costs. If you are using it as an alternative to the other 2 tools, you can get away using it for free. You only have to pay for some of the quality of life features that enhance your workflow like automation for example.

You can find pricing details here: SSM Pricing

Okay so how do we setup SSM to access our instances?

1 — Create an IAM role to allow SSM access to our EC2 instances
2 — Update our instances with our new role
3 — Access our instances through SSM Fleet manager


1. Create an IAM role to allow SSM access to our EC2 instances
Lets go to the IAM Dashboard from the AWS console
Select “Roles” from the sidebar menu
Click “Create role”
Select “AWS service” from the Trusted entity type card
Click “Next”
Search for “SSM” and Check the box next to “AmazonSSMFullAccess
Scroll down and click “Next”
Give your role a meaningful name
Scroll down and click “Create role”








2. Update our instances with our new role
Lets apply our new role to our instances.

From our instances overview in EC2 check the box next to the instance you want to apply the role to
Click the “Actions” dropdown menu -> Security -> Modify IAM role
Select our new role from the dropdown menu
Click “Update IAM role”
Repeat these steps for all other instances you want to access through SSM and then reboot all your instances!


Unfortunately, you can only do 1 at a time :/
At least you can reboot all your instances at once :D

If you happen to find a way to do this en masse, please share some feedback and let me know!


3. Access our instances through SSM Fleet manager
We can go directly to the Fleet Manager but I want to show you the SSM Dashboard first.

Search SSM and find “Systems Manager” from the AWS console
On the dashboard you can see all the features this tool has and how this can be of massive value especially if you are managing a huge infrastructure.
Oh and you can also access On-Premise resources too, Game Changer!

Okay back to business:

Select “Fleet Manager” from the sidebar menu
(You could have searched it from the AWS console as well)
You now should see all of your instances, check the box next to the one you wish to connect to.
Click on the “Node actions” Dropdown menu -> Connect -> Start terminal session
We’re in! We can run the commands “hostname” and “whoami” to confirm what instance we are connected to



NOTE: For more security, with Linux you could remove the SSH policy and connect only via SSM. With Windows you could remove RDP policy but you would lose ability for that connection type and only be able to access the terminal.

With Windows, the steps are the same and you have the option of connecting via terminal or RDP. With RDP you can have up to 4 connections at once

When you connect via RDP, you have the option to just use your key pair which is an added bonus, no more entering passwords!
Here is what it looks like when multiple connections are added, you can add more by Clicking “Add new connection”
You can isolate 1 connection by clicking the instance tab next to “All connections”



We’re all done! That’s how you work with SSM and it has far more capabilities that would take a novel to cover. So go ahead and play around with it just keep in mind some features will cost you eventually.

What’s Next?
Well there is not much more to talk about on this subject, however when I used to work for a company in IT there is a tool I loved and swear by that I will make a new post for.

