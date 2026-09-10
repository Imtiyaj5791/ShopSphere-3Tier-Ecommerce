pipeline {

    agent any

    stages {

       stage ('checkout') {

         steps {

            checkout scm
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