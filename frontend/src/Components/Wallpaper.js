import React from 'react'
import '../Styles/Wallpaper.css'
import homepageimg from '../assets/homepageimg.png'
import {NavLink} from 'react-router-dom'


 class Wallpaper extends React.Component {

  constructor(){
      super()
      //console.log(" wallpaper constructor getting called...")
      this.state={
          locations:[],
          restaurants:[]
      }

    }



    componentDidMount(){
        
        //call my api 
        fetch('http://localhost:7878/zomato/locations',{method:'GET'})
        .then(response=>response.json())
        .then(data=> this.setState({locations:data.data}))
  
    }  

   
    fetchRestaurants = (event)=>{
        fetch(`http://localhost:7878/zomato/restaurants/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=> {this.setState({restaurants:data.data});console.log(data.data)})

        
    
    }

    render() {
        
        let locationOptions= this.state.locations.length && this.state.locations.map((item)=><option key={item.name} value={item.city_id}>{item.name}</option>) 
        let restaurantsList= this.state.restaurants.length && <ul>{
                             this.state.restaurants.map((item) => 
                                <li key={item.name} ><NavLink to={`/restaurantDetails/${item.name}`}> {item.name} </NavLink></li>)
                                  }</ul>
        return (
            <div>
                <div className='wallpaper-page'>
                <img src={homepageimg} width='100%' height='450' />
                <div className="logo">
                    <h1>e!</h1>
                </div>
                <div className="headings">
                    Find the best restaurants, cafes, bars 
                        </div>
                <div className="locationSelector">
                    <select className="locationDropdown" onChange={this.fetchRestaurants}>
                       <option value="0">Select</option>
                       {locationOptions}
                    </select>
                    <div id="notebooks" >
                        <input className="restaurantsinput" type="text" placeholder="Search Restaurant" onChange={this.fetchRestaurants}  />
                        {restaurantsList}
                    </div>
                   
                </div>
            </div >
            </div>
        )


      
    }
}
export default Wallpaper