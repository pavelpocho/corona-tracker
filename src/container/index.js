import css from './index.css';
import React, { Component, Fragment } from 'react';
import Data from '../utils/data';
import { Line } from 'react-chartjs-2';

export class Container extends Component {

    constructor(props) {
        super(props);
        console.log("Something");
        this.data = new Data();
        this.state = {
            europeData: "",
            chinaData: "",
            italyData: "",
            spainData: "",
            germanyData: "",
            iranData: "",
            usData: "",
            franceData: "",
            sKoreaData: "",
            switzerlandData: "",
            ukData: "",
            netherlandsData: "",
            belgiumData: "",
            austriaData: "",
            norwayData: "",
            swedenData: "",
            denmarkData: "",
            portugalData: "",
            malaysiaData: "",
            canadaData: "",
            australiaData: "",
            brazilData: "",
            irelandData: "",
            greeceData: "",
            polandData: "",
            indonesiaData: "",
            philippinesData: "",
            hongkongData: "",
            iraqData: "",
            algeriaData: "",
            dataDisplay: [],
            deathDataDisplay: [],
            selectedCountries: [],
            minPeople: 0,
            maxDays: 100,
            mode: 0
        }

        this.europeDataContainer = React.createRef();
        this.chinaDataContainer = React.createRef();
        this.italyDataContainer = React.createRef();
        this.spainDataContainer = React.createRef();
        this.germanyDataContainer = React.createRef();
        this.iranDataContainer = React.createRef();
        this.usDataContainer = React.createRef();
        this.franceDataContainer = React.createRef();
        this.sKoreaDataContainer = React.createRef();
        this.switzerlandDataContainer = React.createRef();
        this.ukDataContainer = React.createRef();
        this.netherlandsDataContainer = React.createRef();
        this.belgiumDataContainer = React.createRef();
        this.austriaDataContainer = React.createRef();
        this.norwayDataContainer = React.createRef();
        this.swedenDataContainer = React.createRef();
        this.denmarkDataContainer = React.createRef();
        this.portugalDataContainer = React.createRef();
        this.malaysiaDataContainer = React.createRef();
        this.canadaDataContainer = React.createRef();
        this.australiaDataContainer = React.createRef();
        this.brazilDataContainer = React.createRef();
        this.irelandDataContainer = React.createRef();
        this.greeceDataContainer = React.createRef();
        this.polandDataContainer = React.createRef();
        this.indonesiaDataContainer = React.createRef();
        this.philippinesDataContainer = React.createRef();
        this.hongkongDataContainer = React.createRef();
        this.iraqDataContainer = React.createRef();
        this.algeriaDataContainer = React.createRef();

        this.display = React.createRef();

    }

    fixJson(text) {
        var startRemove = text.split("{")[0];
        var endRemove = text.split("}")[text.split("}").length - 1];
        var finalText = text.split(startRemove)[1].split(endRemove)[0];
        finalText = finalText.replace(/[\r\n]+/gm,"");
        finalText = finalText.replace(/</g, "&lt;");
        finalText = finalText.replace(/>/g, "&gt;");
        finalText = finalText.replace(/{ /g, "{ '");
        finalText = finalText.replace(/, /g, ", '");
        finalText = finalText.replace(/:/g, "':");
        finalText = finalText.replace(/'/g, '"');
        return finalText;
    }

    componentDidMount() {
        this.setState({
            deathDataDisplay: deathDataDisplay,
            dataDisplay: dataDisplay
        })
        return;
        this.data.getEuropeData((europeData) => {
            this.setState({
                europeData
            }, () => {
                var gotEuropeData = false;
                this.europeDataContainer.current.getElementsByClassName("tabbable-panel-cases")[1].parentElement.childNodes.forEach(el => {
                    if (el.tagName == "SCRIPT" && !gotEuropeData) {
                        var finalText = this.fixJson(el.innerHTML);                        
                        gotEuropeData = true;
                        console.log("World (excluding China)");
                        var finalData = JSON.parse(finalText);
                        this.setState(prevState => {
                            let dD = prevState.dataDisplay;
                            dD.push({
                                label: "World (excluding China)",
                                data: finalData["series"][0]["data"],
                                borderColor: "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + 1 + ")",
                                backgroundColor: "rgba(0,0,0,0)"
                            });
                            let newStateObj = {};
                            newStateObj["dataDisplay"] = dD;
                            return newStateObj;
                        }, () => {
                            //window.scrollTo(0, document.body.scrollHeight);
                        })
                    }
                });
            });
        });
        this.getCountryData("china", this.chinaDataContainer);
        this.getCountryData("italy", this.italyDataContainer);
        this.getCountryData("spain", this.spainDataContainer);
        this.getCountryData("germany", this.germanyDataContainer);
        this.setState(prevState => {
            let dD = prevState.dataDisplay;
            dD.push({
                label: "czechia",
                data: [3,3,5,5,8,19,26,32,38,63,94,116,141,189,298,383,450,560,765,889,995],
                borderColor: "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + 1 + ")",
                backgroundColor: "rgba(0,0,0,0)"
            });
            let newName = "czechiaData";
            let newStateObj = JSON.parse("{ \"" + newName + "\": \"\"}");
            newStateObj[name] = null;
            newStateObj["dataDisplay"] = dD;
            return newStateObj;
        });
        this.getCountryData("iran", this.iranDataContainer);
        this.getCountryData("us", this.usDataContainer);
        this.getCountryData("france", this.franceDataContainer);
        this.getCountryData("sKorea", this.sKoreaDataContainer);
        /*this.getCountryData("switzerland", this.switzerlandDataContainer);
        this.getCountryData("uk", this.ukDataContainer);
        this.getCountryData("netherlands", this.netherlandsDataContainer);
        this.getCountryData("belgium", this.belgiumDataContainer);
        this.getCountryData("austria", this.austriaDataContainer);
        this.getCountryData("norway", this.norwayDataContainer);
        this.getCountryData("sweden", this.swedenDataContainer);
        this.getCountryData("denmark", this.denmarkDataContainer);
        this.getCountryData("portugal", this.portugalDataContainer);
        this.getCountryData("malaysia", this.malaysiaDataContainer);
        this.getCountryData("canada", this.canadaDataContainer);
        this.getCountryData("australia", this.australiaDataContainer);
        this.getCountryData("brazil", this.brazilDataContainer);
        this.getCountryData("ireland", this.irelandDataContainer);
        this.getCountryData("greece", this.greeceDataContainer);
        this.getCountryData("poland", this.polandDataContainer);
        this.getCountryData("indonesia", this.indonesiaDataContainer);
        this.getCountryData("philippines", this.philippinesDataContainer);
        this.getCountryData("hongkong", this.hongkongDataContainer);
        this.getCountryData("iraq", this.iraqDataContainer);
        this.getCountryData("algeria", this.algeriaDataContainer);*/
    }

    getCountryData(country, dataContainer) {
        this.data.getCountryData(country, (data) => {
            let name = country + "Data";
            let stateObj = JSON.parse("{ \"" + name + "\": \"\"}");
            stateObj[name] = data;
            console.log(stateObj);
            this.setState(stateObj, () => {
                let gotData = false;
                let gotDeathData = false;
                if (dataContainer.current != null) {
                    dataContainer.current.getElementsByClassName("tabbable-panel-cases")[0].parentElement.childNodes.forEach(el => {
                        if (el.tagName == "SCRIPT" && !gotData) {
                            var finalText = this.fixJson(el.innerHTML);                        
                            gotData = true;
                            var finalData = JSON.parse(finalText);
                            this.setState(prevState => {
                                let dD = prevState.dataDisplay;
                                dD.push({
                                    label: country,
                                    // "       " - spaces for case series
                                    // "           " - spaces for case data
                                    // "           " - spaces for death series
                                    // "               " - spaces for death data
                                    data: finalData["       series"][0]["           data"],
                                    borderColor: "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + 1 + ")",
                                    backgroundColor: "rgba(0,0,0,0)"
                                });
                                return {
                                    dataDisplay: dD
                                };
                            });
                        }
                    });
                    dataContainer.current.getElementsByClassName("tabbable-panel-deaths")[0].parentElement.childNodes.forEach(el => {
                        if (el.tagName == "SCRIPT" && !gotDeathData) {
                            var finalText = this.fixJson(el.innerHTML);                        
                            gotDeathData = true;
                            var finalData = JSON.parse(finalText);
                            this.setState(prevState => {
                                let dDD = prevState.deathDataDisplay;
                                dDD.push({
                                    label: country,
                                    // "       " - spaces for case series
                                    // "           " - spaces for case data
                                    // "           " - spaces for death series
                                    // "               " - spaces for death data
                                    data: finalData["           series"][0]["               data"],
                                    borderColor: prevState.dataDisplay[prevState.deathDataDisplay.length].borderColor,
                                    backgroundColor: "rgba(0,0,0,0)"
                                });
                                let newName = country + "Data";
                                let newStateObj = JSON.parse("{ \"" + newName + "\": \"\"}");
                                newStateObj[name] = null;
                                newStateObj["deathDataDisplay"] = dDD;
                                return newStateObj;
                            });
                        }
                    });
                }
            });
        });
    }

    reverseSelectCountry(label) {
        this.setState(prevState => {
            let selectedCountries = prevState.selectedCountries;
            if (selectedCountries.includes(label)) {
                selectedCountries.splice(selectedCountries.indexOf(label), 1);
            }
            else {
                selectedCountries.push(label);
            }
            return {
                selectedCountries
            }
        })
    }

    setMinPeople(e) {
        console.log("Setting min people");
        console.log(e.target.value);
        this.setState({
            minPeople: e.target.value
        })
    }

    setMinPeopleKey(e) {
        if (e.keyCode == 46 || e.keyCode == 8) {
            this.setMinPeople(e);
        }
    }

    setMaxDays(e) {
        console.log("Setting max days");
        console.log(e.target.value);
        this.setState({
            maxDays: e.target.value
        })
    }

    setMaxDaysKey(e) {
        if (e.keyCode == 46 || e.keyCode == 8) {
            this.setMaxDays(e);
        }
    }

    setMode() {
        this.setState(prevState => {
            let selectedCountries = prevState.selectedCountries;
            if (prevState.mode == 0 && this.state.selectedCountries.includes("World (excluding China)")) {
                selectedCountries.splice(selectedCountries.indexOf("World (excluding China)"), 1);
            }
            return {
                selectedCountries,
                mode: prevState.mode == 0 ? 1 : 0                
            }
        })
    }

    statsToShow() {
        if (this.state.mode == 0) {
            return this.state.dataDisplay;
        }
        return this.state.deathDataDisplay;
    }

    render() {
        var dataToDisplay = [];
        for (var i = 0; i < this.statsToShow().length; i++) {
            if (this.state.selectedCountries.includes(this.statsToShow()[i].label)) {
                dataToDisplay.push({
                    label: this.statsToShow()[i].label,
                    data: this.statsToShow()[i].data.map(x => x),
                    borderColor: this.statsToShow()[i].borderColor,
                    backgroundColor: this.statsToShow()[i].backgroundColor
                });
                let d = dataToDisplay[dataToDisplay.length - 1].data;
                for (var k = 0; k < d.length; k++) {
                    if (d[k] <= this.state.minPeople) {
                        d.splice(k, 1);
                        k--;
                    }
                }
            }
        }

        console.log(this.state.deathDataDisplay);

        for (var i = 0; i < dataToDisplay.length; i++) {
            dataToDisplay[i].data = dataToDisplay[i].data.slice(0, Math.min(this.state.maxDays, dataToDisplay[i].data.length));
        }

        var maxLength = 0;
        dataToDisplay.forEach(d => {
            maxLength = Math.max(d.data.length, maxLength);
        })
        var labels = [...Array(maxLength).keys()]

        return (
            <Fragment>
                <div className={"app-container"}>
                    {
                        this.state.dataDisplay != null ? (
                            <div className="comparer">
                                <div className="country-list">
                                    <p>Select the statistic to track</p>
                                    <button onClick={() => {this.setMode()}}>{this.state.mode == 0 ? "Infections (Click to switch to deaths)" : "Deaths (Click to switch to infections)"}</button>
                                    <p>Select the number of {this.state.mode == 0 ? "infections" : "deaths"} to begin at</p>
                                    <input defaultValue={0} onKeyUp={(e) => {this.setMinPeopleKey(e)}} onChange={(e) => {this.setMinPeople(e)}} type="number" min={0} />
                                    <p>Select countries to compare</p>
                                    {
                                        this.state.dataDisplay.map((d, i) => {
                                            return (
                                                <button disabled={d.label == "World (excluding China)" && this.state.mode == 1} onClick={() => {this.reverseSelectCountry(d.label)}} key={i} className={"country-picker" + (this.state.selectedCountries.includes(d.label) ? " selected" : "")}>{d.label}</button>
                                            )
                                        })
                                    }
                                    <p>Select maximum number of days from beginning</p>
                                    <input defaultValue={100} onKeyUp={(e) => {this.setMaxDaysKey(e)}} onChange={(e) => {this.setMaxDays(e)}} type="number" min={2} />
                                </div>
                                <Line data={{ labels, datasets: dataToDisplay }} options={{ animation: { duration: 300 } }} />
                            </div>
                        ) : null
                    }
                    <div ref={this.display} id="real-data-container">
                        {
                            this.state.dataDisplay.map((d, i) => {
                                return (
                                    <div key={i} className="country-info">
                                        <h3>{d.label}:</h3>
                                        <p>{d.data.join(", ")}</p>
                                        <Line data={{ labels: [...Array(d.data.length).keys()], datasets: [{ label: d.label, data: d.data }] }} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    this.state.europeData ? (
                        <div ref={this.europeDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.europeData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.chinaData ? (
                        <div ref={this.chinaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.chinaData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.italyData ? (
                        <div ref={this.italyDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.italyData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.spainData ? (
                        <div ref={this.spainDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.spainData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.germanyData ? (
                        <div ref={this.germanyDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.germanyData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.iranData ? (
                        <div ref={this.iranDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.iranData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.usData ? (
                        <div ref={this.usDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.usData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.franceData ? (
                        <div ref={this.franceDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.franceData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.sKoreaData ? (
                        <div ref={this.sKoreaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.sKoreaData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.switzerlandData ? (
                        <div ref={this.switzerlandDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.switzerlandData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.ukData ? (
                        <div ref={this.ukDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.ukData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.netherlandsData ? (
                        <div ref={this.netherlandsDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.netherlandsData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.belgiumData ? (
                        <div ref={this.belgiumDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.belgiumData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.austriaData ? (
                        <div ref={this.austriaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.austriaData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.norwayData ? (
                        <div ref={this.norwayDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.norwayData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.swedenData ? (
                        <div ref={this.swedenDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.swedenData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.denmarkData ? (
                        <div ref={this.denmarkDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.denmarkData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.portugalData ? (
                        <div ref={this.portugalDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.portugalData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.malaysiaData ? (
                        <div ref={this.malaysiaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.malaysiaData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.canadaData ? (
                        <div ref={this.canadaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.canadaData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.australiaData ? (
                        <div ref={this.australiaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.australiaData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.brazilData ? (
                        <div ref={this.brazilDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.brazilData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.irelandData ? (
                        <div ref={this.irelandDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.irelandData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.greeceData ? (
                        <div ref={this.greeceDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.greeceData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.polandData ? (
                        <div ref={this.polandDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.polandData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.indonesiaData ? (
                        <div ref={this.indonesiaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.indonesiaData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.philippinesData ? (
                        <div ref={this.philippinesDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.philippinesData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.hongkongData ? (
                        <div ref={this.hongkongDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.hongkongData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.iraqData ? (
                        <div ref={this.iraqDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.iraqData}}>
                        </div>
                    ) : null
                }
                {
                    this.state.algeriaData ? (
                        <div ref={this.algeriaDataContainer} className={"data-container"} dangerouslySetInnerHTML={{__html: this.state.algeriaData}}>
                        </div>
                    ) : null
                }
            </Fragment>
        );
    }
}

const deathDataDisplay = JSON.parse('[{"label":"china","data":[17,25,41,56,80,106,132,170,213,259,304,361,425,490,563,636,722,811,908,1016,1113,1259,1380,1523,1665,1770,1868,2004,2118,2236,2345,2442,2592,2663,2715,2744,2788,2835,2870,2912,2943,2981,3012,3042,3070,3097,3119,3136,3158,3169,3176,3189,3199,3213,3226,3237,3245,3248,3255],"borderColor":"rgba(42,104,17,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"italy","data":[0,0,0,0,0,0,1,2,3,7,11,12,17,21,29,41,52,79,107,148,197,233,366,463,631,827,1016,1266,1441,1809,2158,2503,2978,3405,4032],"borderColor":"rgba(78,96,112,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"spain","data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,8,10,17,30,36,55,86,133,196,294,342,533,638,831,1093],"borderColor":"rgba(193,97,213,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"germany","data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,3,6,8,9,13,17,26,28,44,68],"borderColor":"rgba(185,34,180,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"iran","data":[0,0,0,0,2,2,4,6,8,12,16,19,26,34,43,54,66,77,92,108,124,145,194,237,291,354,429,514,611,724,853,988,1135,1284,1433],"borderColor":"rgba(200,77,118,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"us","data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,6,9,11,12,15,19,22,26,30,38,41,49,57,68,86,109,150,207,256],"borderColor":"rgba(43,22,99,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"france","data":[1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,4,4,7,9,16,19,30,33,48,61,79,91,127,148,175,264,372,450],"borderColor":"rgba(225,23,114,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"sKorea","data":[0,0,0,0,0,1,2,2,6,8,11,12,13,16,17,21,28,32,35,42,43,48,50,53,60,60,66,67,72,75,75,81,84,91,94],"borderColor":"rgba(191,136,63,1)","backgroundColor":"rgba(0,0,0,0)"}]');

const dataDisplay = JSON.parse('[{"label":"czechia","data":[3,3,5,5,8,19,26,32,38,63,94,116,141,189,298,383,450,560,765,889,995],"borderColor":"rgba(42,104,17,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"World (excluding China)","data":[9,15,30,40,56,66,84,102,131,159,173,186,190,221,248,278,330,354,382,461,481,526,587,608,697,781,896,999,1124,1212,1385,1715,2055,2429,2764,3323,4288,5364,6780,8559,10292,12746,14905,17873,21399,25404,29256,33627,38170,45421,53763,64659,75809,88733,101609,117344,137894,163966,194589],"borderColor":"rgba(78,96,112,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"china","data":[571,830,1287,1975,2744,4515,5974,7711,9692,11791,14380,17205,20440,24324,28018,31161,34546,37198,40171,42638,44653,58761,63851,66492,68500,70548,72436,74185,74576,75465,76288,76936,77150,77658,78064,78497,78824,79251,79824,80026,80151,80270,80409,80552,80651,80695,80735,80754,80778,80793,80813,80824,80844,80860,80881,80894,80928,80967,81008],"borderColor":"rgba(193,97,213,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"italy","data":[3,3,3,3,3,4,21,79,157,229,323,470,655,889,1128,1701,2036,2502,3089,3858,4636,5883,7375,9172,10149,12462,15113,17660,21157,24747,27980,31506,35713,41035,47021],"borderColor":"rgba(185,34,180,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"spain","data":[2,2,2,2,2,2,2,2,2,3,9,13,25,33,58,84,120,165,228,282,401,525,674,1231,1695,2277,3146,5232,6391,7988,9942,11826,14769,18077,21571],"borderColor":"rgba(200,77,118,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"germany","data":[16,16,16,16,16,16,16,16,16,16,18,26,48,74,79,130,165,203,262,545,670,800,1040,1224,1565,1966,2745,3675,4599,5813,7272,9367,12327,15320,19848],"borderColor":"rgba(43,22,99,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"iran","data":[0,0,0,0,2,5,18,29,43,61,95,139,245,388,593,978,1501,2336,2922,3513,4747,5823,6566,7161,8042,9000,10075,11364,12729,13938,14991,16169,17361,18407,19644],"borderColor":"rgba(225,23,114,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"us","data":[15,15,15,15,15,15,35,35,35,53,57,60,60,63,68,75,100,124,158,221,319,435,541,704,994,1301,1697,2247,2943,3680,4663,6411,9259,13789,19383],"borderColor":"rgba(191,136,63,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"france","data":[12,12,12,12,12,12,12,12,12,12,14,18,38,57,100,130,191,212,285,423,653,949,1209,1412,1784,2281,2876,3661,4499,5423,6633,7730,9134,10995,12612],"borderColor":"rgba(133,203,238,1)","backgroundColor":"rgba(0,0,0,0)"},{"label":"sKorea","data":[28,29,30,31,58,111,209,436,602,833,977,1261,1766,2337,3150,3736,4335,5186,5621,6284,6593,7041,7313,7478,7513,7755,7869,7979,8086,8162,8236,8320,8413,8565,8652],"borderColor":"rgba(58,57,95,1)","backgroundColor":"rgba(0,0,0,0)"}]')