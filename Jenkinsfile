pipeline {

    agent any

    stages {

        stage('Git Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Building') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }

        stage('SonarQube Test') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube'

                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=shopsphere"
                    }
                }
            }
        }

        stage ('Docker build') {

          steps {

             sh 'docker build -t shopzone-backend:latest ./backend'
             sh 'docker build -t shopsphere-frontend:latest ./frontend'
        
          }
            
        }

        stage('Trivy Scan') {
            steps {
                 echo 'Scanning backend Docker image'
                  sh 'trivy image shopzone-backend:latest'

                 echo 'Scanning frontend Docker image'
                 sh 'trivy image shopsphere-frontend:latest'
    }
}
    }
}
