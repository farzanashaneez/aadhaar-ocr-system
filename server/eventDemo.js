import event from 'events'

const myevent=new event();
myevent.on('greet',(name)=>{
    console.log('hai ',name)
})
myevent.emit('greet','farzana')