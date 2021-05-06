import React from 'react'

const Header = (props) => {
    return <h2 style={{color: "red"}}>{props.course}</h2>
} ;

const Part = (props) => {
    return <p>{props.part_name} {props.num_exercises}</p>
} ;

const Content = (props) => {
    let content = props.parts.map(function(part) {
        return <Part key={part.id} part_name={part.name} num_exercises={part.exercises} />
    })
    return <div>{content}</div>
} ;

const Total = ({ parts }) => {
    const num_exercises = parts.map( p => p.exercises ).reduce(function(x, y) { return x + y})
    return <p><b>total exercises: {num_exercises}</b></p>
} ;

const Course = ({ name, parts }) => {
   return (
        <div>
          <Header course={name}/>
          <Content parts={parts}/>
          <Total parts={parts} />
        </div>
  )
} ;

export default Course ;