pipeline {

    agent any

    stages {

       stage ('Checkout') {

         steps {

            Checkout scm
         }
        stage('Building') {

            steps {

            sh 'cd frontend && npm install && npm run build'

            }

        stage ('Sonarqube') {

            steps {
                withSonarQubeEnv('SonarQube') {

             sh 'sonar-scanner'

               }
            }

}


}


       }




    }








}