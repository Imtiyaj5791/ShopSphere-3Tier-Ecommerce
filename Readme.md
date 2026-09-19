# ShopSphere – 3-Tier E-Commerce DevOps Project

## 📌 Project Overview

ShopSphere is a 3-tier e-commerce application deployed using Docker and Kubernetes with an automated CI/CD pipeline.

The project demonstrates how an application can be built, scanned, containerized, pushed to AWS ECR, deployed on Kubernetes, and monitored using Prometheus and Grafana.

---

## 🏗️ Application Architecture

The application follows a 3-tier architecture:

```text
                User
                  |
                  v
          Frontend (React)
                  |
                  v
          Backend (Node.js)
                  |
                  v
          PostgreSQL Database
```

### Components

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Database:** PostgreSQL
* **Containerization:** Docker
* **Container Registry:** AWS ECR
* **Orchestration:** Kubernetes
* **CI/CD:** Jenkins
* **Code Quality:** SonarQube
* **Security Scanning:** Trivy
* **Monitoring:** Prometheus + Node Exporter + Grafana

---

## 📂 Project Structure

```text
online-store-devops/
│
├── README.md
├── frontend/
├── backend/
├── services/
├── docker/
├── k8s/
├── monitoring/
└── Jenkinsfile
```

---

## 🔄 CI/CD Pipeline

The project uses Jenkins for CI/CD automation.

### Pipeline Flow

```text
Developer
    |
    v
GitHub
    |
    v
Jenkins
    |
    v
Checkout
    |
    v
Build
    |
    v
SonarQube
    |
    v
Docker Build
    |
    v
Trivy Scan
    |
    v
AWS ECR
    |
    v
Kubernetes Deployment
    |
    v
Smoke Test
    |
    v
Email Notification
    |
    v
Monitoring
```

---

## 🔧 Jenkins Pipeline Stages

The Jenkins pipeline performs the following major tasks:

### 1. Checkout

Jenkins checks out the application source code from GitHub.

### 2. Build

The application is built and required dependencies are installed.

### 3. SonarQube

SonarQube is used for static code-quality analysis.

### 4. Docker Build

Docker images are created for the application components.

### 5. Trivy Scan

Trivy is used to scan the source/filesystem and Docker images for vulnerabilities.

### 6. ECR Push

The Docker image is tagged and pushed to AWS Elastic Container Registry.

### 7. Kubernetes Deployment

The application is deployed to the Kubernetes cluster using Kubernetes manifests.

### 8. Smoke Test

After deployment, basic application/API checks are performed to verify that the deployment is working.

### 9. Notification

Jenkins sends email notifications for pipeline results.

---

## 🐳 Docker

Docker is used to containerize the application.

The backend application was containerized and Docker images were built before pushing them to AWS ECR.

Containerization provides a consistent runtime environment across development and deployment.

---

## ☁️ AWS ECR

AWS Elastic Container Registry is used as the private Docker image registry.

ECR repositories used in the project:

```text
shopzone-backend
shopsphere-frontend
```

AWS Region:

```text
ap-south-1
```

---

## ☸️ Kubernetes

The application is deployed on a Kubernetes cluster.

The project uses Kubernetes resources for deploying and exposing the application.

The Kubernetes environment used for the project is a KIND cluster.

### Cluster

```text
shopsphere-control-plane
shopsphere-worker
shopsphere-worker2
```

---

## 📊 Monitoring

Monitoring is implemented using:

```text
Kubernetes Nodes
       |
       v
Node Exporter
       |
       v
Prometheus
       |
       v
Grafana
```

### Node Exporter

Node Exporter runs on the Kubernetes worker nodes and exposes system-level metrics such as:

* CPU
* Memory
* Node availability

### Prometheus

Prometheus scrapes metrics exposed by Node Exporter and stores them for querying.

### Grafana

Grafana is connected to Prometheus as the data source.

The dashboard can display:

* CPU utilization
* Memory utilization
* Node status

PromQL queries are used to calculate the required metrics.

---

## 🚨 Alerting

Grafana alerting was configured for CPU monitoring.

The test configuration used:

```text
CPU > 40%
```

A Grafana contact point was configured with Gmail SMTP.

Gmail App Password authentication was used for SMTP.

The Grafana test notification was successfully sent.

> Grafana persistence/PVC was not added in this lab implementation. In a production environment, persistent storage should be configured for Grafana data such as dashboards and alert rules.

---

## 🛠️ Troubleshooting Performed

During implementation, several practical issues were handled.

### 1. EC2/KIND Node IP Change

KIND node IPs changed after the environment lifecycle.

Prometheus initially had a stale Node Exporter target.

The current worker node IPs were checked and the Prometheus configuration was updated accordingly.

After restarting Prometheus, both Node Exporter targets were verified as **UP**.

### 2. Backend Connectivity

The frontend/backend connectivity issue was investigated and resolved by ensuring the backend service was running correctly.

### 3. Dockerfile Issue

A backend Dockerfile issue was identified and corrected, after which the backend Docker image was successfully built.

### 4. Grafana SMTP Configuration

Grafana initially failed to send test notifications because SMTP was not configured.

Gmail SMTP was configured using an App Password, after which:

```text
Test notification sent successfully
```

was verified.

---

## 🔐 Security Tools

The project includes security and quality checks in the CI/CD pipeline:

### SonarQube

Used for:

* Static code analysis
* Code quality checks

### Trivy

Used for:

* Filesystem scanning
* Docker image vulnerability scanning

---

## 🎯 End-to-End Project Flow

```text
Developer
    |
    v
GitHub
    |
    v
Jenkins
    |
    +--> Checkout
    |
    +--> Build
    |
    +--> SonarQube
    |
    +--> Docker Build
    |
    +--> Trivy Scan
    |
    +--> ECR Push
    |
    +--> Kubernetes Deploy
    |
    +--> Smoke Test
    |
    +--> Email Notification
    |
    v
Application Running
    |
    v
Node Exporter
    |
    v
Prometheus
    |
    v
Grafana
```

---

## 📚 Technologies Used

| Category               | Technology       |
| ---------------------- | ---------------- |
| Frontend               | React, Vite      |
| Backend                | Node.js, Express |
| Database               | PostgreSQL       |
| Version Control        | Git, GitHub      |
| CI/CD                  | Jenkins          |
| Code Quality           | SonarQube        |
| Security Scan          | Trivy            |
| Containerization       | Docker           |
| Container Registry     | AWS ECR          |
| Orchestration          | Kubernetes       |
| Kubernetes Environment | KIND             |
| Monitoring             | Prometheus       |
| Metrics Exporter       | Node Exporter    |
| Visualization          | Grafana          |
| Cloud                  | AWS              |

---

## 🚀 Project Objective

The main objective of this project is to demonstrate an end-to-end DevOps workflow covering:

* Application deployment
* Source-code management
* CI/CD automation
* Containerization
* Code-quality analysis
* Security scanning
* Container image management
* Kubernetes deployment
* Application verification
* Infrastructure monitoring
* Basic alerting and email notification

---

## 👨‍💻 Project Status

### Completed

* 3-tier application
* Dockerization
* GitHub repository
* Jenkins CI/CD
* SonarQube integration
* Trivy scanning
* AWS ECR
* Kubernetes deployment
* Smoke testing
* Prometheus monitoring
* Node Exporter
* Grafana dashboard
* Grafana email notification testing

### Separate Future/Optional Work

* Grafana persistent storage
* GitHub Actions alternative CI/CD pipeline
* Advanced monitoring and observability
* AI / AI-for-DevOps integration
