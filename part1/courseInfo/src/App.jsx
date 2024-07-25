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
      {data.part} {data.ex}
    </p>
    </>
  )
}

const Content = (data) => {
  console.log(data)
  return (
    <div>
      <Part part={data.part1} ex={data.ex1} />
      <Part part={data.part2} ex={data.ex2} />
      <Part part={data.part3} ex={data.ex3} />
    </div>
  )
}

const Total = (nums) => {
  console.log(nums)
  return (
    <div>
      <p>Number of exercises {nums.ex1 + nums.ex2 + nums.ex3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content part1={part1} ex1={exercises1} part2={part2} ex2={exercises2} part3={part3} ex3={exercises3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

export default App