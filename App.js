import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiYXNpYXRiZyIsImEiOiJjam01d2IzNzExMWdvM3ZtajFpN2pwNmdiIn0.z_dz7iB3oEsIi9_TkMmHqw');

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinate: [19.944544, 50.06667],
    };

    this.onPress = this.onPress.bind(this);
  }
  renderAnnotations (coordinate=[19.944544, 50.06667], txt='Look! It is Cracow!', ) {
    console.log("Some here!!!");
    console.log(txt);
    return (
      
      <MapboxGL.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={coordinate}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <MapboxGL.Callout title={txt} />
      </MapboxGL.PointAnnotation>
    )
  }
  async onPress(e) {
    console.log("Click");
    
    const coordinate = e.geometry.coordinates;
    console.log(coordinate);
    this.setState({ coordinate: coordinate });
    // console.log(this);
    const jsonPoint = await this._map.queryRenderedFeaturesAtPoint(coordinate);
    console.log(jsonPoint);
  }


  render() {
    return (
      <View style={styles.container}>
      
        <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={7}
            centerCoordinate={[19.944544, 50.06667]}
            onPress={this.onPress}
            showUserLocation={true}
            style={styles.container}>   
            { this.renderAnnotations(this.state.coordinate) }         
        </MapboxGL.MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // annotationContainer: {
  //   width: 30,
  //   height: 30,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  //   borderRadius: 15,
  // },
  // annotationFill: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 15,
  //   backgroundColor: 'black',
  //   transform: [{ scale: 0.6 }],
  // },

});