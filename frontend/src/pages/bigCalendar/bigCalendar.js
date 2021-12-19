import React,{useState, useEffect}  from 'react';
import {Calendar,  dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './bigCalendar_styles.css';
import api from '../../services/api';

const locales = {
    //"en-US": require("date-fns/locale/en-US"),
    //"pt-BR": require("date-fns/locale/pt-BR"),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})
/*
const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    }
];*/

export default function BigCalendar(){
 
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([{ title: "", start: new Date(), end: new Date() }]);

    //console.log(new Date("2021-12-04T18:30:00.000Z"));
    
    useEffect(()=>{
        api.get('profile').then(res => { 
            setAllEvents(res.data);
        });
    })

    async function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        console.log(newEvent);

        try {                      
            const res = await api.post('scheduler', newEvent);
            console.log(res.data);            
        }catch(err){
            alert("Erro no agendamento");
        }
    }

    function handleCheck(){
        console.log(allEvents)
    }
    //(start) => setNewEvent({ ...newEvent, start }) (start)=> handleDateTimeSelection(start)
    return (
        <div className="BigCalendar">
            <div className="header">
                <h1>Agendamento</h1>
                <h2>Crie um Novo Agendamento</h2>
            </div>
            <div className="form">
                <input type="text" placeholder="Servico a ser prestado" 
                        value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker dateFormat="dd/MM/yyyy h:mm" showTimeSelect placeholderText="Prazo de Inicio" style={{ marginRight: "10px" }} 
                            selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start }) } />
                <DatePicker dateFormat="dd/MM/yyyy h:mm" showTimeSelect placeholderText="Prazo de Termino" style={{ marginRight: "10px" }} 
                            selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end }) } />
                <button className="button" stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Agendar
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "20px" }} />
        </div>
    );
}
 /*
    function handleDateTimeSelection() {
        const start = new Date();
        const StartInMilliseconds = Number(new Date (start).getTime());
        const newTime = StartInMilliseconds + 1800000;
        const end = new Date (newTime);
        testEvent.end = end;
        testEvent.start = start;

        setNewEvent({...newEvent, testEvent});
        //setNewEvent({ ...newEvent, end })
        
        setAllEvents([...allEvents, newEvent]);

        console.log(" start : " + start);
        console.log(" newEvent.start : " + newEvent.start);
        console.log(" newEvent.end : " + newEvent.end);
        console.log(" StartInMilliseconds : " + StartInMilliseconds);
        console.log("newTime : "  + newTime);
        console.log("end : " + end);
        console.log("    ");
        console.log("    ");
    }
    */