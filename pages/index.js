import Head from "next/head"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
//Components
import ZoneSelect from "./components/ZoneSelect"
import ZoneItem from "./components/ZoneItem"
import Footer from "./components/Footer"

export default function Home() {
  const [validTimezones, setValidTimezones] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userAddedZones, setUserAddedZones] = useState([])

  // Getting all the valid timezones from API
  // **********************************************************
  useEffect(() => {
    const getZones = async () => {
      setError(false)
      setIsLoading(true)
      try {
        const res = await fetch("https://worldtimeapi.org/api/timezone")
        const data = await res.json()
        setValidTimezones(data)
        setIsLoading(false)
      } catch (error) {
        setError(true)
        setIsLoading(false)
      }
    }
    getZones()
    // console.log(validTimezones)
  }, [])

  // X btn - handler for closing ZoneItem
  // **********************************************************
  const closeZone = (id) => {
    const filteredZones = userAddedZones.filter((item) => item.id !== id)
    setUserAddedZones(filteredZones)
  }

  return (
    <>
      <Head>
        <title>Timezones</title>
        <meta name="description" content="Get world times" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <main>
          {isLoading && <h1 className="title">Loading...</h1>}

          {error && (
            <h1 className="title">
              Ups... sorry something went wrong. Try again later
            </h1>
          )}

          {!error && !isLoading && (
            <>
              <h1 className="title">World Clock </h1>

              <ZoneSelect
                countries={validTimezones}
                setUserAddedZones={setUserAddedZones}
                setError={setError}
              />

              <div className="zones-container">
                {userAddedZones.length > 0 &&
                  userAddedZones.map((zone) => (
                    <ZoneItem zone={zone} key={zone.id} closeZone={closeZone} />
                  ))}
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}
