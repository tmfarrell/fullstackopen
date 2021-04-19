import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, count, pct}) => {
    if (count != null) {
        return <tr><td>{text}</td><td>{count}</td></tr>
    } else if (pct != null) {
        return <tr><td>{text}</td><td>{pct.toFixed(3) * 100}%</td></tr>
    }
}

const DisplayCounts = (props) => {
    let content = props.counts.map(function(count) {
        return <Statistic text={count.name} count={count.value} />
        }
    )
    return (
        <table>
            <tbody>
                {content}
            </tbody>
        </table>

    )
}

const DisplayStats = (props) => {
    return (
      <table>
        <tbody>
            <Statistic text='Average' count={props.average} />
            <Statistic text='Positive' pct={props.positive} />
        </tbody>
      </table>
    )
}

const Statistics = (props) => {
    if ( props.stats.total == 0 ) {
        return <p>No feedback yet. Check back in later.</p>
    } else {
        return (
          <div>
            <h4>Yo' Counts</h4>
            <DisplayCounts counts={props.stats.counts} />
            <h4>Yo' Stats</h4>
            <DisplayStats average={props.stats.average}  positive={props.stats.positive} />
          </div>
        )
    }
}

const FeedbackStatefulApp = () => {
  // save clicks of each button to its own state
  const [yah, setYah] = useState(0)
  const [meh, setMeh] = useState(0)
  const [nah, setNah] = useState(0)
  const [all, setAll] = useState(0)

  const whichClick = (which, setWhich) => () => {
    setAll(all + 1)
    setWhich(which + 1)
  }

  const stats = {
    total: all,
    average: ((yah * 1) + (meh * 0) + (nah * -1)) / all,
    positive: yah / all,
    counts: [
        { name: 'Yah', value: yah },
        { name: 'Meh', value: meh },
        { name: 'Nah', value: nah }
    ]
  }

  return (
    <div>
      <h2>Leave Yo' Feedback</h2>

      <Button handleClick={whichClick(yah, setYah)} text='Yah'/>
      <Button handleClick={whichClick(meh, setMeh)} text='Meh'/>
      <Button handleClick={whichClick(nah, setNah)} text='Nah'/>

      <Statistics stats={stats} />
    </div>
  )
} ;

export default FeedbackStatefulApp ;