# control-todo-list

> A Vue.js project for todo list

## Features:
#### Login
1. User can login with only username in https://jsonplaceholder.typicode.com/users.
2. Error message will show up if user name is wrong.
3. If user login, an access token will be saved in localStorage. In 30 minutes, user can access
without being asked to login. After 30 minutes, user will be automatically brought to the login
page.
4. The token won't be cleared even if browser is closed. User need to click logout for immediately
deleting token.
5. Only two routes are valid ['/', '/dashboard']. Invalid routes will be automatically brought to
these two routes according to the access token.

#### Logout
1. After login, click the button in the right corner of the nav bar to logout.

#### ToDo (Features are satisfied as required)
1. Click add button to open new todo window
2. Click cancel button to close new todo window
3. Add a new todo to todoList from new todo window
4. Click one item in todo list to complete a todo task
5. Click one item in complete list to set a complete task as todo
6. New todo or new complete is always on the top of the todo/complete list

#### Transition
1. Show error message when login.
2. Open/Close new todo window.
3. Add/remove new item to todo list.
4. Add/remove new item to complete list.

#### Unit test
(Owing to limited time, unit tests are only for todo features)
1. Click add button to open new todo window
2. Click cancel button to close new todo window
3. Add a new todo to todoList from new todo window
4. Empty message cannot be added to todoList
5. Click one item in todo list to complete a todo task
6. Click one item in complete list to set a complete task as todo


## Build Setup

``` bash
# install dependencies
npm install 
(If npm install failed for some reason, please email me at mdjacky.cai@gmail.com. I will send you a .tar file which includes the node_module folder)

# serve with hot reload at localhost:8080
npm start

# run unit tests
npm run unit
```

For detailed explanation or installation failure, please contact author at mdjacky.cai@gmail.com
