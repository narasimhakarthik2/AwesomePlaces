import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
const startTabs = () => {


Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-map":"ios-map",30,"skyblue"),
    Icon.getImageSource(Platform.OS === "android" ? "md-share-alt":"ios-share-alt",30,"skyblue"),
    Icon.getImageSource(Platform.OS === "android" ? "md-menu":"ios-menu",30,"skyblue")
]).then(sources => {

    Navigation.setRoot({
        root: {

          sideMenu: {
            left: {
              stack:{
                id:'left_stack',
                children:[{
                  component: {
                    name: 'basics.SideDrawer',
                  }
                }]
              }

          },

          center: {
          bottomTabs: {
            children: [{
              stack: {
                children: [{

                    component: {
                    name: 'basics.FindPlaceScreen',
                    passProps: {
                    }
                  }
                }],
                options: {
                  bottomTab: {
                    text: 'Find Place',
                    icon: sources[0]
                  },

                  topBar: {
                    title: {
                      text: 'Find Place'
                    },
                  }
                }
              }
            },
            {
                stack: {
                    children: [{

                        component: {
                        name: 'basics.SharePlaceScreen',
                        passProps: {
                        }
                      }
                    }],
                    options: {
                      bottomTab: {
                        text: 'Share Place',
                        icon: sources[1]
                        },

                       topBar: {
                        title: {
                          text: 'Share Place',
                          alignment:"center"
                        },
                        leftButtons: [
                          {
                            id:'sharebtn',
                            icon: sources[2],
                            title: "Menu"
                          }
                        ]
                      }
                    }
                  }
            }]
          }
        },
          },
        },
      });

});
};

export default startTabs;
