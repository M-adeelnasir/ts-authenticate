pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the application ...'
                sh 'docker --version'
                
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
