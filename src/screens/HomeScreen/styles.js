import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    ratingInput: {
        width: 70,
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 0,
        marginRight: 5
    },
    addButton: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    addButtonText: {
        color: 'white',
        fontSize: 16
    },
    dateContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateBackground: {
        flexDirection: 'row',
        height: 47,
        borderRadius: 25,
        backgroundColor: '#788eec',
        width: 230,
        alignItems: "center",
        justifyContent: 'center'
    },
    selectedDateButton: {
        height: 47,
        borderRadius: 5,
        width: 110,
        alignItems: "center",
        justifyContent: 'center'
    },
    selectedDateButtonText: {
        color: 'white',
        fontSize: 16
    },
    dateArrowButton: {
        height: 47,
        borderRadius: 25,
        backgroundColor: '#A6B7FF',
        width: 60,
        alignItems: "center",
        justifyContent: 'center'
    },
    dateArrowButtonText: {
        color: 'white',
        fontSize: 16
    },
    editDateContainer: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    reflectionContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    reflectionText: {
        fontSize: 20,
        color: '#333333'
    }
})