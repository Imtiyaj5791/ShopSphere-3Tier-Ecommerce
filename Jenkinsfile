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

        stage ('Docker login') {

   steps {

     sh 'aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 008826676494.dkr.ecr.ap-south-1.amazonaws.com'

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


       stage ('Docker Tag') {

   steps {

     sh 'docker tag shopsphere-frontend:latest 008826676494.dkr.ecr.ap-south-1.amazonaws.com/shopsphere-frontend:latest'
     sh 'docker tag shopzone-backend:latest 008826676494.dkr.ecr.ap-south-1.amazonaws.com/shopzone-backend:latest'


   }
}
    

        stage ('Docker Push') {

   steps {

     sh 'docker push 008826676494.dkr.ecr.ap-south-1.amazonaws.com/shopzone-backend:latest'
     sh 'docker push 008826676494.dkr.ecr.ap-south-1.amazonaws.com/shopsphere-frontend:latest'


   }
}
       stage('k8s deploy') {

   steps {

       sh 'kubectl apply -f k8s/'


  }
}
    }
}
