pipeline {
    agent {
        label 'BuiltInNode'
    }
    stages {
        stage('build') {
            when {
                expression {
                    env.BRANCH_NAME == 'master'
                }
            }
            steps {
                script{
                sh 'npm cache clear --force'
                sh 'npm install --verbose'
                sh 'npm run build'
                }
            }
        }
        stage('test') {
            when {
                expression {
                    env.BRANCH_NAME == 'develop' || env.BRANCH_NAME ==~ /MR-.*/
                }
            }
            steps {
                script {
                    sh 'npm cache clean --force'
                    sh 'npm run test:coverage' //test
                }
            }
        }
        stage('Deploy') {
            when {
                expression {
                    env.BRANCH_NAME == 'develop'
                }
            }
            agent {
                label 'deploy'
            }
            steps {
                script {
                    echo 'Deployment Started'
                    sh 'sudo docker-compose down'
                    sh 'sudo docker-compose up -d --build'
                }
                cleanWs()
            }
        }
    }
    post{
        always{ 
            sh "rm -rf dist"
            sh "rm -rf .npm"
            cleanWs()
            echo "Done"
        }
    }
}