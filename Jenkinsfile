pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/M-adeelnasir/ts-authenticate.git'
            }
        }
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
