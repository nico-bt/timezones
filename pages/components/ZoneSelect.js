import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useState } from "react"
import { Button } from "@mui/material"
import { v4 as uuidv4 } from "uuid"

export default function ZoneSelect({ countries, setUserAddedZones, setError }) {
  const [value, setValue] = useState("")
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`https://worldtimeapi.org/api/timezone/${value}`)
      const timezoneData = await res.json()

      const dateString = timezoneData.datetime.substring(0, 19)
      const date = new Date(dateString)
      // console.log(timezoneData.datetime)

      setUserAddedZones((prevState) => [
        ...prevState,
        { date, place: timezoneData.timezone, id: uuidv4() },
      ])
      setValue("")
    } catch (error) {
      setError(true)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id="combo-box-countries"
        options={countries}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{ width: { xs: 300, sm: 400 } }}
        renderInput={(params) => (
          <TextField {...params} label="Choose a zone" />
        )}
      />
      <Button size="large" variant="contained" disabled={!value} type="submit">
        Get Time!
      </Button>
    </form>
  )
}
