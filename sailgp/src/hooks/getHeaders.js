

export const getHeaders = (columns) => {

  
  const regattas = columns[3]
  const headers = []

  columns.forEach((column)=>{
    if (column !== regattas){
      headers.push(column[0])
    }
    else{
      column.forEach((regata)=>{
        headers.push(regata[0])
      })
    }
  })

  return {headers, regattas}
}