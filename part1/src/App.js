import React from 'react'

const Header = (props) => {
    return <h1>{props.course}</h1>
} ;

const Part = (props) => {
    return <p>{props.part_name} {props.num_exercises}</p>
} ;

const Content = (props) => {
    let content = props.parts.map(function(part) {
        return <Part part_name={part.name} num_exercises={part.exercises} />
    })
    return <div>{content}</div>
} ;

const Total = (props) => {
    return <p>Number of exercises {props.num_exercises}</p>
} ;

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

  return (
    <div>
      <Header course={course.name}/>

      <Content parts={course.parts}/>

      <Total num_exercises={course.parts.map( p => p.exercises ).reduce(function(x, y) { return x + y})} />
    </div>
  )
} ;

export default App;
