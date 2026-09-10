pipeline{

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

         stage('SonarQube Analysis') {
        steps {
            script {
                def scannerHome = tool 'SonarQube'

                // "credentialsId" must exactly match the name from your image: 'sonarqube-token'
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=shopsphere \
                            -Dsonar.projectName=ShopSphere \
                            -Dsonar.sources=frontend \
                            -Dsonar.token=${SONAR_TOKEN}"
                    }
                }
            }
        }
    }




    }
}
