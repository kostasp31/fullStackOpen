const Header = (title) => {
  console.log(title)
  return (
    <div>
      <h1>
        {title.title}      
      </h1>
    </div>
  )
}

const Part = (data) => {
  console.log(data)
  return (
    <>
    <p>
      {data.parts.name} {data.parts.exercises}
    </p>
    </>
  )
}

const Content = (data) => {
  console.log(data)
  return (
    <div>
      <Part parts={data.parts[0]} />
      <Part parts={data.parts[1]} />
      <Part parts={data.parts[2]} />
    </div>
  )
}

const Total = (nums) => {
  console.log(nums)
  return (
    <div>
      <p>Number of exercises {nums.parts[0].exercises + nums.parts[1].exercises + nums.parts[2].exercises}</p>
    </div>
  )
}

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
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App