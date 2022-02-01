#!/usr/bin/env bash

#rm -rf build/
#echo "Deleted build/ folder"

mvn package
echo "Generating jar file"

#Copy execute_commands_on_ec2.sh file which has commands to be executed on server... Here we are copying this file
# every time to automate this process through 'deploy.sh' so that whenever that file changes, it's taken care of
scp -p -i ../eu-final-project.pem execute_commands_on_ec2.sh ec2-user@ec2-3-68-86-198.eu-central-1.compute.amazonaws.com:~
echo "Copied latest 'execute_commands_on_ec2.sh' file from local machine to ec2 instance"

echo "Copying jar file from local machine to ec2 instance"
scp -p -i ../eu-final-project.pem target/backend-0.0.1-SNAPSHOT.jar ec2-user@ec2-3-68-86-198.eu-central-1.compute.amazonaws.com:~


scp -p -i ../eu-final-project.pem -r data ec2-user@ec2-3-68-86-198.eu-central-1.compute.amazonaws.com:~
echo "Copied data files from local machine to ec2 instance"


#into your remote box. Type `screen` Then start the process you want.

#Press Ctrl-A then Ctrl-D. This will detach your screen session but leave your processes running. You can now log out of the remote box.

#If you want to come back later, log on again and type `screen -r` This will resume your screen session, and you can see the output of your process.

echo "Connecting to ec2 instance and starting server using java -jar command"

ssh -i ../eu-final-project.pem ec2-user@ec2-3-68-86-198.eu-central-1.compute.amazonaws.com ./execute_commands_on_ec2.sh
