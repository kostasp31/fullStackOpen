const Language = ({lang}) => {
    return (
      <li>{lang}</li>
    )
  }
  
  const LanguageList = ({langs}) => {
    let langList = []
    for (let [key, value] of Object.entries(langs))
      langList = langList.concat({key, value})
  
    return (
      <div>
        <h2>Languages:</h2>
        <ul>{langList.map(ln => <Language lang={ln.value} key={ln.key} />)}</ul>
      </div>
    )
  }

export default LanguageList