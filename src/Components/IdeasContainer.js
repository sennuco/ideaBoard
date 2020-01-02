import React, { Component } from 'react';
import Idea from './Idea.js'
import update from 'immutability-helper'
import IdeaForm from './IdeaForm'
import {Link} from 'react-router-dom'
//import Login from './Components/Login'

class IdeasContainer extends Component {
    state={
        ideas: [],
        editingIdeaId: null,
        notification: '',
        category: [],
        sortedDesc: true,
        filterIdeas: true,
        filteredIdeas: [],
        user: this.props.user
    }

    async componentDidMount(){

        try{

            const catResponse = await fetch(`http://localhost:3001/categories`)
            const categoryObj = await catResponse.json()
            // console.log(categoryObj)


            const ideaResponse = await fetch(`http://localhost:3001/ideas`)
            const ideaArray  = await ideaResponse.json()
            const updatedIdeaArray = ideaArray.map((idea) => {
     
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
     idea: {title: 'default', body: 'default', user_id:1 ,category_id: 1}
      })
    })
    .then(resp => resp.json())
    .then(response => {
        console.log('ress',response);
        let updatedIdeaObj = Object.assign({}, response, {'category' : this.state.category[response.category_id -1].urgent})

        const ideas = update(this.state.ideas, {
            $splice: [[0, 0, updatedIdeaObj]]
          })
        console.log('ideas', ideas)
          this.setState({ideas: ideas})

    })
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
    

    sortIdea = () => {

        this.setState({sortedDesc: !this.state.sortedDesc})
         let sortedIdeas = []
        if(this.state.sortedDesc !== true)
            sortedIdeas = this.state.ideas.sort((idea1, idea2) => idea2.category_id - idea1.category_id)
        else
            sortedIdeas = this.state.ideas.sort((idea1, idea2) => idea1.category_id - idea2.category_id)

      this.setState({
          ideas: sortedIdeas
      })
     
    }

    filterIdea = () => {
        //toggle the filter button (the state has the value)
        this.setState({filterIdeas: !this.state.filterIdeas})

        //Only get the idea if it's category_id is 2
        let filteredIdeas = this.state.ideas.filter(idea => idea.category_id === 2)
        
        //add the new filtered ideas to the state
        this.setState({filteredIdeas: filteredIdeas})
    }

 
    renderIdeas(){
        return(
            <div>

                {this.state.filterIdeas ? this.state.ideas.map((idea) => {
                    if (this.state.editingIdeaId === idea.id){
                        // console.log('editingIdeaId:',this.state.editingIdeaId);
                        return (<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} resetNotification={this.resetNotification}  titleRef= {input => this.title = input} category={this.state.category} />
                  )} else{
                      return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing}  onDelete={this.deleteIdea}   />)
                  }
                }) : this.state.filteredIdeas.map((idea) => {
                    if (this.state.editingIdeaId === idea.id){
                        return (<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} resetNotification={this.resetNotification}  titleRef= {input => this.title = input} category={this.state.category} />
                  )} else{
                      return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing}  onDelete={this.deleteIdea}   />)
                  }
                })
        
                }

            </div>
        )
    }
    


    render() {
        console.log('user idea',this.state.user);
        
        return (
            <div>
                <div>
                <button className="newIdeaButton" onClick={this.addNewIdea}>
                    New Idea
                </button> 

                <button className="filterIdeas button is-info" onClick={this.filterIdea}>
                Toggle Filter
                </button>

                <button className="button is-primary" onClick={this.sortIdea}>
                Toggle Sort
                </button>

                </div>
                <span className="notification">
                {this.state.notification}
                </span>
                
                
                {Object.keys(this.state.user).length !== 0
                    ? this.renderIdeas() : <Link to='/login'>'Yall need to sign in'</Link>}

            </div>
         
        );
    }
}

export default IdeasContainer;