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

        stage('SonarQube') {

            steps {

                withSonarQubeEnv ('SonarQube') {

                sh 'sonar-scanner'
            }
            }
        }
    }
}