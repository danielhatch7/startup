# CS 260 Startup - You Choose - Voting App

This is the readme file for my CS 260 startup application project

## Elevator Pitch

Imagine this, you are with your friends trying to decide which activity you should do as a group that night. Everyone has different opinions and wishes. If you have ever been in a situation like this, you know that it can be easy to feel stuck. This is where the You Choose app comes in. One person from the group is able to quickly start a live voting session that everyone can join on their phones. This way everyone can have their say and you can quickly see what the majority vote is. This is one of the many examples of why the You Choose app is so helpful. It can be used in work meetings, group activities, and more.

## Key Features

Below are a few of the main features you will find within the You Choose app.

- Secure log in using HTTPS
- Ability to join or start a live voting session
- Ability to add a question to a personal question bank
- Ability to add a question to a question group
- Ability to view results for a live voting session
- Users can choose top choice

## Technologies

I will utilize the following technologies.

- **Authentication:** The You Choose app will require that the user log in with their username and password. This way they can access their own personal question bank.
- **Database:** The questions users add to their question bank as well as the results from voting sessions will be stored in the database. Results will be deleted from the database after 24 hours.
- **WebSocket Data:** The websocket data that will be used in this app is the realtime votes each user is submitting.

## Rough Sketch

![Screenshot 2023-09-23 164216](https://github.com/danielhatch7/startup/assets/97316307/4bb8958d-a5b5-4195-9de2-759d139e70e4)

### Login Page

The login page is where the user will log into their account. If the user does not have an account already created, they will be able to make an account. Creating an account requires a unique username, password, email, and user nickname.

### Home Page

The home page is the main place for users to access all of the features within the app. The user can either join a live voting session, start a live voting session, add questions to their own personal question bank, or create question groups.

#### Join Live Session

Here the user is able to join a live voting session. The user will need the session ID number in order to join a private voting session. Once a voting session has been ended by the host, the user will automatically be directed to the View Results page for the session they were on.

#### Start Voting Session

Here the user is able to start a live voting session. The user will have to choose either a question group or a specific question that they already added to their question bank in order to start a voting session. The user who starts a voting session will be designated as the host. When starting a session, the host will get the choice to decide how long the session is active. If no time limit is given, the session will only stay live while the host is connected to the session. The host can also give users multiple votes for the same question.

#### Question Bank

Here the user is able to add questions to their own personal question bank. Each of these questions will be a multiple choice questions and the user will need to determine what the possible options are to be voted for.

#### Question Group

Here the user is able to add questions from their question bank to a group. The same question can be used in multiple question groups. The question groups allow multiple questions to be voted on during a session.

#### View Results

Here the user is able to view the results from a voting session. The results will only be available after a live session has ended. The user will need the session ID in order to view the results for a specific session.
