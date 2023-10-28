# CS 260 Startup - You Choose - Voting App

This is the readme file for my CS 260 startup application project, the You Choose voting web app.

## Elevator Pitch

Imagine this, you are with your friends trying to decide which activity you should do as a group that night. Everyone has different opinions and wishes. If you have ever been in a situation like this, you know that it can be easy to feel stuck. This is where the You Choose app comes in. One person from the group is able to quickly start a live voting session that everyone can join on their phones. This way everyone can have their say and you can quickly see what the majority vote is. This is one of the many examples of why the You Choose app is so helpful. It can be used in work meetings, group activities, and more.

## Key Features

Below are a few of the main features you will find within the You Choose app.

- Secure log in using HTTPS
- Ability to join or start a live voting session
- Ability to view results for a live voting session
- Users can choose top choice

## Technologies

I will utilize the following technologies.

- **Authentication:** The You Choose app will require that the user log in with their username and password. This way they can access their own personal question bank.
- **Database:** The user account data as well as the results for each session will be stored in the DB.
- **WebSocket Data:** The websocket data that will be used in this app is the realtime votes each user is submitting.

## Rough Sketch

![Screenshot 2023-09-23 164216](https://github.com/danielhatch7/startup/assets/97316307/4bb8958d-a5b5-4195-9de2-759d139e70e4)

### Login Page

The login page is where the user will log into their account. If the user does not have an account already created, they will be able to make an account. Creating an account requires a unique username, password, email, and user nickname.

### Home Page

The home page is the main place for users to access all of the features within the app. The user can either join a live voting session, start a live voting session, or view results. The home page will have the following options:

1. **Join Live Session**
2. **Start Voting Session**
3. **View Results**

#### Join Live Session

Here the user is able to join a live voting session. The user will need the session ID number in order to join a private voting session. Once a voting session has been ended by the host, the user will automatically be directed to the View Results page for the session they were on.

#### Start Voting Session

Here the user is able to start a live voting session. The user will have to choose a question in order to start a voting session. The user who starts a voting session will be designated as the host. When starting a session, the host will get the choice to decide how long the session is active. If no time limit is given, the session will only stay live while the host is connected to the session. The host can also give users multiple votes for the same question.

#### View Results

Here the user is able to view the results from a voting session. The results will only be available after a live session has ended. The user will need the session ID in order to view the results for a specific session.

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML Pages** - 9 HTML pages that represent the following abilities
  - **index.html** - Login page
  - **account.html** - Allows a user to create an account
  - **home.html** - Main home page to access all other application features
  - **join.html** - Asks for session ID before directing to live.html
  - **live.html** - Allows users to vote and see results live
  - **start.html** - Asks host for question/answers before directing to hostView.html
  - **hostView.html** - Shows host live results. Allows host to end session.
  - **results.html** - Asks for session ID before directing to resultsView.html
  - **resultsView.html** - Shows the results for a given session
- **Links** - All of the pages listed above link to the correct page after submitting the appropriate data.
- **3rd Party** - Appropriate placeholders have been used to represent 3rd party service calls.
- **Text** - All of the pages contain textual context so that it is clear what each page is used for. Each page has placeholder text to represent what will be replaced by user submitted text.
- **Images** - I created and implemented a favicon image utilizing the initials of my app title - "YC". My application does not require any other images
- **Login** - There is an input box for a username and password. There is also a submit button for login. On the account.html page there are more input boxes for username, password, name, and email, which are used for account creation. The user's name is displayed on the home page.
- **Database** - The question and voting choices represent data pulled from the database on the voting page. The voting results represent data pulled from the database on the results page.
- **WebSocket** - The count of voting results represent the tally of realtime votes.

## CSS Deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body** - I gave a layout for the header, footer, and main body content. Gave header and footer a blue background.
- **Navigation elements** - I made it so that the anchor for the active page is highlighted. Made text white so it can be seen on blue background.
- **Responsive to window sizing** - The app responds to all window sizes and devices to look good.
- **Application elements** - I made sure that each element had adequate whitespace so that it looks good.
- **Application text content** - I changed text color to make sure that all text has good contrast with its background. I also made sure that fonts were consistent throughout the app.
- **Application images** - I made sure that the favicon images show up correctly. My app does not require any other images.

## JavaScript Deliverable

For this deliverable, I implemented the JavaScript so that the application works for a single user and added placeholders for future technology.

- **Login** - When you press enter or the login button it takes you to the home page and displays the user's name.
- **Database** - The voting results and counts are pulled from the database. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later.
- **WebSocket** - I used the is_live variable to mark whether or not a voting session is live. This will later be replaced with WebSocket messages.
- **Application Logic** - The highlight and voting results change based up the user's selections.
