import { useEffect, useState } from "react"


export const useCountryVerification = (country) => {
  const [verificatedCountry, setVerificatedCountry] = useState("")
  const countryToUse = country

  useEffect(()=>{
    const verificate = (country) => {
      if (country === "New Zealand"){
        setVerificatedCountry("New_Zealand")
      }
      else if (country === "Rockwool Denmark"){
        setVerificatedCountry("Denmark")
      }
      else if (country === "Emirates GBR"){
        setVerificatedCountry("United_Kingdom")
      }
      else if (country === "Francia"){
        setVerificatedCountry("France")
      }
      else{
        setVerificatedCountry(country)
      }
    }
    verificate(countryToUse)
  },[countryToUse])

  return verificatedCountry
}