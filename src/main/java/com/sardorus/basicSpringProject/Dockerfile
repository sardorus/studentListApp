FROM ubuntu:latest
LABEL authors="sardorshukhratov"

ENTRYPOINT ["top", "-b"]

# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar app.jar

# Set the classpath
ENV CLASSPATH="/app/app.jar:/usr/local/appservice/lib/azure.appservice.jar"

# Expose the port your app will run on
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-cp", "$CLASSPATH", "-Dfile.encoding=UTF-8", "-Dserver.port=80", "-XX:ErrorFile=/home/LogFiles/java_error_mystudentappsardorus_10-30-1-204_%p.log", "-XX:+CrashOnOutOfMemoryError", "-XX:+HeapDumpOnOutOfMemoryError", "-XX:HeapDumpPath=/home/LogFiles/java_memdump_mystudentappsardorus_10-30-1-204.log", "-Duser.dir=/app", "org.springframework.boot.loader.JarLauncher"]
