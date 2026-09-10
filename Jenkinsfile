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
            
            // This manually injects the token as an environment variable
            withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=shopsphere \
                        -Dsonar.projectName=ShopSphere \
                        -Dsonar.sources=. \
                        -Dsonar.token=${SONAR_TOKEN}"
                }
            }
        }
    }
}



    }
}
