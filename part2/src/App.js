import React from 'react'
import Course from './components/Course.js'

const MainHeader = (props) => {
    return <h1>{props.course}</h1>
} ;

const App = () => {
    const courses = [
        {
            id: 1,
            name: 'half stack application development',
            parts: [
                {
                    name: 'react fundamentals',
                    exercises: 10,
                    id: 0
                },
                {
                    name: 'using props to pass data',
                    exercises: 7,
                    id: 1
                },
                {
                    name: 'state of a component',
                    exercises: 14,
                    id: 2
                },
                {
                    name: 'redux',
                    exercises: 11,
                    id: 3
                }
            ]
        },
        {
          name: 'node.js',
          id: 2,
          parts: [
            {
              name: 'routing',
              exercises: 3,
              id: 0
            },
            {
              name: 'middleware',
              exercises: 7,
              id: 1
            }
          ]
        }
    ] ;

    let course_content = courses.map(function(course) {
        return <Course key={course.id} name={course.name} parts={course.parts} />
    })

    return (
        <div>
        <MainHeader course="web dev course curriculum" />
        {course_content}
        </div>
    )
} ;

export default App;
