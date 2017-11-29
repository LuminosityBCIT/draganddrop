import React from 'react';
import { Component, StyleSheet, Text, View, PanResponder, Animated, Easing, Dimensions } from 'react-native';

export default class App extends React.Component {
	  constructor(props){
        super(props);

        this.state = {
            showDraggable:true,
            dropZoneValues:null,
            pan:new Animated.ValueXY()
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onPanResponderMove:Animated.event([null,{
                dx:this.state.pan.x,
                dy:this.state.pan.y
            }]),
            onPanResponderRelease:(e, gesture) => {
                if(this.isDropZone(gesture)){
                    this.setState({
                        showDraggable:false
                    });
                }else{
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start();
                }
            }
        });
    }

    isDropZone(gesture){
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.x && gesture.moveX < dz.y + dz.width;
    }

    setDropZoneValues(event){
        this.setState({
            dropZoneValues:event.nativeEvent.layout
        });
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <View 
                    onLayout={this.setDropZoneValues.bind(this)}
                    style={styles.dropZone}>
                    <Text style={styles.text}>Folder</Text>
                </View>

                {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable(){
        if(this.state.showDraggable){
            return (
                
        
                    <View style={styles.draggableContainer0}>
                
                        <Animated.View 
                            {...this.panResponder.panHandlers}
                            style={[this.state.pan.getLayout(), styles.box0]}>
                            <Text style={styles.text}>Book Mark</Text>
                        </Animated.View>
        
                    </View>
        

    
        
            );

        }
    
    }
    
}




/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
*/
let styles = StyleSheet.create({
      mainContainer:{
          
          flexDirection: 'column'
                    },
      dropZone:{
          height:800,
          width:100,
          backgroundColor:'#2c3e50'
                },
      text:{
          marginTop:5,
          marginLeft:5,
          marginRight:5,
          textAlign:'center',
          color:'#fff'
        },
      draggableContainer0:{
          position:'absolute',
          top: "20%",
          left: "60%",
      },
      draggableContainer1:{
          position:'absolute',
          top: "20%",
          left: "40%",
      },
      box0:{
          backgroundColor:'#1abc9c',
          width:170,
          height:100,
         
      },  
      box1:{
          backgroundColor:'#ffbc42',
          width:170,
          height:100,
         
      }, 
  
  
  
});
