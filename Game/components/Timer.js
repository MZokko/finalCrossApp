import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = { countTimer: 0 };
    }

    render() {
        const countTimer = 0;
        return (
            <Text>timer : {this.state.countTimer}</Text>
        );
    }

    componentDidMount() {

        //console.log('====my timer====',myTimer,'\n===count timer====',this.state.countTimer);
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                countTimer: prevState.countTimer + 1,
                // myTimer:countTimer
            }));
        }, 1000);
    }
    componentWillUnmount() {
        //console.log('====DEATH===','\n====my timer====',myTimer,'\n=====prev stat==',this.state.prevState,'\n===count timer====',this.state.countTimer);
        this.props.setTime(this.state.countTimer);//-------------------------------
        clearInterval(this.myInterval);
    }


}
export default Timer;