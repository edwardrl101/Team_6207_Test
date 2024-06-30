import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, Platform } from 'react-native';
import {Picker} from "@react-native-picker/picker";

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

const createMinArray = length => {
    const arr = [];
    let i = 0;
    while(i <= length){
      arr.push(i.toString());
      i += 10;
    }
    return arr;
  }
  const createSecArray = length => {
    const arr = [];
    let i = 0;
    while(i < length){
      arr.push(i.toString());
      i += 1;
    }
    return arr;
  }

const AVAILABLE_MINUTES = createMinArray(120);
const AVAILABLE_SECONDS = createSecArray(60);

export default function Home() {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);
  const [selectedMins, setSelectedMins] = useState({"itemValue": "0"});
  const [selectedSecs, setSelectedSecs] = useState({"itemValue": "0"});
  let interval = null;

  useEffect(() => {
    interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(prevSecs => prevSecs - 1);
      }, 1000);
      getRemaining(remainingSecs);
      if(remainingSecs === 0) {
        endTimer();
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  const startTimer = () => {
    setRemainingSecs(parseInt((selectedMins.itemValue).toString(), 10) * 60 + parseInt((selectedSecs.itemValue).toString(), 30))
    setIsActive(true);
  } 

  const endTimer = () => {
    setRemainingSecs(0);
    setIsActive(false);

    clearInterval(interval);
    interval = null;
    setRemainingSecs(0);
    setIsActive(false);
  }

  return (

          <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {
            isActive ? (
              <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
            ) : (
                <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={selectedMins.itemValue}
                  onValueChange={itemValue => {
                    setSelectedMins({itemValue});
                  }}
                  mode="dropDown"
                > 
                  {
                    AVAILABLE_MINUTES.map(value => (
                      <Picker.Item key={value} label={value} value={value} />
                    ))
                  }
                </Picker>
                <Text style={styles.pickerItem}>minutes</Text>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={selectedSecs.itemValue}
                  onValueChange={itemValue => {
                    setSelectedSecs({itemValue});
                  }}
                  mode="dropDown"
                > 
                  {
                    AVAILABLE_SECONDS.map(value => (
                      <Picker.Item key={value} label={value} value={value} />
                    ))
                  }
                </Picker>
                <Text style={styles.pickerItem}>seconds</Text>
              </View>
            )
          }
          {
            isActive ? (
              <TouchableOpacity 
                onPress={endTimer}
                style={[styles.button, styles.buttonStop]}
                >
                  <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                onPress={startTimer}
                style={styles.button}
                >
                  <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            )
          }
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b2437',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderWidth: 10,
      borderColor: '#B9AAFF',
      width: screen.width / 2,
      height: screen.width / 2,
      borderRadius: screen.width / 2,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontSize: 45,
      color: '#B9AAFF'
  },
  timerText: {
      color: '#fff',
      fontSize: 90,
      marginBottom: 20
  },
  buttonReset: {
      marginTop: 20,
      borderColor: "#FF851B"
  },
  buttonTextReset: {
    color: "#FF851B"
  },

  buttonStop: {
    borderColor: "#FF851B"
  },

  buttonTextStop: {
    color: "#FF851B"
  },

  picker: {
    flex: 1,
    maxWidth: 100,
    ...Platform.select({
      android: {
        color: "#fff",
        backgroundColor: "rgba(92, 92, 92, 0.206)",
      }
    })
  },
  pickerItem: {
    color: "#fff",
    fontSize: 20,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      }
    })
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});