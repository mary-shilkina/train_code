const {Schema, model} = require('mongoose')

const userSchema = new Schema({
name:{
     type:String,
     required:true
   },
email:{
     type: String,
     required:true
   },
   password: {
    type: String,
    required: true
  },
number:{
    type: Number,
    required:true
},
card:{
  items:[
    {
      count:{
          type:Number,
          required:true,
          default:1
      },
      courseId:{
        type:Schema.Types.ObjectId,
        ref:'Course',
        required:true
        
      }

  }
]
}
  
})

userSchema.methods.addToCard = function (course){
  const items=[...this.card.items];
  const idx = items.findIndex(c=>{
    return c.courseId.toString()===course._id.toString()
  })

  if(idx >=0){
    items[idx].count=items[idx].count +1 
  } else{
    items.push({
      courseId:course._id,
      count:1  
    })
  }
this.card={items}
return this.save()
} 

userSchema.methods.removeFromCard = function(id) {
  let items = [...this.card.items]
  const idx = items.findIndex(c => c.courseId.toString() === id.toString())

  if (items[idx].count === 1) {
    items = items.filter(c => c.courseId.toString() !== id.toString())
  } else {
    items[idx].count--
  }

  this.card = {items}
  return this.save()
}
userSchema.methods.clearCard = function(){
  this.card ={items:[]}
  return this.save()
}
module.exports = model('User', userSchema)