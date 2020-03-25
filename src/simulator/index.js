import css from './index.css';
import React, { Component, Fragment } from 'react';
import Data from '../utils/data';
import { Line } from 'react-chartjs-2';
import RippleManager from '../ripple';

export default class Simulator extends Component {

    constructor(props) {
        super(props);

        //closeContactChance
        //closeContactSize
        //farContactChance

        this.state = {
            sickPeople: []
        }

        this.spreadRates = [];

        this.sickPeople = [];
        this.fccs = [];
        this.population = [];
    }

    componentDidMount() {
        this.runSimulation();
    }

    componentDidUpdate() {
        //this.runSimulation();
    }

    runSimulation() {
        this.setState({
            simulating: true,
            sickPeople: []
        }, () => {
            var init = this.props.initialInfections;
            if (this.props.realData.length > 0) {
                for (var i = 0; i < this.props.realData[0].data.length; i++) {
                    if (this.props.realData[0].data[i] > this.props.initialInfections) {
                        init = this.props.realData[0].data[i];
                        break;
                    }
                }
            }
            this.sickPeople = [init];
            this.population = [];
            this.fccs = [];
            for (var i = 0; i < this.props.populationSize; i++) {
                this.population.push(new Person(i, this.props.closeContactSize));
            }
            var avgDiff = null;
            for (var i = 0; i < init; i++) {
                var index = Math.floor(Math.random() * this.props.populationSize);
                while (this.population[index].state == PERSON_STATE_NEWLY_SICK) {
                    index = Math.floor(Math.random() * this.props.populationSize);
                }
                this.population[index].state = PERSON_STATE_SICK;
            }
            for (var i = 0; i < this.props.simulateForDays; i++) {
                if (this.props.realData != null && this.props.realData.length != 0 && i + 1 < this.props.realData[0].data.length) {
                    this.simulateDay(i, this.fccs.length > 0 ? this.fccs[this.fccs.length - 1] : this.props.farContactChance, this.props.closeContactChance, this.props.realData[0].data[i + 1]);
                }
                else if (this.fccs.length > 0) {
                    if (avgDiff == null) {
                        var diffs = [];
                        for (var j = 0; j < this.fccs.length - 1; j++) {
                            diffs.push(this.fccs[j + 1] / this.fccs[j]);
                        }
                        if (diffs.length > 0) {
                            avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
                        }
                    }
                    this.simulateDay(i, /*this.fccs.reduce((a, b) => a + b, 0) / this.fccs.length*/this.fccs[this.fccs.length - 1] * avgDiff, this.props.closeContactChance, null);
                    if (avgDiff != null) {
                        this.fccs.push(this.fccs[this.fccs.length - 1] * avgDiff);
                    }
                }
                else {
                    this.simulateDay(i, this.props.farContactChance, this.props.closeContactChance, null);
                }
            }
            this.setState({
                simulating: false,
                sickPeople: this.sickPeople
            });
            console.log("Final FCCs");
            console.log(this.fccs);
        })
    }

    simulateDay(i, fcc, ccc, expectation) {
        console.log("Simulation for day " + i);
        console.log(this.sickPeople);
        var baseFcc = fcc;
        var simulationObject = this.simulationTick(i, baseFcc, ccc);
        if (expectation != null) {
            while (simulationObject.sickPeople != expectation) {
                console.log("Prediction: " + simulationObject.sickPeople);
                console.log("Reality: " + expectation);
                if (simulationObject.sickPeople > expectation) {
                    console.log("FCC DOWN");
                    baseFcc -= 0.0000005;
                }
                else if (simulationObject.sickPeople < expectation) {
                    console.log("FCC UP");
                    baseFcc += 0.0000005;
                }
                simulationObject = this.simulationTick(i, baseFcc, ccc);
            }
        }
        this.sickPeople.push(simulationObject.sickPeople);
        if (expectation != null) {
            this.fccs.push(baseFcc);
        }
        this.population = simulationObject.populationCopy.map(p => JSON.parse(JSON.stringify(p)));
        for (var i = 0; i < this.props.populationSize; i++) {
            if (this.population[i].state == PERSON_STATE_NEWLY_SICK) {
                this.population[i].state = PERSON_STATE_SICK;
            }
        }
    }

    simulationTick(dayIndex, fcc, ccc) {
        console.log("Tick start (" + dayIndex + ")");
        this.populationCopy = this.population.map(p => JSON.parse(JSON.stringify(p)));
        var sickPeople = this.sickPeople[this.sickPeople.length - 1];
        if (isNaN(sickPeople)) sickPeople = 0;
        console.log("Tick first loop");
        for (var i = 0; i < this.props.populationSize; i++) {
            var p = this.populationCopy[i];
            if (p.state == PERSON_STATE_SICK) {
                /*for (var j = 0; j < this.props.closeContactSize; j++) {
                    if (Math.random() < ccc) {
                        if (p.indexInUnit - j != 0 && this.populationCopy[i - p.indexInUnit + j] != null) {
                            this.populationCopy[i - p.indexInUnit + j].state = PERSON_STATE_NEWLY_SICK;
                            sickPeople ++;
                        }
                    }
                }*/
                for (var j = 0; j < this.props.populationSize; j++) {
                    if (Math.random() < fcc) {
                        //if (p.unit != this.populationCopy[j].unit) {
                            if (this.populationCopy[j].state == PERSON_STATE_HEALTHY) {
                                this.populationCopy[j].state = PERSON_STATE_NEWLY_SICK;
                                sickPeople ++;
                            }
                        //}
                    }
                }
            }
        }
        console.log("Tick end");
        return { sickPeople, populationCopy: this.populationCopy };
    }

    render() {
        console.log(this.props);
        var labels = [...Array(this.props.simulateForDays ? this.props.simulateForDays : this.props.realData.length > 0 ? this.props.realData[0].data.length : 0).keys()]
        return (
            <Fragment>
                <button onClick={() => {this.runSimulation()}}>Re-run simulation</button>
                {
                    this.state.simulating ? (
                        <p>Simulating...</p>
                    ) : null
                }
                <Line data={{ 
                    labels,
                    datasets: this.props.realData.concat([{ 
                        data: this.state.sickPeople,
                        label: "Simulation",
                        backgroundColor: "rgba(0,0,0,0)",
                        borderColor: "rgba(0, 0, 255, 1)"
                    }])
                }} options={{
                    animation: { duration: 300 },
                    elements: {
                        line: {
                            tension: 0.1
                        }
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Infections"
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Days"
                            }
                        }]
                    }
                }} />
            </Fragment>
        )
    }

}

class Person {

    constructor(index, unitSize, ageGroup) {
        this.state = PERSON_STATE_HEALTHY;
        this.index = index;
        this.unit = Math.floor(index / unitSize);
        this.indexInUnit = index % unitSize;
        this.ageGroup = ageGroup;
    }

}

const PERSON_STATE_HEALTHY = 0;
const PERSON_STATE_NEWLY_SICK = 1;
const PERSON_STATE_SICK = 2;
const PERSON_STATE_RECOVERED = 3;
const PERSON_STATE_DEAD = 4;

//age 0 - 9
const AGE_GROUP_CHILD = 0;
//age 10 - 39
const AGE_GROUP_YOUNG = 1;
//age 40 - 69
const AGE_GROUP_MID = 2;
//age 70 - infinity
const AGE_GROUP_OLD = 3;