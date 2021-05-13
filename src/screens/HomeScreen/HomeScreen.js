import React, { useEffect, useState, useRef } from 'react'
import { Keyboard, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'


export default function HomeScreen(props) {
    
    const formatDate = (date) => {
        var tempDate = new Date(date)
        return (tempDate.getMonth()+1)+'/'+tempDate.getDate()+'/'+tempDate.getFullYear()
    }
    
    const [reflectionText, setReflectionText] = useState('')
    const [reflectionRating, setReflectionRating] = useState('')
    const [reflections, setReflections] = useState([])

    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [formattedSelectedDate, setFormattedSelectedDate] = useState(formatDate(currentDate))
    const [monthInput, setMonthInput] = useState(1)
    const [dayInput, setDayInput] = useState(1)
    const [yearInput, setYearInput] = useState(2000)
    const [editDateInput, setEditDateInput] = useState(true)

    var monthInputRef = useRef()
    var dayInputRef = useRef()
    var yearInputRef = useRef()

    const reflectionRef = firebase.firestore().collection('reflections')
    const userID = props.extraData.id

    useEffect(() => {
        const unsub = reflectionRef
            .where("authorID", "==", userID)
            .where("createdAt", "==", formattedSelectedDate)
            .orderBy('rating', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newReflections = []
                    querySnapshot.forEach(doc => {
                        const reflection = doc.data()
                        reflection.id = doc.id
                        newReflections.push(reflection)
                    });
                    setReflections(newReflections)
                },
                error => {
                    console.log(error)
                }
            )

        return () => {
            unsub()
        }
    }, [formattedSelectedDate])

    const onAddButtonPress = () => {
        if (reflectionText && reflectionText.length > 0) {
            const rating = typeof(reflectionRating) !== 'undefined' ? reflectionRating : "0"
            const data = {
                text: reflectionText,
                rating: Number(rating),
                authorID: userID,
                createdAt: formattedSelectedDate,
            };
            reflectionRef
                .add(data)
                .then(_doc => {
                    setReflectionText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const updateEditDateInput = () => {
        setEditDateInput(!editDateInput)
    }

    const monthInputChange = (value) => {
        setMonthInput(value)
    }

    const dayInputChange = (value) => {
        setDayInput(value)
    }

    const yearInputChange = (value) => {
        setYearInput(value)
    }

    const submitDateInputChange = () => {
        var newDate = new Date(yearInput + "-" + monthInput + "-" + dayInput)
        setSelectedDate(newDate)
        setFormattedSelectedDate(formatDate(newDate))
    }

    const dateDecreaseButtonPress = () => {
        changeDate(-1)
    }

    const dateIncreaseButtonPress = () => {
        changeDate(1)
    }

    const changeDate = (changeValue) =>
    {
        var temp = new Date(selectedDate)
        temp.setDate(temp.getDate() + changeValue)
        setEditDateInput(true)
        setSelectedDate(temp)
        setFormattedSelectedDate(formatDate(temp))
    }


    const renderReflection = ({item, index}) => {
      return (
          <View style={styles.reflectionContainer}>
              <Text style={styles.reflectionText}>
                  {item.rating}. {item.text}
              </Text>
          </View>
        )
    }

        
        return (
          <View style={styles.container}>
            <View style={styles.dateContainer}>
                <TouchableOpacity style={styles.dateBackground}>

                    <TouchableOpacity style={styles.dateArrowButton} onPress={dateDecreaseButtonPress}>
                        <Text style={styles.dateArrowButtonText}> {'<'} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.selectedDateButton} onPress={updateEditDateInput}>
                    { editDateInput ? (
                        <Text style={styles.selectedDateButtonText}>
                            {formattedSelectedDate}
                        </Text>
                        ) : (
                        <View style={styles.editDateContainer}>

                            <TextInput 
                                autoFocus={true}
                                ref={input => {monthInputRef = input}}
                                maxLength= {2}
                                keyboardType="numeric" 
                                placeholder="1"
                                returnKeyType="done"    
                                style={styles.selectedDateButtonText} 
                                onChangeText={monthInputChange} 
                                blurOnSubmit={false}
                                onSubmitEditing={() => dayInputRef.focus()}
                                />
                            <Text style={styles.selectedDateButtonText}>/</Text>
                            <TextInput 
                                ref={input => {dayInputRef = input}}
                                maxLength= {2}
                                keyboardType="numeric" 
                                placeholder="1" 
                                returnKeyType="done" 
                                style={styles.selectedDateButtonText} 
                                onChangeText={dayInputChange} 
                                blurOnSubmit={false}
                                onSubmitEditing={() => yearInputRef.focus()}
                                />
                            <Text style={styles.selectedDateButtonText}>/</Text>
                            <TextInput 
                                ref={input => {yearInputRef = input}}
                                maxLength= {4}
                                keyboardType="numeric" 
                                placeholder="2020"
                                returnKeyType="done"    
                                style={styles.selectedDateButtonText} 
                                onChangeText={yearInputChange} 
                                onSubmitEditing={submitDateInputChange}
                                />
                        </View>
                    )

                    }
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dateArrowButton} onPress={dateIncreaseButtonPress}>
                        <Text style={styles.dateArrowButtonText}> {'>'} </Text>
                    </TouchableOpacity>
            
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                style={styles.ratingInput}
                    placeholder='Rating'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setReflectionRating(text)}
                    value={reflectionRating}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    clearTextOnFocus={true}
                    keyboardType="number-pad"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Reflection'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setReflectionText(text)}
                    value={reflectionText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.addButton} onPress={onAddButtonPress}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            { reflections && (
                <View style={styles.listContainer}>
                    <FlatList
                      data={reflections}
                      renderItem={renderReflection}
                    />
                </View>
            )}
        </View>
    )
}
