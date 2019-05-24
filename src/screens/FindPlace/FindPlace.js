import React, { Component } from 'react';
import {Navigation} from 'react-native-navigation';
import { View, Text, Button, StyleSheet,TouchableOpacity,Animated } from 'react-native';
import {connect} from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import {getPlaces} from '../../store/actions/index';

class FindPlaceScreen extends Component {
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  }

    componentDidMount() {
      
        this.navigationEventListener = Navigation.events().bindComponent(this);
        this.props.onLoadPlaces();
      }
    
      componentWillUnmount() {
        // Not mandatory
        if (this.navigationEventListener) {
          this.navigationEventListener.remove();
        }
      }

      navigationButtonPressed({ buttonId }) {
        this.props.onLoadPlaces();  
        if (buttonId === "findbtn") {
          (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false;
            Navigation.mergeOptions(this.props.componentId, {
             sideMenu: {
               left: {
                 visible: this.isSideDrawerVisible,
               }
             }
           });
          }
         }



     onItemSelectedHandler = key => {
         const selPlace = this.props.places.find(place => {
            return place.key === key});
        Navigation.push(this.props.componentId, {
            component: {
              name: 'basics.PlaceDetails',
              passProps: {
                selectedPlace: selPlace
              },
              options: {
                
                topBar: { 
                  title: {
                    text: selPlace.name,
                    alignment:"center"
                  },
                }
              }
            }
          });
     }

     placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim,{
          toValue:1,
          duration:500,
          useNativeDriver:true
        }).start();
    }
  
    placesSearchHandler = () => {
      Animated.timing(this.state.removeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        this.setState({
          placesLoaded: true
        });
        this.placesLoadedHandler();
      });
    };
    
    render () {
      
      let content = (
        <Animated.View style={{opacity: this.state.removeAnim,
          transform: [
            {   
              //if i remove interpolate part thn it will shrink instead
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}>
          
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
        </Animated.View>
      );
      

      if(this.state.placesLoaded){
        content = (
          <Animated.View style={{
            opacity: this.state.placesAnim
          }}>
          <PlaceList places={this.props.places} onItemSelected={this.onItemSelectedHandler}/>
          </Animated.View>
        );
      }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
              {content}
            </View>
        );
    }
}


const styles = StyleSheet.create({
   buttonContainer:{
     flex:1,
    justifyContent:"center",
    alignItems:"center"
   },
  searchButton: {
        borderRadius:52,
        borderColor:"skyblue",
        borderWidth: 3,
        padding:20
    },
    searchButtonText:{
      color:"skyblue",
      fontWeight: "bold",
      fontSize:26
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

const mapDispatchToProps = dispatch =>{
  return{
    onLoadPlaces: () => dispatch(getPlaces())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(FindPlaceScreen);