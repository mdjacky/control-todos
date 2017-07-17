import Vue from 'vue'
import Todo from '@/components/Todo'
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
  it(`should split todos request into todoList and completeList`, done => {
    const Constructor = Vue.extend(Todo)
    const comp = new Constructor().$mount()
    comp.userId = 1
    Vue.nextTick(() => {
      expect(comp.todoList.length).to.equal(2)
      expect(comp.completeList.length).to.equal(2)
      expect(comp.todoList[0].id).to.equal(1)
      expect(comp.todoList[1].id).to.equal(2)
      expect(comp.completeList[0].id).to.equal(19)
      expect(comp.completeList[1].id).to.equal(20)
      done()
    })
  })
  it(`should move to completeList when complete a todo task`, done => {
    const Constructor = Vue.extend(Todo)
    const comp = new Constructor().$mount()
    comp.userId = 1
    Vue.nextTick(() => {
      Vue.nextTick(() => {
        const todoLengthBefore = comp.todoList.length
        const completeLengthBefore = comp.completeList.length
        const title = comp.todoList[0].title
        expect(comp.$el.querySelector('#todoTaskLabel-0').textContent).to.contain(title)
        expect(comp.$el.querySelector('#completedTaskLabel-0').textContent).not.to.contain(title)
        const checkbox = comp.$el.querySelector('#todoTaskInput-0')
        const clickEvent = new window.Event('click')
        checkbox.dispatchEvent(clickEvent)
        comp._watcher.run()
        Vue.nextTick(() => {
          // Wait for transition to finish
          setTimeout(() => {
            expect(comp.todoList.length).to.equal(todoLengthBefore - 1)
            expect(comp.completeList.length).to.equal(completeLengthBefore + 1)
            expect(comp.$el.querySelector('#todoTaskLabel-0').textContent).not.to.contain(title)
            expect(comp.$el.querySelector('#completedTaskLabel-0').textContent).to.contain(title)
            done()
          }, 800)
        })
      })
    })
  })

  it(`should move to todoList when click a completed task`, done => {
    const Constructor = Vue.extend(Todo)
    const comp = new Constructor().$mount()
    comp.userId = 1
    Vue.nextTick(() => {
      Vue.nextTick(() => {
        const todoLengthBefore = comp.todoList.length
        const completeLengthBefore = comp.completeList.length
        const title = comp.completeList[0].title
        expect(comp.$el.querySelector('#completedTaskLabel-0').textContent).to.contain(title)
        expect(comp.$el.querySelector('#todoTaskLabel-0').textContent).not.to.contain(title)
        const checkbox = comp.$el.querySelector('#completedTaskLabel-0')
        const clickEvent = new window.Event('click')
        checkbox.dispatchEvent(clickEvent)
        comp._watcher.run()
        Vue.nextTick(() => {
          // Wait for transition to finish
          setTimeout(() => {
            expect(comp.completeList.length).to.equal(completeLengthBefore - 1)
            expect(comp.todoList.length).to.equal(todoLengthBefore + 1)
            expect(comp.$el.querySelector('#completedTaskLabel-0').textContent).not.to.contain(title)
            expect(comp.$el.querySelector('#todoTaskLabel-0').textContent).to.contain(title)
            done()
          }, 800)
        })
      })
    })
  })
})
