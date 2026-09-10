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
script {
def scannerHome = tool 'SonarQube'

```
        withSonarQubeEnv('SonarQube') {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=shopsphere"
        }
    }
}
```

}


    }
}
