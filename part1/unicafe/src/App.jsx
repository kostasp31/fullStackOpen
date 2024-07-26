import { useState } from 'react'

const StatisticsLine = ({text, counter, endText}) => {
    return (
        <tr>
            <td>
                {text}
            </td>
            <td>
                {counter} {endText}
            </td>
        </tr>
    )   
}

const Statistics = ({good, bad, neutral}) => {
    if (good+bad+neutral === 0) {
        return (
        <div>
            No feedback given
        </div>
        )
    }
    else {
        return (
            <div>
                <table>
                    <tbody>
                        <StatisticsLine text="good" counter={good} endText="" />
                        <StatisticsLine text="neutral" counter={neutral}  endText="" />
                        <StatisticsLine text="bad" counter={bad}  endText="" />
                        <StatisticsLine text="all" counter={good+bad+neutral}  endText="" />
                        <StatisticsLine text="average" counter={(good-bad)/(good+bad+neutral)}  endText="" />
                        <StatisticsLine text="positive" counter={(good / (good+bad+neutral)) * 100}  endText="%" />
                    </tbody>
                </table>
            </div>
        )
    }
}

const HeadText = ({txt}) => {
    return (
    <div>
        <h1>
            {txt}
        </h1>
    </div>
    )
}

const Button = (props) => {
    const {name, onHit} = props
    return (
    <button onClick={onHit}>
        {name}
    </button>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
        <HeadText txt="Give Feedback" />
        <Button name="good" onHit={() => setGood(good+1)} />
        <Button name="neutral" onHit={() => setNeutral(neutral+1)} />
        <Button name="bad" onHit={() => setBad(bad+1)} />
        <HeadText txt="Statistics" />
        <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

export default App