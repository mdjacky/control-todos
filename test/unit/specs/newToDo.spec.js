import Vue from 'vue'
import Todo from '@/components/Todo'
import newTodo from '@/components/newTodoModal'
import VueResource from 'vue-resource'

Vue.use(VueResource)
let route = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/todos',
  response: [
    {
      'userId': 1,
      'id': 1,
      'title': 'delectus aut autem',
      'completed': false
    },
    {
      'userId': 1,
      'id': 2,
      'title': 'quis ut nam facilis et officia qui',
      'completed': false
    },
    {
      'userId': 1,
      'id': 19,
      'title': 'molestiae ipsa aut voluptatibus pariatur dolor nihil',
      'completed': true
    },
    {
      'userId': 1,
      'id': 20,
      'title': 'ullam nobis libero sapiente ad optio sint',
      'completed': true
    }
  ]
}

Vue.http.interceptors.unshift((request, next) => {
  if (route.method === request.method && route.url === request.url) {
    next(
      request.respondWith(
        route.response,
        {status: 200}
      )
    )
  } else {
    console.log('Oh no! Not found!')
    next(request.respondWith({status: 404, statusText: 'Oh no! Not found!'}))
  }
})

describe('Todo.vue', () => {
  it(`should open newToDo window when click add button`, done => {
    const Constructor = Vue.extend(Todo)
    const comp = new Constructor().$mount()
    comp.userId = 1
    expect(comp.$el.querySelector('.newToDoContainer')).to.be.null
    const btnOpen = comp.$el.querySelector('#btn-openNewToDo')
    const clickEvent = new window.Event('click')
    btnOpen.dispatchEvent(clickEvent)
    comp._watcher.run()
    expect(comp.$el.querySelector('.newToDoContainer')).not.to.be.null
    done()
  })
  it(`should close newToDo panel when click cancel button outside of newToDo panel`, done => {
    const Constructor = Vue.extend(Todo)
    const comp = new Constructor().$mount()
    comp.userId = 1
    const btnOpen = comp.$el.querySelector('#btn-openNewToDo')
    const clickEvent = new window.Event('click')
    btnOpen.dispatchEvent(clickEvent)
    comp._watcher.run()
    expect(comp.$el.querySelector('.newToDoContainer')).not.to.be.null
    const btnClose = comp.$el.querySelector('#btn-closeNewToDo')
    btnClose.dispatchEvent(clickEvent)
    comp._watcher.run()
    setTimeout(() => {
      expect(comp.$el.querySelector('.newToDoContainer')).to.be.null
      done()
    }, 800)
  })
  it(`should close newToDo panel when click cancel button inside of newToDo modal`, done => {
    const Constructor = Vue.extend(Todo)
    const comp = new Constructor().$mount()
    comp.userId = 1
    const btnOpen = comp.$el.querySelector('#btn-openNewToDo')
    const clickEvent = new window.Event('click')
    btnOpen.dispatchEvent(clickEvent)
    comp._watcher.run()
    expect(comp.$el.querySelector('.newToDoContainer')).not.to.be.null
    const btnClose = comp.$el.querySelector('#btn-cancelNewToDo-inside')
    btnClose.dispatchEvent(clickEvent)
    comp._watcher.run()
    setTimeout(() => {
      expect(comp.$el.querySelector('.newToDoContainer')).to.be.null
      done()
    }, 800)
  })
  it(`should emit a newToDo event when add new todo`, done => {
    const Constructor = Vue.extend(newTodo)
    const comp = new Constructor().$mount()
    const clickEvent = new window.Event('click')
    let emitSignal = false
    comp.$on('AddNewToDo', () => {
      emitSignal = true
    })
    comp.todo.title = 'test'
    const btnCreate = comp.$el.querySelector('#btn-createNewToDo')
    btnCreate.dispatchEvent(clickEvent)
    comp._watcher.run()
    Vue.nextTick(() => {
      expect(emitSignal).to.be.true
      done()
    })
  })
  it(`should not emit a newToDo event when add an empty new todo`, done => {
    const Constructor = Vue.extend(newTodo)
    const comp = new Constructor().$mount()
    const clickEvent = new window.Event('click')
    let emitSignal = false
    comp.$on('AddNewToDo', () => {
      emitSignal = true
    })
    comp.todo.title = ''
    const btnCreate = comp.$el.querySelector('#btn-createNewToDo')
    btnCreate.dispatchEvent(clickEvent)
    comp._watcher.run()
    Vue.nextTick(() => {
      expect(emitSignal).to.be.false
      done()
    })
  })
  it(`should add a new todo ticket to todoList when child component emit a new todo event`, done => {
    const Constructor = Vue.extend(Todo)
    const comp = new Constructor().$mount()
    comp.userId = 1
    const btnOpen = comp.$el.querySelector('#btn-openNewToDo')
    const clickEvent = new window.Event('click')
    btnOpen.dispatchEvent(clickEvent)
    comp._watcher.run()
    const childComp = comp.$refs.newToDoModal
    Vue.nextTick(() => {
      const originalLength = comp.$el.querySelectorAll('.uncompleted').length
      const testMsg = 'this is unit test'
      let firstTodo = comp.$el.querySelectorAll('.uncompleted')[0].textContent
      expect(firstTodo).not.to.contain(testMsg)
      childComp.$emit('AddNewToDo', {title: testMsg})
      Vue.nextTick(() => {
        firstTodo = comp.$el.querySelectorAll('.uncompleted')[0].textContent
        expect(comp.$el.querySelectorAll('.uncompleted').length).to.equal(originalLength + 1)
        expect(firstTodo).to.contain(testMsg)
        done()
      })
    })
  })
})
