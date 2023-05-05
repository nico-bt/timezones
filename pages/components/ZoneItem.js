import Close from "@mui/icons-material/Close"

function ZoneItem({ zone, closeZone }) {
  return (
    <div className="zone-item">
      <span className="close-btn" onClick={() => closeZone(zone?.id)}>
        <Close fontSize="small" />
      </span>
      <h2>{zone?.place.replace(/\//g, " - ").replace("_", " ")}</h2>
      <div>
        <p className="date">
          {zone?.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="time">
          {zone?.date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}

export default ZoneItem
