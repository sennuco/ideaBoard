import React, { Component } from 'react';
import Idea from './Idea.js'
import update from 'immutability-helper'
import IdeaForm from './IdeaForm'

class IdeasContainer extends Component {
    state={
        ideas: [],
        editingIdeaId: null,
        notification: '',
        category: []
    }

    async componentDidMount(){

        try{

            const catResponse = await fetch(`http://localhost:3001/categories`)
            const categoryObj = await catResponse.json()
            console.log(categoryObj)


            const ideaResponse = await fetch(`http://localhost:3001/ideas`)
            const ideaArray  = await ideaResponse.json()
            const updatedIdeaArray = ideaArray.map((idea) => {
            //  console.log(categoryObj[idea.category_id -1].urgent)
             return Object.assign({}, idea, {'category' : categoryObj[idea.category_id -1].urgent})
            }
            )
            this.setState({
                ideas: updatedIdeaArray
            })
            this.setState({
                category: categoryObj
            })
           
            
           
        }
        catch(error){
            console.log("There is an error.Fetch line 16, IdeasContainer.js");
        }
          
    }


   addNewIdea = () => {
    
    fetch(`http://localhost:3001/ideas`, {
    method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
     idea: {title: '', body: '', user_id:1 ,category_id: 1}
      })
    })
    .then(resp => resp.json())
    .then(response => console.log(response)
     )



    }


    updateIdea = (idea) => {
        const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
        const ideas = update(this.state.ideas, {[ideaIndex]: { $set: idea }})
        this.setState({
            ideas: ideas,
            notification: "All Changes Saved!"
        })
    
    }

    resetNotification = () => {
        this.setState({notification: ''})
    }


    enableEditing = (id) => {
        
        this.setState({editingIdeaId: id}, () => { this.title.focus() })
    }

    deleteIdea = (id) => {
      fetch(`http://localhost:3001/ideas/${id}`, {
        method:'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' 
           },
      }).then(json_resp => {
        const ideaIndex = this.state.ideas.findIndex(x => x.id === id)
        const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]]})
        this.setState({ideas: ideas})
      })
    }
    




    render() {
    //  console.log(this.state.category)
     
        return (
            <div>
                <button className="newIdeaButton" onClick={this.addNewIdea}>
                    New Idea
                </button> 
                <span className="notification">
                {this.state.notification}
                </span>
                            
                {this.state.ideas.map((idea) => {
                    if (this.state.editingIdeaId === idea.id){
                  return (<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} resetNotification={this.resetNotification}  titleRef= {input => this.title = input} category={this.state.category} />
                  )} else{
                      return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing}  onDelete={this.deleteIdea}   />)
                  }
                })
        
                }

            
                
                
                
            
                
                

            </div>
         
        );
    }
}

export default IdeasContainer;