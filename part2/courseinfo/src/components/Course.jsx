const SubHeader = ({ title }) => <h2>{title}</h2>

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

const Part = ({ part }) => {
  return (
    <p>
        {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
    //   let sum = 0
    //   parts.map(part => sum += part.exercises)
    const sum = parts.reduce((a, obj) => {
      // console.log(a, obj.exercises)
      return a + obj.exercises
    }, 0)
  
    return (
      <div>
          {parts.map(part => <Part key={part.id} part={part} />)}
          <Total sum={sum} />
      </div>
    )
  }

const Course = ({course}) => {
    return (
        <div>
            <SubHeader title={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course