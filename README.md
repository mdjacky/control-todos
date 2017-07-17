# control-todo-list

> A Vue.js project
Introduction:

Features:
-- Login
1. User can login with only username in https://jsonplaceholder.typicode.com/users.
2. Error message will show up if user name is wrong.
3. If user login, an access token will be saved in localStorage. In 30 minutes, user can access
without being asked to login. After 30 minutes, user will be automatically brought to the login
page.
4. The token won't be cleared even if browser is closed. User need to click logout for immediately
deleting token.
5. Only two routes are valid ['/', '/dashboard']. Invalid routes will be automatically brought to
these two routes according to the access token.

-- ToDo
Features are satisfied as required.

-- Transition
Transition is included for:
1. Show error message when login.
2. Open new todo window.
3. Add/remove new item to todo list.
4. Add/remove new item to complete list.

-- Unit test
Owing to limited time, unit tests are only for todo features.
Please run 'npm run unit' to check all the unit test

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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
