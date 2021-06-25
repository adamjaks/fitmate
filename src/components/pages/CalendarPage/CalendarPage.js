import React from 'react';
import './CalendarPage.scss';
import Header from "../../sections/Header/Header";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";
import { pl } from "date-fns/locale";

import { FaRunning } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';
import { FaStopwatch } from "react-icons/fa";

import axios from "axios";

const GET_TRAINING_DAYS_PATH = "https://fitmate-server.herokuapp.com/api/training-days";

class CalendarPage extends React.Component {

    constructor(props) {
        super(props);

        this.prevMonthBind = this.prevMonth.bind(this);
        this.nextMonthBind = this.nextMonth.bind(this);
        this.onDateClickBind = this.onDateClick.bind(this);

        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            trainingDays: [],
            pickedTraining: {}
        };
    }

    componentDidMount() {
        this.fetchTrainingDays();
    }

    fetchTrainingDays() {
        axios.get(`${GET_TRAINING_DAYS_PATH}`).then(res => {
            this.setState({
                trainingDays: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    onDateClick(day) {
        this.setState({
            selectedDate: day
        });

        const trainingsInDay = this.state.trainingDays?.filter(tD => {
            return isSameDay(day, parseISO(tD.date));
        });

        this.setState({
           pickedTraining: trainingsInDay[0] || {}
        });
    }

    nextMonth() {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    }

    prevMonth() {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    }

    renderHeader() {
        const dateFormat = "LLLL yyyy";
        return (
            <div className="CalendarPage__calendar-header CalendarPage__calendar-row">
                <div className="col col-start">
                    <div className="CalendarPage__calendar-icon" onClick={this.prevMonthBind}>
                        <FaAngleLeft/>
                    </div>
                </div>
                <div className="col col-center">
        <span>
          {format(this.state.currentMonth, dateFormat, { locale: pl})}
        </span>
                </div>
                <div className="col col-end" onClick={this.nextMonthBind}>
                    <div className="CalendarPage__calendar-icon">
                        <FaAngleRight/>
                    </div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "iiiiii";
        const days = [];
        let startDate = startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="CalendarPage__calendar-day CalendarPage__calendar-day--highlighted" key={i}>
                    {format(addDays(startDate, i), dateFormat, {locale: pl})}
                </div>
            );
        }
        return <div className="CalendarPage__calendar-days CalendarPage__calendar-row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "dd";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                const trainingsInDay = this.state.trainingDays?.filter(tD => {
                    return isSameDay(day, parseISO(tD.date));
                });

                days.push(
                    <div
                        className={`CalendarPage__calendar-day ${
                            !isSameMonth(day, monthStart)
                                ? "CalendarPage__calendar-day--disabled"
                                : isSameDay(day, selectedDate) ? "CalendarPage__calendar-day--selected" : ""
                        }`}
                        key={day}
                        onClick={(evt) => this.onDateClick(cloneDay)}
                    >
                        <span className="CalendarPage__calendar-number">{formattedDate}</span>
                        <div className={"CalendarPage__calendar-day-trainings"}>
                            {
                                trainingsInDay.map((td, i) => {
                                    if (i < 5) {
                                        return (<div className={"CalendarPage__calendar-day-training"} key={i}></div>)
                                    }
                                })

                            }
                        </div>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="CalendarPage__calendar-row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="CalendarPage__calendar-body">{rows}</div>;
    }

    render() {
        return (
            <div className="CalendarPage">
                <Header/>
                <h2 className={"title"}>Kalendarz</h2>
                <div className={"CalendarPage__calendar"}>
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
                { Object.keys(this.state.pickedTraining).length === 0 &&
                    <div className={"CalendarPage__training-info"}>
                        Wybierz konkretny dzień aby zobaczyć szczegóły treningu.
                    </div>
                }
                { Object.keys(this.state.pickedTraining).length > 0 &&
                    <div className={"CalendarPage__training-info"}>
                        <div className={"CalendarPage__training-info-icon"}>
                            <FaRunning/>
                        </div>
                        <div>
                            <div className={"CalendarPage__training-info-row"}>
                                <div className={"CalendarPage__training-info-title"}>
                                    { this.state.pickedTraining?.trainingName }
                                </div>
                            </div>
                            <div className={"CalendarPage__training-info-row"}>
                                <div className={"CalendarPage__training-info-item"}>
                                    2 dni temu
                                </div>
                                <div className={"CalendarPage__training-info-item"}>
                                    <FaStopwatch/> <span>58:02</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default CalendarPage;
