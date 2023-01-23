pipeline {
    agent { dockerfile true }
    stages {
        stage('Build') {
            steps {
                echo 'Building the application ...'
            }
        }
        stage('Test') {
            steps {
                echo 'testing the application ...'
            }
        }
      
      stage('deploy') {
            steps {
                echo 'deploying the application ...'
            }
        }
    }
}
