
# build instructions 

mvn package -DskipTests

eval "$(docker-machine env default)"

docker build -t alim1910/spring-boot-docker .

docker push alim1910/spring-boot-docker

