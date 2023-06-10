# Catchphrase Competition- Week 9 Recap Task
__________

Sam W (https://github.com/sam98963) asked me to collaborate with him on this weekend's tasks and I was very happy to say yes. We worked together in Week 6 and I really enjoyed working with him. We spent some time over the weekend on Zoom and pair programmed this website together.

#### We started with the back-end
- Creating the functions in users.js
    - Making sure to console.log and node users.js each step of the way to check them
- Making the route handlers for the HTTP requests
    - All checked using ThunderClient in VSCode.
- Then we wanted to make sure we handled errors correctly:
    - Went through the functions and created if statements and returned null if something had gone wrong with the inputs.
    - Added .status() in the route handlers and adjusted the success and payload values.
#### Once we were happy with the errors, we moved onto the front-end
- Created our public folder, index.html and main.js
- added add.use(express.static("public")); into app.js
- Created a simple boilerplate for the html file

Sam suggested we frame it as a 'Catchphrase Competition', which would allow users to add their details and a catchphrase to try and win a competition. (Great idea!)
- Next we made the form, label, inputs and button elements on the page.
- The next task was writing the functions to gather the data from the form and send a PUT request
    - This part took some thinking. We knew we needed:
   
      [x] Query Selectors      [x] Event Listeners    [x] async functions   [x] dot notation to grab the correct info
- We used the debugger tool to try to work out where the issue was, and we weren't grabbing the content of the inputs correctly.
- We needed to use .value on each one, and lots of console.logs later, we got there! Our form now inputs into our JSON file. 🥳
- We managed to spend some time on Monday before SoC started to style the page.
- We got the voting system working after A LOT of trial and error. Found the issue in our on click event - we needed to specify the content type to be application/json...! Happy to be able to see the votes now, but the data needs a serious sort out so that's on Sam's list of jobs for this weekend.


### Stretch Goals:
- [x] Use a .sort on the payload to display the catchphrases randomly on each refresh
- [x] Add button functionality which allows users to vote for their favourite catchphrase.
- [x] Implementing the correct HTTP response status code
- [x] Making a front end to consume and display your data
- [x] Add CSS to the front-end
- [ ] Additional routes that include searching the data using query strings
- [ ] Implementing middleware (start with a simple logger, and then explore what else you can add)


### Acknowledgements:

Thanks Sam 👊🏻

______
## Information from School of Code:
_______

### Create your API routes

👉 Create a REST API using the user JSON data found in `data/users.json`. Your API must be RESTful with all CRUD routes (create, read, update, delete).

| Operation         | Path             | Response body shape                                                          |
| ----------------- | ---------------- | ---------------------------------------------------------------------------- |
| Get all users     | `/api/users`     | <code>{ success: true, payload: array of user objects } </code>              |
| Get user by id    | `/api/users/:id` | <code>{ success: true, payload: user object }</code>                         |
| Create new user   | `/api/users`     | <code>{ success: true, payload: newly created user object }</code>           |
| Update user by id | `/api/users/:id` | <code>{ success: true, payload: new user object (after replacement) }</code> |
| Delete user by id | `/api/users/:id` | <code>{ success: true, payload: deleted user } </code>                       |

Remember to break down the task and tackle it step by step.

- Start by looking at the data and familiarizing yourself with how it's structured.
- Make a plan for each CRUD route, and break down the logic in that plan until you can't break it down anymore!
- Code each route handler in the `app.js` file.
- Code each helper function in the `users.js` file.
  - Test each route with Postman or Thunder Client as you finish it before you move on to the next one!
  - Add, commit, and push after you complete each route/helper function.

## Bonus challenges (_These are optional if you're ready for an extra challenge!_)

⭐ If you've finished everything above and have time left over, keep developing! Think through what ideas you can come up with to improve functionality.

This can include:

- Implementing the correct HTTP response status code
- Making a front end to consume and display your data
- Additional routes that include searching the data using query strings
- Implementing middleware (start with a simple logger, and then explore what else you can add)
