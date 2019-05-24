import React, { Component } from 'react';
import {Navigation} from 'react-native-navigation';
import { View, Text, Button, StyleSheet,ScrollView,Image,Keyboard,ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions/index';
import PickImage from '../../components/PickImage/PickImage';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/headingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';
import { startAddPlace } from "../../store/actions/index";

class SharePlaceScreen extends Component {
  
  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    });
  };

    componentDidUpdate() {
      if(this.props.placeAdded){
        Navigation.mergeOptions(this.props.componentId, {
          bottomTabs: {
            currentTabIndex: 0
          }
        });
         this.props.onStartAddPlace();
      }
    }
      
    componentDidMount() {
        this.isSideDrawerVisible = false;
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }
    
    componentWillUnmount() {
        // Not mandatory
        if (this.navigationEventListener) {
          this.navigationEventListener.remove();
        }
    }

    navigationButtonPressed({ buttonId }) {
            if (buttonId === "sharebtn") {
              this.props.onStartAddPlace();
            (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
            Navigation.mergeOptions(this.props.componentId, {
             sideMenu: {
               left: {
                 visible: this.isSideDrawerVisible,
               }
             }
           });
          }
    }

         
    placeNameChangedHandler = val => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            placeName: {
              ...prevState.controls.placeName,
              value: val,
              valid: validate(val, prevState.controls.placeName.validationRules),
              touched: true
            }
          }
        };
      });
    };
  
    locationPickedHandler = location => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            location: {
              value: location,
              valid: true
            }
          }
        };
      });
    };
  
    imagePickedHandler = image => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            image: {
              value: image,
              valid: true
            }
          }
        };
      });
    };
  
    placeAddedHandler = () => {
      this.props.onAddPlace(
        this.state.controls.placeName.value,
        this.state.controls.location.value,
        this.state.controls.image.value
      );
      this.reset();
      this.imagePicker.reset();
      this.locationPicker.reset();
      // this.props.navigator.switchToTab({tabIndex: 0});
    };
  
    render() {
      let submitButton = (
        <Button
          title="Share the Place!"
          onPress={this.placeAddedHandler}
          disabled={
            !this.state.controls.placeName.valid ||
            !this.state.controls.location.valid ||
            !this.state.controls.image.valid
          }
        />
      );
  
      if (this.props.isLoading) {
        submitButton = <ActivityIndicator />;
      }
  
      return (
        <ScrollView>
          <View style={styles.container}>
            <MainText>
              <HeadingText>Share a Place with us!</HeadingText>
            </MainText>
            <PickImage
              onImagePicked={this.imagePickedHandler}
              ref={ref => (this.imagePicker = ref)}
            />
            <PickLocation
              onLocationPick={this.locationPickedHandler}
              ref={ref => (this.locationPicker = ref)}
            />
            <PlaceInput
              placeData={this.state.controls.placeName}
              onChangeText={this.placeNameChangedHandler}
            />
            <View style={styles.button}>{submitButton}</View>
          </View>
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
    },
    button: {
      margin: 8
    },
    previewImage: {
      width: "100%",
      height: "100%"
    }
  });
  
  const mapStateToProps = state => {
    return {
      isLoading: state.ui.isLoading,
      placeAdded: state.places.placeAdded
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onAddPlace: (placeName, location, image) =>
        dispatch(addPlace(placeName, location, image)),
      onStartAddPlace: () => dispatch(startAddPlace())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
  