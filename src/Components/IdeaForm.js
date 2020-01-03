import React, { Component } from 'react';

export default class componentName extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         title: this.props.idea.title,
         body: this.props.idea.body,
         category: this.props.idea.category,

         
      };
    };

    handleInput=(e) => {
      this.props.resetNotification()
      this.setState({
          [e.target.name]: e.target.value
      })
      
    }


    handleChange = (e) => {
     this.setState({
       category: e.target.value
     })
    }
    

    handleBlur = () => {
      // console.log('state cat', this.state.category)
      // console.log('catID',this.props.category)//.indexOf(this.stage.category))
//      console.log('cats',this.props.category.find(cat => cat.urgent === this.state.category).id)
      // console.log('catID',this.props.category)//.indexOf(this.stage.category))
      // console.log('state cat', this.state.category)
        const idea = {
            title: this.state.title,
            body: this.state.body,
            category_id: this.props.category.find(cat => cat.urgent === this.state.category).id,
            user_id: 1
        }

        try{
          fetch(`http://localhost:3001/ideas/${this.props.idea.id}`, {
          method:'PUT',
         headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
         },
         body: JSON.stringify({
        idea: idea
          })
        })
        .then(resp => resp.json())
        .then(ideaObj => {
          let updatedIdeaObj = Object.assign({}, ideaObj, {'category' : this.props.category[idea.category_id -1].urgent})
          this.props.updateIdea(updatedIdeaObj)
          // console.log('updatedIdeaObj',updatedIdeaObj)
        })
        }catch(e){
          console.log(e)
        }
        
    }


    handleCheck=(e) => {
      // console.log('Before set state line: 89',this.state.category)
     
      this.setState({
        category: !this.state.category
      })
      
      console.log('after set state line: 94',this.state.category)
      // console.log(e.target.name);
      
    }
    
    

    
    
    
  render() {
    // console.log('this.props.idea.category',this.props.idea.category)
    
    return (
    <div className="ideatile ideamovetile">
        <form onBlur={this.handleBlur} >
            <input className="input" type="text" name="title" placeholder="Enter a title.." value={this.state.title} onChange={this.handleInput} ref={this.props.titleRef}></input>
            <textarea className="input" type="text" name="body" placeholder="Decribe your idea.." value={this.state.body} onChange={this.handleInput} ></textarea>
        
            <label>
              Urgent:<input type="checkbox" name="category" value={this.state.category} onClick={this.handleCheck} defaultChecked={this.state.category === true ? true : false}></input>
            </label>

            
              
        </form>

    </div>
    )
  }
}
