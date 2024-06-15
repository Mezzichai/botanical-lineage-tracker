import WateringStyles from "../styles/WateringStyles.module.css"
import InfoBox from "../../../components/InfoBox"
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import {useRef, useState } from "react"
import ChartStyles from '../styles/ChartStyles.module.css'

type Props = {
  label: string,
  value: number,
  dataIndex: number,
  backgroundColor: string, 
  borderColor:string,
  handleLabelValueChange: (index: number, newValue: number) => void,
}

const WaterLabel:React.FC<Props> = ({handleLabelValueChange, label, value, dataIndex}) => {
  const [isInValidAmount, setIsInvalidAmount] = useState<boolean>(false)
  const fieldRef = useRef<HTMLInputElement>(null)

  const handleValueChange = (eventValue: string) => {
    const newValue = Number(eventValue)
    if (newValue <= 100) {
      setIsInvalidAmount(false)
      handleLabelValueChange(dataIndex, newValue)
    } else {
      setIsInvalidAmount(true)
      if (fieldRef.current) {
        fieldRef.current.focus()
      }
    }
  }

  return (
    <li className={ChartStyles.label}>
      <div className={ChartStyles.labelName}>
        {label}
      </div>
      <>
        -
        <input 
          ref={fieldRef}
          type='number'
          placeholder="waterings"
          max={100}
          min={0}
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          className={ChartStyles.wateringsInput}
        />
        {(isInValidAmount && document.activeElement === fieldRef.current) &&
          <InfoBox message="you can't water more than 100 times a month" styles={InfoCardStyles.instructions} />
        }
      </>
    
    </li>
  )
}

export default WaterLabel