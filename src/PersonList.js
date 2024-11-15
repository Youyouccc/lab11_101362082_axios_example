import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
    //define state default values
    state = {
      persons: []
    }
    //component lifecycle callback
    componentDidMount() {
      axios.get(`https://randomuser.me/api/?results=10`)
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      })
    }
    render() {
        return (
            <div className="person-list-container">
                {this.state.persons.map(person => {
                    // Define title based on gender
                    const title = person.gender === "female" ? (person.name.title === "Ms" ? "Ms" : "Mrs") : "Mr";
    
                    return (
                        <div className="person-card" key={person.login.uuid} >
                            <div className="person-code">
                                {`${title} ${person.name.first} ${person.name.last} - ${person.login.uuid}`}
                            </div>
                            <hr></hr>
                            <div className='person-pic'>
                                <img 
                                    src={person.picture.large} 
                                    alt={`${person.name.first} ${person.name.last}`} 
                                    className="person-image" 
                                />
                                <br></br>
                                <button className="details-button" onClick={() => alert('Details button is clicked!')}>
                                    Details
                                </button>
                            
                            </div>
                            
                            <div className="person-details">
                                <p>User Name:   <strong>{person.login.username}</strong></p>
                                <p>Gender:   {person.gender}</p>
                                <p>Time Zone Description:   {person.location.timezone.description}</p>
                                <p>Address:   {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country}</p>
                                <p>Email:   {person.email}</p>
                                <p>Birth Date and Age:   {new Date(person.dob.date).toLocaleDateString()} ({person.dob.age})</p>
                                <p>Register Date:   {new Date(person.registered.date).toLocaleDateString()}</p>
                                <p>Phone#:   {person.phone}</p>
                                <p>Cell#:   {person.cell}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }     
}
  
